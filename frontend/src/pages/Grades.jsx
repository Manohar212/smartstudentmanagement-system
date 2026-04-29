import React from 'react';
import { Star } from 'lucide-react';

const gradesData = [
  { subject: 'Data Structures',      grade: 'A',  score: 91 },
  { subject: 'Database Management',  grade: 'B+', score: 78 },
  { subject: 'Web Development',      grade: 'A-', score: 88 },
  { subject: 'Software Engineering', grade: 'B',  score: 74 },
  { subject: 'Operating Systems',    grade: 'A',  score: 92 },
  { subject: 'Computer Networks',    grade: 'B+', score: 80 },
];

const gradeColor = (g) => {
  if (g.startsWith('A')) return 'bg-success-bg text-success-text';
  if (g.startsWith('B')) return 'bg-[#F0F2E9] text-[#4A5D4E]';
  return 'bg-error-bg text-brand-red';
};

export function Grades() {
  const avg = (gradesData.reduce((s, g) => s + g.score, 0) / gradesData.length).toFixed(1);

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-text-main mb-2">My Grades</h1>
          <p className="text-text-muted">Subject-wise performance overview.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-sm font-medium text-text-main">
          <Star className="w-4 h-4" />
          Average: {avg}%
        </div>
      </div>

      <div className="bg-surface rounded-[24px] border border-border/50 overflow-hidden">
        <div className="overflow-x-auto p-4 sm:p-8">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-4 font-medium text-sm text-text-main pl-2">Subject</th>
                <th className="pb-4 font-medium text-sm text-text-main">Score</th>
                <th className="pb-4 font-medium text-sm text-text-main">Grade</th>
              </tr>
            </thead>
            <tbody>
              {gradesData.map((item, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-bg-beige/50 transition-colors">
                  <td className="py-5 pl-2 text-sm font-medium text-text-main">{item.subject}</td>
                  <td className="py-5 text-sm text-text-muted">{item.score}%</td>
                  <td className="py-5">
                    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium ${gradeColor(item.grade)}`}>
                      {item.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
