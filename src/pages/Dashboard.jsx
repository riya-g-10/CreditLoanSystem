import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';

export default function Dashboard() {
  const { id } = useParams();

  // Read stored authSession
  const sessionUser = JSON.parse(localStorage.getItem('authSession') || 'null');
  const targetId = id || (sessionUser ? sessionUser.id : 'USR-7892');

  const [dbBorrower, setDbBorrower] = useState(null);

  useEffect(() => {
    // Fetch profile from MongoDB Atlas
    fetch(`${API_BASE_URL}/api/borrowers/${targetId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setDbBorrower(data);
        }
      })
      .catch((err) => console.warn('Could not fetch borrower from MongoDB Atlas:', err));
  }, [targetId]);

  const borrower = dbBorrower || (sessionUser && sessionUser.id === targetId ? sessionUser : {
    id: targetId,
    name: targetId === 'USR-101' ? 'Alexander Wright' : 'Jane Doe',
    score: 785,
    tier: 'Prime Borrower (Excellent)',
    activeProduct: 'Personal Credit Loan',
    originalAmount: 20000,
    currentBalance: 14250,
    nextEmiDate: 'Sep 15, 2026',
    monthlyEmi: 680,
    schedule: [
      { num: 'EMI #01', date: 'Jul 15, 2026', amount: '$680.00', status: 'Paid', ref: 'TXN-90214' },
      { num: 'EMI #02', date: 'Aug 15, 2026', amount: '$680.00', status: 'Paid', ref: 'TXN-94112' },
      { num: 'EMI #03', date: 'Sep 15, 2026', amount: '$680.00', status: 'Pending', ref: 'Upcoming' },
      { num: 'EMI #04', date: 'Oct 15, 2026', amount: '$680.00', status: 'Pending', ref: 'Upcoming' }
    ]
  });

  return (
    <div>
      {/* Dashboard Top Header */}
      <div class="dash-header">
        <div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Borrower Account ID: {borrower.id}</span>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Welcome, {borrower.name}!</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Active Credit: {borrower.activeProduct}</p>
        </div>
        <div>
          <span class="tier-badge">Credit Score: {borrower.score} | {borrower.tier}</span>
        </div>
      </div>

      {/* Financial Metrics Cards */}
      <div class="grid-3">
        <div class="card">
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Current Loan Balance</span>
          <div class="rate-highlight">${borrower.currentBalance.toLocaleString()}</div>
          <small style={{ color: 'var(--text-muted)' }}>Out of ${borrower.originalAmount.toLocaleString()} limit</small>
        </div>

        <div class="card">
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Next Installment</span>
          <div class="rate-highlight" style={{ color: '#d97706' }}>${borrower.monthlyEmi}</div>
          <small style={{ color: 'var(--text-muted)' }}>Due Date: {borrower.nextEmiDate}</small>
        </div>

        <div class="card">
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Quick Options</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.75rem' }}>
            <button class="btn btn-primary" onClick={() => alert('Redirecting to secure EMI Payment...')}>
              Pay Next EMI (${borrower.monthlyEmi})
            </button>
            <button class="btn btn-outline" onClick={() => alert('Top-up request submitted.')}>
              Request Top-Up
            </button>
          </div>
        </div>
      </div>

      {/* Repayment Schedule Table */}
      <div class="card" style={{ marginTop: '2rem' }}>
        <h3>Loan Repayment Schedule</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1rem' }}>
          Track past transactions and upcoming EMI installments.
        </p>

        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Installment</th>
                <th>Due Date</th>
                <th>EMI Amount</th>
                <th>Status</th>
                <th>Transaction Ref</th>
              </tr>
            </thead>
            <tbody>
              {borrower.schedule.map((item, index) => (
                <tr key={index}>
                  <td><strong>{item.num}</strong></td>
                  <td>{item.date}</td>
                  <td>{item.amount}</td>
                  <td>
                    <span class={item.status === 'Paid' ? 'status-paid' : 'status-pending'}>
                      ● {item.status}
                    </span>
                  </td>
                  <td><code>{item.ref}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <Link to="/" class="btn btn-outline">
          ← Back to Credit Products
        </Link>
      </div>
    </div>
  );
}
