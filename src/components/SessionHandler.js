// src/components/SessionHandler.js

import React, { useEffect } from 'react';

const SessionHandler = () => {
  useEffect(() => {
    const clearCookies = () => {
      // Get all cookies for the current domain
      const cookies = document.cookie.split('; ');
      for (let cookie of cookies) {
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;

        // Set cookie expiration to the past to delete it
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`;
      }
    };

    const handleBeforeUnload = (event) => {
      clearCookies(); // Clear all cookies when closing the page

      event.preventDefault(); // Required for triggering alert in some browsers
      event.returnValue = ''; // Modern browsers require this for showing a prompt
    };

    // Add the beforeunload event listener
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return null; // No UI, only functionality
};

export default SessionHandler;
