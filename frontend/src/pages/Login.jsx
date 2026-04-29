import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

export function Login({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      localStorage.setItem('userId', data.user.id);
      localStorage.setItem('userName', data.user.name);
      localStorage.setItem('userEmail', data.user.email);
      
      if (onLogin) {
        onLogin();
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
        <div className="w-full max-w-md bg-surface rounded-[24px] p-8 sm:p-10 border border-border">
          <div className="lg:hidden mb-8 flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-brand-red flex items-center justify-center shrink-0 mb-4">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-text-main">Smart Student</h1>
            <p className="text-sm text-text-muted text-center mt-2">Manage your academic life smarter with AI</p>
          </div>

          <h2 className="text-2xl font-bold text-text-main mb-6">Welcome Back</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <p className="text-sm text-brand-red font-medium">{error}</p>
            )}

            <div className="flex justify-end pt-1">
              <button type="button" className="text-sm font-medium text-text-muted hover:text-text-main transition-colors">
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-brand-red text-white font-bold hover:bg-brand-red-hover transition-colors"
            >
              Login
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-text-main">
            Don't have an account?{' '}
            <Link to="/signup" className="font-bold text-brand-red hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
