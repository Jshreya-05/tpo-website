import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCurrentUser } from '../services/api';

interface AuthState {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor';
  token: string;
}

interface AuthContextType {
  user: AuthState | null;
  isLoading: boolean;
  login: (userData: AuthState) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function readStoredUser(): AuthState | null {
  try {
    const storedUser = localStorage.getItem('userInfo');
    if (!storedUser) return null;

    const user = JSON.parse(storedUser) as AuthState;
    if (!user.token || !user._id || !['admin', 'editor'].includes(user.role)) {
      localStorage.removeItem('userInfo');
      return null;
    }
    return user;
  } catch {
    localStorage.removeItem('userInfo');
    return null;
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState(() => {
    const user = readStoredUser();
    return { user, isLoading: Boolean(user) };
  });

  useEffect(() => {
    const handleUnauthorized = () => logout();
    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, []);

  useEffect(() => {
    if (!auth.user) return;

    let active = true;
    const token = auth.user.token;
    getCurrentUser()
      .then((currentUser) => {
        if (!active) return;
        const user = { ...currentUser, token };
        localStorage.setItem('userInfo', JSON.stringify(user));
        setAuth({ user, isLoading: false });
      })
      .catch(() => {
        if (active) logout();
      });

    return () => {
      active = false;
    };
  }, []);

  const login = (userData: AuthState) => {
    localStorage.setItem('userInfo', JSON.stringify(userData));
    setAuth({ user: userData, isLoading: false });
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setAuth({ user: null, isLoading: false });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
