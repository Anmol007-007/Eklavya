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
    if any(k in q for k in ["status", "track", "milestone", "application", "where is", "progress"]):
        return "Application #MP-2024-OBC-0208 for Post-Matric OBC Scholarship is currently at Stage 4 (PFMS Batch Processing). College verification and District Welfare sanction are completed. Tranche 1 (₹ 22,500.00) is credited; Tranche 2 (₹ 22,500.00) is in transit."
    elif any(k in q for k in ["dbt", "payment", "money", "disburs", "credit", "account", "bank", "rupee", "amount"]):
        return "Total sanctioned scholarship grant is ₹ 45,000.00. Tranche 1 of ₹ 22,500.00 was disbursed directly to your Aadhaar Seeded SBI Account (XXXX-XXXX-4109) via DBT. Tranche 2 is approved and awaiting final bank clearance via PFMS."
    elif any(k in q for k in ["digilocker", "document", "cert", "caste", "income", "upload", "verify"]):
        return "Your DigiLocker link is active. OBC Caste Certificate (#MP-OBC-2023-88912) and Income Certificate (#MP-INC-2024-44102 for ₹ 1,80,000.00) have been digitally verified directly from Madhya Pradesh State e-District repository."
    elif any(k in q for k in ["eligib", "scheme", "apply", "rule", "criteria", "other scheme"]):
        return "Based on your verified profile (OBC Category, Annual Family Income ₹ 1,80,000.00, GGCT Jabalpur), you are fully eligible for: 1) Post-Matric Scholarship for OBC Students (Technical Courses - ₹ 45,000.00/yr), and 2) Central Sector Scheme of Scholarship (CSSS - ₹ 20,000.00/yr). You are ineligible for ST National Fellowship."
    elif any(k in q for k in ["college", "nodal", "institute", "ggct", "gyan ganga", "roll"]):
        return "Your profile is registered with Gyan Ganga College Of Technology (GGCT), Jabalpur under Roll Number 0208AD231011. Your verification was endorsed by the Institute Nodal Officer on 18 August 2024."
    elif any(k in q for k in ["deadline", "date", "last date", "when"]):
        return "The deadline for Post-Matric OBC Scholarship fresh and renewal submissions for Academic Year 2024-25 is 15 November 2026. Institutional biometric KYC must be completed before 30 November 2026."
    elif any(k in q for k in ["grievance", "complaint", "help", "contact", "officer", "phone", "email"]):
        return "For official assistance or grievance escalation, contact the District Backward Classes & Minorities Welfare Office, Jabalpur, or call the National Scholarship Toll-Free Helpline at 1800-11-2026 (Mon-Sat, 9:00 AM - 6:00 PM)."
    elif any(k in q for k in ["hi", "hello", "namaste", "hey"]):
        return "Namaste Anmol Soni! I am the Eklavya Citizen Helpdesk Assistant. You can ask me about your scholarship status, DBT payment progress, DigiLocker certificates, eligibility rules, or deadlines."
    else:
        return f"Regarding your query on '{query}': Your verified candidate record (Anmol Soni, Roll 0208AD231011, OBC, GGCT) is mapped to the Post-Matric OBC Technical Scholarship. Your Aadhaar seeded SBI account (XXXX-XXXX-4109) has received ₹ 22,500.00 with the remaining grant in PFMS transit. How else may I assist you?"

def call_gemini_api(api_key, query):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
    system_instruction = (
        "You are the official Eklavya Citizen Helpdesk Assistant for the Ministry of Tribal Affairs and Ministry of Social Justice, Government of India. "
        "User context: Candidate Anmol Soni, DOB 03/03/2005, Roll 0208AD231011, College Gyan Ganga College Of Technology (GGCT), Category OBC, Annual Income ₹ 1,80,000.00. "
        "Active Scholarship: Post-Matric Scholarship for OBC Students (Technical Courses). Grant: ₹ 45,000.00 total. Tranche 1 (₹ 22,500.00) disbursed to Aadhaar Seeded SBI Account XXXX-XXXX-4109. Tranche 2 in PFMS processing. "
        "Answer questions politely, accurately, concisely, in official sovereign tone. Answer in English or Hindi as requested."
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
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req, timeout=10) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        candidates = data.get("candidates", [])
        if candidates:
            parts = candidates[0].get("content", {}).get("parts", [])
            if parts:
                return parts[0].get("text", "")
    return generate_local_response(query)

def call_openai_api(api_key, query):
    url = "https://api.openai.com/v1/chat/completions"
    system_instruction = (
        "You are the official Eklavya Citizen Helpdesk Assistant for the Ministry of Tribal Affairs and Ministry of Social Justice, Government of India. "
        "User context: Candidate Anmol Soni, DOB 03/03/2005, Roll 0208AD231011, College Gyan Ganga College Of Technology (GGCT), Category OBC, Annual Income ₹ 1,80,000.00. "
        "Active Scholarship: Post-Matric Scholarship for OBC Students (Technical Courses). Grant: ₹ 45,000.00 total. Tranche 1 (₹ 22,500.00) disbursed to Aadhaar Seeded SBI Account XXXX-XXXX-4109. Tranche 2 in PFMS processing."
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
    with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
        httpd.serve_forever()
