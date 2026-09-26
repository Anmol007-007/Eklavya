# ==============================================================================
# PROJECT EKLAVYA (एकलव्य) — MASTER ENGINEERING CONTEXT & SYSTEM BLUEPRINT
# ==============================================================================
# For AI Assistants, Lead Architects, and Systems Engineers
# Problem Statement: SIH26238 (Smart India Hackathon 2026)
# Target Ministry: Ministry of Tribal Affairs & Ministry of Social Justice and Empowerment
# Repository Workspace: C:\Users\anmol\OneDrive\Documents\Eklavya
# Git Remote: https://github.com/Anmol007-007/Eklavya.git
# ==============================================================================

---

## 1. EXECUTIVE SUMMARY & MISSION

**Project Eklavya** is a unified, offline-first, vernacular mobile application and web portal designed specifically for tribal and marginalized students across India. 

### The Problem (SIH26238 Ground Realities):
Tribal scholars in remote belts (e.g., Bastar, Jharkhand, Odisha) suffer a **>42% scholarship application abandonment rate** due to:
1. **Unstable 2G/3G Connectivity:** Intermittent network dropouts cause multi-step web forms to time out and lose session data.
2. **Device & Bandwidth Constraints:** Low-end Android smartphones ($50–$80, 2GB–3GB RAM) crash when uploading uncompressed 5MB–10MB PDFs/scans over slow mobile data.
3. **Linguistic Barriers:** Official portals are predominantly in formal English/Hindi, excluding native speakers of indigenous dialects (Gondi, Santhali Ol Chiki, Odia).
4. **Opaque Disbursal Tracking:** Students travel dozens of kilometers to district offices because portals only show generic "Under Processing" states for Direct Benefit Transfer (DBT).

### The Solution:
An **offline-first Store-and-Forward mobile ecosystem** backed by a **high-throughput asynchronous FastAPI backend**:
- Applications can be drafted, verified, and submitted completely offline.
- On-device WebP compression shrinks document scans by **85%+** (<140 KB).
- Atomic `sync_uuid` idempotency ensures flaky network retries never create duplicate records.
- Automated DigiLocker and PFMS DBT milestone tracking with GIGW 3.0 (Government of India Guidelines for Websites) compliance.

---

## 2. REPOSITORY FILE STRUCTURE & RESPONSIBILITY MAP

```
Eklavya/
├── index.html                               # Official GIGW 3.0 / NIC-compliant Frontend Single Page Application
├── style.css                                # Design System tokens (NIC Navy #0a3d62, Saffron #c2410c, Green #138808, High Contrast)
├── app.js                                   # Frontend logic (i18n engine, state, font scaling, DigiLocker sync, Citizen Helpdesk)
├── server.py                                # Zero-dependency Python HTTP server (serves frontend on port 8000)
├── package.json                             # Frontend tooling & Vite dev scripts
├── SIH2026_Project_Eklavya_Presentation_Deck.docx # Official Word Presentation Deck
├── SIH2026_Project_Eklavya_Presentation_Deck.md   # Markdown Presentation Deck
├── generate_doc.py                          # Automation script to rebuild Word presentation
├── venv/                                    # Python 3.12 virtual environment (includes activation scripts)
└── backend/                                 # Domain-Driven Design (DDD) FastAPI Backend
    ├── requirements.txt                     # FastAPI, SQLAlchemy 2.0 Async, Celery, Redis, asyncpg, etc.
    ├── Dockerfile                           # Production container definition
    ├── docker-compose.yml                   # Multi-container stack (API + Celery Worker + Postgres + Redis)
    ├── README.md                            # Backend API documentation & runbook
    └── app/
        ├── main.py                          # ASGI app bootstrap, CORS, lifespan DB initialization, health probe
        ├── core/
        │   ├── config.py                    # Pydantic BaseSettings (DB, Redis, S3, JWT, Govt API configs)
        │   ├── database.py                  # Async SQLAlchemy sessionmaker, asyncpg engine, get_db dependency
        │   ├── security.py                  # JWT creation/verification, Salted SHA-256 Aadhaar hashing & masking
        │   ├── celery_app.py                # Celery instance configured with Redis broker & result backend
        │   └── exceptions.py                # Domain HTTP exceptions (409 Idempotency Conflict, 404 Scheme Not Found)
        ├── models/                          # SQLAlchemy 2.0 Async Declarative Models
        │   ├── base.py                      # UUIDPrimaryKeyMixin, TimestampMixin
        │   ├── user.py                      # User model with demographics, caste, Aadhaar hash, preferred language
        │   ├── scheme.py                    # ScholarshipScheme (eligibility rules: income ceiling, caste criteria)
        │   ├── application.py               # Application entity with status lifecycle and sync_uuid
        │   ├── document.py                  # ApplicationDocument (WebP URLs, SHA-256 hashes, DigiLocker URIs)
        │   ├── audit.py                     # AuditLog (immutable event-sourced status change history)
        │   └── idempotency.py               # IdempotencyRecord (sync_uuid distributed lock & cached response)
        ├── schemas/                         # Pydantic v2 Validation Schemas
        │   └── sync.py                      # OfflineApplicationSyncPayload, DocumentPayload, SyncResponse
        ├── services/                        # Business Logic Layer
        │   ├── application_service.py       # Atomic synchronization orchestrator
        │   ├── idempotency_service.py       # Distributed check-and-lock + response caching service
        │   └── mock_integrations.py         # Mock service layers (Aadhaar UIDAI, DigiLocker, PFMS DBT tracker)
        └── workers/                         # Distributed Task Queue Workers
            └── digilocker_tasks.py          # Celery worker task for async DigiLocker certificate pull
```

---

## 3. CANONICAL TEST DATA (CANDIDATE CONTEXT)

All mock workflows, database seeding, and frontend defaults use this standardized candidate profile:
- **Full Name:** Anmol Soni
- **Date of Birth:** 03/03/2005
- **College / Institution:** Gyan Ganga College Of Technology (GGCT), Jabalpur
- **Caste / Category:** OBC (Other Backward Classes)
- **University Roll Number:** `0208AD231011`
- **Annual Family Income:** `₹ 1,80,000.00`
- **Phone Number:** `+91 98260 12345`
- **Email:** `anmol.soni@ggct.ac.in`
- **Aadhaar Number (Raw/Input):** `548912345678`
- **Aadhaar Seeded Bank Account:** `State Bank of India (XXXX-XXXX-4109)` • NPCI Mapped Active
- **Enrolled Scholarship Scheme:** Post-Matric Scholarship for OBC Students (Technical Courses)
  - **Sanctioned Grant:** `₹ 45,000.00 / year`
  - **Disbursal Status:** Tranche 1 (`₹ 22,500.00`) Disbursed • Tranche 2 (`₹ 22,500.00`) PFMS Processing

---

## 4. ARCHITECTURE & DATA FLOW

### The Idempotent Store-and-Forward Sync Pipeline

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
│     - Inspects `sync_uuid`.                                                  │
│     - If status == 'COMPLETED' -> Return cached response (200 OK, X-Cache)   │
│     - If status == 'PROCESSING' -> Return 409 Conflict (Prevents race)       │
│     - If NEW -> Create IdempotencyRecord (status = 'PROCESSING')             │
│                                                                              │
│  2. Atomic PostgreSQL Transaction (Single Session Commit):                   │
│     - Upsert User by Salted SHA-256 Aadhaar Hash                             │
│     - Insert Application (Status: 'SUBMITTED', sync_uuid)                    │
│     - Insert ApplicationDocument records (WebP URLs, SHA-256 hashes)         │
│     - Insert immutable AuditLog entry (Actor: 'STUDENT_MOBILE_CLIENT')       │
│                                                                              │
│  3. Celery Asynchronous Job Dispatch:                                        │
│     - Emits `fetch_digilocker_documents_task.delay(app_id)` to Redis queue   │
│                                                                              │
│  4. Transaction Finalization:                                                │
│     - Updates IdempotencyRecord -> 'COMPLETED' + saves response JSON         │
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

## 5. DATABASE SCHEMA DEFINITION (SQLAlchemy 2.0 Async)

### 1. `User` Table (`users`)
- `id` (UUID, PK)
- `aadhaar_hash` (VARCHAR(64), UNIQUE, INDEX) — Salted SHA-256 hash (never raw Aadhaar)
- `aadhaar_masked` (VARCHAR(16)) — Formatted as `XXXX-XXXX-4109`
- `phone` (VARCHAR(15), UNIQUE, INDEX)
- `full_name` (VARCHAR(120))
- `dob` (DATE)
- `gender` (VARCHAR(20))
- `caste_category` (ENUM: `ST`, `SC`, `OBC`, `GENERAL`)
- `annual_family_income` (NUMERIC(12, 2))
- `college_name` (VARCHAR(255))
- `roll_number` (VARCHAR(60))
- `state`, `district` (VARCHAR(60))
- `preferred_language` (VARCHAR(10), default `'en'`)
- `created_at`, `updated_at` (TIMESTAMP WITH TIME ZONE)

### 2. `ScholarshipScheme` Table (`scholarship_schemes`)
- `id` (UUID, PK)
- `scheme_code` (VARCHAR(50), UNIQUE, INDEX) — e.g. `POST_MATRIC_OBC`, `POST_MATRIC_ST`
- `scheme_name` (VARCHAR(255))
- `ministry` (VARCHAR(120), default `'Ministry of Tribal Affairs'`)
- `max_income_limit` (NUMERIC(12, 2)) — Eligibility threshold
- `max_age` (INTEGER)
- `allowed_castes` (JSON) — e.g. `["OBC"]` or `["ST"]`
- `disbursal_amount` (NUMERIC(10, 2))
- `is_active` (BOOLEAN)

### 3. `Application` Table (`applications`)
- `id` (UUID, PK)
- `sync_uuid` (UUID, UNIQUE, INDEX) — Generated on mobile device by Isar NoSQL
- `application_number` (VARCHAR(50), UNIQUE, INDEX) — Format: `EKL-2026-XXXXXX`
- `user_id` (UUID, FK `users.id`)
- `scheme_id` (UUID, FK `scholarship_schemes.id`)
- `academic_year` (VARCHAR(20), default `'2026-2027'`)
- `status` (ENUM: `DRAFT`, `SUBMITTED`, `INSTITUTE_VERIFIED`, `NODAL_APPROVED`, `DISBURSED`, `REJECTED`)
- `client_created_at` (TIMESTAMP WITH TIME ZONE) — Device creation timestamp
- `submitted_at` (TIMESTAMP WITH TIME ZONE)
- `payload_snapshot` (JSON)

### 4. `ApplicationDocument` Table (`application_documents`)
- `id` (UUID, PK)
- `application_id` (UUID, FK `applications.id`)
- `doc_type` (ENUM: `INCOME_CERT`, `CASTE_CERT`, `DOMICILE_CERT`, `MARKSHEET`, `AADHAAR`, `BANK_PASSBOOK`)
- `doc_status` (ENUM: `PENDING_FETCH`, `UPLOADED_WEBP`, `VERIFIED_DIGILOCKER`, `FAILED_VERIFICATION`)
- `file_url` (VARCHAR(500)) — S3/MinIO or local static storage path
- `file_hash_sha256` (VARCHAR(64)) — Checksum computed on mobile before upload
- `mime_type` (VARCHAR(50), default `'image/webp'`)
- `file_size_kb` (FLOAT)
- `digilocker_uri` (VARCHAR(255)) — e.g. `in.gov.mp.edistrict-INCER-2026-XXXX`
- `digilocker_metadata` (JSON) — Issuer, verification timestamp, digital signature status

### 5. `AuditLog` Table (`audit_logs`)
- `id` (UUID, PK)
- `application_id` (UUID, FK `applications.id`)
- `action` (VARCHAR(100)) — e.g. `OFFLINE_SYNC_INGESTED`, `DIGILOCKER_DOCUMENTS_VERIFIED`, `STATUS_CHANGE`
- `previous_status`, `new_status` (VARCHAR(50))
- `actor_type` (VARCHAR(50)) — `STUDENT_MOBILE_CLIENT`, `SYSTEM_WORKER`, `INSTITUTE_VERIFIER`
- `actor_id` (VARCHAR(100))
- `remarks` (VARCHAR(500))
- `metadata_json` (JSON)
- `created_at` (TIMESTAMP WITH TIME ZONE)

### 6. `IdempotencyRecord` Table (`idempotency_records`)
- `sync_uuid` (UUID, PK, INDEX)
- `user_id` (UUID, nullable)
- `endpoint` (VARCHAR(200))
- `request_hash` (VARCHAR(64)) — SHA-256 of request JSON body
- `status` (ENUM: `PROCESSING`, `COMPLETED`, `FAILED`)
- `response_code` (INTEGER) — e.g. 201, 200
- `response_body` (JSON) — Stored cached response payload for zero-overhead replays
- `created_at`, `updated_at` (TIMESTAMP WITH TIME ZONE)

---

## 6. API SPECIFICATION & DATA CONTRACTS

### Endpoint: `POST /api/v1/applications/sync`
Receives offline-bundled application packages from student mobile devices.

#### Sample Request Body (JSON):
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
  ],
  "client_metadata": {
    "app_version": "1.0.0",
    "device_model": "Redmi 9A",
    "os_version": "Android 11"
  }
}
```

#### Initial Response (`201 Created`):
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

#### Replayed Request Response (`200 OK`, `X-Idempotent-Replay: true`):
Returns the exact cached body with `"is_cached_replay": true` without creating any duplicate database entries.

---

## 7. FRONTEND ARCHITECTURE & GIGW 3.0 STANDARDS

The frontend portal (`index.html`, `style.css`, `app.js`) adheres strictly to **Government of India Guidelines for Websites (GIGW 3.0)**:
1. **Official Top "Gov Strip" (`#f8f9fa`):**
   - Sovereignty branding: `भारत सरकार | GOI` and `Ministry of Tribal Affairs & Social Welfare`.
   - Accessibility links: `Skip to Main Content`, `Screen Reader Access` policy modal.
   - Live font scaling (`A-` | `A` | `A+`) via `setFontSize()`.
   - High Contrast theme toggle via `toggleHighContrast()`.
   - Embedded language dropdown.
2. **Main Branding Header:**
   - State Emblem of India (Ashoka Lion Capital with *Satyameva Jayate*).
   - Dual-language typography (`Eklavya Portal | National Unified Scholarship Portal`).
   - Official "Digital India — Power To Empower" vector badge.
   - 4px Indian Tricolor accent line (`#ff9933`, `#ffffff`, `#138808`).
3. **Primary Navigation Bar (`#0a3d62` Navy):**
   - Active tab indicator in Indian Saffron (`#ff9933`).
   - User Avatar dropdown component (`AS Anmol Soni ▼`).
4. **Multilingual Localization Engine (`app.js`):**
   - Instant live translation dictionary supporting:
     - `en`: English
     - `hi`: हिन्दी (Hindi)
     - `sat`: ᱥᱟᱱᱛᱟᱲᱤ (Santhali Ol Chiki)
     - `gon`: गोंडी (Gondi)
     - `od`: ଓଡ଼ିଆ (Odia)
     - `bn`: বাংলা (Bengali)
5. **Rebranded Citizen Helpdesk Widget:**
   - Floating widget labeled **"Ask Eklavya (Helpdesk)"** with standard support headset icon (`support_agent`).
   - Zero generic "AI" branding to maintain sovereign trust.

---

## 8. COMMAND RUNBOOK (HOW TO RUN)

### 1. Running the Frontend (Local HTTP Server)
```powershell
cd c:\Users\anmol\OneDrive\Documents\Eklavya
python server.py
```
- Access at: **`http://localhost:8000`**

### 2. Running the Full Backend Stack with Docker Compose
```powershell
cd c:\Users\anmol\OneDrive\Documents\Eklavya\backend
docker-compose up --build
```
- **FastAPI Server:** `http://localhost:8001`
- **Swagger Documentation:** `http://localhost:8001/docs`
- **PostgreSQL 16:** `localhost:5432`
- **Redis 7.0 Queue:** `localhost:6379`
- **Celery Worker:** Running in background container

### 3. Running Backend Natively in Python
```powershell
cd c:\Users\anmol\OneDrive\Documents\Eklavya
.\venv\Scripts\Activate.ps1
pip install -r backend\requirements.txt
cd backend
uvicorn app.main:app --host 127.0.0.1 --port 8001 --reload
```
To run the Celery worker on Windows:
```powershell
celery -A app.core.celery_app.celery_app worker --loglevel=info -P solo
```

---

## 9. INSTRUCTIONS FOR ANY NEW AI ASSISTANT WORKING ON THIS PROJECT

When helping the user build or extend Project Eklavya:
1. **Preserve Offline Idempotency:** Always ensure any new endpoints or mobile sync workflows respect the `sync_uuid` idempotency guard.
2. **Adhere to GIGW 3.0 & Privacy:** Never store raw 12-digit Aadhaar numbers. Always use `hash_aadhaar()` and `mask_aadhaar()` from `app.core.security`.
3. **Respect Government Aesthetics:** Use the institutional palette (Navy `#0a3d62`, Saffron `#c2410c` / `#ff9933`, Green `#138808`, Canvas `#f4f6f8`). Avoid generic rounded-2xl or cartoonish SaaS styles.
4. **Maintain the Canonical Test Data:** Preserve references to **Anmol Soni** (Gyan Ganga College Of Technology, OBC, Roll: `0208AD231011`).
5. **Keep Code Modular:** Follow the DDD architecture under `backend/app/` (`models/`, `schemas/`, `services/`, `api/v1/`, `workers/`).
