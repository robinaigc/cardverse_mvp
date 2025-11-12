import { supabase } from './supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export interface User {
  id: string;
  email: string;
  nickname: string;
  role: 'admin' | 'curator' | 'user' | 'creator';
  memberTier: 'none' | 'member' | 'business';
  memberExpireAt?: Date;
}

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: Date;
}

// 检查 Supabase 是否已配置
const isSupabaseConfigured = () => {
  if (typeof window === 'undefined') {
    // 服务端
    return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  } else {
    // 客户端 - 通过检查 supabase 实例的 URL 来判断
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    return !!(url && url !== 'https://placeholder.supabase.co');
  }
};

export class AuthClient {
  // 注册
  async signUp(email: string, password: string, nickname: string): Promise<{ user: User | null; error: Error | null }> {
    if (!isSupabaseConfigured()) {
      return { user: null, error: new Error('Supabase is not configured. Please check your environment variables.') };
    }
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nickname,
          }
        }
      });

      if (error) {
        return { user: null, error };
      }

      if (!data.user) {
        return { user: null, error: new Error('Registration failed') };
      }

      // 转换 Supabase 用户为应用用户
      const user = await this.mapSupabaseUserToAppUser(data.user);
      return { user, error: null };
    } catch (error) {
      return { user: null, error: error as Error };
    }
  }

  // 登录
  async signIn(email: string, password: string): Promise<{ user: User | null; error: Error | null }> {
    if (!isSupabaseConfigured()) {
      return { user: null, error: new Error('Supabase is not configured. Please check your environment variables.') };
    }
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { user: null, error };
      }

      if (!data.user) {
        return { user: null, error: new Error('Sign in failed') };
      }

      const user = await this.mapSupabaseUserToAppUser(data.user);
      return { user, error: null };
    } catch (error) {
      return { user: null, error: error as Error };
    }
  }

  // 登出
  async signOut(): Promise<{ error: Error | null }> {
    try {
      const { error } = await supabase.auth.signOut();
      return { error: error ? new Error(error.message) : null };
    } catch (error) {
      return { error: error as Error };
    }
  }

  // 获取当前用户
  async getCurrentUser(): Promise<User | null> {
    if (!isSupabaseConfigured()) {
      return null;
    }
    
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        return null;
      }

      return await this.mapSupabaseUserToAppUser(user);
    } catch (error) {
      return null;
    }
  }

  // 监听认证状态变化
  onAuthStateChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const user = await this.mapSupabaseUserToAppUser(session.user);
        callback(user);
      } else {
        callback(null);
      }
    });
  }
  
  // 获取认证状态变化的订阅（用于组件中）
  getAuthStateSubscription(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const user = await this.mapSupabaseUserToAppUser(session.user);
        callback(user);
      } else {
        callback(null);
      }
    });
  }

  // Google OAuth 登录/注册
  async signInWithGoogle(): Promise<{ error: Error | null }> {
    if (!isSupabaseConfigured()) {
      return { error: new Error('Supabase is not configured. Please check your environment variables.') };
    }
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        }
      });
      
      return { error: error ? new Error(error.message) : null };
    } catch (error) {
      return { error: error as Error };
    }
  }

  // 发送手机验证码（用于注册或登录）
  async sendPhoneOTP(phone: string): Promise<{ error: Error | null }> {
    if (!isSupabaseConfigured()) {
      return { error: new Error('Supabase is not configured. Please check your environment variables.') };
    }
    
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone,
        options: {
          channel: 'sms'
        }
      });
      
      return { error: error ? new Error(error.message) : null };
    } catch (error) {
      return { error: error as Error };
    }
  }

  // 使用手机号和验证码登录/注册
  async signInWithPhone(phone: string, token: string): Promise<{ user: User | null; error: Error | null }> {
    if (!isSupabaseConfigured()) {
      return { user: null, error: new Error('Supabase is not configured. Please check your environment variables.') };
    }
    
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone,
        token,
        type: 'sms'
      });

      if (error) {
        return { user: null, error };
      }

      if (!data.user) {
        return { user: null, error: new Error('Phone verification failed') };
      }

      const user = await this.mapSupabaseUserToAppUser(data.user);
      return { user, error: null };
    } catch (error) {
      return { user: null, error: error as Error };
    }
  }

  // 将 Supabase 用户映射为应用用户
  private async mapSupabaseUserToAppUser(supabaseUser: SupabaseUser): Promise<User> {
    // 从 user_metadata 获取 nickname
    const nickname = supabaseUser.user_metadata?.nickname 
      || supabaseUser.user_metadata?.full_name
      || supabaseUser.email?.split('@')[0] 
      || supabaseUser.phone
      || 'User';
    
    // TODO: 从数据库获取用户的 role 和 memberTier
    // 这里先使用默认值
    return {
      id: supabaseUser.id,
      email: supabaseUser.email || '',
      nickname,
      role: 'user',
      memberTier: 'none',
    };
  }
}

export const auth = new AuthClient();
