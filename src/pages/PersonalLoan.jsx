import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function PersonalLoan() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(15000);
  const [tenure, setTenure] = useState(24);

  const rate = 10.5;
  const monthlyRate = rate / 12 / 100;
  const emi = Math.round((amount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1));

  const handleApply = (e) => {
    e.preventDefault();
    navigate(`/apply-loan?type=${encodeURIComponent('Personal Loan')}&amount=${amount}&tenure=${tenure}`);
  };


  return (
    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/home" class="btn btn-outline" style={{ fontSize: '0.85rem' }}>
          ← Back to Home Dashboard
        </Link>
      </div>

      <div class="card" style={{ marginBottom: '2rem' }}>
        <span class="product-tag">Flexible Financing</span>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Personal Credit Loan</h1>
        <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 1.25rem' }}>
          Get instant, collateral-free personal financing tailored for your personal expenses, medical emergencies, or debt consolidation with zero hassle.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
          <div>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Interest Rate</span>
            <div class="rate-highlight" style={{ fontSize: '1.5rem' }}>10.5% p.a.</div>
          </div>
          <div>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Maximum Limit</span>
            <div style={{ fontSize: '1.35rem', fontWeight: 700, marginTop: '0.25rem' }}>$50,000</div>
          </div>
          <div>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Tenure Range</span>
            <div style={{ fontSize: '1.35rem', fontWeight: 700, marginTop: '0.25rem' }}>12 - 60 Months</div>
          </div>
        </div>

        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>Key Benefits & Features</h3>
        <ul style={{ listStylePosition: 'inside', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
          <li>✓ 100% Paperless Digital Application</li>
          <li>✓ Instant Pre-Approval within minutes</li>
          <li>✓ Flexible repayment tenures with no hidden pre-payment penalties</li>
          <li>✓ Funds credited directly to your registered bank account</li>
        </ul>

        {/* Customized EMI Estimator */}
        <div class="calc-box" style={{ margin: '1rem 0' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>Personal Loan EMI Calculator</h3>
          
          <div class="slider-group">
            <label>
              <span>Required Loan Amount:</span>
              <strong>${amount.toLocaleString()}</strong>
            </label>
            <input
              type="range"
              min="2000"
              max="50000"
              step="1000"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              class="slider-input"
            />
          </div>

          <div class="slider-group">
            <label>
              <span>Repayment Tenure:</span>
              <strong>{tenure} Months</strong>
            </label>
            <input
              type="range"
              min="12"
              max="60"
              step="6"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              class="slider-input"
            />
          </div>

          <div class="calc-results">
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Estimated Monthly EMI</span>
              <div class="result-val">${emi}</div>
            </div>
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Total Amount Payable</span>
              <div class="result-val" style={{ color: 'var(--text-main)' }}>${(emi * tenure).toLocaleString()}</div>
            </div>
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Interest Component</span>
              <div class="result-val" style={{ color: 'var(--warning)' }}>${(emi * tenure - amount).toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Application Action */}
        <form onSubmit={handleApply} style={{ marginTop: '1.5rem' }}>
          <button type="submit" class="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', fontSize: '1rem' }}>
            Apply Now for Personal Loan →
          </button>
        </form>
      </div>
    </div>
  );
}
