import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Profile() {
  const { name } = useParams();
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserName = () => {
      try {
        setIsLoading(true);
        
        const userData = localStorage.getItem('userName');

        if (!userData) {
          throw new Error('User name not found in local storage');
        }

        setUserName(userData);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchUserName();
  }, [name]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!userName) {
    return <div>No user name found</div>;
  }

  return (
    <div>
      <h1>Welcome, {userName}!</h1>
    </div>
  );
}

export default Profile;