export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  let query = '';
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    query = (body && body.message ? body.message : '').trim();
  } catch (e) {
    query = '';
  }

  const geminiKey = (process.env.GEMINI_API_KEY || '').trim();
  const openaiKey = (process.env.OPENAI_API_KEY || '').trim();

  let reply = null;

  if (geminiKey && geminiKey !== 'your_gemini_api_key_here') {
    reply = await callGemini(geminiKey, query);
  }

  if (!reply && openaiKey && openaiKey !== 'your_openai_api_key_here') {
    reply = await callOpenAI(openaiKey, query);
  }

  if (!reply) {
    reply = generateLocalResponse(query);
  }

  res.status(200).json({ reply, success: true });
}

async function callGemini(apiKey, query) {
  const models = ['gemini-1.5-flash', 'gemini-flash-latest', 'gemini-pro-latest', 'gemini-2.0-flash'];
  const systemInstruction = 
    "You are 'Eklavya', the official AI Scholarship Assistant for the Ministry of Tribal Affairs and Ministry of Social Justice, Government of India. " +
    "User context: Candidate Anmol Soni, DOB 03/03/2005, Roll 0208AD231011, College Gyan Ganga College Of Technology (GGCT), Category OBC, Annual Income ₹ 1,80,000.00. " +
    "Active Scholarship: Post-Matric Scholarship for OBC Students (Technical Courses). Grant: ₹ 45,000.00 total. Tranche 1 (₹ 22,500.00) disbursed to Aadhaar Seeded SBI Account XXXX-XXXX-4109. Tranche 2 in PFMS processing. " +
    "Formatting instructions: Always structure your responses with crisp headings and clear bullet points (•). Highlight key amounts, IDs, and statuses in bold. Keep the tone official, polite, and concise.";

  const payload = {
    contents: [
      {
        parts: [
          { text: `${systemInstruction}\n\nStudent Query: ${query}` }
        ]
      }
    ]
  };

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text && text.trim()) {
          return text.trim();
        }
      }
    } catch (err) {
      continue;
    }
  }
  return null;
}

async function callOpenAI(apiKey, query) {
  const systemInstruction = 
    "You are 'Eklavya', the official AI Scholarship Assistant for the Ministry of Tribal Affairs and Ministry of Social Justice, Government of India. " +
    "User context: Candidate Anmol Soni, DOB 03/03/2005, Roll 0208AD231011, College Gyan Ganga College Of Technology (GGCT), Category OBC, Annual Income ₹ 1,80,000.00. " +
    "Active Scholarship: Post-Matric Scholarship for OBC Students (Technical Courses). Grant: ₹ 45,000.00 total. Tranche 1 (₹ 22,500.00) disbursed to Aadhaar Seeded SBI Account XXXX-XXXX-4109. Tranche 2 in PFMS processing. " +
    "Formatting instructions: Always structure your responses with crisp headings and clear bullet points (•). Highlight key amounts, IDs, and statuses in bold. Keep the tone official, polite, and concise.";

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemInstruction },
          { role: 'user', content: query }
        ]
      })
    });
    if (response.ok) {
      const data = await response.json();
      return data?.choices?.[0]?.message?.content || null;
    }
  } catch (e) {
    return null;
  }
  return null;
}

function generateLocalResponse(query) {
  const q = (query || '').toLowerCase();
  if (q.includes('what can you do') || q.includes('feature') || q.includes('capability') || q.includes('capabilities') || q.includes('help me with') || q.includes('who are you')) {
    return (
      "**Namaste Anmol! I am Eklavya, your AI Scholarship Assistant.**\n\n" +
      "Here is how I can assist you:\n" +
      "• **Application Tracking:** Check real-time progress for Application #MP-2024-OBC-0208\n" +
      "• **DBT & PFMS Disbursals:** Track direct bank transfers and tranche milestones\n" +
      "• **DigiLocker Verification:** Verify caste and income certificates via state e-District\n" +
      "• **Scheme Eligibility:** Discover eligible Central and State scholarship schemes\n" +
      "• **Grievance Support:** Direct contact channels and district nodal assistance"
    );
  }
  if (q.includes('status') || q.includes('track') || q.includes('where') || q.includes('progress')) {
    return (
      "**Scholarship Application Status**\n\n" +
      "• **Application ID:** MP-2024-OBC-0208\n" +
      "• **Scheme:** Post-Matric OBC Scholarship (Technical Degree)\n" +
      "• **Current Stage:** Stage 4 (PFMS Batch Processing)\n" +
      "• **Institute Verification:** Verified by Gyan Ganga College Of Technology\n" +
      "• **District Sanction:** Approved & Sanction Order Generated\n" +
      "• **Tranche 1 (₹ 22,500.00):** Credited to SBI Account (XXXX-XXXX-4109)\n" +
      "• **Tranche 2 (₹ 22,500.00):** In PFMS transit to bank"
    );
  }
  if (q.includes('dbt') || q.includes('payment') || q.includes('money') || q.includes('disburs') || q.includes('credit') || q.includes('bank')) {
    return (
      "**Direct Benefit Transfer (DBT) Breakdown**\n\n" +
      "• **Total Sanctioned Amount:** ₹ 45,000.00\n" +
      "• **Disbursed (Tranche 1):** ₹ 22,500.00 (Credited via DBT)\n" +
      "• **Pending (Tranche 2):** ₹ 22,500.00 (PFMS Clearing in progress)\n" +
      "• **Credited Account:** Aadhaar Seeded SBI A/C (XXXX-XXXX-4109)\n" +
      "• **NPCI Linkage:** Active & Verified"
    );
  }
  if (q.includes('digilocker') || q.includes('document') || q.includes('cert') || q.includes('caste') || q.includes('income')) {
    return (
      "**DigiLocker Verified Credentials**\n\n" +
      "• **OBC Caste Certificate:** #MP-OBC-2023-88912 (Verified - MP e-District)\n" +
      "• **Income Certificate:** #MP-INC-2024-44102 for ₹ 1,80,000.00 (Verified)\n" +
      "• **Academic Records:** Class 10 & 12 Digital Marksheets (Verified)\n" +
      "• **Verification Mode:** 100% Paperless API authentication"
    );
  }
  if (q.includes('eligib') || q.includes('scheme') || q.includes('criteria') || q.includes('rule')) {
    return (
      "**Scheme Eligibility Assessment**\n\n" +
      "• **1. Post-Matric Scholarship for OBC Students (Technical)**\n" +
      "  - Annual Grant: ₹ 45,000.00 | Status: Eligible & Active\n" +
      "• **2. Central Sector Scheme of Scholarship (CSSS)**\n" +
      "  - Annual Grant: ₹ 20,000.00 | Status: Eligible (Merit > 80%)\n" +
      "• **3. ST National Fellowship**\n" +
      "  - Status: Ineligible (Applicable exclusively to Scheduled Tribe candidates)"
    );
  }
  if (q.includes('college') || q.includes('nodal') || q.includes('institute') || q.includes('ggct') || q.includes('roll')) {
    return (
      "**Institutional Verification Record**\n\n" +
      "• **Institution:** Gyan Ganga College Of Technology (GGCT), Jabalpur\n" +
      "• **Roll Number:** 0208AD231011\n" +
      "• **Verification Date:** 18 August 2024\n" +
      "• **Nodal Officer Status:** Endorsed & Forwarded to District Welfare Office"
    );
  }
  if (q.includes('date') || q.includes('last date') || q.includes('deadline')) {
    return (
      "**Important Scholarship Deadlines**\n\n" +
      "• **Application Submission (Fresh & Renewal):** 15 November 2026\n" +
      "• **Institutional Biometric e-KYC:** 30 November 2026\n" +
      "• **District Sanction Cut-off:** 15 December 2026"
    );
  }
  if (q.includes('grievance') || q.includes('complaint') || q.includes('help') || q.includes('contact') || q.includes('phone')) {
    return (
      "**Grievance & Support Desk**\n\n" +
      "• **District Office:** Backward Classes & Minorities Welfare Office, Jabalpur\n" +
      "• **National Helpline:** 1800-11-2026 (Mon-Sat, 9:00 AM - 6:00 PM)\n" +
      "• **Institute Nodal:** Nodal Officer, GGCT Jabalpur\n" +
      "• **Email Support:** scholarships-support@gov.in"
    );
  }
  if (q.includes('hi') || q.includes('hello') || q.includes('namaste')) {
    return (
      "**Namaste Anmol Soni!**\n\n" +
      "I am **Eklavya**, your AI Scholarship Assistant. I can help you with application tracking, DBT payment progress, DigiLocker certificates, and scheme eligibility.\n\n" +
      "How may I assist you today?"
    );
  }
  return (
    `**Query: ${query}**\n\n` +
    "• **Candidate:** Anmol Soni (Roll: 0208AD231011, OBC, GGCT Jabalpur)\n" +
    "• **Active Scholarship:** Post-Matric OBC Technical Scholarship (₹ 45,000.00)\n" +
    "• **Payment Status:** Tranche 1 (₹ 22,500.00) credited to SBI A/C XXXX-XXXX-4109; Tranche 2 in PFMS transit.\n\n" +
    "Please ask me about your status, payments, documents, or deadlines for more specific details."
  );
}
