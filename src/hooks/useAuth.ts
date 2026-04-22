// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
const API_BASE = "https://thepridetime.onrender.com";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthResponse {
  success: boolean;
  message?: string;
  user?: User;
  token?: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ----------------------------
  // Load user from localStorage
  // ----------------------------
  const loadUser = () => {
    try {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (!storedUser || !token) {
        setUser(null);
        return;
      }

      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

    } catch (error) {
      console.error("Auth load failed:", error);

      // clear corrupted data
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('userId'); // 🔥 FIX ADDED

      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------
  // Sync helper
  // ----------------------------
  const syncAuth = (newUser: User | null) => {
    setUser(newUser);
    window.dispatchEvent(new Event('auth-change'));
  };

  // ----------------------------
  // INIT
  // ----------------------------
  useEffect(() => {
    loadUser();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user' || e.key === 'token') {
        loadUser();
      }
    };

    const handleAuthChange = () => {
      loadUser();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('auth-change', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth-change', handleAuthChange);
    };
  }, []);

  // ----------------------------
  // SIGN UP
  // ----------------------------
  const signUp = async (
    email: string,
    password: string,
    name: string
  ): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.error || 'Signup failed'
        };
      }

      if (data.success) {
        const newUser: User = {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
        };

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(newUser));

        // 🔥 IMPORTANT FIX FOR RAZORPAY
        localStorage.setItem('userId', data.user.id);

        syncAuth(newUser);

        return { success: true, user: newUser };
      }

      return { success: false, message: 'Signup failed' };

    } catch (error: any) {
      console.error('Signup error:', error);
      return { success: false, message: error.message };
    }
  };

  // ----------------------------
  // SIGN IN
  // ----------------------------
  const signIn = async (
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.error || 'Login failed'
        };
      }

      if (data.success) {
        const userData: User = {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
        };

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(userData));

        // 🔥 IMPORTANT FIX FOR RAZORPAY
        localStorage.setItem('userId', data.user.id);

        syncAuth(userData);

        return { success: true, user: userData };
      }

      return { success: false, message: 'Login failed' };

    } catch (error: any) {
      console.error('Login error:', error);
      return { success: false, message: error.message };
    }
  };

  // ----------------------------
  // SIGN OUT
  // ----------------------------
  const signOut = async (): Promise<void> => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId'); // 🔥 FIX ADDED
    localStorage.removeItem('tempUser');
    localStorage.removeItem('tempToken');

    syncAuth(null);
  };

  // ----------------------------
  // CHECK AUTH
  // ----------------------------
  const isAuthenticated = (): boolean => {
    return !!user;
  };

  // ----------------------------
  // UPDATE USER
  // ----------------------------
  const updateUser = (updatedUser: User): void => {
    localStorage.setItem('user', JSON.stringify(updatedUser));
    localStorage.setItem('userId', updatedUser.id); // 🔥 FIX ADDED

    syncAuth(updatedUser);
  };

  // ----------------------------
  // RETURN
  // ----------------------------
  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    isAuthenticated,
    updateUser
  };
}