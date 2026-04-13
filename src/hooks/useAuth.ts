// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';

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

  // Function to load user from localStorage
  const loadUser = () => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  // Check for existing session on mount
  useEffect(() => {
    loadUser();

    // Listen for storage changes (when logout happens in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user' || e.key === 'token') {
        loadUser();
      }
    };

    // Custom event for same-tab updates
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

  // Sign Up - Register new user
  const signUp = async (email: string, password: string, name: string): Promise<AuthResponse> => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      if (data.success) {
        const newUser = {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
        };
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
        
        // Notify other components
        window.dispatchEvent(new Event('auth-change'));
        
        return { success: true, user: newUser };
      }
      return { success: false, message: 'Signup failed' };
    } catch (error: any) {
      console.error('Signup error:', error);
      return { success: false, message: error.message };
    }
  };

  // Sign In - Login existing user
  const signIn = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      if (data.success) {
        const userData = {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
        };
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        
        // Notify other components
        window.dispatchEvent(new Event('auth-change'));
        
        return { success: true, user: userData };
      }
      return { success: false, message: 'Login failed' };
    } catch (error: any) {
      console.error('Login error:', error);
      return { success: false, message: error.message };
    }
  };

  // Sign Out - Clear all user data
  const signOut = async (): Promise<void> => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tempUser');
    localStorage.removeItem('tempToken');
    setUser(null);
    
    // Notify other components
    window.dispatchEvent(new Event('auth-change'));
  };

  // Check if user is authenticated
  const isAuthenticated = (): boolean => {
    return !!user && !!localStorage.getItem('token');
  };

  // Get current user
  const getCurrentUser = (): User | null => {
    return user;
  };

  // Update user data
  const updateUser = (updatedUser: User): void => {
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    window.dispatchEvent(new Event('auth-change'));
  };

  return { 
    user, 
    loading, 
    signIn, 
    signUp, 
    signOut,
    isAuthenticated,
    getCurrentUser,
    updateUser
  };
}