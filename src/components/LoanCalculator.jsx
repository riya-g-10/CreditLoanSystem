import React, { useState } from 'react';

export default function LoanCalculator() {
  const [amount, setAmount] = useState(15000);
  const [interestRate, setInterestRate] = useState(9.5);
  const [tenure, setTenure] = useState(24);

  // EMI Formula: P * r * (1+r)^n / ((1+r)^n - 1)
  const r = interestRate / 12 / 100;
  const emi = (amount * r * Math.pow(1 + r, tenure)) / (Math.pow(1 + r, tenure) - 1);
  const monthlyEmi = isNaN(emi) || !isFinite(emi) ? 0 : Math.round(emi);
  const totalPayable = monthlyEmi * tenure;
  const totalInterest = totalPayable - amount;

  return (
    <div class="calc-box">
      <h2>Interactive Loan EMI Calculator</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Adjust sliders to calculate your monthly EMI and interest repayment schedule.
      </p>

      <div class="slider-group">
        <label>
          <span>Loan Amount ($)</span>
          <span style={{ color: 'var(--primary)', fontWeight: 700 }}>${amount.toLocaleString()}</span>
        </label>
        <input
          type="range"
          min="1000"
          max="100000"
          step="1000"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          class="slider-input"
        />
      </div>

      <div class="slider-group">
        <label>
          <span>Interest Rate (% p.a.)</span>
          <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{interestRate}%</span>
        </label>
        <input
          type="range"
          min="5"
          max="20"
          step="0.5"
          value={interestRate}
          onChange={(e) => setInterestRate(Number(e.target.value))}
          class="slider-input"
        />
      </div>

      <div class="slider-group">
        <label>
          <span>Tenure (Months)</span>
          <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{tenure} Months ({Math.round(tenure / 12 * 10) / 10} yrs)</span>
        </label>
        <input
          type="range"
          min="6"
          max="60"
          step="6"
          value={tenure}
          onChange={(e) => setTenure(Number(e.target.value))}
          class="slider-input"
        />
      </div>

      <div class="calc-results">
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Estimated Monthly EMI</span>
          <div class="result-val">${monthlyEmi.toLocaleString()}</div>
        </div>
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Interest Payable</span>
          <div class="result-val" style={{ color: '#d97706' }}>${(totalInterest > 0 ? totalInterest : 0).toLocaleString()}</div>
        </div>
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Repayment</span>
          <div class="result-val" style={{ color: '#10b981' }}>${(totalPayable > 0 ? totalPayable : 0).toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}
