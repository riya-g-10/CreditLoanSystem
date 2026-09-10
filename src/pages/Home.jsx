import React from 'react';
import { Link } from 'react-router-dom';
import LoanCalculator from '../components/LoanCalculator';

export default function Home() {
  const products = [
    {
      title: 'Personal Loan',
      tag: 'Flexible Financing',
      rate: '10.5% p.a.',
      maxAmount: 'Up to $50,000',
      tenure: '12 - 60 Months',
      desc: 'Quick collateral-free financing for personal expenses, medical emergencies, or debt consolidation.',
      path: '/personal-loan',
      btnColor: 'var(--primary)'
    },
    {
      title: 'Micro-Loan',
      tag: 'Instant Micro Credit',
      rate: '7.9% p.a.',
      maxAmount: 'Up to $5,000',
      tenure: '3 - 12 Months',
      desc: 'Short-term instant credit for urgent daily cashflow needs with zero paper processing fee.',
      path: '/micro-loan',
      btnColor: '#10b981'
    },
    {
      title: 'Home Loan',
      tag: 'Prime Real Estate',
      rate: '6.8% p.a.',
      maxAmount: 'Up to $500,000',
      tenure: 'Up to 30 Years',
      desc: 'Affordable home financing solutions with low interest rates and flexible balance transfer options.',
      path: '/home-loan',
      btnColor: '#d97706'
    }
  ];

  return (
    <div>
      <section class="hero">
        <h1>Borrower Home Dashboard</h1>
        <p>
          Select from our specialized credit products below, calculate your customized monthly EMI, and access instant pre-approved loans.
        </p>
      </section>

      {/* Credit Products Navigation Grid */}
      <h2 style={{ fontSize: '1.5rem', marginTop: '1.5rem' }}>Available Loan Products</h2>
      <div class="grid-3">
        {products.map((prod, idx) => (
          <div key={idx} class="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span class="product-tag">{prod.tag}</span>
              <h3 style={{ fontSize: '1.25rem' }}>{prod.title}</h3>
              <div class="rate-highlight" style={{ color: prod.btnColor }}>{prod.rate}</div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{prod.desc}</p>
              <div style={{ fontSize: '0.82rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', color: 'var(--text-muted)' }}>
                <div><strong>Limit:</strong> {prod.maxAmount}</div>
                <div><strong>Tenure:</strong> {prod.tenure}</div>
              </div>
            </div>
            <div style={{ marginTop: '1.5rem' }}>
              <Link to={prod.path} class="btn btn-primary" style={{ width: '100%', justifyContent: 'center', background: prod.btnColor }}>
                Explore {prod.title} →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Loan EMI Calculator */}
      <LoanCalculator />
    </div>
  );
}
