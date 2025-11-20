'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, AuthContextType, UserPreferences, UserRole } from '@/types/user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_PREFERENCES: UserPreferences = {
  volume: 70,
  autoPlayAudio: false,
  smoothScroll: true,
  hapticFeedback: true,
  language: 'vi',
  darkMode: false,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isArtist, setIsArtist] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('ethereal_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
        setIsAdmin(parsedUser.role === 'admin');
        setIsArtist(parsedUser.role === 'artist' || parsedUser.role === 'admin');
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('ethereal_user');
      }
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('ethereal_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('ethereal_user');
    }
  }, [user]);

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      // Check if user already exists
      const existingUsers = localStorage.getItem('ethereal_users');
      const users = existingUsers ? JSON.parse(existingUsers) : {};

      if (users[email]) {
        throw new Error('Email already registered');
      }

      // Create new user
      const newUser: User = {
        id: `user_${Date.now()}`,
        email,
        name,
        role: 'user', // Default role
        savedArtworks: [],
        preferences: DEFAULT_PREFERENCES,
        createdAt: new Date().toISOString(),
      };

      // Store password (in real app, this should be hashed on backend)
      users[email] = { password, user: newUser };
      localStorage.setItem('ethereal_users', JSON.stringify(users));

      // Set as current user
      setUser(newUser);
      setIsAuthenticated(true);

      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const existingUsers = localStorage.getItem('ethereal_users');
      const users = existingUsers ? JSON.parse(existingUsers) : {};

      const userRecord = users[email];
      if (!userRecord || userRecord.password !== password) {
        throw new Error('Invalid credentials');
      }

      setUser(userRecord.user);
      setIsAuthenticated(true);
      setIsAdmin(userRecord.user.role === 'admin');
      setIsArtist(userRecord.user.role === 'artist' || userRecord.user.role === 'admin');

      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    setIsArtist(false);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);

    // Update in users storage
    const existingUsers = localStorage.getItem('ethereal_users');
    if (existingUsers) {
      const users = JSON.parse(existingUsers);
      if (users[user.email]) {
        users[user.email].user = updatedUser;
        localStorage.setItem('ethereal_users', JSON.stringify(users));
      }
    }
  };

  const saveArtwork = (artworkId: string) => {
    if (!user) return;

    if (!user.savedArtworks.includes(artworkId)) {
      const updatedUser = {
        ...user,
        savedArtworks: [...user.savedArtworks, artworkId],
      };
      setUser(updatedUser);
    }
  };

  const unsaveArtwork = (artworkId: string) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      savedArtworks: user.savedArtworks.filter((id) => id !== artworkId),
    };
    setUser(updatedUser);
  };

  const isArtworkSaved = (artworkId: string): boolean => {
    if (!user) return false;
    return user.savedArtworks.includes(artworkId);
  };

  // Admin functions
  const getAllUsers = (): User[] => {
    if (!isAdmin) return [];
    const existingUsers = localStorage.getItem('ethereal_users');
    if (!existingUsers) return [];
    const users = JSON.parse(existingUsers);
    return Object.values(users).map((record: any) => record.user);
  };

  const updateUserRole = (userId: string, role: UserRole) => {
    if (!isAdmin) return;
    const existingUsers = localStorage.getItem('ethereal_users');
    if (!existingUsers) return;
    const users = JSON.parse(existingUsers);

    // Find and update user
    Object.keys(users).forEach((email) => {
      if (users[email].user.id === userId) {
        users[email].user.role = role;
      }
    });

    localStorage.setItem('ethereal_users', JSON.stringify(users));

    // Update current user if it's them
    if (user?.id === userId) {
      setUser({ ...user, role });
      setIsAdmin(role === 'admin');
      setIsArtist(role === 'artist' || role === 'admin');
    }
  };

  const deleteUser = (userId: string) => {
    if (!isAdmin) return;
    const existingUsers = localStorage.getItem('ethereal_users');
    if (!existingUsers) return;
    const users = JSON.parse(existingUsers);

    // Find and delete user
    Object.keys(users).forEach((email) => {
      if (users[email].user.id === userId) {
        delete users[email];
      }
    });

    localStorage.setItem('ethereal_users', JSON.stringify(users));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        isArtist,
        login,
        register,
        logout,
        updateProfile,
        saveArtwork,
        unsaveArtwork,
        isArtworkSaved,
        getAllUsers,
        updateUserRole,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
