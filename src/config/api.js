// Central API Base URL Configuration for Local Dev and Vercel/Render Production Deployments
const getApiBaseUrl = () => {
  // If explicitly provided in environment variables (Vite prefix)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // In Vercel / production, relative route calls '/api/...' automatically rewrite to serverless API functions
  if (import.meta.env.PROD) {
    return '';
  }
  // Default local development server endpoint
  return 'http://localhost:5000';
};

export const API_BASE_URL = getApiBaseUrl();
