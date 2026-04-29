import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

export function Signup({ onSignup }) {
  const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!fullName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fullName, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Signup failed');
        return;
      }

      localStorage.setItem('userId', data.user.id);
      localStorage.setItem('userName', data.user.name);
      localStorage.setItem('userEmail', data.user.email);

      if (onSignup) {
        onSignup();
      }
      navigate('/');
    } catch (err) {
      setError('Network error. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-bg-beige animate-in fade-in duration-500">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex flex-1 flex-col justify-center items-center p-12 border-r border-border">
        <div className="max-w-md w-full">
          <div className="mb-8">
            <div className="w-16 h-16 rounded-2xl bg-brand-red flex items-center justify-center shrink-0 mb-6">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-text-main leading-tight mb-2">Smart Student</h1>
            <h2 className="text-2xl text-text-muted mb-6">Management System</h2>
            <p className="text-lg text-text-main">
              Manage your academic life smarter with AI
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 lg:p-12">
        <div className="w-full max-w-md bg-surface rounded-[24px] p-8 sm:p-10 border border-border mt-10 mb-10 overflow-y-auto">
          <div className="lg:hidden mb-8 flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-brand-red flex items-center justify-center shrink-0 mb-4">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-text-main">Smart Student</h1>
            <p className="text-sm text-text-muted text-center mt-2">Manage your academic life smarter with AI</p>
          </div>

          <h2 className="text-2xl font-bold text-text-main mb-6">Create Account</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-main mb-1.5" htmlFor="fullName">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-3.5 bg-surface border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red placeholder:text-text-muted transition-all text-text-main"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-main mb-1.5" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3.5 bg-surface border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red placeholder:text-text-muted transition-all text-text-main"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-main mb-1.5" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3.5 bg-surface border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red placeholder:text-text-muted transition-all text-text-main"
                placeholder="Create a password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-main mb-1.5" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3.5 bg-surface border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red placeholder:text-text-muted transition-all text-text-main"
                placeholder="Confirm your password"
              />
            </div>

            {error && (
              <p className="text-sm text-brand-red font-medium pt-1">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-brand-red text-white font-bold hover:bg-brand-red-hover transition-colors mt-2"
            >
              Create Account
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-text-main">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-brand-red hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
