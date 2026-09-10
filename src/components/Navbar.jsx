import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Read active session from localStorage
  const sessionUser = JSON.parse(localStorage.getItem('authSession') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('authSession');
    navigate('/login');
  };

  return (
    <header class="navbar">
      <div class="nav-container">
        <Link to={sessionUser ? "/home" : "/login"} class="brand-link">
          <span class="brand-title">CrediPulse</span>
          <span class="brand-badge">Borrower</span>
        </Link>

        {sessionUser && (
          <nav>
            <ul class="nav-links">
              <li>
                <Link to="/home" class={location.pathname === '/home' ? 'active' : ''}>
                  Home Dashboard
                </Link>
              </li>
              <li>
                <Link to="/personal-loan" class={location.pathname === '/personal-loan' ? 'active' : ''}>
                  Personal Loan
                </Link>
              </li>
              <li>
                <Link to="/micro-loan" class={location.pathname === '/micro-loan' ? 'active' : ''}>
                  Micro Loan
                </Link>
              </li>
              <li>
                <Link to="/home-loan" class={location.pathname === '/home-loan' ? 'active' : ''}>
                  Home Loan
                </Link>
              </li>
              <li>
                <Link to="/apply-loan" class={location.pathname === '/apply-loan' ? 'active' : ''} style={{ color: 'var(--primary)', fontWeight: 700 }}>
                  Apply for Loan
                </Link>
              </li>
            </ul>
          </nav>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {sessionUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
                👤 {sessionUser.email}
              </span>
              <button class="btn btn-outline" onClick={handleLogout} style={{ padding: '0.4rem 0.8rem', fontSize: '0.82rem' }}>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" class="btn btn-primary">
              Borrower Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
