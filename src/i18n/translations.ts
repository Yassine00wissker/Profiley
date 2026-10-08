export type Locale = 'en' | 'fr' | 'ar';

export const LOCALES: { code: Locale; label: string; nativeLabel: string; dir: 'ltr' | 'rtl' }[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', dir: 'ltr' },
  { code: 'fr', label: 'French',  nativeLabel: 'Français', dir: 'ltr' },
  { code: 'ar', label: 'Arabic',  nativeLabel: 'العربية',  dir: 'rtl' },
];

export type TranslationKey =
  // Navbar
  | 'nav.templates'
  | 'nav.editor'
  | 'nav.publicView'
  | 'nav.deploy'
  | 'nav.deployed'
  | 'nav.login'
  | 'nav.logout'
  | 'nav.member'
  | 'nav.subtitle'
  // Home – Hero
  | 'home.badge'
  | 'home.heroTitle1'
  | 'home.heroTitle2'
  | 'home.heroDesc'
  | 'home.cta.launch'
  | 'home.cta.browse'
  | 'home.feat.modular.title'
  | 'home.feat.modular.desc'
  | 'home.feat.palette.title'
  | 'home.feat.palette.desc'
  | 'home.feat.deploy.title'
  | 'home.feat.deploy.desc'
  | 'home.feat.rated.title'
  | 'home.feat.rated.desc'
  // Home – Templates
  | 'home.section.title'
  | 'home.section.subtitle'
  | 'home.filter.all'
  | 'home.filter.portfolios'
  | 'home.filter.cvs'
  | 'home.cat.all'
  | 'home.cat.Tech'
  | 'home.cat.Creative'
  | 'home.cat.Executive'
  | 'home.search.placeholder'
  // Footer
  | 'footer.copy'
  // Auth Modal
  | 'auth.title'
  | 'auth.subtitle'
  | 'auth.name'
  | 'auth.headline'
  | 'auth.bio'
  | 'auth.submit'
  | 'auth.close';

type Translations = Record<TranslationKey, string>;

export const translations: Record<Locale, Translations> = {
  en: {
    'nav.templates': 'Templates & Gallery',
    'nav.editor': 'Studio Editor',
    'nav.publicView': 'Public View',
    'nav.deploy': 'Deploy / Publish',
    'nav.deployed': 'Deployed!',
    'nav.login': 'Log In / Sign Up',
    'nav.logout': 'Log Out',
    'nav.member': 'Member',
    'nav.subtitle': 'Portfolio & CV Builder',
    'home.badge': 'Dual-Mode Builder: Interactive Portfolios & ATS-Ready CVs',
    'home.heroTitle1': 'Create, Customize & Deploy Your',
    'home.heroTitle2': 'Portfolio & CV',
    'home.heroDesc':
      'Choose a verified template, customize every section, header, font, and color in real time. Test and preview publicly before creating an account—your edits sync automatically when you sign in.',
    'home.cta.launch': 'Launch Studio Editor',
    'home.cta.browse': 'Browse Templates',
    'home.feat.modular.title': 'Modular Sections',
    'home.feat.modular.desc': 'Add, delete, reorder, & rename headers freely.',
    'home.feat.palette.title': 'Tailored Palettes',
    'home.feat.palette.desc': 'Custom colors, dark/light canvas, and fonts.',
    'home.feat.deploy.title': 'Instant Deployment',
    'home.feat.deploy.desc': 'Public shareable URLs (/p/:slug) in 1 click.',
    'home.feat.rated.title': 'Rated by Community',
    'home.feat.rated.desc': 'Real user reviews and 1-5 star ratings.',
    'home.section.title': 'Curated Templates',
    'home.section.subtitle': 'Select a design to start customizing. You can rate, review, and adjust every single detail.',
    'home.filter.all': 'All Types',
    'home.filter.portfolios': 'Web Portfolios',
    'home.filter.cvs': 'Resumes / CVs',
    'home.cat.all': 'All Disciplines',
    'home.cat.Tech': 'Tech',
    'home.cat.Creative': 'Creative',
    'home.cat.Executive': 'Executive',
    'home.search.placeholder': 'Search templates...',
    'footer.copy': '© 2026 ProTemp Studio. Personal Portfolio & Resume Builder Platform.',
    'auth.title': 'Save Your Portfolio',
    'auth.subtitle': 'Create a free account to save and deploy your work.',
    'auth.name': 'Your Name',
    'auth.headline': 'Professional Headline',
    'auth.bio': 'Short Bio',
    'auth.submit': 'Create Account & Save',
    'auth.close': 'Close',
  },

  fr: {
    'nav.templates': 'Modèles & Galerie',
    'nav.editor': 'Éditeur Studio',
    'nav.publicView': 'Vue publique',
    'nav.deploy': 'Déployer / Publier',
    'nav.deployed': 'Déployé !',
    'nav.login': 'Connexion / Inscription',
    'nav.logout': 'Déconnexion',
    'nav.member': 'Membre',
    'nav.subtitle': 'Créateur de Portfolio & CV',
    'home.badge': 'Créateur Double : Portfolios Interactifs & CVs ATS-Optimisés',
    'home.heroTitle1': 'Créez, Personnalisez & Déployez Votre',
    'home.heroTitle2': 'Portfolio & CV',
    'home.heroDesc':
      "Choisissez un modèle vérifié, personnalisez chaque section, en-tête, police et couleur en temps réel. Testez et prévisualisez publiquement avant de créer un compte—vos modifications se synchronisent automatiquement à la connexion.",
    'home.cta.launch': "Lancer l'Éditeur Studio",
    'home.cta.browse': 'Parcourir les modèles',
    'home.feat.modular.title': 'Sections Modulaires',
    'home.feat.modular.desc': 'Ajoutez, supprimez, réorganisez et renommez librement.',
    'home.feat.palette.title': 'Palettes Personnalisées',
    'home.feat.palette.desc': 'Couleurs, thèmes sombre/clair et polices sur mesure.',
    'home.feat.deploy.title': 'Déploiement Instantané',
    'home.feat.deploy.desc': 'URLs partageables (/p/:slug) en 1 clic.',
    'home.feat.rated.title': 'Noté par la Communauté',
    'home.feat.rated.desc': "Avis réels et notes de 1 à 5 étoiles.",
    'home.section.title': 'Modèles Sélectionnés',
    'home.section.subtitle': 'Choisissez un design pour commencer. Notez, commentez et ajustez chaque détail.',
    'home.filter.all': 'Tous les types',
    'home.filter.portfolios': 'Portfolios Web',
    'home.filter.cvs': 'CV / Résumés',
    'home.cat.all': 'Toutes disciplines',
    'home.cat.Tech': 'Tech',
    'home.cat.Creative': 'Créatif',
    'home.cat.Executive': 'Cadre',
    'home.search.placeholder': 'Rechercher des modèles...',
    'footer.copy': '© 2026 ProTemp Studio. Plateforme de création de portfolios et de CV.',
    'auth.title': 'Enregistrer votre Portfolio',
    'auth.subtitle': 'Créez un compte gratuit pour sauvegarder et déployer votre travail.',
    'auth.name': 'Votre nom',
    'auth.headline': 'Titre professionnel',
    'auth.bio': 'Courte biographie',
    'auth.submit': 'Créer un compte et sauvegarder',
    'auth.close': 'Fermer',
  },

  ar: {
    'nav.templates': 'القوالب والمعرض',
    'nav.editor': 'محرر الاستوديو',
    'nav.publicView': 'عرض عام',
    'nav.deploy': 'نشر / توزيع',
    'nav.deployed': 'تم النشر!',
    'nav.login': 'تسجيل الدخول / إنشاء حساب',
    'nav.logout': 'تسجيل الخروج',
    'nav.member': 'عضو',
    'nav.subtitle': 'منشئ الملف الشخصي والسيرة الذاتية',
    'home.badge': 'منشئ مزدوج: ملفات تعريف تفاعلية وسير ذاتية جاهزة لـ ATS',
    'home.heroTitle1': 'أنشئ، خصّص وانشر',
    'home.heroTitle2': 'ملفك الشخصي وسيرتك الذاتية',
    'home.heroDesc':
      'اختر قالبًا موثّقًا، وخصّص كل قسم وعنوان وخط ولون في الوقت الفعلي. اختبر وشارك علنًا قبل إنشاء حساب—تتزامن تعديلاتك تلقائيًا عند تسجيل الدخول.',
    'home.cta.launch': 'إطلاق محرر الاستوديو',
    'home.cta.browse': 'تصفح القوالب',
    'home.feat.modular.title': 'أقسام معيارية',
    'home.feat.modular.desc': 'أضف واحذف ورتّب وأعد تسمية العناوين بحرية.',
    'home.feat.palette.title': 'لوحات ألوان مخصصة',
    'home.feat.palette.desc': 'ألوان مخصصة وسمات داكنة/فاتحة وخطوط متنوعة.',
    'home.feat.deploy.title': 'نشر فوري',
    'home.feat.deploy.desc': 'روابط قابلة للمشاركة (/p/:slug) بنقرة واحدة.',
    'home.feat.rated.title': 'مُقيَّم من المجتمع',
    'home.feat.rated.desc': 'تقييمات حقيقية من 1 إلى 5 نجوم.',
    'home.section.title': 'قوالب مختارة',
    'home.section.subtitle': 'اختر تصميمًا للبدء بالتخصيص. يمكنك تقييم ومراجعة وضبط كل تفصيلة.',
    'home.filter.all': 'جميع الأنواع',
    'home.filter.portfolios': 'محافظ ويب',
    'home.filter.cvs': 'سير ذاتية / CVs',
    'home.cat.all': 'جميع التخصصات',
    'home.cat.Tech': 'تقنية',
    'home.cat.Creative': 'إبداعية',
    'home.cat.Executive': 'تنفيذية',
    'home.search.placeholder': 'ابحث في القوالب...',
    'footer.copy': '© 2026 ProTemp Studio. منصة إنشاء الملفات الشخصية والسير الذاتية.',
    'auth.title': 'حفظ ملفك الشخصي',
    'auth.subtitle': 'أنشئ حسابًا مجانيًا لحفظ ونشر عملك.',
    'auth.name': 'اسمك',
    'auth.headline': 'العنوان المهني',
    'auth.bio': 'نبذة قصيرة',
    'auth.submit': 'إنشاء حساب وحفظ',
    'auth.close': 'إغلاق',
  },
};
