# Project Eklavya - Backend Architecture & API Specification

High-throughput, asynchronous, offline-first backend service built for the **Ministry of Tribal Affairs Unified Scholarship Platform (SIH26238)**.

---

## 1. System Architecture

```
                    ┌────────────────────────────────────────┐
                    │  Offline Flutter App / Mobile Client   │
                    │  (Generates sync_uuid locally in Isar) │
                    └───────────────────┬────────────────────┘
                                        │
                                        │ HTTP POST /api/v1/applications/sync
                                        │ (Store & Forward Payload)
                                        ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│ FastAPI Application (Uvicorn Async Event Loop)                               │
│                                                                              │
│  1. Idempotency Gatekeeper:                                                  │
│     Inspects sync_uuid. If COMPLETED -> Returns cached response (200 OK)     │
│     If PROCESSING -> Returns 409 Conflict                                    │
│     If NEW -> Sets status = PROCESSING                                       │
│                                                                              │
│  2. Atomic PostgreSQL Transaction:                                           │
│     - Resolves/Upserts User by Aadhaar Hash & Phone                          │
│     - Creates Application (Status: SUBMITTED)                                │
│     - Persists ApplicationDocuments (WebP file hashes / URIs)                │
│     - Writes Immutable AuditLog entry                                        │
│                                                                              │
│  3. Celery Job Dispatch:                                                     │
│     - Emits `fetch_digilocker_documents_task` to Redis queue                 │
│                                                                              │
│  4. Transaction Finalization:                                                │
│     - Updates IdempotencyRecord -> COMPLETED with cached response body       │
│     - Returns 201 Created to Mobile Client                                   │
└───────────────────────┬───────────────────────────────┬──────────────────────┘
                        │                               │
                        ▼                               ▼
       ┌──────────────────────────────┐  ┌──────────────────────────────┐
       │   PostgreSQL 16 (asyncpg)    │  │    Redis 7.0 (Message Queue) │
       │   - users                    │  └──────────────┬───────────────┘
       │   - scholarship_schemes      │                 │
       │   - applications             │                 ▼
       │   - application_documents    │  ┌──────────────────────────────┐
       │   - audit_logs               │  │ Celery Worker Daemon         │
       │   - idempotency_records      │  │ - Simulates DigiLocker pull  │
       └──────────────────────────────┘  │ - Verifies digital signature │
                                         │ - Upgrades App status        │
                                         │ - Appends AuditLog           │
                                         └──────────────────────────────┘
```

---

## 2. Directory Structure (Domain-Driven Design)

```
backend/
├── app/
│   ├── api/
│   │   └── v1/
│   │       ├── endpoints/
│   │       │   ├── applications.py      # POST /sync, GET /status, POST /upload-chunk
│   │       │   └── schemes.py           # GET /schemes (eligibility rules engine)
│   │       └── router.py                # Aggregated v1 routing table
│   ├── core/
│   │   ├── celery_app.py                # Celery worker & Redis broker setup
│   │   ├── config.py                    # Pydantic v2 Environment settings
│   │   ├── database.py                  # SQLAlchemy 2.0 async engine & sessionmaker
│   │   ├── exceptions.py                # Custom HTTP exceptions (409 Conflict, etc.)
│   │   └── security.py                  # JWT auth, Aadhaar SHA-256 tokenization & masking
│   ├── models/                          # SQLAlchemy 2.0 Async ORM Models
│   │   ├── base.py                      # UUIDPrimaryKeyMixin, TimestampMixin
│   │   ├── user.py                      # Student demographics, caste, income, language
│   │   ├── scheme.py                    # Scholarship rules (max income, allowed castes)
│   │   ├── application.py               # Application lifecycle (SUBMITTED -> DISBURSED)
│   │   ├── document.py                  # WebP references, DigiLocker URI & metadata
│   │   ├── audit.py                     # Immutable audit trail
│   │   └── idempotency.py               # sync_uuid store-and-forward deduplication
│   ├── schemas/                         # Pydantic Validation Schemas
│   │   └── sync.py                      # OfflineApplicationSyncPayload, Responses
│   ├── services/                        # Business Logic Layer
│   │   ├── application_service.py       # Atomic synchronization orchestrator
│   │   ├── idempotency_service.py       # Distributed lock & response cache
│   │   └── mock_integrations.py         # Aadhaar, DigiLocker, PFMS DBT mocks
│   ├── workers/                         # Background Task Queues
│   │   └── digilocker_tasks.py          # Asynchronous DigiLocker certificate pull
│   └── main.py                          # FastAPI ASGI bootstrap & CORS setup
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
└── README.md
```

---

## 3. Quick Start (Local & Docker)

### Option A: Running with Docker Compose (Recommended)
```bash
cd backend
docker-compose up --build
```
This spins up:
- FastAPI API Server: `http://localhost:8001`
- PostgreSQL 16: `localhost:5432`
- Redis 7: `localhost:6379`
- Celery Background Worker Daemon

### Option B: Running Locally with Python Virtualenv
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload
```
To run Celery worker:
```bash
celery -A app.core.celery_app.celery_app worker --loglevel=info
```

---

## 4. API Specification: Offline Sync (`POST /api/v1/applications/sync`)

### Sample Request
```json
{
  "sync_uuid": "c3e9812f-916d-4952-b8bb-1521da0c5c31",
  "user_phone": "9876543210",
  "user_aadhaar_raw": "548912345678",
  "scheme_code": "POST_MATRIC_OBC",
  "academic_year": "2026-2027",
  "client_timestamp": "2026-09-25T10:45:00Z",
  "student_details": {
    "full_name": "Anmol Soni",
    "caste_category": "OBC",
    "annual_family_income": 180000.0,
    "college_name": "Gyan Ganga College Of Technology",
    "roll_number": "0208AD231011",
    "state": "Madhya Pradesh",
    "district": "Jabalpur",
    "preferred_language": "en"
  },
  "documents": [
    {
      "doc_type": "INCOME_CERT",
      "file_url": "s3://eklavya-documents/anmol_income.webp",
      "file_hash_sha256": "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a",
      "mime_type": "image/webp",
      "file_size_kb": 142.5
    },
    {
      "doc_type": "CASTE_CERT",
      "file_url": "s3://eklavya-documents/anmol_caste.webp",
      "file_hash_sha256": "ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d",
      "mime_type": "image/webp",
      "file_size_kb": 128.0
    }
  ]
}
```

### Initial Response (HTTP 201 Created)
```json
{
  "success": true,
  "message": "Offline scholarship application received and queued for DigiLocker verification.",
  "sync_uuid": "c3e9812f-916d-4952-b8bb-1521da0c5c31",
  "application_number": "EKL-2026-849102",
  "status": "SUBMITTED",
  "server_timestamp": "2026-09-25T10:45:02.128491Z",
  "is_cached_replay": false,
  "digilocker_queued": true,
  "digilocker_job_id": "7f0980fa-4be1-4b13-a41e-355b938029c0"
}
```

### Idempotent Duplicate Replay (HTTP 200 OK, `X-Idempotent-Replay: true`)
When the mobile client reconnects and transmits the same `sync_uuid`, the database does not insert duplicate rows; it returns the cached result instantaneously with `is_cached_replay: true`.
