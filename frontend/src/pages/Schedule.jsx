import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, List, BookOpen } from 'lucide-react';

export function Schedule() {
  const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        const response = await fetch(`${BASE_URL}/api/schedule?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setScheduleData(data);
        }
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-text-main mb-2">My Schedule</h1>
          <p className="text-text-muted">View your classes and plan your day.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-2">
          <button className="p-2 bg-surface border border-border rounded-lg hover:bg-bg-beige transition-colors">
            <ChevronLeft className="w-5 h-5 text-text-main" />
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg font-medium text-sm text-text-main hover:bg-bg-beige transition-colors">
            <Calendar className="w-4 h-4" />
            20 May 2025, Tuesday
            <ChevronRight className="w-4 h-4 text-text-muted ml-1" />
          </button>

          <button className="p-2 bg-surface border border-border rounded-lg hover:bg-bg-beige transition-colors">
            <ChevronRight className="w-5 h-5 text-text-main" />
          </button>
        </div>

        <div className="flex items-center p-1 bg-surface border border-border rounded-xl">
          <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#F0F2E9] text-text-main text-sm font-medium">
            <List className="w-4 h-4" />
            Day View
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-text-muted text-sm font-medium hover:text-text-main transition-colors">
            <Calendar className="w-4 h-4" />
            Week View
          </button>
        </div>
      </div>

      <div className="bg-surface rounded-[24px] border border-border/50 p-4 sm:p-8">
        <div className="space-y-0">
          {scheduleData.length > 0 ? (
            scheduleData.map((cls, i) => {
              const Icon = BookOpen;
              return (
                <div key={cls._id || i} className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 p-4 sm:p-6 hover:bg-bg-beige/50 rounded-2xl transition-colors border-b border-border last:border-0">
                  <div className="flex sm:flex-col items-center sm:items-end gap-1 w-20 shrink-0">
                     <p className="text-lg font-bold text-text-main">{cls.time}</p>
                     <p className="text-sm font-medium text-text-muted">{cls.ampm}</p>
                  </div>
                  
                  <div className="w-14 h-14 rounded-full bg-[#F0F2E9] flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-[#4A5D4E]" />
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-lg font-bold text-text-main">{cls.subject}</p>
                    <p className="text-sm text-text-muted mt-1">{cls.prof}</p>
                  </div>

                  <div className="text-right sm:text-left">
                     <p className="text-sm font-medium text-text-main">{cls.room}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-6 text-center text-text-muted">No schedule records found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
