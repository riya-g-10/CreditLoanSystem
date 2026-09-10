import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';

export default function LoanApply() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') || 'Personal Loan';
  const initialAmount = searchParams.get('amount') ? Number(searchParams.get('amount')) : 15000;
  const initialTenure = searchParams.get('tenure') ? Number(searchParams.get('tenure')) : 24;

  const sessionUser = JSON.parse(localStorage.getItem('authSession') || '{}');

  const [formData, setFormData] = useState({
    fullName: '',
    loanAmount: initialAmount,
    tenure: initialTenure,
    employmentStatus: 'Employed',
    income: '',
    loanType: initialType
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName.trim()) {
      setError('Please enter your Full Name.');
      return;
    }
    if (!formData.loanAmount || formData.loanAmount <= 0) {
      setError('Please enter a valid Loan Amount.');
      return;
    }
    if (!formData.tenure || formData.tenure <= 0) {
      setError('Please enter a valid Tenure.');
      return;
    }
    if (!formData.income || formData.income <= 0) {
      setError('Please enter your Monthly / Annual Income.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/loans/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          borrowerEmail: sessionUser.email || 'guest@creditpulse.com'
        })
      });

      const data = await response.json();

      if (response.ok && data.loan) {
        // Loan saved to MongoDB with default status "Pending"
        // Seamless transition to Simulated Demo Payment Page
        navigate(`/payment/${data.loan._id}`);
      } else {
        setError(data.error || 'Failed to submit loan application.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError('Unable to connect to backend server. Please verify Express server is running on http://localhost:5000');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '680px', margin: '1.5rem auto' }}>
      <div style={{ marginBottom: '1.25rem' }}>
        <Link to="/home" class="btn btn-outline" style={{ fontSize: '0.85rem' }}>
          ← Back to Dashboard
        </Link>
      </div>

      <div class="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <span class="product-tag">Application Portal</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Step 1 of 2</span>
        </div>

        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Credit Loan Application
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
          Complete the borrower information below to proceed with your loan application.
        </p>

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#dc2626', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Loan Category */}
          <div class="slider-group">
            <label htmlFor="loanType">Loan Product Category *</label>
            <select
              id="loanType"
              name="loanType"
              value={formData.loanType}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.7rem 0.85rem',
                borderRadius: '8px',
                border: '1.5px solid var(--border-color)',
                outline: 'none',
                background: '#ffffff',
                fontWeight: 600
              }}
            >
              <option value="Personal Loan">Personal Credit Loan (10.5% p.a.)</option>
              <option value="Micro-Loan">Instant Micro-Loan (7.9% p.a.)</option>
              <option value="Home Loan">Prime Home Loan (6.8% p.a.)</option>
            </select>
          </div>

          {/* Full Name */}
          <div class="slider-group" style={{ marginTop: '1rem' }}>
            <label htmlFor="fullName">Full Name *</label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              placeholder="e.g. Alex Johnson"
              value={formData.fullName}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                border: '1.5px solid var(--border-color)',
                outline: 'none'
              }}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
            {/* Loan Amount */}
            <div class="slider-group">
              <label htmlFor="loanAmount">Loan Amount ($) *</label>
              <input
                id="loanAmount"
                type="number"
                name="loanAmount"
                min="100"
                step="500"
                value={formData.loanAmount}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '8px',
                  border: '1.5px solid var(--border-color)',
                  outline: 'none'
                }}
                required
              />
            </div>

            {/* Tenure */}
            <div class="slider-group">
              <label htmlFor="tenure">Tenure (Months) *</label>
              <input
                id="tenure"
                type="number"
                name="tenure"
                min="1"
                max="360"
                value={formData.tenure}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '8px',
                  border: '1.5px solid var(--border-color)',
                  outline: 'none'
                }}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
            {/* Employment Status */}
            <div class="slider-group">
              <label htmlFor="employmentStatus">Employment Status *</label>
              <select
                id="employmentStatus"
                name="employmentStatus"
                value={formData.employmentStatus}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '8px',
                  border: '1.5px solid var(--border-color)',
                  outline: 'none',
                  background: '#ffffff'
                }}
                required
              >
                <option value="Employed">Salaried / Employed</option>
                <option value="Self-Employed">Self-Employed</option>
                <option value="Business Owner">Business Owner</option>
                <option value="Freelancer">Freelancer</option>
                <option value="Student">Student</option>
                <option value="Unemployed">Unemployed</option>
              </select>
            </div>

            {/* Income */}
            <div class="slider-group">
              <label htmlFor="income">Monthly Income ($) *</label>
              <input
                id="income"
                type="number"
                name="income"
                placeholder="e.g. 5000"
                min="0"
                value={formData.income}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '8px',
                  border: '1.5px solid var(--border-color)',
                  outline: 'none'
                }}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            class="btn btn-primary"
            style={{ width: '100%', marginTop: '1.5rem', justifyContent: 'center', padding: '0.85rem', fontSize: '1rem' }}
          >
            {loading ? 'Saving Loan Application...' : 'Proceed to Payment →'}
          </button>
        </form>
      </div>
    </div>
  );
}
