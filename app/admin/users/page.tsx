'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Search, Shield, Trash2, Crown, Palette, User as UserIcon, Calendar, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useHaptic } from '@/lib/haptic';
import type { User, UserRole } from '@/types/user';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

export default function AdminUsersPage() {
  const router = useRouter();
  const { user, isAdmin, getAllUsers, updateUserRole, deleteUser } = useAuth();
  const { onTap } = useHaptic();

  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole | 'all'>('all');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      router.push('/');
    }
  }, [isAdmin, router]);

  // Load users
  useEffect(() => {
    if (isAdmin) {
      const allUsers = getAllUsers();
      setUsers(allUsers);
    }
  }, [isAdmin, getAllUsers]);

  // Filter users based on search and role
  const filteredUsers = users.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || u.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    onTap();
    updateUserRole(userId, newRole);
    // Refresh users list
    const allUsers = getAllUsers();
    setUsers(allUsers);
  };

  const handleDeleteUser = (userId: string) => {
    onTap();
    deleteUser(userId);
    setDeleteConfirm(null);
    // Refresh users list
    const allUsers = getAllUsers();
    setUsers(allUsers);
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <Crown className="h-5 w-5 text-gold-leaf" />;
      case 'artist':
        return <Palette className="h-5 w-5 text-purple-500" />;
      default:
        return <UserIcon className="h-5 w-5 text-stone-gray/60" />;
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'bg-gold-leaf/20 text-gold-leaf border-gold-leaf/30';
      case 'artist':
        return 'bg-purple-500/20 text-purple-500 border-purple-500/30';
      default:
        return 'bg-stone-gray/20 text-stone-gray/80 border-stone-gray/30';
    }
  };

  // Generate avatar initials
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cloud-blue to-soft-sun pb-32">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-10 glass-strong"
      >
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/settings" onClick={onTap}>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/30"
              aria-label="Back to settings"
            >
              <ArrowLeft className="h-5 w-5 text-stone-gray" />
            </motion.button>
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-gold-leaf" />
            <h1 className="font-display text-xl font-semibold text-stone-gray">
              Admin Dashboard
            </h1>
          </div>
          <div className="w-10" />
        </div>
      </motion.header>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumbs items={[
            { label: 'Settings', href: '/settings' },
            { label: 'Admin Dashboard' }
          ]} />
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-6 grid grid-cols-3 gap-4"
        >
          <div className="glass rounded-2xl p-4 text-center">
            <p className="text-3xl font-bold text-stone-gray">{users.length}</p>
            <p className="text-sm text-stone-gray/60">Total Users</p>
          </div>
          <div className="glass rounded-2xl p-4 text-center">
            <p className="text-3xl font-bold text-purple-500">
              {users.filter((u) => u.role === 'artist').length}
            </p>
            <p className="text-sm text-stone-gray/60">Artists</p>
          </div>
          <div className="glass rounded-2xl p-4 text-center">
            <p className="text-3xl font-bold text-gold-leaf">
              {users.filter((u) => u.role === 'admin').length}
            </p>
            <p className="text-sm text-stone-gray/60">Admins</p>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 glass rounded-3xl p-6"
        >
          {/* Search */}
          <div className="mb-4 relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-gray/40" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên hoặc email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl bg-white/30 py-3 pl-12 pr-4 text-stone-gray placeholder-stone-gray/40 outline-none transition-all focus:bg-white/40"
            />
          </div>

          {/* Role Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {(['all', 'admin', 'artist', 'user'] as const).map((role) => (
              <motion.button
                key={role}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  onTap();
                  setSelectedRole(role);
                }}
                className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                  selectedRole === role
                    ? 'bg-gold-leaf text-white shadow-lg'
                    : 'bg-white/30 text-stone-gray hover:bg-white/40'
                }`}
              >
                {role === 'all' ? 'Tất cả' : role === 'admin' ? 'Admin' : role === 'artist' ? 'Nghệ sĩ' : 'User'}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Users List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="space-y-4"
        >
          {filteredUsers.length === 0 ? (
            <div className="glass rounded-3xl p-12 text-center">
              <p className="text-stone-gray/60">Không tìm thấy user nào</p>
            </div>
          ) : (
            filteredUsers.map((u, index) => (
              <motion.div
                key={u.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className="glass rounded-3xl p-6"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  {/* User Info */}
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gold-leaf text-lg font-bold text-white">
                      {getInitials(u.name)}
                    </div>

                    {/* Details */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-lg font-semibold text-stone-gray">
                          {u.name}
                        </h3>
                        {getRoleIcon(u.role)}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-stone-gray/60">
                        <Mail className="h-4 w-4" />
                        <p className="truncate">{u.email}</p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-stone-gray/50">
                        <Calendar className="h-3 w-3" />
                        <p>{new Date(u.createdAt).toLocaleDateString('vi-VN')}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3 md:items-end">
                    {/* Role Badge & Selector */}
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${getRoleBadgeColor(u.role)}`}>
                        {u.role === 'admin' ? 'Admin' : u.role === 'artist' ? 'Nghệ sĩ' : 'User'}
                      </span>

                      {/* Role Change Dropdown - Don't show for current user */}
                      {user?.id !== u.id && (
                        <select
                          value={u.role}
                          onChange={(e) => handleRoleChange(u.id, e.target.value as UserRole)}
                          className="rounded-xl bg-white/30 px-3 py-1 text-sm font-medium text-stone-gray outline-none transition-all hover:bg-white/40"
                        >
                          <option value="user">User</option>
                          <option value="artist">Artist</option>
                          <option value="admin">Admin</option>
                        </select>
                      )}
                    </div>

                    {/* Delete Button - Don't show for current user */}
                    {user?.id !== u.id && (
                      deleteConfirm === u.id ? (
                        <div className="flex gap-2">
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDeleteUser(u.id)}
                            className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-red-600"
                          >
                            Xác nhận
                          </motion.button>
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              onTap();
                              setDeleteConfirm(null);
                            }}
                            className="rounded-xl bg-white/30 px-4 py-2 text-sm font-semibold text-stone-gray transition-all hover:bg-white/40"
                          >
                            Hủy
                          </motion.button>
                        </div>
                      ) : (
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            onTap();
                            setDeleteConfirm(u.id);
                          }}
                          className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-500 transition-all hover:bg-red-500/20"
                        >
                          <Trash2 className="h-4 w-4" />
                          Xóa
                        </motion.button>
                      )
                    )}
                  </div>
                </div>

                {/* Bio */}
                {u.bio && (
                  <div className="mt-4 border-t border-white/20 pt-4">
                    <p className="text-sm text-stone-gray/70">{u.bio}</p>
                  </div>
                )}

                {/* Artist Info */}
                {(u.role === 'artist' || u.role === 'admin') && (
                  <div className="mt-4 border-t border-white/20 pt-4">
                    <div className="flex items-center gap-4 text-sm">
                      {u.artistName && (
                        <div>
                          <span className="text-stone-gray/60">Nghệ danh: </span>
                          <span className="font-semibold text-stone-gray">{u.artistName}</span>
                        </div>
                      )}
                      {u.artworkIds && u.artworkIds.length > 0 && (
                        <div>
                          <span className="text-stone-gray/60">Tác phẩm: </span>
                          <span className="font-semibold text-purple-500">{u.artworkIds.length}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-stone-gray/60">Đã lưu: </span>
                        <span className="font-semibold text-gold-leaf">{u.savedArtworks.length}</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
}
