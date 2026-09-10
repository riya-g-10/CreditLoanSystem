import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function MicroLoan() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(2500);
  const [tenure, setTenure] = useState(6);

  const rate = 7.9;
  const monthlyRate = rate / 12 / 100;
  const emi = Math.round((amount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1));

  const handleApply = (e) => {
    e.preventDefault();
    navigate(`/apply-loan?type=${encodeURIComponent('Micro-Loan')}&amount=${amount}&tenure=${tenure}`);
  };


  return (
    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/home" class="btn btn-outline" style={{ fontSize: '0.85rem' }}>
          ← Back to Home Dashboard
        </Link>
      </div>

      <div class="card" style={{ marginBottom: '2rem' }}>
        <span class="product-tag" style={{ background: '#ecfdf5', color: '#047857' }}>Instant Micro Credit</span>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Instant Micro-Loan</h1>
        <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 1.25rem' }}>
          Short-term instant credit for urgent daily cashflow needs, unexpected bills, or quick working capital with zero paper processing fees.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
          <div>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Interest Rate</span>
            <div class="rate-highlight" style={{ fontSize: '1.5rem', color: '#10b981' }}>7.9% p.a.</div>
          </div>
          <div>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Maximum Credit</span>
            <div style={{ fontSize: '1.35rem', fontWeight: 700, marginTop: '0.25rem' }}>$5,000</div>
          </div>
          <div>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Quick Tenure</span>
            <div style={{ fontSize: '1.35rem', fontWeight: 700, marginTop: '0.25rem' }}>3 - 12 Months</div>
          </div>
        </div>

        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>Micro-Loan Highlights</h3>
        <ul style={{ listStylePosition: 'inside', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
          <li>✓ Same-day credit approval and instant disbursement</li>
          <li>✓ Zero documentation fee and minimal eligibility checks</li>
          <li>✓ Short repayment term tailored for quick cashflow needs</li>
          <li>✓ Transparent daily or monthly repayment schedules</li>
        </ul>

        {/* Customized EMI Estimator */}
        <div class="calc-box" style={{ margin: '1rem 0' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>Micro-Loan Calculator</h3>
          
          <div class="slider-group">
            <label>
              <span>Selected Amount:</span>
              <strong>${amount.toLocaleString()}</strong>
            </label>
            <input
              type="range"
              min="500"
              max="5000"
              step="250"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              class="slider-input"
            />
          </div>

          <div class="slider-group">
            <label>
              <span>Tenure (Months):</span>
              <strong>{tenure} Months</strong>
            </label>
            <input
              type="range"
              min="3"
              max="12"
              step="1"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              class="slider-input"
            />
          </div>

          <div class="calc-results">
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Monthly EMI</span>
              <div class="result-val" style={{ color: '#10b981' }}>${emi}</div>
            </div>
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Total Repayable</span>
              <div class="result-val" style={{ color: 'var(--text-main)' }}>${(emi * tenure).toLocaleString()}</div>
            </div>
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Processing Fee</span>
              <div class="result-val" style={{ color: '#10b981' }}>$0 (FREE)</div>
            </div>
          </div>
        </div>

        {/* Application Action */}
        <form onSubmit={handleApply} style={{ marginTop: '1.5rem' }}>
          <button type="submit" class="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', fontSize: '1rem', background: '#10b981' }}>
            Apply Now for Micro-Loan →
          </button>
        </form>
      </div>
    </div>
  );
}
