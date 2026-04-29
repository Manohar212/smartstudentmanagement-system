import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, XCircle, Clock, ArrowRight } from 'lucide-react';

export function Attendance() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) { setLoading(false); return; }

        const response = await fetch(`http://localhost:5000/api/attendance?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setRecords(data);
        }
      } catch (error) {
        console.error('Error fetching attendance:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAttendance();
  }, []);

  // Compute stats dynamically from fetched records
  const totalClasses = records.length;
  const attended     = records.filter(r => r.status === 'Present').length;
  const missed       = totalClasses - attended;
  const overallPct   = totalClasses > 0
    ? ((attended / totalClasses) * 100).toFixed(1) + '%'
    : '0%';
  const attendanceLabel = totalClasses > 0
    ? (attended / totalClasses >= 0.75 ? 'Excellent' : attended / totalClasses >= 0.5 ? 'Average' : 'Low')
    : 'No Data';

  const summaryCards = [
    { label: 'Overall Attendance', value: overallPct,        sub: attendanceLabel,              icon: Calendar,      isRed: true  },
    { label: 'Classes Attended',   value: String(attended),  sub: `out of ${totalClasses}`,     icon: CheckCircle2                },
    { label: 'Classes Missed',     value: String(missed),    sub: `out of ${totalClasses}`,     icon: XCircle,       bgRed: true  },
    { label: 'Total Classes',      value: String(totalClasses), sub: 'This Month',              icon: Clock                       },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-text-main mb-2">Attendance</h1>
          <p className="text-text-muted">Track your attendance and stay on top of your classes.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-sm font-medium text-text-main">
          <Calendar className="w-4 h-4" />
          {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {summaryCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="bg-surface rounded-[20px] p-6 flex flex-col justify-center border border-border/50">
               <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-full ${card.bgRed ? 'bg-error-bg text-brand-red' : 'bg-[#F2EFEB] text-text-main'} flex items-center justify-center shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-text-main mb-0.5">{card.label}</p>
                  <div className="flex items-baseline gap-2">
                     <p className="text-2xl font-bold text-text-main">{card.value}</p>
                  </div>
                  <p className={`text-xs mt-0.5 ${card.isRed ? 'text-brand-red' : 'text-text-muted'}`}>{card.sub}</p>
                </div>
               </div>
            </div>
          );
        })}
      </div>

      <div className="bg-surface rounded-[24px] p-8 border border-border/50">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-bold text-text-main">Recent Attendance Records</h2>
           <button className="text-brand-red text-sm font-medium flex items-center gap-1 hover:text-brand-red-hover transition-colors">
            View all <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-4 font-medium text-sm text-text-main">Date</th>
                <th className="pb-4 font-medium text-sm text-text-main">Day</th>
                <th className="pb-4 font-medium text-sm text-text-main">Subject</th>
                <th className="pb-4 font-medium text-sm text-text-main">Time</th>
                <th className="pb-4 font-medium text-sm text-text-main">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-5 text-sm text-text-muted text-center">Loading...</td>
                </tr>
              ) : records.length > 0 ? (
                records.map((record, i) => (
                  <tr key={record._id || i} className="border-b border-border last:border-0 hover:bg-bg-beige/50 transition-colors">
                    <td className="py-5 text-sm text-text-muted">{record.date}</td>
                    <td className="py-5 text-sm text-text-muted">{record.day}</td>
                    <td className="py-5 text-sm font-medium text-text-main">{record.subject}</td>
                    <td className="py-5 text-sm text-text-muted">{record.time}</td>
                    <td className="py-5">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        record.status === 'Present' ? 'bg-success-bg text-success-text' : 'bg-error-bg text-brand-red'
                      }`}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-5 text-sm text-text-muted text-center">No attendance records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
