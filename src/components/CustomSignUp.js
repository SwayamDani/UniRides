// src/components/CustomSignUp.js
import React, { useState } from 'react';
import { useSignUp } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const CustomSignUp = () => {
  const { isLoaded, signUp } = useSignUp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [universityName, setUniversityName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (!isLoaded) {
      return;
    }

    try {
      // Step 1: Create the user account with Clerk
      await signUp.create({
        emailAddress: email,
        password,
        unsafeMetadata: {
          universityName,
          phoneNumber,
        },
      });

      // Step 2: Complete the sign-up flow (e.g., email verification step)
      await signUp.attemptEmailAddressVerification({
        // This would normally come from user input or a verification email code
        code: 'YOUR_VERIFICATION_CODE', 
      });

      // Step 3: Redirect to profile or another protected page after signup
      navigate('/profile');
    } catch (err) {
      setError(err.errors[0]?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="custom-signup">
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="University Name"
          value={universityName}
          onChange={(e) => setUniversityName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CustomSignUp;
