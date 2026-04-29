import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  PieChart, 
  Calendar, 
  FileText, 
  Sparkles, 
  LogOut,
  GraduationCap
} from 'lucide-react';
import { cn } from '../lib/utils.js';

export function Sidebar({ isOpen, setIsOpen, onLogout }) {
  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home, exact: true },
    { path: '/attendance', label: 'Attendance', icon: PieChart },
    { path: '/schedule', label: 'My Schedule', icon: Calendar },
    { path: '/assignments', label: 'Assignments', icon: FileText },
    { path: '/ai', label: 'Smart AI', icon: Sparkles },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-border transition-transform duration-300 ease-in-out flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo Area */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-red flex items-center justify-center shrink-0">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-text-main leading-tight">Smart Student</h1>
            <p className="text-[10px] text-text-muted leading-tight">Management System</p>
            <p className="text-[10px] text-text-muted mt-1 leading-tight">Student Portal</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200 text-sm font-medium",
                  isActive 
                    ? "bg-brand-red text-white" 
                    : "text-text-main hover:bg-bg-beige"
                )}
              >
                {({ isActive }) => (
                  <>
                    <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-text-main")} />
                    {item.label}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="p-4 mt-auto">
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-text-main hover:bg-bg-beige transition-colors w-auto border border-border"
          >
            <LogOut className="w-5 h-5" />
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}
