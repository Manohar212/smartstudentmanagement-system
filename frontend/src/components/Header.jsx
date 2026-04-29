import React, { useState, useEffect, useRef } from 'react';
import { Menu, Search, Bell, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Keyword → route mapping for global search
const SEARCH_ROUTES = {
  attendance:  '/attendance',
  schedule:    '/schedule',
  assignments: '/assignments',
  assignment:  '/assignments',
  ai:          '/ai',
  smart:       '/ai',
  courses:     '/courses',
  course:      '/courses',
  grades:      '/grades',
  grade:       '/grades',
  profile:     '/profile',
  dashboard:   '/',
};

const INITIAL_NOTIFICATIONS = [
  { id: 1, text: 'You need to revise Data Structures',      time: '2h ago', read: false },
  { id: 2, text: 'Assignment due tomorrow: Web Dev Project', time: '4h ago', read: false },
  { id: 3, text: 'Low attendance alert in DBMS',            time: '1d ago', read: true  },
];

export function Header({ onMenuClick }) {
  const navigate = useNavigate();
  const [searchOpen,     setSearchOpen]     = useState(false);
  const [searchQuery,    setSearchQuery]    = useState('');
  const [notifOpen,      setNotifOpen]      = useState(false);
  const [notifications,  setNotifications]  = useState(INITIAL_NOTIFICATIONS);
  const notifRef = useRef(null);

  // Dynamic initials from localStorage
  const userName = localStorage.getItem('userName') || '';
  const initials  = userName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'ST';
  const unreadCount = notifications.filter(n => !n.read).length;

  // Close notification dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (e) => {
    if (e.key !== 'Enter') return;
    const keyword = searchQuery.toLowerCase().trim();
    for (const [key, path] of Object.entries(SEARCH_ROUTES)) {
      if (keyword.includes(key)) {
        navigate(path);
        setSearchOpen(false);
        setSearchQuery('');
        return;
      }
    }
  };

  const markRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <header className="h-20 px-6 lg:px-8 flex items-center justify-between w-full">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 rounded-lg hover:bg-white/50 text-text-main lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Expanded search input */}
        {searchOpen && (
          <div className="flex items-center gap-2">
            <input
              autoFocus
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search pages..."
              className="px-3 py-1.5 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red text-text-main bg-surface w-52"
            />
            <button
              onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
              className="text-text-muted hover:text-text-main transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        {/* Search icon — hidden when input is open */}
        {!searchOpen && (
          <button
            onClick={() => setSearchOpen(true)}
            className="text-text-main hover:text-black transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
        )}

        {/* Notification bell + dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(prev => !prev)}
            className="relative text-text-main hover:text-black transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-brand-red rounded-full border border-bg-beige"></span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-9 w-80 bg-surface border border-border rounded-2xl shadow-lg z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <h3 className="font-bold text-text-main text-sm">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="text-xs text-text-muted">{unreadCount} unread</span>
                )}
              </div>
              <div className="divide-y divide-border max-h-72 overflow-y-auto">
                {notifications.map(n => (
                  <div
                    key={n.id}
                    onClick={() => markRead(n.id)}
                    className={`px-4 py-3 cursor-pointer hover:bg-bg-beige/50 transition-colors ${!n.read ? 'bg-error-bg/20' : ''}`}
                  >
                    <p className={`text-sm ${!n.read ? 'font-medium text-text-main' : 'text-text-muted'}`}>
                      {n.text}
                    </p>
                    <p className="text-xs text-text-muted mt-1">{n.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile avatar → /profile */}
        <button
          onClick={() => navigate('/profile')}
          className="w-9 h-9 rounded-full bg-[#7C8262] text-white text-sm font-medium flex items-center justify-center hover:opacity-85 transition-opacity"
        >
          {initials}
        </button>
      </div>
    </header>
  );
}
