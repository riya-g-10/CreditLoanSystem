import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function HomeLoan() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(250000);
  const [tenureYears, setTenureYears] = useState(20);

  const rate = 6.8;
  const tenureMonths = tenureYears * 12;
  const monthlyRate = rate / 12 / 100;
  const emi = Math.round((amount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1));

  const handleApply = (e) => {
    e.preventDefault();
    navigate(`/apply-loan?type=${encodeURIComponent('Home Loan')}&amount=${amount}&tenure=${tenureMonths}`);
  };


  return (
    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/home" class="btn btn-outline" style={{ fontSize: '0.85rem' }}>
          ← Back to Home Dashboard
        </Link>
      </div>

      <div class="card" style={{ marginBottom: '2rem' }}>
        <span class="product-tag" style={{ background: '#fef3c7', color: '#b45309' }}>Prime Real Estate</span>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Home & Property Loan</h1>
        <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 1.25rem' }}>
          Turn your homeownership dream into reality with competitive interest rates, low processing charges, and extended repayment tenures up to 30 years.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
          <div>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Interest Rate</span>
            <div class="rate-highlight" style={{ fontSize: '1.5rem', color: '#b45309' }}>6.8% p.a.</div>
          </div>
          <div>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Maximum Limit</span>
            <div style={{ fontSize: '1.35rem', fontWeight: 700, marginTop: '0.25rem' }}>$500,000</div>
          </div>
          <div>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Tenure Range</span>
            <div style={{ fontSize: '1.35rem', fontWeight: 700, marginTop: '0.25rem' }}>Up to 30 Years</div>
          </div>
        </div>

        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>Home Loan Benefits</h3>
        <ul style={{ listStylePosition: 'inside', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
          <li>✓ Low interest rate starting at 6.8% p.a.</li>
          <li>✓ High loan-to-value ratio covering up to 85% of property value</li>
          <li>✓ Doorstep legal assistance & hassle-free property title checks</li>
          <li>✓ Balance transfer options with zero foreclosing fees</li>
        </ul>

        {/* Customized EMI Estimator */}
        <div class="calc-box" style={{ margin: '1rem 0' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>Home Loan Mortgage Calculator</h3>
          
          <div class="slider-group">
            <label>
              <span>Home Loan Amount:</span>
              <strong>${amount.toLocaleString()}</strong>
            </label>
            <input
              type="range"
              min="50000"
              max="500000"
              step="10000"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              class="slider-input"
            />
          </div>

          <div class="slider-group">
            <label>
              <span>Tenure (Years):</span>
              <strong>{tenureYears} Years ({tenureMonths} Months)</strong>
            </label>
            <input
              type="range"
              min="5"
              max="30"
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              class="slider-input"
            />
          </div>

          <div class="calc-results">
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Monthly Installment</span>
              <div class="result-val" style={{ color: '#b45309' }}>${emi}</div>
            </div>
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Total Amount Payable</span>
              <div class="result-val" style={{ color: 'var(--text-main)' }}>${(emi * tenureMonths).toLocaleString()}</div>
            </div>
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Total Interest Payable</span>
              <div class="result-val" style={{ color: 'var(--warning)' }}>${(emi * tenureMonths - amount).toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Application Action */}
        <form onSubmit={handleApply} style={{ marginTop: '1.5rem' }}>
          <button type="submit" class="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', fontSize: '1rem', background: '#d97706' }}>
            Apply Now for Home Loan →
          </button>
        </form>
      </div>
    </div>
  );
}
