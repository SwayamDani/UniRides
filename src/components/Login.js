// src/components/Login.js
import React, { useEffect } from 'react';
import {SignedIn, SignedOut, useAuth } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import './Login.css'; // Import the external CSS file

const Login = () => {
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (!isSignedIn) {
      // Redirect to the external sign-in URL if signed out
      window.location.href = 'https://upright-piranha-70.accounts.dev/sign-in';
    }
  }, [isSignedIn]);

  return (
    <div className="container">
      <SignedIn>
        <Navigate to="/profile" />
      </SignedIn>
      <SignedOut>
        <div>
          {/* This div will be empty because the useEffect will redirect */}
        </div>
      </SignedOut>
    </div>
  );
};

export default Login;