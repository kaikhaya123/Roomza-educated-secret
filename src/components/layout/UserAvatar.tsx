'use client';

import { useState, useRef, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { User, LogOut, LayoutDashboard, UserCircle } from 'lucide-react';
import { Session } from 'next-auth';

interface UserAvatarProps {
  session: Session | null;
  isScrolled: boolean;
}

export function UserAvatar({ session, isScrolled }: UserAvatarProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getInitials = () => {
    if (session?.user?.name) {
      return session.user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
    }
    return session?.user?.email?.[0]?.toUpperCase() || 'U';
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  const handleLogout = async () => {
    setShowDropdown(false);
    await signOut({ callbackUrl: '/' });
  };

  if (!session) {
    return (
      <Link
        href="/auth/login"
        className="relative p-2 hover:opacity-80 transition flex items-center justify-center"
      >
        <User
          size={24}
          className={`${isScrolled ? 'text-gray-700' : 'text-white drop-shadow-md'}`}
        />
        <span className="sr-only">Login</span>
      </Link>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Floating Avatar */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center text-lg font-bold shadow-lg hover:shadow-2xl transition-all"
      >
        {getInitials()}
      </button>

      {/* Dropdown Card */}
      {showDropdown && (
        <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-3 duration-300">
          
        {/* User Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white flex flex-col rounded-t-2xl">
          <p className="font-semibold text-lg">{session.user?.name || session.user?.email}</p>
          <p className="text-sm opacity-90 mt-1">{session.user?.email}</p>
          {/* Gamification Example */}
          <div className="mt-2 flex items-center gap-2 text-sm">
            <span className="bg-white/30 px-2 py-0.5 rounded-full">Level 5</span>
            <span className="bg-white/30 px-2 py-0.5 rounded-full">Top Voter</span>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col py-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-5 py-2 text-gray-700 hover:bg-gray-50 transition rounded-lg"
            onClick={() => setShowDropdown(false)}
          >
            <LayoutDashboard size={16} /> Dashboard
          </Link>
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-3 px-5 py-2 text-gray-700 hover:bg-gray-50 transition rounded-lg"
            onClick={() => setShowDropdown(false)}
          >
            <User size={16} /> Profile
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-5 py-2 text-red-600 hover:bg-red-50 transition rounded-lg text-left"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>
      )}
    </div>
  );
}
