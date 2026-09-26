import http.server
import socketserver
import os
import sys
import json
import urllib.request
import urllib.error

if sys.platform.startswith('win'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

PORT = int(os.environ.get("PORT", 8000))
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

def load_env():
    env_path = os.path.join(DIRECTORY, ".env")
    if os.path.exists(env_path):
        with open(env_path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    key, val = line.split("=", 1)
                    os.environ[key.strip()] = val.strip()

load_env()

def generate_local_response(query):
    q = query.lower()
    if any(k in q for k in ["what can you do", "feature", "capability", "capabilities", "help me with", "how to use", "who are you"]):
        return (
            "**Namaste Anmol! I am Eklavya, your AI Scholarship Assistant.**\n\n"
            "Here is how I can assist you:\n"
            "• **Application Tracking:** Check real-time progress for Application #MP-2024-OBC-0208\n"
            "• **DBT & PFMS Disbursals:** Track direct bank transfers and tranche milestones\n"
            "• **DigiLocker Verification:** Verify caste and income certificates via state e-District\n"
            "• **Scheme Eligibility:** Discover eligible Central and State scholarship schemes\n"
            "• **Grievance Support:** Direct contact channels and district nodal assistance"
        )
    elif any(k in q for k in ["status", "track", "milestone", "application", "where is", "progress"]):
        return (
            "**Scholarship Application Status**\n\n"
            "• **Application ID:** MP-2024-OBC-0208\n"
            "• **Scheme:** Post-Matric OBC Scholarship (Technical Degree)\n"
            "• **Current Stage:** Stage 4 (PFMS Batch Processing)\n"
            "• **Institute Verification:** Verified by Gyan Ganga College Of Technology\n"
            "• **District Sanction:** Approved & Sanction Order Generated\n"
            "• **Tranche 1 (₹ 22,500.00):** Credited to SBI Account (XXXX-XXXX-4109)\n"
            "• **Tranche 2 (₹ 22,500.00):** In PFMS transit to bank"
        )
    elif any(k in q for k in ["dbt", "payment", "money", "disburs", "credit", "account", "bank", "rupee", "amount"]):
        return (
            "**Direct Benefit Transfer (DBT) Breakdown**\n\n"
            "• **Total Sanctioned Amount:** ₹ 45,000.00\n"
            "• **Disbursed (Tranche 1):** ₹ 22,500.00 (Credited via DBT)\n"
            "• **Pending (Tranche 2):** ₹ 22,500.00 (PFMS Clearing in progress)\n"
            "• **Credited Account:** Aadhaar Seeded SBI A/C (XXXX-XXXX-4109)\n"
            "• **NPCI Linkage:** Active & Verified"
        )
    elif any(k in q for k in ["digilocker", "document", "cert", "caste", "income", "upload", "verify"]):
        return (
            "**DigiLocker Verified Credentials**\n\n"
            "• **OBC Caste Certificate:** #MP-OBC-2023-88912 (Verified - MP e-District)\n"
            "• **Income Certificate:** #MP-INC-2024-44102 for ₹ 1,80,000.00 (Verified)\n"
            "• **Academic Records:** Class 10 & 12 Digital Marksheets (Verified)\n"
            "• **Verification Mode:** 100% Paperless API authentication"
        )
    elif any(k in q for k in ["eligib", "scheme", "apply", "rule", "criteria", "other scheme"]):
        return (
            "**Scheme Eligibility Assessment**\n\n"
            "• **1. Post-Matric Scholarship for OBC Students (Technical)**\n"
            "  - Annual Grant: ₹ 45,000.00 | Status: Eligible & Active\n"
            "• **2. Central Sector Scheme of Scholarship (CSSS)**\n"
            "  - Annual Grant: ₹ 20,000.00 | Status: Eligible (Merit > 80%)\n"
            "• **3. ST National Fellowship**\n"
            "  - Status: Ineligible (Applicable exclusively to Scheduled Tribe candidates)"
        )
    elif any(k in q for k in ["college", "nodal", "institute", "ggct", "gyan ganga", "roll"]):
        return (
            "**Institutional Verification Record**\n\n"
            "• **Institution:** Gyan Ganga College Of Technology (GGCT), Jabalpur\n"
            "• **Roll Number:** 0208AD231011\n"
            "• **Verification Date:** 18 August 2024\n"
            "• **Nodal Officer Status:** Endorsed & Forwarded to District Welfare Office"
        )
    elif any(k in q for k in ["deadline", "date", "last date", "when"]):
        return (
            "**Important Scholarship Deadlines**\n\n"
            "• **Application Submission (Fresh & Renewal):** 15 November 2026\n"
            "• **Institutional Biometric e-KYC:** 30 November 2026\n"
            "• **District Sanction Cut-off:** 15 December 2026"
        )
    elif any(k in q for k in ["grievance", "complaint", "help", "contact", "officer", "phone", "email"]):
        return (
            "**Grievance & Support Desk**\n\n"
            "• **District Office:** Backward Classes & Minorities Welfare Office, Jabalpur\n"
            "• **National Helpline:** 1800-11-2026 (Mon-Sat, 9:00 AM - 6:00 PM)\n"
            "• **Institute Nodal:** Nodal Officer, GGCT Jabalpur\n"
            "• **Email Support:** scholarships-support@gov.in"
        )
    elif any(k in q for k in ["hi", "hello", "namaste", "hey"]):
        return (
            "**Namaste Anmol Soni!**\n\n"
            "I am **Eklavya**, your AI Scholarship Assistant. I can help you with application tracking, DBT payment progress, DigiLocker certificates, and scheme eligibility.\n\n"
            "How may I assist you today?"
        )
    else:
        return (
            f"**Query: {query}**\n\n"
            "• **Candidate:** Anmol Soni (Roll: 0208AD231011, OBC, GGCT Jabalpur)\n"
            "• **Active Scholarship:** Post-Matric OBC Technical Scholarship (₹ 45,000.00)\n"
            "• **Payment Status:** Tranche 1 (₹ 22,500.00) credited to SBI A/C XXXX-XXXX-4109; Tranche 2 in PFMS transit.\n\n"
            "Please ask me about your status, payments, documents, or deadlines for more specific details."
        )

def call_gemini_api(api_key, query):
    models = ["gemini-flash-latest", "gemini-2.5-flash", "gemini-pro-latest", "gemini-1.5-flash"]
    system_instruction = (
        "You are 'Eklavya', the official AI Scholarship Assistant for the Ministry of Tribal Affairs and Ministry of Social Justice, Government of India. "
        "User context: Candidate Anmol Soni, DOB 03/03/2005, Roll 0208AD231011, College Gyan Ganga College Of Technology (GGCT), Category OBC, Annual Income ₹ 1,80,000.00. "
        "Active Scholarship: Post-Matric Scholarship for OBC Students (Technical Courses). Grant: ₹ 45,000.00 total. Tranche 1 (₹ 22,500.00) disbursed to Aadhaar Seeded SBI Account XXXX-XXXX-4109. Tranche 2 in PFMS processing. "
        "Formatting instructions: Always structure your responses with crisp headings and clear bullet points (•). Highlight key amounts, IDs, and statuses in bold. Keep the tone official, polite, and concise."
    )
    payload = {
        "contents": [
            {
                "parts": [
                    {"text": f"{system_instruction}\n\nStudent Query: {query}"}
                ]
            }
        ]
    }
    data_bytes = json.dumps(payload).encode("utf-8")
    for model in models:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"
        try:
            req = urllib.request.Request(
                url,
                data=data_bytes,
                headers={"Content-Type": "application/json"}
            )
            with urllib.request.urlopen(req, timeout=12) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                candidates = data.get("candidates", [])
                if candidates:
                    parts = candidates[0].get("content", {}).get("parts", [])
                    if parts:
                        return parts[0].get("text", "")
        except Exception:
            continue
    return generate_local_response(query)

def call_openai_api(api_key, query):
    url = "https://api.openai.com/v1/chat/completions"
    system_instruction = (
        "You are 'Eklavya', the official AI Scholarship Assistant for the Ministry of Tribal Affairs and Ministry of Social Justice, Government of India. "
        "User context: Candidate Anmol Soni, DOB 03/03/2005, Roll 0208AD231011, College Gyan Ganga College Of Technology (GGCT), Category OBC, Annual Income ₹ 1,80,000.00. "
        "Active Scholarship: Post-Matric Scholarship for OBC Students (Technical Courses). Grant: ₹ 45,000.00 total. Tranche 1 (₹ 22,500.00) disbursed to Aadhaar Seeded SBI Account XXXX-XXXX-4109. Tranche 2 in PFMS processing. "
        "Formatting instructions: Always structure your responses with crisp headings and clear bullet points (•). Highlight key amounts, IDs, and statuses in bold. Keep the tone official, polite, and concise."
    )
    payload = {
        "model": "gpt-4o-mini",
        "messages": [
            {"role": "system", "content": system_instruction},
            {"role": "user", "content": query}
        ]
    }
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}"
        }
    )
    with urllib.request.urlopen(req, timeout=10) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        return data["choices"][0]["message"]["content"]

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_POST(self):
        if self.path == "/api/chat":
            content_length = int(self.headers.get("Content-Length", 0))
            post_data = self.rfile.read(content_length)
            try:
                body = json.loads(post_data.decode("utf-8"))
                query = body.get("message", "").strip()
            except Exception:
                query = ""

            load_env()
            gemini_key = os.environ.get("GEMINI_API_KEY", "").strip()
            openai_key = os.environ.get("OPENAI_API_KEY", "").strip()

            reply = None
            if gemini_key and gemini_key != "your_gemini_api_key_here":
                try:
                    reply = call_gemini_api(gemini_key, query)
                except Exception:
                    reply = None

            if not reply and openai_key and openai_key != "your_openai_api_key_here":
                try:
                    reply = call_openai_api(openai_key, query)
                except Exception:
                    reply = None

            if not reply:
                reply = generate_local_response(query)

            res_bytes = json.dumps({"reply": reply, "success": True}).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(res_bytes)))
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(res_bytes)
        else:
            self.send_error(404, "Endpoint not found")

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

if __name__ == '__main__':
    os.chdir(DIRECTORY)
    socketserver.TCPServer.allow_reuse_address = True
    print(f"Serving Eklavya Portal on port {PORT} -> http://localhost:{PORT}")
    with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass
