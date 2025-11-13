'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 翻译字典
const translations: Record<Language, Record<string, string>> = {
  zh: {
    // Sidebar
    'sidebar.logo.title': '卡片宇宙',
    'sidebar.logo.subtitle': 'Cardverse',
    'sidebar.logo.tagline': '"每一张卡片，都惊艳到你。"',
    'sidebar.categories.title': '分类浏览',
    'sidebar.category.chinese': '国风系列',
    'sidebar.category.architecture': '建筑系列',
    'sidebar.category.texture': '纹理系列',
    'sidebar.category.city': '城市系列',
    'sidebar.category.nature': '自然系列',
    'sidebar.category.aiLab': 'AI实验室',
    'sidebar.button.pricing': '价格',
    'sidebar.button.help': '帮助',
    'sidebar.user.center': '个人中心',
    'sidebar.user.logout': '退出登录',
    'sidebar.user.signup': '注册',
    'sidebar.user.signin': '登录',
    
    // Homepage
    'home.loading': '加载中...',
    'home.loadedAll': '已加载全部内容',
    
    // SearchBar
    'search.placeholder': '搜索卡片、标签、作者...',
    'search.button': '搜索',
    'search.advanced': '高级搜索',
    'search.collapse': '收起',
    'search.series': '系列',
    'search.style': '风格',
    'search.color': '色系',
    'search.allSeries': '全部系列',
    'search.allStyles': '全部风格',
    'search.allColors': '全部色系',
    'search.cancel': '取消',
    
    // Card Detail Page
    'card.back': '返回首页',
    'card.loading': '加载中...',
    'card.series.all': '该系列所有图片',
    'card.author': '作者',
    'card.uploadTime': '上传时间',
    'card.downloads': '下载',
    'card.favorite': '收藏',
    'card.share': '分享',
    'card.similar': '相似风格',
    'card.recommend': '推荐',
    
    // TextEditor
    'textEditor.addText': '添加文字',
    'textEditor.deleteText': '删除文字',
    'textEditor.font': '字体',
    'textEditor.size': '大小',
    'textEditor.bold': '加粗',
    'textEditor.italic': '斜体',
    'textEditor.color': '颜色',
    'textEditor.opacity': '半透明',
    'textEditor.download': '下载',
    'textEditor.commonColors': '常用颜色',
    'textEditor.colorWheel': '色轮',
    'textEditor.defaultFont': '默认',
    
    // License
    'license.personal.label': '个人使用授权',
    'license.personal.description': '仅限个人非商业用途使用',
    'license.commercial.label': '商业使用授权',
    'license.commercial.description': '可用于商业项目、品牌营销等',
    'license.enterprise.label': '企业授权',
    'license.enterprise.description': '企业级授权，包含API访问权限',
    'license.unknown.label': '未知授权',
    'license.unknown.description': '授权类型未知',
    'license.terms.noRedistribution': '禁止二次分发或转售',
    'license.terms.keepCopyright': '使用时需保留版权信息',
    'license.terms.legalEffect': '授权文件具有法律效力',
    'license.downloadPdf': '下载授权文件 (PDF)',
    
    // Auth
    'auth.signin.title': '登录',
    'auth.signin.subtitle': '登录您的账户',
    'auth.signin.button': '登录',
    'auth.signin.link': '已有账户？立即登录',
    'auth.signup.title': '注册',
    'auth.signup.subtitle': '创建新账户',
    'auth.signup.button': '注册',
    'auth.signup.link': '还没有账户？立即注册',
    'auth.email': '邮箱',
    'auth.password': '密码',
    'auth.nickname': '昵称',
    'auth.phone': '手机号',
    'auth.phonePlaceholder': '请输入手机号',
    'auth.verificationCode': '验证码',
    'auth.verificationCodePlaceholder': '请输入验证码',
    'auth.sendCode': '发送验证码',
    'auth.resendCode': '重新发送',
    'auth.codeSent': '验证码已发送',
    'auth.loading': '处理中...',
    'auth.error.signinFailed': '登录失败，请检查您的邮箱和密码',
    'auth.error.signupFailed': '注册失败，请重试',
    'auth.error.phoneFailed': '手机号验证失败',
    'auth.error.codeRequired': '请输入验证码',
    'auth.error.phoneRequired': '请输入手机号',
    'auth.error.codeSentFailed': '验证码发送失败',
    'auth.withGoogle': '使用 Google 账号',
    'auth.withPhone': '使用手机号',
    'auth.withEmail': '使用邮箱',
    'auth.divider': '或',
    
    // Pricing
    'pricing.title': '定价与授权',
    'pricing.subtitle': '选择适合您的会员方案',
    'pricing.visitor.title': '游客',
    'pricing.visitor.price': '免费',
    'pricing.visitor.browse': '浏览所有卡片',
    'pricing.visitor.favorite': '收藏预览',
    'pricing.visitor.hdDownload': '高清下载',
    'pricing.visitor.commercial': '商用授权',
    'pricing.visitor.current': '当前方案',
    'pricing.personal.title': '个人会员',
    'pricing.personal.recommended': '推荐',
    'pricing.personal.price': '/月',
    'pricing.personal.hdDownload': '高清下载',
    'pricing.personal.personalLicense': '个人使用授权',
    'pricing.personal.noWatermark': '无水印版本',
    'pricing.personal.subscribe': '立即订阅',
    'pricing.business.title': '商业会员',
    'pricing.business.batchDownload': '批量下载',
    'pricing.business.commercialLicense': '商用授权',
    'pricing.business.apiAccess': 'API 访问',
    'pricing.business.prioritySupport': '优先客服',
    'pricing.license.title': '授权说明',
    'pricing.license.personal.title': '个人使用授权',
    'pricing.license.personal.description': '仅限个人非商业用途，包括个人社交媒体、个人博客等。禁止用于任何商业目的。',
    'pricing.license.commercial.title': '商业使用授权',
    'pricing.license.commercial.description': '可用于品牌营销、出版印刷、广告宣传等商业用途。包含完整的版权保护。',
    
    // Help
    'help.title': '帮助中心',
    'help.gettingStarted.title': '快速入门',
    'help.gettingStarted.browse.title': '如何浏览卡片',
    'help.gettingStarted.browse.content': '在首页，您可以通过瀑布流浏览所有卡片。使用左侧分类按钮可以筛选不同系列的卡片，如免费系列、建筑系列、城市系列等。',
    'help.gettingStarted.detail.title': '如何查看卡片详情',
    'help.gettingStarted.detail.content': '点击任意卡片即可进入详情页。在详情页您可以查看该系列的所有图片，使用文字编辑器添加文字，以及查看卡片的详细信息。',
    'help.gettingStarted.editor.title': '如何使用文字编辑器',
    'help.gettingStarted.editor.content': '在卡片详情页，您可以使用文字编辑器在卡片上添加文字。您可以调整字体、大小、颜色、透明度等，然后下载带文字的卡片。',
    'help.account.title': '账户与会员',
    'help.account.register.title': '注册与登录',
    'help.account.register.content': '您可以通过邮箱、Google账号或手机号验证码三种方式注册和登录。注册后即可开始浏览和收藏卡片。',
    'help.account.membership.title': '会员权益说明',
    'help.account.membership.content': '游客可以浏览和收藏预览；个人会员可以下载高清图片并获得个人使用授权；商业会员可以批量下载、获得商用授权并访问API。',
    'help.account.upgrade.title': '如何升级会员',
    'help.account.upgrade.content': '访问定价页面，选择适合您的会员方案，点击"立即订阅"按钮完成支付即可升级。',
    'help.download.title': '下载与授权',
    'help.download.how.title': '如何下载卡片',
    'help.download.how.content': '游客用户只能预览卡片。个人会员和商业会员可以在卡片详情页点击下载按钮，下载高清版本的卡片。',
    'help.download.license.title': '授权类型说明',
    'help.download.license.content': '个人使用授权仅限个人非商业用途；商业使用授权可用于品牌营销、出版印刷、广告宣传等商业用途。',
    'help.download.file.title': '授权文件',
    'help.download.file.content': '购买授权后，系统会自动生成授权文件（PDF）。您可以在个人中心查看和下载授权文件，该文件具有法律效力。',
    'help.faq.title': '常见问题',
    'help.faq.tech1.q': '图片加载慢怎么办？',
    'help.faq.tech1.a': '请检查您的网络连接。如果问题持续，可以尝试刷新页面或清除浏览器缓存。',
    'help.faq.tech2.q': '文字编辑器无法使用？',
    'help.faq.tech2.a': '请确保您使用的是现代浏览器（Chrome、Firefox、Safari、Edge）。如果问题仍然存在，请尝试刷新页面。',
    'help.faq.tech3.q': '下载失败怎么办？',
    'help.faq.tech3.a': '请检查您的会员状态和网络连接。如果问题持续，请联系客服。',
    'help.faq.account1.q': '忘记密码怎么办？',
    'help.faq.account1.a': '在登录页面点击"忘记密码"链接，输入您的邮箱地址，系统会发送密码重置邮件。',
    'help.faq.account2.q': '如何修改个人信息？',
    'help.faq.account2.a': '登录后进入个人中心，您可以修改昵称、邮箱等个人信息。',
    'help.faq.account3.q': '如何取消订阅？',
    'help.faq.account3.a': '在个人中心的会员管理页面，您可以取消自动续费。取消后，当前会员有效期内的权益仍然有效。',
    'help.faq.license1.q': '个人授权能否商用？',
    'help.faq.license1.a': '不可以。个人使用授权仅限个人非商业用途。如需商用，请升级至商业会员。',
    'help.faq.license2.q': '授权文件丢失怎么办？',
    'help.faq.license2.a': '您可以在个人中心的"我的授权"页面重新下载授权文件。',
    'help.faq.license3.q': '授权有效期多长？',
    'help.faq.license3.a': '个人会员和商业会员的授权在会员有效期内持续有效。会员到期后，需要续费才能继续使用。',
    'help.faq.payment1.q': '支持哪些支付方式？',
    'help.faq.payment1.a': '我们支持支付宝、微信支付、信用卡等多种支付方式。',
    'help.faq.payment2.q': '退款政策',
    'help.faq.payment2.a': '会员订阅支持7天内无理由退款。如有问题，请联系客服。',
    'help.faq.payment3.q': '如何开具发票？',
    'help.faq.payment3.a': '购买会员后，您可以在个人中心申请开具发票。我们会在3-5个工作日内处理您的申请。',
    'help.guidelines.title': '使用规范',
    'help.guidelines.content.title': '内容使用规范',
    'help.guidelines.content.allowed': '允许的使用场景：个人社交媒体分享、个人博客、个人作品集展示等。',
    'help.guidelines.content.prohibited': '禁止的使用场景：未经授权的商业用途、二次销售、恶意修改等。',
    'help.guidelines.content.copyright': '版权保护说明：所有卡片均受版权保护，使用时需遵守相应的授权条款。',
    'help.contact.title': '联系我们',
    'help.contact.support.title': '客服支持',
    'help.contact.support.email': '邮箱：support@cardverse.com',
    'help.contact.support.time': '响应时间：工作日24小时内回复',
    'help.contact.feedback.title': '反馈建议',
    'help.contact.feedback.content': '如果您有任何功能建议或问题反馈，欢迎通过邮箱联系我们。',
    'help.contact.social.title': '社交媒体',
    'help.contact.social.content': '关注我们的官方账号，获取最新动态和更新。',
  },
  en: {
    // Sidebar
    'sidebar.logo.title': 'Cardverse',
    'sidebar.logo.subtitle': 'Cardverse',
    'sidebar.logo.tagline': '"Every card amazes you."',
    'sidebar.categories.title': 'Categories',
    'sidebar.category.chinese': 'Chinese Style',
    'sidebar.category.architecture': 'Architecture Series',
    'sidebar.category.texture': 'Texture Series',
    'sidebar.category.city': 'City Series',
    'sidebar.category.nature': 'Nature Series',
    'sidebar.category.aiLab': 'AI Lab',
    'sidebar.button.pricing': 'Pricing',
    'sidebar.button.help': 'Help',
    'sidebar.user.center': 'Account',
    'sidebar.user.logout': 'Logout',
    'sidebar.user.signup': 'Sign Up',
    'sidebar.user.signin': 'Sign In',
    
    // Homepage
    'home.loading': 'Loading...',
    'home.loadedAll': 'All content loaded',
    
    // SearchBar
    'search.placeholder': 'Search cards, tags, authors...',
    'search.button': 'Search',
    'search.advanced': 'Advanced Search',
    'search.collapse': 'Collapse',
    'search.series': 'Series',
    'search.style': 'Style',
    'search.color': 'Color',
    'search.allSeries': 'All Series',
    'search.allStyles': 'All Styles',
    'search.allColors': 'All Colors',
    'search.cancel': 'Cancel',
    
    // Card Detail Page
    'card.back': 'Back to Home',
    'card.loading': 'Loading...',
    'card.series.all': 'All Images in This Series',
    'card.author': 'Author',
    'card.uploadTime': 'Upload Time',
    'card.downloads': 'Downloads',
    'card.favorite': 'Favorite',
    'card.share': 'Share',
    'card.similar': 'Similar Style',
    'card.recommend': 'Recommend',
    
    // TextEditor
    'textEditor.addText': 'Add Text',
    'textEditor.deleteText': 'Delete Text',
    'textEditor.font': 'Font',
    'textEditor.size': 'Size',
    'textEditor.bold': 'Bold',
    'textEditor.italic': 'Italic',
    'textEditor.color': 'Color',
    'textEditor.opacity': 'Opacity',
    'textEditor.download': 'Download',
    'textEditor.commonColors': 'Common Colors',
    'textEditor.colorWheel': 'Color Wheel',
    'textEditor.defaultFont': 'Default',
    
    // License
    'license.personal.label': 'Personal Use License',
    'license.personal.description': 'For personal, non-commercial use only',
    'license.commercial.label': 'Commercial License',
    'license.commercial.description': 'For commercial projects, brand marketing, etc.',
    'license.enterprise.label': 'Enterprise License',
    'license.enterprise.description': 'Enterprise-level license with API access',
    'license.unknown.label': 'Unknown License',
    'license.unknown.description': 'License type unknown',
    'license.terms.noRedistribution': 'No redistribution or resale',
    'license.terms.keepCopyright': 'Copyright information must be retained',
    'license.terms.legalEffect': 'License file has legal effect',
    'license.downloadPdf': 'Download License File (PDF)',
    
    // Auth
    'auth.signin.title': 'Sign In',
    'auth.signin.subtitle': 'Sign in to your account',
    'auth.signin.button': 'Sign In',
    'auth.signin.link': 'Already have an account? Sign in',
    'auth.signup.title': 'Sign Up',
    'auth.signup.subtitle': 'Create a new account',
    'auth.signup.button': 'Sign Up',
    'auth.signup.link': "Don't have an account? Sign up",
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.nickname': 'Nickname',
    'auth.phone': 'Phone Number',
    'auth.phonePlaceholder': 'Enter phone number',
    'auth.verificationCode': 'Verification Code',
    'auth.verificationCodePlaceholder': 'Enter verification code',
    'auth.sendCode': 'Send Code',
    'auth.resendCode': 'Resend',
    'auth.codeSent': 'Code sent',
    'auth.loading': 'Loading...',
    'auth.error.signinFailed': 'Sign in failed. Please check your email and password',
    'auth.error.signupFailed': 'Sign up failed. Please try again',
    'auth.error.phoneFailed': 'Phone verification failed',
    'auth.error.codeRequired': 'Please enter verification code',
    'auth.error.phoneRequired': 'Please enter phone number',
    'auth.error.codeSentFailed': 'Failed to send verification code',
    'auth.withGoogle': 'Continue with Google',
    'auth.withPhone': 'Continue with Phone',
    'auth.withEmail': 'Continue with Email',
    'auth.divider': 'or',
    
    // Pricing
    'pricing.title': 'Pricing & Licensing',
    'pricing.subtitle': 'Choose the membership plan that suits you',
    'pricing.visitor.title': 'Visitor',
    'pricing.visitor.price': 'Free',
    'pricing.visitor.browse': 'Browse all cards',
    'pricing.visitor.favorite': 'Favorite preview',
    'pricing.visitor.hdDownload': 'HD Download',
    'pricing.visitor.commercial': 'Commercial License',
    'pricing.visitor.current': 'Current Plan',
    'pricing.personal.title': 'Personal Member',
    'pricing.personal.recommended': 'Recommended',
    'pricing.personal.price': '/month',
    'pricing.personal.hdDownload': 'HD Download',
    'pricing.personal.personalLicense': 'Personal Use License',
    'pricing.personal.noWatermark': 'Watermark-free Version',
    'pricing.personal.subscribe': 'Subscribe Now',
    'pricing.business.title': 'Business Member',
    'pricing.business.batchDownload': 'Batch Download',
    'pricing.business.commercialLicense': 'Commercial License',
    'pricing.business.apiAccess': 'API Access',
    'pricing.business.prioritySupport': 'Priority Support',
    'pricing.license.title': 'License Information',
    'pricing.license.personal.title': 'Personal Use License',
    'pricing.license.personal.description': 'For personal, non-commercial use only, including personal social media, personal blogs, etc. Prohibited for any commercial purposes.',
    'pricing.license.commercial.title': 'Commercial Use License',
    'pricing.license.commercial.description': 'Can be used for brand marketing, publishing, printing, advertising and other commercial purposes. Includes complete copyright protection.',
    
    // Help
    'help.title': 'Help Center',
    'help.gettingStarted.title': 'Getting Started',
    'help.gettingStarted.browse.title': 'How to Browse Cards',
    'help.gettingStarted.browse.content': 'On the homepage, you can browse all cards through the masonry grid. Use the category buttons on the left to filter cards by series, such as Free Series, Architecture Series, City Series, etc.',
    'help.gettingStarted.detail.title': 'How to View Card Details',
    'help.gettingStarted.detail.content': 'Click on any card to enter the detail page. On the detail page, you can view all images in the series, use the text editor to add text, and view card information.',
    'help.gettingStarted.editor.title': 'How to Use the Text Editor',
    'help.gettingStarted.editor.content': 'On the card detail page, you can use the text editor to add text to cards. You can adjust font, size, color, opacity, etc., and then download the card with text.',
    'help.account.title': 'Account & Membership',
    'help.account.register.title': 'Registration & Login',
    'help.account.register.content': 'You can register and login using email, Google account, or phone number verification code. After registration, you can start browsing and favoriting cards.',
    'help.account.membership.title': 'Membership Benefits',
    'help.account.membership.content': 'Visitors can browse and favorite previews; Personal members can download HD images and get personal use licenses; Business members can batch download, get commercial licenses, and access APIs.',
    'help.account.upgrade.title': 'How to Upgrade Membership',
    'help.account.upgrade.content': 'Visit the pricing page, select the membership plan that suits you, and click "Subscribe Now" to complete payment and upgrade.',
    'help.download.title': 'Download & License',
    'help.download.how.title': 'How to Download Cards',
    'help.download.how.content': 'Visitor users can only preview cards. Personal and business members can click the download button on the card detail page to download HD versions of cards.',
    'help.download.license.title': 'License Types',
    'help.download.license.content': 'Personal use licenses are limited to personal, non-commercial use; Commercial use licenses can be used for brand marketing, publishing, printing, advertising, and other commercial purposes.',
    'help.download.file.title': 'License Files',
    'help.download.file.content': 'After purchasing a license, the system will automatically generate a license file (PDF). You can view and download license files in your account center. These files have legal effect.',
    'help.faq.title': 'Frequently Asked Questions',
    'help.faq.tech1.q': 'What if images load slowly?',
    'help.faq.tech1.a': 'Please check your network connection. If the problem persists, try refreshing the page or clearing your browser cache.',
    'help.faq.tech2.q': 'Text editor not working?',
    'help.faq.tech2.a': 'Please ensure you are using a modern browser (Chrome, Firefox, Safari, Edge). If the problem persists, try refreshing the page.',
    'help.faq.tech3.q': 'What if download fails?',
    'help.faq.tech3.a': 'Please check your membership status and network connection. If the problem persists, please contact customer service.',
    'help.faq.account1.q': 'Forgot password?',
    'help.faq.account1.a': 'On the login page, click the "Forgot Password" link, enter your email address, and the system will send a password reset email.',
    'help.faq.account2.q': 'How to modify personal information?',
    'help.faq.account2.a': 'After logging in, go to your account center where you can modify your nickname, email, and other personal information.',
    'help.faq.account3.q': 'How to cancel subscription?',
    'help.faq.account3.a': 'In the membership management page of your account center, you can cancel auto-renewal. After cancellation, your current membership benefits remain valid until the expiration date.',
    'help.faq.license1.q': 'Can personal license be used commercially?',
    'help.faq.license1.a': 'No. Personal use licenses are limited to personal, non-commercial use only. For commercial use, please upgrade to a business membership.',
    'help.faq.license2.q': 'What if license file is lost?',
    'help.faq.license2.a': 'You can re-download license files in the "My Licenses" page of your account center.',
    'help.faq.license3.q': 'How long is the license valid?',
    'help.faq.license3.a': 'Personal and business member licenses remain valid during the membership period. After membership expires, renewal is required to continue use.',
    'help.faq.payment1.q': 'What payment methods are supported?',
    'help.faq.payment1.a': 'We support Alipay, WeChat Pay, credit cards, and other payment methods.',
    'help.faq.payment2.q': 'Refund Policy',
    'help.faq.payment2.a': 'Membership subscriptions support a 7-day no-questions-asked refund. If you have any issues, please contact customer service.',
    'help.faq.payment3.q': 'How to request an invoice?',
    'help.faq.payment3.a': 'After purchasing a membership, you can request an invoice in your account center. We will process your request within 3-5 business days.',
    'help.guidelines.title': 'Usage Guidelines',
    'help.guidelines.content.title': 'Content Usage Guidelines',
    'help.guidelines.content.allowed': 'Allowed use cases: Personal social media sharing, personal blogs, personal portfolio displays, etc.',
    'help.guidelines.content.prohibited': 'Prohibited use cases: Unauthorized commercial use, resale, malicious modification, etc.',
    'help.guidelines.content.copyright': 'Copyright Protection: All cards are protected by copyright and must be used in accordance with the corresponding license terms.',
    'help.contact.title': 'Contact Us',
    'help.contact.support.title': 'Customer Support',
    'help.contact.support.email': 'Email: support@cardverse.com',
    'help.contact.support.time': 'Response Time: Within 24 hours on business days',
    'help.contact.feedback.title': 'Feedback & Suggestions',
    'help.contact.feedback.content': 'If you have any feature suggestions or feedback, please contact us via email.',
    'help.contact.social.title': 'Social Media',
    'help.contact.social.content': 'Follow our official accounts for the latest updates and news.',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('zh');

  // 从localStorage读取语言设置
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'zh' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // 切换语言
  const toggleLanguage = () => {
    const newLanguage = language === 'zh' ? 'en' : 'zh';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  // 翻译函数
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

