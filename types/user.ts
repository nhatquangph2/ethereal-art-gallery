export type UserRole = 'user' | 'artist' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  savedArtworks: string[]; // Array of artwork IDs
  preferences: UserPreferences;
  createdAt: string;
  // Artist-specific fields
  artistName?: string;
  artworkIds?: string[]; // IDs of artworks created by this artist
}

export interface UserPreferences {
  volume: number;
  autoPlayAudio: boolean;
  smoothScroll: boolean;
  hapticFeedback: boolean;
  language: 'vi' | 'en';
  darkMode: boolean;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isArtist: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  saveArtwork: (artworkId: string) => void;
  unsaveArtwork: (artworkId: string) => void;
  isArtworkSaved: (artworkId: string) => boolean;
  // Admin functions
  getAllUsers: () => User[];
  updateUserRole: (userId: string, role: UserRole) => void;
  deleteUser: (userId: string) => void;
}
