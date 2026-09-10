import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import PersonalLoan from './pages/PersonalLoan';
import MicroLoan from './pages/MicroLoan';
import HomeLoan from './pages/HomeLoan';
import LoanApply from './pages/LoanApply';
import DemoPayment from './pages/DemoPayment';

// Protected Route Component: prevents unauthenticated access to the Home Dashboard & Loan pages
function ProtectedRoute({ children }) {
  const sessionUser = JSON.parse(localStorage.getItem('authSession') || 'null');
  if (!sessionUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <div class="app-container">
        <Navbar />
        <main class="main-content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/home" 
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/personal-loan" 
              element={
                <ProtectedRoute>
                  <PersonalLoan />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/micro-loan" 
              element={
                <ProtectedRoute>
                  <MicroLoan />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/home-loan" 
              element={
                <ProtectedRoute>
                  <HomeLoan />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/apply-loan" 
              element={
                <ProtectedRoute>
                  <LoanApply />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/payment/:loanId" 
              element={
                <ProtectedRoute>
                  <DemoPayment />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <footer class="footer">
          <p>&copy; 2026 CrediPulse Borrower Application. Powered by React, Node.js & MongoDB Atlas.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}
