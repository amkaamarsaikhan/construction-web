'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  calculationCredits: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  register: (userData: { name: string; age: string; phone: string; email: string }, password: string) => Promise<void>;
  signInWithPhone: (phoneNumber: string) => Promise<void>;
  confirmCode: (confirmationResult: any, code: string) => Promise<void>;
  consumeCredit: () => Promise<boolean>;
  deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        // TODO: Implement Firebase auth check
        setLoading(false);
      } catch (error) {
        console.error('Auth check failed:', error);
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // TODO: Implement Firebase login
    console.log('Login:', email);
  };

  const logout = async () => {
    setUser(null);
    // TODO: Implement Firebase logout
  };

  const signup = async (name: string, email: string, password: string) => {
    // TODO: Implement Firebase signup
    console.log('Signup:', name, email);
  };

  const register = async (userData: { name: string; age: string; phone: string; email: string }, password: string) => {
    // TODO: Implement Firebase register
    console.log('Register:', userData);
  };

  const consumeCredit = async (): Promise<boolean> => {
    // TODO: Implement credit consumption logic
    // Return true if credit is consumed, false if no credit
    return true;
  };

  const signInWithPhone = async (phoneNumber: string) => {
    // TODO: Implement Firebase phone authentication
    console.log('Sign in with phone (mock):', phoneNumber);

    // Minimal mock for confirmationResult so verify flow works during development
    (window as any).confirmationResult = {
      confirm: async (code: string) => {
        // In a real implementation this would verify the code with Firebase
        // Here we accept any 4-8 digit code for dev convenience
        if (!code || code.length < 4) {
          throw new Error('Invalid code');
        }
        return Promise.resolve({ user: { uid: 'mock-user', phoneNumber } });
      }
    };
  };

  const confirmCode = async (confirmationResult: any, code: string) => {
    // Use confirmationResult.confirm(code) to verify and set user
    try {
      const result = await confirmationResult.confirm(code);
      const u = result?.user;
      // Minimal user mapping
      setUser({
        id: u?.uid || 'user-mock',
        name: 'Хэрэглэгч',
        email: (u?.email as string) || '',
        phone: (u?.phoneNumber as string) || '',
        calculationCredits: 1
      });
    } catch (err) {
      throw err;
    }
  };

  const deleteAccount = async () => {
    // TODO: Implement Firebase account deletion
    setUser(null);
    console.log('Account deleted');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      isAuthenticated: !!user,
      login, 
      logout, 
      signup,
      register,
      signInWithPhone,
      confirmCode,
      consumeCredit,
      deleteAccount
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
