const studentProfile = {
  name: "Anmol Soni",
  dob: "03/03/2005",
  college: "Gyan Ganga College Of Technology",
  caste: "OBC",
  rollNo: "0208AD231011",
  income: "₹ 1,80,000.00",
  phone: "+91 98260 12345",
  email: "aids23.anmolsoni@ggct.co.in",
  bankName: "State Bank of India",
  bankAccount: "Aadhaar Seeded Account (XXXX-XXXX-4109)",
  dbtActive: true
};

const appState = {
  currentLanguage: 'hi',
  currentPage: 'page-dashboard',
  isChatOpen: false,
  isSideMenuOpen: false,
  isProfileMenuOpen: false,
  isHighContrast: false,
  fontSize: 'normal'
};

const i18n = {
  en: {
    langName: "English",
    govTitle: "भारत सरकार | GOI",
    ministry: "Ministry of Tribal Affairs & Social Welfare",
    portalTitle: "Eklavya Portal",
    portalSubtitle: "National Unified Scholarship Portal",
    deptTitle: "Ministry of Tribal Affairs, Government of India",
    welcomePrefix: "Welcome,",
    runningTitle: "Post-Matric Scholarship for OBC Students (Technical Degree Courses)",
    navDash: "Dashboard",
    navSchemes: "Schemes & Eligibility",
    navApply: "Apply Application",
    navDocs: "DigiLocker Services",
    navProfile: "My Profile",
    helpdeskBtn: "Ask Eklavya",
    helpdeskHeader: "Ask Eklavya"
  },
  hi: {
    langName: "हिन्दी",
    govTitle: "भारत सरकार | GOI",
    ministry: "जनजातीय कार्य एवं सामाजिक कल्याण मंत्रालय",
    portalTitle: "एकलव्य पोर्टल",
    portalSubtitle: "राष्ट्रीय एकीकृत छात्रवृत्ति मंच",
    deptTitle: "जनजातीय कार्य मंत्रालय, भारत सरकार",
    welcomePrefix: "स्वागत है,",
    runningTitle: "अन्य पिछड़ा वर्ग (OBC) पोस्ट-मैट्रिक छात्रवृत्ति (तकनीकी डिग्री)",
    navDash: "डैशबोर्ड",
    navSchemes: "छात्रवृत्ति योजनाएं",
    navApply: "आवेदन पत्र",
    navDocs: "डिजिलॉकर सेवाएं",
    navProfile: "मेरी प्रोफाइल",
    helpdeskBtn: "एकलव्य से पूछें",
    helpdeskHeader: "एकलव्य से पूछें"
  },
  sat: {
    langName: "ᱥᱟᱱᱛᱟᱲᱤ",
    govTitle: "ᱥᱤᱧᱚᱛ ᱥᱚᱨᱠᱟᱨ | GOI",
    ministry: "ᱟᱹᱫᱤᱵᱟᱹᱥᱤ ᱟᱨ ᱥᱟᱶᱛᱟ ᱵᱷᱟᱹᱞᱟᱹᱭ ᱢᱚᱱᱛᱨᱟᱲᱚᱭ",
    portalTitle: "ᱮᱠᱞᱟᱵᱽᱭᱚ ᱯᱳᱨᱴᱟᱞ",
    portalSubtitle: "ᱡᱟᱹᱛᱤᱭᱟᱹᱨᱤ ᱥᱠᱚᱞᱟᱨᱥᱤᱯ ᱯᱳᱨᱴᱟᱞ",
    deptTitle: "ᱟᱹᱫᱤᱵᱟᱹᱥᱤ ᱢᱚᱱᱛᱨᱟᱲᱚᱭ, ᱥᱤᱧᱚᱛ ᱥᱚᱨᱠᱟᱨ",
    welcomePrefix: "ᱡᱚᱦᱟᱨ,",
    runningTitle: "OBC ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱞᱟᱹᱜᱤᱫ ᱯᱳᱥᱴ-ᱢᱮᱴᱨᱤᱠ ᱥᱠᱚᱞᱟᱨᱥᱤᱯ",
    navDash: "ᱰᱮᱥᱵᱳᱨᱰ",
    navSchemes: "ᱡᱚᱡᱚᱱᱟ",
    navApply: "ᱫᱚᱨᱠᱷᱟᱥᱛ",
    navDocs: "ᱰᱤᱡᱤᱞᱚᱠᱟᱨ",
    navProfile: "ᱯᱨᱳᱯᱷᱟᱭᱤᱞ",
    helpdeskBtn: "ᱮᱠᱞᱟᱵᱽᱭᱚ ᱠᱩᱞᱤᱭᱮᱢ",
    helpdeskHeader: "ᱮᱠᱞᱟᱵᱽᱭᱚ ᱠᱩᱞᱤᱭᱮᱢ"
  },
  gon: {
    langName: "गोंडी",
    govTitle: "भारत सरकार | GOI",
    ministry: "जनजातीय कार्य मंत्रालय",
    portalTitle: "एकलव्य पोर्टल",
    portalSubtitle: "राष्ट्रीय छात्रवृत्ति पोर्टल",
    deptTitle: "जनजातीय कार्य मंत्रालय, भारत सरकार",
    welcomePrefix: "सेवा जोहार,",
    runningTitle: "OBC छात्रन बर पोस्ट-मैट्रिक छात्रवृत्ति",
    navDash: "डैशबोर्ड",
    navSchemes: "योजनाएं",
    navApply: "आवेदन",
    navDocs: "डिजिलॉकर",
    navProfile: "प्रोफाइल",
    helpdeskBtn: "एकलव्य से पूछें",
    helpdeskHeader: "एकलव्य से पूछें"
  },
  od: {
    langName: "ଓଡ଼ିଆ",
    govTitle: "ଭାରତ ସରକାର | GOI",
    ministry: "ଜନଜାତି ଓ ସାମାଜିକ କଲ୍ୟାଣ ମନ୍ତ୍ରଣାଳୟ",
    portalTitle: "ଏକଲବ୍ୟ ପୋର୍ଟାଲ",
    portalSubtitle: "ଜାତୀୟ ଛାତ୍ରବୃତ୍ତି ପୋର୍ଟାଲ",
    deptTitle: "ଜନଜାତି ମନ୍ତ୍ରଣାଳୟ, ଭାରତ ସରକାର",
    welcomePrefix: "ସ୍ୱାଗତ,",
    runningTitle: "OBC ଛାତ୍ରଛାତ୍ରୀଙ୍କ ପାଇଁ ପୋଷ୍ଟ-ମେଟ୍ରିକ ଛାତ୍ରବୃତ୍ତି",
    navDash: "ଡ୍ୟାସବୋର୍ଡ",
    navSchemes: "ଯୋଜନା",
    navApply: "ଆବେଦନ",
    navDocs: "ଡିଜିଲକର",
    navProfile: "ପ୍ରୋଫାଇଲ",
    helpdeskBtn: "ଏକଲବ୍ୟଙ୍କୁ ପଚାରନ୍ତୁ",
    helpdeskHeader: "ଏକଲବ୍ୟଙ୍କୁ ପଚାରନ୍ତୁ"
  },
  bn: {
    langName: "বাংলা",
    govTitle: "ভারত সরকার | GOI",
    ministry: "উপজাতি ও সামাজিক কল্যাণ মন্ত্রক",
    portalTitle: "একক্লব্য পোর্টাল",
    portalSubtitle: "জাতীয় ঐক্যবদ্ধ স্কলারশিপ পোর্টাল",
    deptTitle: "উপজাতি কল্যাণ মন্ত্রক, ভারত সরকার",
    welcomePrefix: "স্বাগতম,",
    runningTitle: "ওবিসি শিক্ষার্থীদের পোস্ট-ম্যাট্রিক স্কলারশিপ",
    navDash: "ড্যাশবোর্ড",
    navSchemes: "প্রকল্প",
    navApply: "আবেদন",
    navDocs: "ডিজিলকার",
    navProfile: "প্রোফাইল",
    helpdeskBtn: "একক্লব্যকে জিজ্ঞাসা করুন",
    helpdeskHeader: "একক্লব্যকে জিজ্ঞাসা করুন"
  }
};

document.addEventListener('DOMContentLoaded', () => {
  renderProfileData();
  setLanguage('hi');

  document.addEventListener('click', (e) => {
    const profileDropdown = document.getElementById('profileDropdown');
    const profileBtn = document.getElementById('userProfileDropdownBtn');
    if (profileDropdown && profileBtn && !profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
      profileDropdown.classList.add('hidden');
      appState.isProfileMenuOpen = false;
    }

    const langDropdown = document.getElementById('langDropdown');
    const langBtn = document.getElementById('btnLangSelect');
    if (langDropdown && langBtn && !langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
      langDropdown.classList.add('hidden');
    }
  });
});

function setFontSize(size) {
  appState.fontSize = size;
  const root = document.documentElement;
  if (size === 'small') {
    root.style.fontSize = '13px';
  } else if (size === 'large') {
    root.style.fontSize = '17px';
  } else {
    root.style.fontSize = '15px';
  }
}

function toggleHighContrast() {
  appState.isHighContrast = !appState.isHighContrast;
  document.body.classList.toggle('high-contrast', appState.isHighContrast);
  showToast(appState.isHighContrast ? "High Contrast Mode Enabled" : "Standard Contrast Restored");
}

function alertScreenReaderInfo() {
  alert("Screen Reader Access:\nThis portal is built adhering to GIGW 3.0 & WCAG 2.2 AAA guidelines. It is fully compatible with NVDA, JAWS, and Android TalkBack.");
}

function toggleProfileDropdown(e) {
  if (e) e.stopPropagation();
  const dropdown = document.getElementById('profileDropdown');
  appState.isProfileMenuOpen = !appState.isProfileMenuOpen;
  if (appState.isProfileMenuOpen) {
    dropdown.classList.remove('hidden');
  } else {
    dropdown.classList.add('hidden');
  }
}

function toggleSideMenu() {
  const drawer = document.getElementById('sideNavDrawer');
  const overlay = document.getElementById('sideNavOverlay');
  appState.isSideMenuOpen = !appState.isSideMenuOpen;

  if (appState.isSideMenuOpen) {
    drawer.classList.remove('-translate-x-full');
    overlay.classList.remove('hidden');
  } else {
    drawer.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
  }
}

function navigateToPage(pageId) {
  appState.currentPage = pageId;

  document.querySelectorAll('.page-view').forEach(page => {
    page.classList.remove('active');
  });
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const topNavMap = {
    'page-dashboard': 'topNavDashboard',
    'page-schemes': 'topNavSchemes',
    'page-apply': 'topNavApply',
    'page-digilocker': 'topNavDocs',
    'page-profile': 'topNavProfile'
  };

  ['topNavDashboard', 'topNavSchemes', 'topNavApply', 'topNavDocs', 'topNavProfile'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      if (id === topNavMap[pageId]) {
        btn.className = "px-3.5 py-2 text-xs font-bold text-white bg-slate-900 border-b-2 border-[#ff9933] flex items-center gap-1.5 transition";
      } else {
        btn.className = "px-3.5 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/10 flex items-center gap-1.5 transition";
      }
    }
  });

  const bottomNavMap = {
    'page-dashboard': 'navBtnDashboard',
    'page-schemes': 'navBtnSchemes',
    'page-digilocker': 'navBtnDocs',
    'page-profile': 'navBtnProfile'
  };

  ['navBtnDashboard', 'navBtnSchemes', 'navBtnDocs', 'navBtnProfile'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      if (id === bottomNavMap[pageId]) {
        btn.className = "flex flex-col items-center justify-center text-[#c2410c] px-3 py-1 font-bold text-xs";
      } else {
        btn.className = "flex flex-col items-center justify-center text-slate-500 hover:text-slate-800 px-3 py-1 text-xs font-medium";
      }
    }
  });
}

function toggleLanguageMenu(e) {
  if (e) e.stopPropagation();
  const dropdown = document.getElementById('langDropdown');
  dropdown.classList.toggle('hidden');
}

function setLanguage(langCode) {
  if (!i18n[langCode]) return;
  appState.currentLanguage = langCode;
  const dict = i18n[langCode];

  const label = document.getElementById('currentLangLabel');
  if (label) label.textContent = dict.langName;

  const textMappings = {
    'lblGovStripGov': dict.govTitle,
    'lblGovStripMinistry': dict.ministry,
    'lblPortalTitle': dict.portalTitle,
    'lblPortalSubtitle': dict.portalSubtitle,
    'lblPortalDept': dict.deptTitle,
    'lblWelcomePrefix': dict.welcomePrefix,
    'lblRunningScholarshipTitle': dict.runningTitle,
    'topNavDashboard': dict.navDash,
    'topNavSchemes': dict.navSchemes,
    'topNavApply': dict.navApply,
    'topNavDocs': dict.navDocs,
    'helpdeskBtnText': dict.helpdeskBtn,
    'helpdeskModalTitle': dict.helpdeskHeader
  };

  for (const [elemId, text] of Object.entries(textMappings)) {
    const elem = document.getElementById(elemId);
    if (elem) elem.textContent = text;
  }

  const dropdown = document.getElementById('langDropdown');
  if (dropdown) dropdown.classList.add('hidden');
  showToast(`Language set to ${dict.langName}`);
}

function renderProfileData() {
  const fields = {
    'topBarStudentName': studentProfile.name,
    'drawerStudentName': studentProfile.name,
    'drawerStudentRoll': studentProfile.rollNo,
    'dashStudentName': studentProfile.name,
    'dashCollegeName': studentProfile.college,
    'dashRollNo': `Roll: ${studentProfile.rollNo} • Category: ${studentProfile.caste}`,
    'eligStudentName': studentProfile.name,
    'eligCaste': `${studentProfile.caste} (Other Backward Classes)`,
    'eligCollege': studentProfile.college,
    'eligIncome': `${studentProfile.income} / year`,
    'profileFullName': studentProfile.name,
    'profileCollege': studentProfile.college,
    'profileRoll': studentProfile.rollNo,
    'profileDob': studentProfile.dob,
    'profileCaste': studentProfile.caste,
    'profileIncome': studentProfile.income,
    'profilePhone': studentProfile.phone,
    'profileEmail': studentProfile.email,
    'profileBankAcc': studentProfile.bankAccount,
    'formInputName': studentProfile.name,
    'formInputDob': studentProfile.dob,
    'formInputCaste': studentProfile.caste,
    'formInputCollege': studentProfile.college,
    'formInputRoll': studentProfile.rollNo,
    'formInputIncome': studentProfile.income,
    'editName': studentProfile.name,
    'editDob': studentProfile.dob,
    'editCollege': studentProfile.college,
    'editRoll': studentProfile.rollNo,
    'editIncome': studentProfile.income,
    'editPhone': studentProfile.phone,
    'editEmail': studentProfile.email
  };

  for (const [id, val] of Object.entries(fields)) {
    const el = document.getElementById(id);
    if (el) {
      if (el.tagName === 'INPUT') {
        el.value = val;
      } else {
        el.textContent = val;
      }
    }
  }
}

function saveProfile(event) {
  event.preventDefault();
  studentProfile.name = document.getElementById('editName').value;
  studentProfile.dob = document.getElementById('editDob').value;
  studentProfile.college = document.getElementById('editCollege').value;
  studentProfile.rollNo = document.getElementById('editRoll').value;
  studentProfile.income = document.getElementById('editIncome').value;
  studentProfile.phone = document.getElementById('editPhone').value;
  studentProfile.email = document.getElementById('editEmail').value;

  renderProfileData();
  showToast("Profile credentials updated successfully.");
  navigateToPage('page-dashboard');
}

function syncDigiLocker() {
  const btn = document.getElementById('btnSyncDigilocker');
  if (btn) {
    btn.innerHTML = `<span class="material-symbols-outlined text-[16px] animate-spin">refresh</span><span>Connecting DigiLocker Gateway...</span>`;
    btn.disabled = true;
  }

  setTimeout(() => {
    if (btn) {
      btn.innerHTML = `<span class="material-symbols-outlined text-[16px]">check_circle</span><span>Certificates Synced & Verified</span>`;
      btn.className = "bg-[#138808] text-white px-3.5 py-1.5 rounded text-xs font-bold flex items-center space-x-1.5";
    }

    const docItems = document.querySelectorAll('.digilocker-doc-status');
    docItems.forEach(el => {
      el.innerHTML = `<span class="inline-flex items-center gap-1 text-[#138808] font-bold text-xs"><span class="material-symbols-outlined text-[15px]">verified</span>Verified (DigiLocker)</span>`;
    });

    showToast("DigiLocker OBC Caste & Income certificates verified with State e-District repository.");
  }, 1200);
}

function submitApplicationForm() {
  showToast("Application submitted successfully. Reference: #EKL-2026-020811");
  setTimeout(() => {
    navigateToPage('page-dashboard');
  }, 1000);
}

function showEligibilityDetails(schemeName) {
  alert(`Eligibility Verified for ${schemeName}:\n• Category: OBC (Passed)\n• Institution: Recognized Institute (Passed)\n• Family Income Limit: < ₹2,50,000 (Passed)\n• Direct Benefit Transfer: Bank Account Seeded (Passed)`);
}

function toggleSahayakChat() {
  const modal = document.getElementById('sahayakChatModal');
  appState.isChatOpen = !appState.isChatOpen;
  if (appState.isChatOpen) {
    modal.classList.remove('hidden');
    document.getElementById('chatInputText').focus();
  } else {
    modal.classList.add('hidden');
  }
}

function formatBotResponse(text) {
  if (!text) return "";
  let clean = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  clean = clean.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>');
  
  const lines = clean.split('\n');
  const formattedLines = lines.map(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*')) {
      const content = trimmed.substring(1).trim();
      return `<div class="flex items-start space-x-1.5 my-1 ml-1"><span class="text-[#c2410c] font-bold select-none">•</span><span>${content}</span></div>`;
    }
    if (trimmed === '') {
      return '<div class="h-1.5"></div>';
    }
    return `<div>${trimmed}</div>`;
  });

  return formattedLines.join('');
}

function generateLocalChatAnswer(query) {
  const q = query.toLowerCase();
  if (q.includes("what can you do") || q.includes("feature") || q.includes("capability") || q.includes("capabilities") || q.includes("help me with") || q.includes("who are you")) {
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
  if (q.includes("status") || q.includes("track") || q.includes("where") || q.includes("progress")) {
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
  if (q.includes("dbt") || q.includes("payment") || q.includes("money") || q.includes("disburs") || q.includes("credit") || q.includes("bank")) {
    return (
      "**Direct Benefit Transfer (DBT) Breakdown**\n\n" +
      "• **Total Sanctioned Amount:** ₹ 45,000.00\n" +
      "• **Disbursed (Tranche 1):** ₹ 22,500.00 (Credited via DBT)\n" +
      "• **Pending (Tranche 2):** ₹ 22,500.00 (PFMS Clearing in progress)\n" +
      "• **Credited Account:** Aadhaar Seeded SBI A/C (XXXX-XXXX-4109)\n" +
      "• **NPCI Linkage:** Active & Verified"
    );
  }
  if (q.includes("digilocker") || q.includes("document") || q.includes("cert") || q.includes("caste") || q.includes("income")) {
    return (
      "**DigiLocker Verified Credentials**\n\n" +
      "• **OBC Caste Certificate:** #MP-OBC-2023-88912 (Verified - MP e-District)\n" +
      "• **Income Certificate:** #MP-INC-2024-44102 for ₹ 1,80,000.00 (Verified)\n" +
      "• **Academic Records:** Class 10 & 12 Digital Marksheets (Verified)\n" +
      "• **Verification Mode:** 100% Paperless API authentication"
    );
  }
  if (q.includes("eligib") || q.includes("scheme") || q.includes("criteria") || q.includes("rule")) {
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
  if (q.includes("college") || q.includes("nodal") || q.includes("institute") || q.includes("ggct") || q.includes("roll")) {
    return (
      "**Institutional Verification Record**\n\n" +
      "• **Institution:** Gyan Ganga College Of Technology (GGCT), Jabalpur\n" +
      "• **Roll Number:** 0208AD231011\n" +
      "• **Verification Date:** 18 August 2024\n" +
      "• **Nodal Officer Status:** Endorsed & Forwarded to District Welfare Office"
    );
  }
  if (q.includes("date") || q.includes("last date") || q.includes("deadline")) {
    return (
      "**Important Scholarship Deadlines**\n\n" +
      "• **Application Submission (Fresh & Renewal):** 15 November 2026\n" +
      "• **Institutional Biometric e-KYC:** 30 November 2026\n" +
      "• **District Sanction Cut-off:** 15 December 2026"
    );
  }
  if (q.includes("grievance") || q.includes("complaint") || q.includes("help") || q.includes("contact") || q.includes("phone")) {
    return (
      "**Grievance & Support Desk**\n\n" +
      "• **District Office:** Backward Classes & Minorities Welfare Office, Jabalpur\n" +
      "• **National Helpline:** 1800-11-2026 (Mon-Sat, 9:00 AM - 6:00 PM)\n" +
      "• **Institute Nodal:** Nodal Officer, GGCT Jabalpur\n" +
      "• **Email Support:** scholarships-support@gov.in"
    );
  }
  if (q.includes("hi") || q.includes("hello") || q.includes("namaste")) {
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

async function sendUserChat() {
  const input = document.getElementById('chatInputText');
  const query = input.value.trim();
  if (!query) return;

  const chatList = document.getElementById('chatMessageList');

  const userMsg = document.createElement('div');
  userMsg.className = "flex items-start justify-end space-x-2";
  userMsg.innerHTML = `
    <div class="bg-[#0a3d62] text-white p-2.5 rounded text-xs max-w-[85%] leading-relaxed">
      ${query}
    </div>
    <div class="w-6 h-6 rounded bg-slate-300 text-slate-800 flex items-center justify-center text-[10px] font-bold">AS</div>
  `;
  chatList.appendChild(userMsg);
  input.value = "";
  chatList.scrollTop = chatList.scrollHeight;

  const typingIndicator = document.createElement('div');
  typingIndicator.id = "chatTypingIndicator";
  typingIndicator.className = "flex items-start space-x-2 text-slate-400 text-xs italic";
  typingIndicator.innerHTML = `
    <div class="w-6 h-6 rounded bg-[#0a3d62] text-white flex items-center justify-center text-[10px] font-bold">
      <span class="material-symbols-outlined text-[13px]">support_agent</span>
    </div>
    <div class="p-2">Eklavya is typing...</div>
  `;
  chatList.appendChild(typingIndicator);
  chatList.scrollTop = chatList.scrollHeight;

  let replyText = "";
  try {
    let res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: jsonString({ message: query })
    }).catch(() => null);

    if (!res || !res.ok) {
      res = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: jsonString({ message: query })
      }).catch(() => null);
    }

    if (res && res.ok) {
      const data = await res.json();
      if (data && data.reply) {
        replyText = data.reply;
      }
    }
  } catch (e) {
    replyText = "";
  }

  if (!replyText) {
    replyText = generateLocalChatAnswer(query);
  }

  const indicator = document.getElementById('chatTypingIndicator');
  if (indicator) indicator.remove();

  const botMsg = document.createElement('div');
  botMsg.className = "flex items-start space-x-2";
  botMsg.innerHTML = `
    <div class="w-6 h-6 rounded bg-[#0a3d62] text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">
      <span class="material-symbols-outlined text-[13px]">support_agent</span>
    </div>
    <div class="bg-white p-2.5 rounded border border-slate-200 text-slate-800 text-xs max-w-[85%] leading-relaxed shadow-xs space-y-1">
      ${formatBotResponse(replyText)}
    </div>
  `;
  chatList.appendChild(botMsg);
  chatList.scrollTop = chatList.scrollHeight;
}

function jsonString(obj) {
  return JSON.stringify(obj);
}

function showToast(message) {
  const toast = document.getElementById('toastNotification');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.remove('opacity-0', 'pointer-events-none');
  setTimeout(() => {
    toast.classList.add('opacity-0', 'pointer-events-none');
  }, 2400);
}
