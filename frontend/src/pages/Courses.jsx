import React from 'react';
import { BookOpen } from 'lucide-react';

const coursesData = [
  { id: 1, name: 'Database Management',  instructor: 'Prof. Verma',  progress: 72 },
  { id: 2, name: 'Web Development',      instructor: 'Prof. Sharma', progress: 85 },
  { id: 3, name: 'Data Structures',      instructor: 'Prof. Mehta',  progress: 60 },
  { id: 4, name: 'Software Engineering', instructor: 'Prof. Singh',  progress: 45 },
  { id: 5, name: 'Operating Systems',    instructor: 'Prof. Reddy',  progress: 90 },
  { id: 6, name: 'Computer Networks',    instructor: 'Prof. Kumar',  progress: 55 },
];

export function Courses() {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-text-main mb-2">My Courses</h1>
        <p className="text-text-muted">View all enrolled courses and your progress.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {coursesData.map(course => (
          <div key={course.id} className="bg-surface rounded-[20px] p-6 border border-border/50">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-full bg-[#F0F2E9] flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5 text-[#4A5D4E]" />
              </div>
              <div>
                <p className="font-bold text-text-main text-sm">{course.name}</p>
                <p className="text-xs text-text-muted mt-0.5">{course.instructor}</p>
              </div>
            </div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs text-text-muted">Progress</span>
              <span className="text-xs font-bold text-text-main">{course.progress}%</span>
            </div>
            <div className="w-full h-2 bg-[#F0F2E9] rounded-full overflow-hidden">
              <div className="h-2 rounded-full bg-brand-red" style={{ width: `${course.progress}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
