import React from 'react';
import { GraduationCap, Mail, Calendar, User } from 'lucide-react';

export function Profile() {
  const userName  = localStorage.getItem('userName')  || 'Student';
  const userEmail = localStorage.getItem('userEmail') || 'student@example.com';
  const initials  = userName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'ST';

  const infoItems = [
    { icon: User,          label: 'Full Name',     value: userName                  },
    { icon: Mail,          label: 'Email Address', value: userEmail                 },
    { icon: Calendar,      label: 'Joined',        value: 'September 2025'          },
    { icon: GraduationCap, label: 'Program',       value: 'B.Tech Computer Science' },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-text-main mb-2">My Profile</h1>
        <p className="text-text-muted">Your account information and details.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Avatar card */}
        <div className="bg-surface rounded-[24px] p-8 border border-border/50 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 rounded-full bg-[#7C8262] text-white text-3xl font-bold flex items-center justify-center mb-4">
            {initials}
          </div>
          <p className="text-xl font-bold text-text-main">{userName}</p>
          <p className="text-sm text-text-muted mt-1">Student</p>
          <span className="mt-4 px-4 py-1.5 rounded-full bg-success-bg text-success-text text-xs font-medium">
            Active
          </span>
        </div>

        {/* Details card */}
        <div className="bg-surface rounded-[24px] p-8 border border-border/50 lg:col-span-2">
          <h2 className="text-lg font-bold text-text-main mb-6">Account Details</h2>
          <div className="space-y-4">
            {infoItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-border">
                  <div className="w-10 h-10 rounded-lg bg-[#F0F2E9] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[#4A5D4E]" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">{item.label}</p>
                    <p className="text-sm font-medium text-text-main mt-0.5">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
