import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';

export default function Login() {
  const navigate = useNavigate();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [authError, setAuthError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const toggleMode = (mode) => {
    setIsRegisterMode(mode === 'register');
    setAuthError('');
    setSuccessMessage('');
    reset();
  };

  // Form Submit Handler
  const onSubmit = async (data) => {
    setAuthError('');
    setSuccessMessage('');
    setLoading(true);

    const endpoint = isRegisterMode 
      ? `${API_BASE_URL}/api/register` 
      : `${API_BASE_URL}/api/login`;


    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, password: data.password })
      });

      const result = await response.json();

      if (response.ok) {
        if (isRegisterMode) {
          // Registration successful
          setSuccessMessage(result.message || 'Account created successfully! Please log in with your credentials.');
          setIsRegisterMode(false);
          reset();
        } else {
          // Login successful -> store session and navigate to Home Dashboard
          localStorage.setItem('authSession', JSON.stringify(result.borrower));
          navigate('/home');
        }
      } else {
        setAuthError(result.error || (isRegisterMode ? 'Failed to create account.' : 'Invalid credentials.'));
      }
    } catch (err) {
      console.error('API connection error:', err);
      setAuthError('Unable to connect to backend server. Please verify node server.js is running and MONGODB_URI is set in .env');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '440px', margin: '3rem auto' }}>
      <div class="card">
        {/* Toggle Header Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
          <button
            type="button"
            onClick={() => toggleMode('login')}
            style={{
              flex: 1,
              padding: '0.75rem',
              background: 'none',
              border: 'none',
              borderBottom: !isRegisterMode ? '2px solid var(--primary)' : 'none',
              color: !isRegisterMode ? 'var(--primary)' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer'
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => toggleMode('register')}
            style={{
              flex: 1,
              padding: '0.75rem',
              background: 'none',
              border: 'none',
              borderBottom: isRegisterMode ? '2px solid var(--primary)' : 'none',
              color: isRegisterMode ? 'var(--primary)' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer'
            }}
          >
            Create New Account
          </button>
        </div>

        <h2 style={{ textAlign: 'center', marginBottom: '0.25rem' }}>
          {isRegisterMode ? 'Create Borrower Account' : 'Borrower Login'}
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
          {isRegisterMode 
            ? 'Register with your Email ID and Password to get started.' 
            : 'Enter your credentials to access loan products & dashboard.'}
        </p>

        {/* Error Notification */}
        {authError && (
          <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#dc2626', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1rem' }}>
            ⚠️ {authError}
          </div>
        )}

        {/* Success Notification */}
        {successMessage && (
          <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#047857', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1rem' }}>
            ✓ {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} novalidate>
          {/* Email Address */}
          <div class="slider-group">
            <label htmlFor="email">Email Address *</label>
            <input
              id="email"
              type="email"
              placeholder="borrower@example.com"
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                border: errors.email ? '1.5px solid #ef4444' : '1.5px solid var(--border-color)',
                outline: 'none'
              }}
              {...register('email', {
                required: 'Email address is required.',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email address.'
                }
              })}
            />
            {errors.email && (
              <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '0.25rem', display: 'block' }}>
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div class="slider-group" style={{ marginTop: '1rem' }}>
            <label htmlFor="password">Password *</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                border: errors.password ? '1.5px solid #ef4444' : '1.5px solid var(--border-color)',
                outline: 'none'
              }}
              {...register('password', {
                required: 'Password is required.',
                minLength: {
                  value: 4,
                  message: 'Password must be at least 4 characters.'
                }
              })}
            />
            {errors.password && (
              <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '0.25rem', display: 'block' }}>
                {errors.password.message}
              </span>
            )}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            class="btn btn-primary" 
            style={{ width: '100%', marginTop: '1.5rem', justifyContent: 'center' }}
          >
            {loading 
              ? (isRegisterMode ? 'Creating Account...' : 'Signing In...') 
              : (isRegisterMode ? 'Create Account' : 'Secure Login')}
          </button>
        </form>
      </div>
    </div>
  );
}
