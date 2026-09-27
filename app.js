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

const scholarshipSchemes = [
  {
    id: 'SCH-01',
    name: 'Post-Matric Scholarship for OBC Students (Technical Degree Courses)',
    shortName: 'Post-Matric OBC Scholarship',
    category: 'OBC',
    grant: '₹ 45,000.00 / yr',
    grantNumeric: 45000,
    incomeLimit: '₹ 2,50,000.00',
    deadline: '15 Nov 2026',
    status: 'Active',
    ministry: 'Ministry of Social Justice & Empowerment'
  },
  {
    id: 'SCH-02',
    name: 'Central Sector Scheme of Scholarship (CSSS)',
    shortName: 'CSSS Higher Education',
    category: 'All (Merit > 80%)',
    grant: '₹ 20,000.00 / yr',
    grantNumeric: 20000,
    incomeLimit: '₹ 4,50,000.00',
    deadline: '30 Nov 2026',
    status: 'Active',
    ministry: 'Ministry of Education'
  },
  {
    id: 'SCH-03',
    name: 'National Overseas Scholarship for ST Students',
    shortName: 'National Overseas ST',
    category: 'ST Only',
    grant: '₹ 15,00,000.00 / yr',
    grantNumeric: 1500000,
    incomeLimit: '₹ 6,00,000.00',
    deadline: '15 Dec 2026',
    status: 'Active',
    ministry: 'Ministry of Tribal Affairs'
  }
];

const studentApplications = [
  {
    id: 'EKL-2024-020811',
    applicantName: 'Anmol Soni',
    rollNo: '0208AD231011',
    schemeName: 'Post-Matric Scholarship for OBC Students (Technical Degree Courses)',
    grantValue: '₹ 45,000.00',
    appliedDate: '12 Aug 2024',
    academicYear: '2024-2025',
    currentStage: 'Stage 4: PFMS Batch Processing',
    status: 'Under Verification',
    institute: 'Gyan Ganga College Of Technology',
    instituteVerified: true,
    districtApproved: true,
    dbtAccount: 'SBI (XXXX-XXXX-4109)',
    tranche1: '₹ 22,500.00 (Credited)',
    tranche2: '₹ 22,500.00 (PFMS Transit)'
  }
];

let isAppFormEditing = false;

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
  renderApplicationsList();
  renderAdminConsole();
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
  if (!dropdown) return;
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
  if (!drawer) return;
  appState.isSideMenuOpen = !appState.isSideMenuOpen;

  if (appState.isSideMenuOpen) {
    drawer.classList.remove('-translate-x-full');
    if (overlay) overlay.classList.remove('hidden');
  } else {
    drawer.classList.add('-translate-x-full');
    if (overlay) overlay.classList.add('hidden');
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

  const breadcrumbLabels = {
    'page-dashboard': 'Scholarship Dashboard',
    'page-schemes': 'Schemes & Eligibility Verifier',
    'page-apply': 'Scholarship Application Form',
    'page-digilocker': 'DigiLocker Document Verification',
    'page-profile': 'Candidate Profile Credentials',
    'page-my-applications': 'My Submitted Applications',
    'page-dbt-history': 'DBT Passbook & PFMS History',
    'page-grievance': 'Grievance Redressal Desk',
    'page-admin': 'Institute & Nodal Officer Control Portal'
  };

  const breadcrumbElem = document.getElementById('breadcrumbCurrentPage');
  if (breadcrumbElem && breadcrumbLabels[pageId]) {
    breadcrumbElem.textContent = breadcrumbLabels[pageId];
  }

  const topNavMap = {
    'page-dashboard': 'topNavDashboard',
    'page-schemes': 'topNavSchemes',
    'page-my-applications': 'topNavMyApps',
    'page-digilocker': 'topNavDocs'
  };

  ['topNavDashboard', 'topNavSchemes', 'topNavMyApps', 'topNavDocs'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      if (id === topNavMap[pageId]) {
        btn.className = "px-3.5 py-2.5 text-xs font-bold text-white bg-slate-900 border-b-4 border-[#ff9933] rounded-none flex items-center gap-1.5 transition";
      } else {
        btn.className = "px-3.5 py-2.5 text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/10 rounded-none flex items-center gap-1.5 transition";
      }
    }
  });

  const bottomNavMap = {
    'page-dashboard': 'navBtnDashboard',
    'page-schemes': 'navBtnSchemes',
    'page-my-applications': 'navBtnMyApps',
    'page-digilocker': 'navBtnDocs'
  };

  ['navBtnDashboard', 'navBtnSchemes', 'navBtnMyApps', 'navBtnDocs'].forEach(id => {
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

function openApplicationForScheme(schemeName, grantAmount) {
  const bannerTitle = document.getElementById('applySchemeBannerTitle');
  const bannerGrant = document.getElementById('applySchemeBannerGrant');
  const selectElem = document.getElementById('formSelectScheme');

  if (bannerTitle) bannerTitle.textContent = schemeName;
  if (bannerGrant) bannerGrant.textContent = `Sanctioned Grant: ${grantAmount}`;

  if (selectElem) {
    let found = false;
    for (let i = 0; i < selectElem.options.length; i++) {
      if (selectElem.options[i].text.includes(schemeName) || schemeName.includes(selectElem.options[i].text)) {
        selectElem.selectedIndex = i;
        found = true;
        break;
      }
    }
    if (!found) {
      const opt = document.createElement('option');
      opt.value = schemeName;
      opt.text = schemeName;
      opt.selected = true;
      selectElem.appendChild(opt);
    }
  }

  navigateToPage('page-apply');
  const breadcrumbElem = document.getElementById('breadcrumbCurrentPage');
  if (breadcrumbElem) {
    breadcrumbElem.textContent = `Apply: ${schemeName}`;
  }
}

function onSchemeSelectionChange(selectedVal) {
  const bannerTitle = document.getElementById('applySchemeBannerTitle');
  const bannerGrant = document.getElementById('applySchemeBannerGrant');
  if (bannerTitle) bannerTitle.textContent = selectedVal;
  if (bannerGrant) {
    if (selectedVal.includes('CSSS') || selectedVal.includes('Central Sector')) {
      bannerGrant.textContent = 'Sanctioned Grant: ₹ 20,000.00 / yr (Merit Scholarship)';
    } else {
      bannerGrant.textContent = 'Sanctioned Grant: ₹ 45,000.00 / yr (Tuition Assistance + Maintenance)';
    }
  }
}

function toggleLanguageMenu(e) {
  if (e) e.stopPropagation();
  const dropdown = document.getElementById('langDropdown');
  if (dropdown) dropdown.classList.toggle('hidden');
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
    'viewProfileFullName': studentProfile.name,
    'viewProfileCollegeSub': `${studentProfile.college}, Jabalpur (M.P.)`,
    'viewCardName': studentProfile.name,
    'viewCardRoll': studentProfile.rollNo,
    'viewCardCollege': studentProfile.college,
    'viewCardCaste': `${studentProfile.caste} (Other Backward Classes)`,
    'viewCardDob': studentProfile.dob,
    'viewCardPhone': studentProfile.phone,
    'viewCardIncome': `${studentProfile.income} / yr`,
    'viewCardEmail': studentProfile.email,
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
    'editEmail': studentProfile.email,
    'editCaste': studentProfile.caste
  };

  for (const [id, val] of Object.entries(fields)) {
    const el = document.getElementById(id);
    if (el) {
      if (el.tagName === 'INPUT' || el.tagName === 'SELECT') {
        el.value = val;
      } else {
        el.textContent = val;
      }
    }
  }
}

function toggleProfileEditMode(isEdit) {
  const viewCard = document.getElementById('profileViewCard');
  const editCard = document.getElementById('profileEditCard');
  if (isEdit) {
    if (viewCard) viewCard.classList.add('hidden');
    if (editCard) editCard.classList.remove('hidden');
    renderProfileData();
  } else {
    if (viewCard) viewCard.classList.remove('hidden');
    if (editCard) editCard.classList.add('hidden');
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
  if (document.getElementById('editCaste')) {
    studentProfile.caste = document.getElementById('editCaste').value;
  }

  renderProfileData();
  toggleProfileEditMode(false);
  showToast("Profile credentials updated successfully.");
}

function toggleApplicationEdit() {
  isAppFormEditing = !isAppFormEditing;
  const inputIds = ['formInputName', 'formInputDob', 'formInputCaste', 'formInputCollege', 'formInputRoll', 'formInputIncome'];
  inputIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.readOnly = !isAppFormEditing;
      if (isAppFormEditing) {
        el.classList.remove('bg-slate-50');
        el.classList.add('bg-white', 'border-blue-500', 'ring-1', 'ring-blue-300');
      } else {
        el.classList.add('bg-slate-50');
        el.classList.remove('bg-white', 'border-blue-500', 'ring-1', 'ring-blue-300');
      }
    }
  });

  const btnText = document.getElementById('lblToggleAppEditText');
  const btn = document.getElementById('btnToggleAppEdit');
  const alertBox = document.getElementById('appEditAlert');

  if (isAppFormEditing) {
    if (btnText) btnText.textContent = "Lock Form (Read-Only)";
    if (btn) btn.className = "px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-400 rounded font-bold text-xs flex items-center gap-1.5 shadow-2xs transition";
    if (alertBox) alertBox.classList.remove('hidden');
    showToast("Application Form unlocked for editing.");
  } else {
    if (btnText) btnText.textContent = "Enable Form Editing";
    if (btn) btn.className = "px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#0a3d62] border border-blue-300 rounded font-bold text-xs flex items-center gap-1.5 shadow-2xs transition";
    if (alertBox) alertBox.classList.add('hidden');
    showToast("Application Form locked. Read-only mode active.");
  }
}

function submitApplicationForm() {
  const schemeTitle = document.getElementById('applySchemeBannerTitle') ? document.getElementById('applySchemeBannerTitle').textContent.trim() : 'Post-Matric Scholarship for OBC Students (Technical Courses)';
  const grantVal = document.getElementById('applySchemeBannerGrant') ? document.getElementById('applySchemeBannerGrant').textContent.replace('Sanctioned Grant: ', '').trim() : '₹ 45,000.00 / yr';
  
  const newAppId = 'EKL-2026-' + Math.floor(100000 + Math.random() * 900000);
  const newApp = {
    id: newAppId,
    applicantName: studentProfile.name,
    rollNo: studentProfile.rollNo,
    schemeName: schemeTitle,
    grantValue: grantVal.split('/')[0].trim(),
    appliedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    academicYear: '2024-2025',
    currentStage: 'Stage 1: Submitted & Forwarded to Institute',
    status: 'Submitted',
    institute: studentProfile.college,
    instituteVerified: false,
    districtApproved: false,
    dbtAccount: studentProfile.bankAccount,
    tranche1: 'Pending Sanction',
    tranche2: 'Pending Sanction'
  };

  studentApplications.unshift(newApp);
  renderApplicationsList();
  renderAdminConsole();

  showToast(`Application successfully registered! Ref ID: ${newAppId}`);
  setTimeout(() => {
    navigateToPage('page-my-applications');
  }, 800);
}

function renderApplicationsList() {
  const container = document.getElementById('applicationsContainer');
  if (!container) return;

  if (studentApplications.length === 0) {
    container.innerHTML = `
      <div class="gov-card p-8 text-center text-slate-500">
        <span class="material-symbols-outlined text-4xl text-slate-300 mb-2">assignment_late</span>
        <p class="font-bold text-slate-700 text-sm">No Scholarship Applications Found</p>
        <p class="text-xs text-slate-500 mt-1 mb-4">You have not submitted any scholarship forms yet.</p>
        <button onclick="navigateToPage('page-schemes')" class="px-4 py-2 bg-[#0a3d62] text-white font-bold text-xs rounded">
          Browse Eligible Schemes
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = studentApplications.map(app => `
    <div class="gov-card p-4 sm:p-5 border-l-4 ${app.districtApproved ? 'border-l-[#138808]' : 'border-l-[#ff9933]'}">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-slate-200 gap-2">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
              ${app.id}
            </span>
            <span class="${app.districtApproved ? 'bg-[#f0fdf4] text-[#138808] border border-[#86efac]' : 'bg-amber-50 text-amber-900 border border-amber-300'} text-[10px] font-bold px-2 py-0.5 rounded">
              ${app.status}
            </span>
          </div>
          <h4 class="text-sm font-bold text-[#0a3d62] mt-1.5">${app.schemeName}</h4>
          <p class="text-xs text-slate-600 font-medium">Academic Session: ${app.academicYear} • Applied On: ${app.appliedDate}</p>
        </div>
        <div class="text-left sm:text-right">
          <span class="text-[10px] text-slate-500 font-semibold block uppercase">Total Sanction Amount</span>
          <span class="text-base font-bold text-[#138808] currency-amount">${app.grantValue}</span>
        </div>
      </div>

      <div class="mt-4 p-3 bg-slate-50 rounded border border-slate-200">
        <div class="flex items-center justify-between text-xs mb-2">
          <span class="font-bold text-slate-800">Verification & Disbursal Progression:</span>
          <span class="font-bold text-[#0a3d62]">${app.currentStage}</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-2 text-[11px] text-slate-700">
          <div class="p-2 bg-white rounded border border-slate-300 flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[16px] text-emerald-600">check_circle</span>
            <div>
              <span class="block font-bold text-slate-900">1. Submitted</span>
              <span class="text-[10px] text-slate-500">${app.appliedDate}</span>
            </div>
          </div>
          <div class="p-2 bg-white rounded border border-slate-300 flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[16px] ${app.instituteVerified ? 'text-emerald-600' : 'text-slate-400'}">
              ${app.instituteVerified ? 'check_circle' : 'radio_button_unchecked'}
            </span>
            <div>
              <span class="block font-bold text-slate-900">2. Institute Endorsed</span>
              <span class="text-[10px] text-slate-500">${app.instituteVerified ? 'GGCT Verified' : 'Under Review'}</span>
            </div>
          </div>
          <div class="p-2 bg-white rounded border border-slate-300 flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[16px] ${app.districtApproved ? 'text-emerald-600' : 'text-slate-400'}">
              ${app.districtApproved ? 'check_circle' : 'radio_button_unchecked'}
            </span>
            <div>
              <span class="block font-bold text-slate-900">3. Sanction Order</span>
              <span class="text-[10px] text-slate-500">${app.districtApproved ? 'Approved by Welfare Dept' : 'Pending Sanction'}</span>
            </div>
          </div>
          <div class="p-2 bg-white rounded border border-slate-300 flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[16px] ${app.tranche1.includes('Credited') ? 'text-emerald-600' : 'text-slate-400'}">
              ${app.tranche1.includes('Credited') ? 'check_circle' : 'radio_button_unchecked'}
            </span>
            <div>
              <span class="block font-bold text-slate-900">4. DBT Disbursal</span>
              <span class="text-[10px] text-slate-500">${app.tranche1.includes('Credited') ? 'Tranche 1 Credited' : 'Awaiting APBS'}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4 flex flex-wrap items-center justify-between gap-2 pt-2 text-xs">
        <div class="flex items-center gap-2 text-slate-600">
          <span class="material-symbols-outlined text-[16px] text-emerald-600">verified_user</span>
          <span>Aadhaar Seeded Account: <strong>${app.dbtAccount}</strong></span>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="openViewApplicationModal('${app.id}')"
            class="px-3 py-1.5 bg-[#0a3d62] hover:bg-[#072a44] text-white rounded font-bold flex items-center gap-1 shadow-2xs">
            <span class="material-symbols-outlined text-[15px]">visibility</span>
            <span>View Full Application & Receipts</span>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function openViewApplicationModal(appId) {
  const app = studentApplications.find(a => a.id === appId) || studentApplications[0];
  const body = document.getElementById('applicationModalBody');
  const modal = document.getElementById('viewApplicationModal');
  if (!body || !modal) return;

  body.innerHTML = `
    <div class="border border-slate-300 rounded p-3.5 bg-slate-50 space-y-2">
      <div class="flex items-center justify-between border-b border-slate-200 pb-2">
        <div>
          <span class="text-[10px] font-bold text-slate-500 uppercase">National Unified Scholarship System</span>
          <h4 class="text-sm font-bold text-[#0a3d62]">${app.schemeName}</h4>
        </div>
        <div class="text-right">
          <span class="text-[11px] font-mono font-bold text-slate-800 bg-white px-2 py-0.5 border border-slate-300 rounded">${app.id}</span>
          <p class="text-[10px] text-slate-500 mt-0.5">Applied: ${app.appliedDate}</p>
        </div>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 text-slate-700">
        <div>
          <span class="text-[10px] text-slate-500 block">Candidate Name</span>
          <span class="font-bold text-slate-900">${app.applicantName}</span>
        </div>
        <div>
          <span class="text-[10px] text-slate-500 block">University Roll Number</span>
          <span class="font-bold text-slate-900">${app.rollNo}</span>
        </div>
        <div>
          <span class="text-[10px] text-slate-500 block">Category / Caste</span>
          <span class="font-bold text-slate-900">${studentProfile.caste} (Other Backward Classes)</span>
        </div>
        <div>
          <span class="text-[10px] text-slate-500 block">Institution / College</span>
          <span class="font-bold text-slate-900">${app.institute}</span>
        </div>
        <div>
          <span class="text-[10px] text-slate-500 block">Annual Family Income</span>
          <span class="font-bold text-slate-900">${studentProfile.income}</span>
        </div>
        <div>
          <span class="text-[10px] text-slate-500 block">Sanctioned Grant</span>
          <span class="font-bold text-[#138808]">${app.grantValue}</span>
        </div>
      </div>
    </div>

    <div class="border border-slate-300 rounded p-3.5 space-y-2">
      <h5 class="font-bold text-slate-900 text-xs flex items-center gap-1.5">
        <span class="material-symbols-outlined text-[16px] text-[#0a3d62]">verified</span>
        <span>DigiLocker & Financial Gateway Verifications</span>
      </h5>
      <div class="space-y-1.5 text-slate-700">
        <div class="p-2 bg-emerald-50 border border-emerald-200 rounded flex items-center justify-between">
          <span class="font-medium">OBC Caste Certificate #MP-OBC-2023-88912</span>
          <span class="text-emerald-800 font-bold text-[11px]">✓ Digitally Authenticated (MP e-District)</span>
        </div>
        <div class="p-2 bg-emerald-50 border border-emerald-200 rounded flex items-center justify-between">
          <span class="font-medium">Income Certificate #MP-INC-2024-44102</span>
          <span class="text-emerald-800 font-bold text-[11px]">✓ Verified (&lt; ₹ 2.50 Lakh)</span>
        </div>
        <div class="p-2 bg-blue-50 border border-blue-200 rounded flex items-center justify-between">
          <span class="font-medium">Direct Benefit Transfer Bank Account</span>
          <span class="text-[#0a3d62] font-bold text-[11px]">✓ ${app.dbtAccount}</span>
        </div>
      </div>
    </div>

    <div class="border border-slate-300 rounded p-3.5 space-y-2 bg-[#f8fafc]">
      <h5 class="font-bold text-slate-900 text-xs flex items-center gap-1.5">
        <span class="material-symbols-outlined text-[16px] text-[#c2410c]">account_balance_wallet</span>
        <span>Payment & DBT Sanction Tranches</span>
      </h5>
      <div class="grid grid-cols-2 gap-2 text-slate-800">
        <div class="p-2 bg-white border border-slate-200 rounded">
          <span class="text-[10px] text-slate-500 block">Tranche 1 (50% Tuition & Maintenance)</span>
          <span class="font-bold text-[#138808]">${app.tranche1}</span>
          <span class="text-[10px] text-slate-500 block mt-0.5">Ref: UTR-SBIN00291048201</span>
        </div>
        <div class="p-2 bg-white border border-slate-200 rounded">
          <span class="text-[10px] text-slate-500 block">Tranche 2 (50% Balance Grant)</span>
          <span class="font-bold text-[#c2410c]">${app.tranche2}</span>
          <span class="text-[10px] text-slate-500 block mt-0.5">Clearing Batch #MP-2026-9921</span>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
}

function closeViewApplicationModal() {
  const modal = document.getElementById('viewApplicationModal');
  if (modal) modal.classList.add('hidden');
}

function renderAdminConsole() {
  const tbody = document.getElementById('adminSchemesTableBody');
  if (tbody) {
    tbody.innerHTML = scholarshipSchemes.map(s => `
      <tr class="hover:bg-slate-50">
        <td class="p-2.5 font-bold text-slate-900">${s.name}</td>
        <td class="p-2.5 font-semibold text-slate-700">${s.category}</td>
        <td class="p-2.5 font-bold text-[#138808] currency-amount">${s.grant}</td>
        <td class="p-2.5 font-medium text-slate-600">&lt; ${s.incomeLimit}</td>
        <td class="p-2.5 font-medium text-slate-600">${s.deadline}</td>
        <td class="p-2.5">
          <span class="${s.status === 'Active' ? 'bg-[#f0fdf4] text-[#138808] border border-[#86efac]' : 'bg-rose-50 text-rose-800 border border-rose-200'} px-2 py-0.5 rounded font-bold text-[10px]">
            ${s.status}
          </span>
        </td>
        <td class="p-2.5 text-center">
          <button onclick="openAdminEditSchemeModal('${s.id}')" class="px-2.5 py-1 bg-[#0a3d62] hover:bg-[#072a44] text-white rounded font-bold text-xs flex items-center justify-center gap-1 mx-auto shadow-2xs">
            <span class="material-symbols-outlined text-[14px]">edit</span>
            <span>Edit</span>
          </button>
        </td>
      </tr>
    `).join('');
  }

  const appTbody = document.getElementById('adminApplicationsTableBody');
  if (appTbody) {
    appTbody.innerHTML = studentApplications.map(app => `
      <tr class="hover:bg-slate-50">
        <td class="p-2.5 font-bold text-slate-900 font-mono text-xs">${app.id}</td>
        <td class="p-2.5 font-bold text-slate-800">${app.applicantName} <span class="block text-[10px] text-slate-500 font-normal">Roll: ${app.rollNo}</span></td>
        <td class="p-2.5 font-medium text-slate-700">${app.schemeName}</td>
        <td class="p-2.5 font-bold text-[#138808] currency-amount">${app.grantValue}</td>
        <td class="p-2.5">
          <span class="bg-blue-50 text-[#0a3d62] border border-blue-200 px-2 py-0.5 rounded font-bold text-[10px] inline-block">
            ${app.currentStage}
          </span>
        </td>
        <td class="p-2.5 text-center">
          <div class="flex items-center justify-center gap-1.5 flex-wrap">
            <button onclick="openViewApplicationModal('${app.id}')" class="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-semibold text-[11px] border border-slate-300">
              View Form
            </button>
            ${!app.districtApproved ? `
              <button onclick="approveApplicationFromAdmin('${app.id}')" class="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold text-[11px] shadow-2xs flex items-center gap-1">
                <span class="material-symbols-outlined text-[13px]">check</span>
                <span>Sanction</span>
              </button>
            ` : (app.tranche2.includes('Transit') ? `
              <button onclick="disburseTranche2FromAdmin('${app.id}')" class="px-2 py-1 bg-[#138808] hover:bg-emerald-700 text-white rounded font-bold text-[11px] shadow-2xs flex items-center gap-1">
                <span class="material-symbols-outlined text-[13px]">payments</span>
                <span>Disburse Tranche 2</span>
              </button>
            ` : `
              <span class="text-[#138808] font-bold text-[10px] flex items-center gap-0.5">
                <span class="material-symbols-outlined text-[13px]">verified</span> Disbursed
              </span>
            `)}
          </div>
        </td>
      </tr>
    `).join('');
  }
}

function openAdminEditSchemeModal(schemeId) {
  const scheme = scholarshipSchemes.find(s => s.id === schemeId);
  if (!scheme) return;

  const modalHeading = document.getElementById('adminModalHeading');
  if (modalHeading) modalHeading.textContent = "Edit Scholarship Scheme Configuration";

  document.getElementById('adminSchemeId').value = scheme.id;
  document.getElementById('adminSchemeName').value = scheme.name;
  document.getElementById('adminSchemeGrant').value = scheme.grant;
  document.getElementById('adminSchemeCategory').value = scheme.category;
  document.getElementById('adminSchemeIncome').value = scheme.incomeLimit;
  document.getElementById('adminSchemeDeadline').value = scheme.deadline;
  document.getElementById('adminSchemeStatus').value = scheme.status;

  const modal = document.getElementById('adminEditSchemeModal');
  if (modal) modal.classList.remove('hidden');
}

function openAddNewSchemeModal() {
  const modalHeading = document.getElementById('adminModalHeading');
  if (modalHeading) modalHeading.textContent = "Add New Scholarship Scheme Configuration";

  const newId = 'SCH-0' + (scholarshipSchemes.length + 1);
  document.getElementById('adminSchemeId').value = newId;
  document.getElementById('adminSchemeName').value = '';
  document.getElementById('adminSchemeGrant').value = '₹ 50,000.00 / yr';
  document.getElementById('adminSchemeCategory').value = 'All Categories';
  document.getElementById('adminSchemeIncome').value = '₹ 3,00,000.00';
  document.getElementById('adminSchemeDeadline').value = '31 Dec 2026';
  document.getElementById('adminSchemeStatus').value = 'Active';

  const modal = document.getElementById('adminEditSchemeModal');
  if (modal) modal.classList.remove('hidden');
}

function closeAdminSchemeModal() {
  const modal = document.getElementById('adminEditSchemeModal');
  if (modal) modal.classList.add('hidden');
}

function saveAdminSchemeEdit(event) {
  event.preventDefault();
  const id = document.getElementById('adminSchemeId').value;
  const name = document.getElementById('adminSchemeName').value;
  const grant = document.getElementById('adminSchemeGrant').value;
  const category = document.getElementById('adminSchemeCategory').value;
  const incomeLimit = document.getElementById('adminSchemeIncome').value;
  const deadline = document.getElementById('adminSchemeDeadline').value;
  const status = document.getElementById('adminSchemeStatus').value;

  const existingIndex = scholarshipSchemes.findIndex(s => s.id === id);
  if (existingIndex >= 0) {
    scholarshipSchemes[existingIndex] = {
      ...scholarshipSchemes[existingIndex],
      name, grant, category, incomeLimit, deadline, status
    };
  } else {
    scholarshipSchemes.push({
      id, name, shortName: name.substring(0, 24), category, grant, incomeLimit, deadline, status, ministry: 'Government of India'
    });
  }

  if (id === 'SCH-01') {
    const bannerGrant = document.getElementById('applySchemeBannerGrant');
    if (bannerGrant) {
      bannerGrant.textContent = `Sanctioned Grant: ${grant} (Tuition Assistance + Maintenance)`;
    }
  }

  closeAdminSchemeModal();
  renderAdminConsole();
  showToast("Scholarship scheme updated and published to portal.");
}

function approveApplicationFromAdmin(appId) {
  const app = studentApplications.find(a => a.id === appId);
  if (!app) return;

  app.instituteVerified = true;
  app.districtApproved = true;
  app.status = "Sanction Approved";
  app.currentStage = "Stage 4: PFMS Batch Processing";
  renderAdminConsole();
  renderApplicationsList();
  showToast(`Application #${appId} sanctioned & verified by Institute Nodal Officer.`);
}

function disburseTranche2FromAdmin(appId) {
  const app = studentApplications.find(a => a.id === appId);
  if (!app) return;

  app.currentStage = "Stage 5: DBT Fully Disbursed";
  app.status = "Fully Disbursed";
  app.tranche2 = "₹ 22,500.00 (Credited via DBT)";

  const dashPendingTransit = document.getElementById('dashPendingTransit');
  if (dashPendingTransit) dashPendingTransit.textContent = "₹ 0.00";

  const dashDisbursedAmt = document.getElementById('dashDisbursedAmt');
  if (dashDisbursedAmt) dashDisbursedAmt.textContent = "₹ 45,000.00";

  const dbtTotalDisbursedPassbook = document.getElementById('dbtTotalDisbursedPassbook');
  if (dbtTotalDisbursedPassbook) dbtTotalDisbursedPassbook.textContent = "₹ 45,000.00";

  const dbtPendingTransitPassbook = document.getElementById('dbtPendingTransitPassbook');
  if (dbtPendingTransitPassbook) dbtPendingTransitPassbook.textContent = "₹ 0.00";

  const dbtTranche2StatusBadge = document.getElementById('dbtTranche2StatusBadge');
  if (dbtTranche2StatusBadge) {
    dbtTranche2StatusBadge.className = "bg-[#f0fdf4] text-[#138808] border border-[#86efac] px-2 py-0.5 rounded font-bold text-[10px]";
    dbtTranche2StatusBadge.innerHTML = "✓ Credited (DBT)";
  }

  renderAdminConsole();
  renderApplicationsList();
  showToast(`Tranche 2 (₹ 22,500.00) disbursed via DBT to SBI A/C XXXX-XXXX-4109.`);
}

function submitGrievance(event) {
  event.preventDefault();
  const desc = document.getElementById('grvDesc');
  const cat = document.getElementById('grvCategory') ? document.getElementById('grvCategory').value : 'General Query';
  const newTicket = 'GRV-2026-' + Math.floor(1000 + Math.random() * 9000);
  
  const container = document.getElementById('grievanceListContainer');
  if (container) {
    const item = document.createElement('div');
    item.className = "p-3 bg-white border border-slate-300 rounded shadow-2xs space-y-1.5";
    item.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="font-bold text-[#0a3d62]">Ticket #${newTicket}</span>
        <span class="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold px-2 py-0.5 rounded">
          Submitted
        </span>
      </div>
      <p class="text-slate-800 font-medium">${cat}</p>
      <p class="text-slate-500 text-[11px]">Submitted: Today • Forwarded to District Nodal Officer, Jabalpur</p>
    `;
    container.prepend(item);
  }

  if (desc) desc.value = '';
  showToast(`Grievance lodged successfully. Ticket ID: #${newTicket}`);
}

function verifyDigiLockerOtp() {
  const otpInput = document.getElementById('inputDigilockerOtp');
  const otpVal = otpInput ? otpInput.value.trim() : '';

  if (!otpVal || otpVal.length < 4) {
    showToast("Please enter the security verification OTP sent to your registered email.");
    return;
  }

  const btn = document.getElementById('btnVerifyDigilockerOtp');
  if (btn) {
    btn.innerHTML = `<span class="material-symbols-outlined text-[16px] animate-spin">refresh</span><span>Verifying e-KYC...</span>`;
    btn.disabled = true;
  }

  setTimeout(() => {
    const badge = document.getElementById('digilockerConsentBadge');
    if (badge) {
      badge.innerHTML = `<span class="material-symbols-outlined text-[15px]">verified</span><span>Digital Vault Linked • Verified via ${studentProfile.email}</span>`;
      badge.className = "inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-400 px-2.5 py-1 rounded font-bold text-[11px] self-start sm:self-center";
    }

    const otpBox = document.getElementById('digilockerOtpBox');
    if (otpBox) {
      otpBox.innerHTML = `
        <div class="w-full flex items-center justify-between bg-emerald-50 p-2.5 rounded border border-emerald-200">
          <div class="flex items-center space-x-2">
            <span class="material-symbols-outlined text-[#138808] text-[20px]">task_alt</span>
            <span class="text-xs font-bold text-emerald-900">DigiLocker Session Authenticated. Digital signatures verified for Session #DL-2026-GGCT.</span>
          </div>
          <span class="text-[10px] text-emerald-700 font-semibold">Active Vault Connection</span>
        </div>
      `;
    }

    const docItems = document.querySelectorAll('.digilocker-doc-status');
    docItems.forEach(el => {
      el.innerHTML = `<span class="inline-flex items-center gap-1 text-[#138808] font-bold text-xs"><span class="material-symbols-outlined text-[15px]">verified</span>Verified & Digitally Signed (DigiLocker)</span>`;
    });

    showToast(`DigiLocker certificates synced and verified for ${studentProfile.email}.`);
  }, 1000);
}

function resendDigiLockerOtp() {
  const otpInput = document.getElementById('inputDigilockerOtp');
  if (otpInput) otpInput.value = '528914';
  showToast(`Security OTP resent to registered email: ${studentProfile.email}`);
}

function syncDigiLocker() {
  verifyDigiLockerOtp();
}

function showEligibilityDetails(schemeName) {
  alert(`Eligibility Verified for ${schemeName}:\n• Category: OBC (Passed)\n• Institution: Recognized Institute (Passed)\n• Family Income Limit: < ₹2,50,000 (Passed)\n• Direct Benefit Transfer: Bank Account Seeded (Passed)`);
}

function toggleSahayakChat() {
  const modal = document.getElementById('sahayakChatModal');
  if (!modal) return;
  appState.isChatOpen = !appState.isChatOpen;
  if (appState.isChatOpen) {
    modal.classList.remove('hidden');
    const input = document.getElementById('chatInputText');
    if (input) input.focus();
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
  const q = (query || '').toLowerCase();
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
  const query = input ? input.value.trim() : '';
  if (!query) return;

  const chatList = document.getElementById('chatMessageList');
  if (!chatList) return;

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
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: query })
    });

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
