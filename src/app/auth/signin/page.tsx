'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { useLanguage } from '@/contexts/LanguageContext';

type AuthMethod = 'email' | 'phone';

export default function SignInPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [authMethod, setAuthMethod] = useState<AuthMethod>('email');
  
  // 邮箱登录状态
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // 手机号登录状态
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);

  // 发送验证码
  const handleSendCode = async () => {
    if (!phone.trim()) {
      setError(t('auth.error.phoneRequired'));
      return;
    }

    setError('');
    setSendingCode(true);

    const { error: sendError } = await auth.sendPhoneOTP(phone);

    if (sendError) {
      setError(sendError.message || t('auth.error.codeSentFailed'));
      setSendingCode(false);
      return;
    }

    setCodeSent(true);
    setSendingCode(false);
    setCountdown(60);

    // 倒计时
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // 邮箱登录
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { user, error: authError } = await auth.signIn(email, password);

    if (authError || !user) {
      setError(authError?.message || t('auth.error.signinFailed'));
      setLoading(false);
      return;
    }

    router.push('/');
    router.refresh();
  };

  // 手机号登录
  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!code.trim()) {
      setError(t('auth.error.codeRequired'));
      return;
    }

    setLoading(true);

    const { user, error: authError } = await auth.signInWithPhone(phone, code);

    if (authError || !user) {
      setError(authError?.message || t('auth.error.phoneFailed'));
      setLoading(false);
      return;
    }

    router.push('/');
    router.refresh();
  };

  // Google 登录
  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    const { error: authError } = await auth.signInWithGoogle();

    if (authError) {
      setError(authError.message);
      setLoading(false);
    }
    // Google OAuth 会重定向，不需要手动跳转
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 返回按钮 */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4">
        <Link 
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t('card.back')}
        </Link>
      </div>

      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t('auth.signin.title')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t('auth.signin.subtitle')}
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Google 登录按钮 */}
        <div>
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {t('auth.withGoogle')}
          </button>
        </div>

        {/* 分隔线 */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-50 text-gray-500">{t('auth.divider')}</span>
          </div>
        </div>

        {/* 登录方式切换 */}
        <div className="flex gap-2 border-b border-gray-200">
          <button
            onClick={() => {
              setAuthMethod('email');
              setError('');
              setCodeSent(false);
            }}
            className={`flex-1 py-2 text-sm font-medium border-b-2 transition-colors ${
              authMethod === 'email'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t('auth.withEmail')}
          </button>
          <button
            onClick={() => {
              setAuthMethod('phone');
              setError('');
              setCodeSent(false);
            }}
            className={`flex-1 py-2 text-sm font-medium border-b-2 transition-colors ${
              authMethod === 'phone'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t('auth.withPhone')}
          </button>
        </div>

        {/* 邮箱登录表单 */}
        {authMethod === 'email' && (
          <form className="mt-8 space-y-6" onSubmit={handleEmailSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">
                  {t('auth.email')}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder={t('auth.email')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  {t('auth.password')}
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder={t('auth.password')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? t('auth.loading') : t('auth.signin.button')}
              </button>
            </div>
          </form>
        )}

        {/* 手机号登录表单 */}
        {authMethod === 'phone' && (
          <form className="mt-8 space-y-6" onSubmit={handlePhoneSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('auth.phone')}
                </label>
                <div className="flex gap-2">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="flex-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder={t('auth.phonePlaceholder')}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={codeSent}
                  />
                  <button
                    type="button"
                    onClick={handleSendCode}
                    disabled={sendingCode || countdown > 0 || !phone.trim()}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {countdown > 0 ? `${countdown}s` : codeSent ? t('auth.resendCode') : t('auth.sendCode')}
                  </button>
                </div>
                {codeSent && (
                  <p className="mt-1 text-xs text-green-600">{t('auth.codeSent')}</p>
                )}
              </div>
              
              {/* 验证码输入框 - 始终显示 */}
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('auth.verificationCode')}
                </label>
                <input
                  id="code"
                  name="code"
                  type="text"
                  required
                  maxLength={6}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder={t('auth.verificationCodePlaceholder')}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                  disabled={!codeSent}
                />
              </div>
            </div>

            {/* 确定按钮 - 始终显示 */}
            <div>
              <button
                type="submit"
                disabled={loading || !codeSent || !code.trim()}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? t('auth.loading') : t('auth.signin.button')}
              </button>
            </div>
          </form>
        )}

        <div className="text-sm text-center">
          <Link href="/auth/signup" className="font-medium text-blue-600 hover:text-blue-500">
            {t('auth.signup.link')}
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
}
