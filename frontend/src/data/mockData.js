import { BookOpen, Laptop, Calculator, Code2, Server, FileText } from 'lucide-react';

export const attendanceData = [
  { date: '20 Sep 2025', day: 'Friday', subject: 'Database Management', time: '11:00 AM - 12:30 PM', status: 'Present' },
  { date: '19 Sep 2025', day: 'Thursday', subject: 'Web Development', time: '02:00 PM - 03:30 PM', status: 'Absent' },
  { date: '18 Sep 2025', day: 'Wednesday', subject: 'Data Structures', time: '09:00 AM - 10:30 AM', status: 'Present' },
  { date: '17 Sep 2025', day: 'Tuesday', subject: 'Software Engineering', time: '04:00 PM - 05:30 PM', status: 'Present' },
  { date: '16 Sep 2025', day: 'Monday', subject: 'Operating Systems', time: '11:00 AM - 12:30 PM', status: 'Present' },
];

export const scheduleData = [
  { time: '09:00', ampm: 'AM', subject: 'Database Management', prof: 'Prof. Verma', room: 'Room 204', icon: BookOpen },
  { time: '11:00', ampm: 'AM', subject: 'Web Development', prof: 'Prof. Sharma', room: 'Lab 3', icon: Laptop },
  { time: '02:00', ampm: 'PM', subject: 'Data Structures', prof: 'Prof. Mehta', room: 'Room 301', icon: Calculator },
  { time: '04:00', ampm: 'PM', subject: 'Software Engineering', prof: 'Prof. Singh', room: 'Room 105', icon: Code2 },
];

export const assignmentsData = [
  { title: 'Database Management Project', desc: 'Implement a library management system.', subject: 'Database Management', due: '18 May 2025', status: 'Pending', icon: Server, statusColor: 'bg-[#F0F2E9] text-[#4A5D4E]' },
  { title: 'Web Development Project', desc: 'Build a responsive portfolio website.', subject: 'Web Development', due: '20 May 2025', status: 'Pending', icon: Code2, statusColor: 'bg-[#F0F2E9] text-[#4A5D4E]' },
  { title: 'Data Structures Problem Set', desc: 'Solve 10 problems on stacks and queues.', subject: 'Data Structures', due: '25 May 2025', status: 'Pending', icon: Calculator, statusColor: 'bg-[#F0F2E9] text-[#4A5D4E]' },
  { title: 'Software Engineering Case Study', desc: 'Analyze the given case study and answer questions.', subject: 'Software Engineering', due: '28 May 2025', status: 'Completed', icon: FileText, statusColor: 'bg-success-bg text-success-text' },
];
