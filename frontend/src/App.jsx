import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar.jsx';
import { Header } from './components/Header.jsx';
import { Dashboard }   from './pages/Dashboard.jsx';
import { Attendance }  from './pages/Attendance.jsx';
import { Schedule }    from './pages/Schedule.jsx';
import { Assignments } from './pages/Assignments.jsx';
import { SmartAI }     from './pages/SmartAI.jsx';
import { Login }       from './pages/Login.jsx';
import { Signup }      from './pages/Signup.jsx';
import { Courses }     from './pages/Courses.jsx';
import { Grades }      from './pages/Grades.jsx';
import { Profile }     from './pages/Profile.jsx';

function MainLayout({ children, onLogout }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex w-full">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        onLogout={onLogout}
      />
      <main className="flex-1 flex flex-col min-h-screen min-w-0 transition-all duration-300 lg:ml-64">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <div className="flex-1 px-6 lg:px-8 pb-8 pt-2 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('auth') === 'true');

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('auth', 'true');
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      setIsLoggedIn(false);
      localStorage.removeItem('auth');
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
    }
  };

  return (
    <Routes>
      <Route path="/login"  element={!isLoggedIn ? <Login  onLogin={handleLogin}   /> : <Navigate to="/" replace />} />
      <Route path="/signup" element={!isLoggedIn ? <Signup onSignup={handleLogin}  /> : <Navigate to="/" replace />} />
      <Route path="/*" element={
        isLoggedIn ? (
          <MainLayout onLogout={handleLogout}>
            <Routes>
              <Route path="/"            element={<Dashboard />}   />
              <Route path="/attendance"  element={<Attendance />}  />
              <Route path="/schedule"    element={<Schedule />}    />
              <Route path="/assignments" element={<Assignments />} />
              <Route path="/ai"          element={<SmartAI />}     />
              <Route path="/courses"     element={<Courses />}     />
              <Route path="/grades"      element={<Grades />}      />
              <Route path="/profile"     element={<Profile />}     />
              <Route path="*"            element={<Navigate to="/" replace />} />
            </Routes>
          </MainLayout>
        ) : (
          <Navigate to="/login" replace />
        )
      } />
    </Routes>
  );
}
