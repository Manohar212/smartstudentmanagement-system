import React, { useState, useEffect } from 'react';
import { Calendar, FileText } from 'lucide-react';
import { cn } from '../lib/utils.js';

export function Assignments() {
  const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  const [filter, setFilter] = useState('All');
  const [assignmentsData, setAssignmentsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) { setLoading(false); return; }

        const response = await fetch(`${BASE_URL}/api/assignments?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setAssignmentsData(data);
        }
      } catch (error) {
        console.error('Error fetching assignments:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  // PUT /api/assignments/:id — mark an assignment as Completed
  const markComplete = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/assignments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Completed' }),
      });
      if (response.ok) {
        setAssignmentsData(prev =>
          prev.map(a => a._id === id ? { ...a, status: 'Completed' } : a)
        );
      }
    } catch (error) {
      console.error('Error updating assignment:', error);
    }
  };

  const filteredAssignments = assignmentsData.filter(
    item => filter === 'All' || item.status === filter
  );

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-text-main mb-2">Assignments</h1>
          <p className="text-text-muted">View your assignments and track their status.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-sm font-medium text-text-main w-fit">
          <Calendar className="w-4 h-4" />
          All Assignments
        </button>
      </div>

      <div className="flex items-center p-1 bg-surface border border-border rounded-2xl w-fit mb-8">
        {['All', 'Pending', 'Completed'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn("px-8 py-2 rounded-xl text-sm font-medium transition-colors", filter === f ? "bg-[#F0F2E9] text-text-main" : "text-text-muted hover:text-text-main")}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-surface rounded-[24px] border border-border/50 overflow-hidden">
        <div className="overflow-x-auto p-4 sm:p-8">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-4 font-medium text-sm text-text-main pl-2">Assignment</th>
                <th className="pb-4 font-medium text-sm text-text-main">Subject</th>
                <th className="pb-4 font-medium text-sm text-text-main">Due Date</th>
                <th className="pb-4 font-medium text-sm text-text-main">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="py-6 text-sm text-text-muted text-center">Loading...</td>
                </tr>
              ) : filteredAssignments.length > 0 ? (
                filteredAssignments.map((item, i) => {
                  const statusColor = item.status === 'Completed'
                    ? 'bg-success-bg text-success-text'
                    : 'bg-[#F0F2E9] text-[#4A5D4E]';
                  return (
                    <tr key={item._id || i} className="border-b border-border last:border-0 hover:bg-bg-beige/50 transition-colors group">
                      <td className="py-6 pl-2">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-[#F0F2E9] flex items-center justify-center shrink-0">
                            <FileText className="w-5 h-5 text-[#4A5D4E]" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-text-main">{item.title}</p>
                            <p className="text-xs text-text-muted mt-0.5">{item.desc}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 text-sm text-text-muted align-middle">{item.subject}</td>
                      <td className="py-6 text-sm text-text-muted align-middle">{item.dueDate}</td>
                      <td className="py-6 align-middle">
                        {/* Pending badge is clickable to mark complete; Completed is static */}
                        {item.status === 'Pending' ? (
                          <button
                            onClick={() => markComplete(item._id)}
                            title="Click to mark as completed"
                            className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium ${statusColor} hover:opacity-75 transition-opacity cursor-pointer`}
                          >
                            {item.status}
                          </button>
                        ) : (
                          <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium ${statusColor}`}>
                            {item.status}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="py-6 text-sm text-text-muted text-center">No assignments found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
