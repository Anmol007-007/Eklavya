// Eklavya - National Unified Scholarship Portal
// Ministry of Tribal Affairs, Government of India
// Candidate Context: Anmol Soni (OBC, Gyan Ganga College Of Technology)

const studentProfile = {
  name: "Anmol Soni",
  dob: "03/03/2005",
  college: "Gyan Ganga College Of Technology",
  caste: "OBC",
  rollNo: "0208AD231011",
  income: "₹ 1,80,000.00",
  phone: "+91 98260 12345",
  email: "anmol.soni@ggct.ac.in",
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

// Official Multilingual Translations Dictionary
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
    helpdeskBtn: "Ask Eklavya (Helpdesk)",
    helpdeskHeader: "Eklavya Citizen Helpdesk"
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
    helpdeskBtn: "एकलव्य सहायता केंद्र (Helpdesk)",
    helpdeskHeader: "एकलव्य नागरिक सहायता केंद्र"
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
    helpdeskBtn: "ᱜᱚᱲᱚ ᱛᱟᱞᱢᱟ (Helpdesk)",
    helpdeskHeader: "ᱮᱠᱞᱟᱵᱽᱭᱚ ᱜᱚᱲᱚ ᱛᱟᱞᱢᱟ"
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
    helpdeskBtn: "मदद केंद्र (Helpdesk)",
    helpdeskHeader: "एकलव्य सहायता केंद्र"
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
    helpdeskBtn: "ସହାୟତା କେନ୍ଦ୍ର (Helpdesk)",
    helpdeskHeader: "ଏକଲବ୍ୟ ସହାୟତା କେନ୍ଦ୍ର"
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
    helpdeskBtn: "হেল্পডেস্ক (Helpdesk)",
    helpdeskHeader: "একক্লব্য নাগরিক হেল্পডেস্ক"
  }
};

document.addEventListener('DOMContentLoaded', () => {
  renderProfileData();
  setLanguage('hi');

  // Close dropdowns when clicking outside
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

// Accessibility: Font Resizing
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

// Accessibility: High Contrast Mode
function toggleHighContrast() {
  appState.isHighContrast = !appState.isHighContrast;
  document.body.classList.toggle('high-contrast', appState.isHighContrast);
  showToast(appState.isHighContrast ? "High Contrast Mode Enabled" : "Standard Contrast Restored");
}

function alertScreenReaderInfo() {
  alert("Screen Reader Access:\nThis portal is built adhering to GIGW 3.0 & WCAG 2.2 AAA guidelines. It is fully compatible with NVDA, JAWS, and Android TalkBack.");
}

// User Profile Header Dropdown Toggle
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

// Side Navigation Drawer Toggle
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

// Multi-page Navigation
function navigateToPage(pageId) {
  appState.currentPage = pageId;

  // Toggle page visibility
  document.querySelectorAll('.page-view').forEach(page => {
    page.classList.remove('active');
  });
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Update top horizontal navbar tabs
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

  // Update mobile bottom nav highlighting
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

// Language Switcher Dropdown
function toggleLanguageMenu(e) {
  if (e) e.stopPropagation();
  const dropdown = document.getElementById('langDropdown');
  dropdown.classList.toggle('hidden');
}

function setLanguage(langCode) {
  if (!i18n[langCode]) return;
  appState.currentLanguage = langCode;
  const dict = i18n[langCode];

  // Update button label
  const label = document.getElementById('currentLangLabel');
  if (label) label.textContent = dict.langName;

  // Translate static UI strings
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

// Populate Anmol Soni's test data into the UI
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

// Save Profile form handler
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

// DigiLocker Certificate Sync
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

// Submit Application Form Wizard
function submitApplicationForm() {
  showToast("Application submitted successfully. Reference: #EKL-2026-020811");
  setTimeout(() => {
    navigateToPage('page-dashboard');
  }, 1000);
}

function showEligibilityDetails(schemeName) {
  alert(`Eligibility Verified for ${schemeName}:\n• Category: OBC (Passed)\n• Institution: Recognized Institute (Passed)\n• Family Income Limit: < ₹2,50,000 (Passed)\n• Direct Benefit Transfer: Bank Account Seeded (Passed)`);
}

// Helpdesk Floating Chat Widget
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

function sendUserChat() {
  const input = document.getElementById('chatInputText');
  const query = input.value.trim();
  if (!query) return;

  const chatList = document.getElementById('chatMessageList');

  // Append User message
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

  // Bot response simulation
  setTimeout(() => {
    let reply = `Namaste Anmol Ji. Regarding your query: "${query}", your Post-Matric OBC Scholarship tranche 1 (₹ 22,500.00) is credited to your SBI account. Tranche 2 (₹ 22,500.00) has been approved by the District Welfare Officer and is under PFMS payment processing.`;
    
    const botMsg = document.createElement('div');
    botMsg.className = "flex items-start space-x-2";
    botMsg.innerHTML = `
      <div class="w-6 h-6 rounded bg-[#0a3d62] text-white flex items-center justify-center text-[10px] font-bold">
        <span class="material-symbols-outlined text-[14px]">support_agent</span>
      </div>
      <div class="bg-white p-2.5 rounded border border-slate-200 text-slate-800 text-xs max-w-[85%] leading-relaxed shadow-xs">
        ${reply}
      </div>
    `;
    chatList.appendChild(botMsg);
    chatList.scrollTop = chatList.scrollHeight;
  }, 600);
}

// Toast notification helper
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.remove('opacity-0', 'pointer-events-none');
  setTimeout(() => {
    toast.classList.add('opacity-0', 'pointer-events-none');
  }, 2400);
}
