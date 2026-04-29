import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, PieChart as PieChartIcon, Star, ClipboardList, ArrowRight } from 'lucide-react';

// Returns time-based greeting
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning,';
  if (hour < 17) return 'Good afternoon,';
  return 'Good evening,';
}

export function Dashboard() {
  const navigate = useNavigate();

  // Read logged-in user's name from localStorage
  const userName = localStorage.getItem('userName') || 'Student';

  const overviewCards = [
    { label: 'Courses Enrolled', value: '6',     sub: 'Active Courses',  icon: BookOpen,      bg: 'bg-brand-red',  path: '/courses'     },
    { label: 'Attendance',       value: '92.6%', sub: 'This Month',       icon: PieChartIcon,  bg: 'bg-text-main',  path: '/attendance'  },
    { label: 'Average Grade',    value: 'A-',    sub: 'This Semester',    icon: Star,          bg: 'bg-brand-red',  path: '/grades'      },
    { label: 'Assignments',      value: '4',     sub: 'Pending',          icon: ClipboardList, bg: 'bg-text-main',  path: '/assignments' },
  ];

  const schedule = [
    { time: '09:00 AM', end: '10:30 AM', subject: 'Data Structures',      room: 'Room 301', prof: 'Prof. Mehta'  },
    { time: '11:00 AM', end: '12:30 PM', subject: 'Database Management',  room: 'Room 204', prof: 'Prof. Verma',  isRed: true },
    { time: '02:00 PM', end: '03:30 PM', subject: 'Web Development',      room: 'Lab 3',    prof: 'Prof. Sharma' },
    { time: '04:00 PM', end: '05:30 PM', subject: 'Software Engineering', room: 'Room 105', prof: 'Prof. Singh',  isRed: true },
  ];

  const assignments = [
    { name: 'Database Management',           due: '18 Sep 2025' },
    { name: 'Web Development Project',       due: '20 Sep 2025' },
    { name: 'Data Structures Problem Set',   due: '25 Sep 2025' },
    { name: 'Software Engineering Case Study', due: '28 Sep 2025' },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        {/* Dynamic greeting based on time of day */}
        <p className="text-text-main text-lg mb-1">{getGreeting()}</p>
        {/* Dynamic user name from localStorage */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-main mb-6">{userName}</h1>
        <div className="w-8 h-1 bg-brand-red mb-4"></div>
        <p className="text-text-main">Stay focused and keep going.</p>
        <p className="text-text-main">You're doing great!</p>
      </div>

      {/* Overview Cards — clickable cards navigate to their pages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {overviewCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              onClick={() => card.path && navigate(card.path)}
              className={`bg-surface rounded-[20px] p-6 flex items-center gap-4 ${card.path ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
            >
              <div className={`w-14 h-14 rounded-full ${card.bg} flex items-center justify-center shrink-0`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-text-main mb-0.5">{card.label}</p>
                <p className="text-2xl font-bold text-text-main">{card.value}</p>
                <p className="text-xs text-text-muted mt-0.5">{card.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Today's Schedule */}
        <div className="bg-surface rounded-[24px] p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-text-main">Today's Schedule</h2>
            <button onClick={() => navigate('/schedule')} className="text-brand-red text-sm font-medium flex items-center gap-1 hover:text-brand-red-hover transition-colors">
              View full schedule <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-6">
            {schedule.map((item, i) => (
              <div key={i} className="flex gap-6 relative">
                {i !== schedule.length - 1 && (
                  <div className="absolute left-[88px] top-4 bottom-[-24px] w-px bg-border"></div>
                )}
                <div className="w-[72px] shrink-0 text-right">
                  <p className="text-sm font-medium text-text-main">{item.time}</p>
                  <p className="text-xs text-text-muted mt-1">{item.end}</p>
                </div>
                <div className="mt-1.5 relative z-10 w-3 h-3 rounded-full shrink-0 outline outline-4 outline-surface ml-[10px]" style={{ backgroundColor: item.isRed ? 'var(--color-brand-red)' : 'var(--color-text-main)' }}></div>
                <div className="pb-2">
                  <p className="text-sm font-bold text-text-main">{item.subject}</p>
                  <p className="text-xs text-text-muted mt-1">{item.room} · {item.prof}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Assignments */}
        <div className="bg-surface rounded-[24px] p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-text-main">Upcoming Assignments</h2>
            <button onClick={() => navigate('/assignments')} className="text-brand-red text-sm font-medium flex items-center gap-1 hover:text-brand-red-hover transition-colors">
              View all <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            {assignments.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-border">
                <div className="w-10 h-10 rounded-lg bg-bg-beige flex items-center justify-center shrink-0">
                  <ClipboardList className="w-5 h-5 text-text-main" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-text-main">{item.name}</p>
                  <p className="text-xs text-text-muted mt-1">Due: {item.due}</p>
                </div>
                <span className="px-3 py-1 bg-[#F0F2E9] text-[#4A5D4E] text-xs font-medium rounded-full">
                  Pending
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
