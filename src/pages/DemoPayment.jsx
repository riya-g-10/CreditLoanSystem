import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';

export default function DemoPayment() {
  const { loanId } = useParams();
  const navigate = useNavigate();

  const [loan, setLoan] = useState(null);
  const [loadingLoan, setLoadingLoan] = useState(true);
  const [fetchError, setFetchError] = useState('');

  // Payment states
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paidLoanDetails, setPaidLoanDetails] = useState(null);
  const [paymentError, setPaymentError] = useState('');

  // Fetch loan application details from backend on load
  useEffect(() => {
    async function fetchLoan() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/loans/${loanId}`);
        const data = await response.json();

        if (response.ok && data.loan) {
          setLoan(data.loan);
          if (data.loan.status === 'Submitted / Processing') {
            setPaymentSuccess(true);
            setPaidLoanDetails(data.loan);
          }
        } else {
          setFetchError(data.error || 'Failed to load loan application.');
        }
      } catch (err) {
        console.error('Fetch loan error:', err);
        setFetchError('Unable to connect to backend server.');
      } finally {
        setLoadingLoan(false);
      }
    }

    if (loanId) {
      fetchLoan();
    }
  }, [loanId]);

  // Handle Simulated Pay Now Click
  const handlePayNow = async () => {
    setIsProcessing(true);
    setPaymentError('');

    // Simulate 2-second gateway processing delay for demo realism
    setTimeout(async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/loans/${loanId}/pay-fee`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();

        if (response.ok && data.loan) {
          setPaymentSuccess(true);
          setPaidLoanDetails(data.loan);
        } else {
          setPaymentError(data.error || 'Failed to process payment.');
        }
      } catch (err) {
        console.error('Payment error:', err);
        setPaymentError('Unable to process demo payment request.');
      } finally {
        setIsProcessing(false);
      }
    }, 2000);
  };

  if (loadingLoan) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <div className="spinner" style={{ margin: '0 auto 1rem' }}></div>
        <p style={{ color: 'var(--text-muted)' }}>Loading loan application checkout...</p>
      </div>
    );
  }

  if (fetchError || !loan) {
    return (
      <div style={{ maxWidth: '600px', margin: '3rem auto', textAlign: 'center' }}>
        <div class="card">
          <h2 style={{ color: '#dc2626', marginBottom: '1rem' }}>Application Not Found</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{fetchError || 'Unable to retrieve loan details.'}</p>
          <Link to="/home" class="btn btn-primary">Return to Home Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '720px', margin: '1.5rem auto' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/apply-loan" class="btn btn-outline" style={{ fontSize: '0.85rem' }}>
          ← Back to Application Form
        </Link>
        <div style={{ background: '#fef3c7', border: '1px solid #fde047', color: '#854d0e', padding: '0.3rem 0.75rem', borderRadius: '99px', fontSize: '0.78rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          Payment
        </div>
      </div>

      {!paymentSuccess ? (
        /* CHECKOUT / PAYMENT FORM STATE */
        <div class="card">
          <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
            <span class="product-tag">Fee Checkout</span>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
              Loan Submission & Processing Fee
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Confirm your loan details and execute simulated payment to update application status in database.
            </p>
          </div>

          {paymentError && (
            <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#dc2626', padding: '0.75rem', borderRadius: '8px', fontSize: '0.88rem', marginBottom: '1rem' }}>
              ⚠️ {paymentError}
            </div>
          )}

          {/* Application Summary Box */}
          <div style={{ background: '#f8fafc', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Application Summary</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', fontSize: '0.9rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Application ID</span>
                <div style={{ fontFamily: 'monospace', fontWeight: 700 }}>{loan._id}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Applicant Name</span>
                <div style={{ fontWeight: 600 }}>{loan.fullName}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Loan Category</span>
                <div style={{ fontWeight: 600 }}>{loan.loanType}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Requested Amount</span>
                <div style={{ fontWeight: 700, color: 'var(--primary)' }}>${loan.loanAmount.toLocaleString()}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Tenure</span>
                <div style={{ fontWeight: 600 }}>{loan.tenure} Months</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Current DB Status</span>
                <div>
                  <span style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#b45309', padding: '0.2rem 0.55rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700 }}>
                    {loan.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Fee Calculation Breakdown */}
          <div style={{ border: '1.5px dashed var(--border-color)', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Documentation & Processing Fee (1%)</span>
              <strong>${loan.processingFee}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>GST / Verification Charges</span>
              <strong style={{ color: 'var(--success)' }}>FREE ($0)</strong>
            </div>
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, fontSize: '1rem' }}>Total Fee Payable</span>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)' }}>${loan.processingFee}</span>
            </div>
          </div>

          {/* Pay Button Action */}
          <button
            type="button"
            onClick={handlePayNow}
            disabled={isProcessing}
            class="btn btn-primary"
            style={{
              width: '100%',
              padding: '0.9rem',
              fontSize: '1.05rem',
              justifyContent: 'center',
              background: isProcessing ? '#64748b' : 'var(--primary)',
              cursor: isProcessing ? 'not-allowed' : 'pointer'
            }}
          >
            {isProcessing ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
                <span className="spinner-sm"></span> Processing Payment...
              </span>
            ) : (
              `Pay Now — $${loan.processingFee}`
            )}
          </button>

          <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '1rem' }}>
            Safe Payment
          </p>
        </div>
      ) : (
        /* SUCCESS / CONFIRMATION SCREEN */
        <div class="card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
          <div style={{ width: '64px', height: '64px', background: '#d1fae5', color: '#059669', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 1.25rem', fontWeight: 900 }}>
            ✓
          </div>

          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            Loan Application Submitted!
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
            Processing fee payment verified. Your loan application status in MongoDB has been updated to <strong>"Submitted / Processing"</strong>.
          </p>

          {/* Transaction Receipt Card */}
          <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '12px', padding: '1.25rem', textAlign: 'left', maxWidth: '520px', margin: '0 auto 1.75rem' }}>
            <h4 style={{ color: '#047857', marginBottom: '0.75rem', fontSize: '0.95rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Transaction Receipt</span>
              <span style={{ background: '#059669', color: '#ffffff', fontSize: '0.72rem', padding: '0.15rem 0.5rem', borderRadius: '99px' }}>SUCCESS</span>
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem', color: '#064e3b' }}>
              <div>
                <strong>Transaction ID:</strong>
                <div style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>{paidLoanDetails?.paymentTxnId}</div>
              </div>
              <div>
                <strong>Updated Status:</strong>
                <div style={{ fontWeight: 700 }}>{paidLoanDetails?.status}</div>
              </div>
              <div>
                <strong>Borrower Name:</strong>
                <div>{paidLoanDetails?.fullName}</div>
              </div>
              <div>
                <strong>Fee Paid:</strong>
                <div>${paidLoanDetails?.processingFee}</div>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <strong>Date & Time:</strong>
                <div>{paidLoanDetails?.paidAt ? new Date(paidLoanDetails.paidAt).toLocaleString() : new Date().toLocaleString()}</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/home" class="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
              Return to Home Dashboard
            </Link>
            <Link to="/apply-loan" class="btn btn-outline" style={{ padding: '0.75rem 1.5rem' }}>
              Submit Another Application
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
