import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RedirectPage = () => {
  const { shortID } = useParams();

  useEffect(() => {
    if (shortID) {
      // Redirect to the backend which handles the logic and click tracking
      window.location.href = `http://localhost:3000/r/${shortID}`;
    }
  }, [shortID]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-xl text-gray-400 font-medium tracking-wide">Redirecting you shortly...</p>
    </div>
  );
};

export default RedirectPage;
