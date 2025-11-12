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
    'sidebar.categories.title': '分类浏览',
    'sidebar.category.free': '免费系列',
    'sidebar.category.architecture': '建筑系列',
    'sidebar.category.city': '城市系列',
    'sidebar.category.gods': '诸神系列',
    'sidebar.category.chinese': '国风系列',
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
  },
  en: {
    // Sidebar
    'sidebar.logo.title': 'Cardverse',
    'sidebar.categories.title': 'Categories',
    'sidebar.category.free': 'Free Series',
    'sidebar.category.architecture': 'Architecture',
    'sidebar.category.city': 'City Series',
    'sidebar.category.gods': 'Gods Series',
    'sidebar.category.chinese': 'Chinese Style',
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

