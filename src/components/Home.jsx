import React, { useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    const user = AuthService.getCurrentUser();
    setIsLoggedIn(!!user);
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : isLoggedIn ? (
        <>
          <h1>Welcome to the Bike CRUD</h1>
          <br />
          <h2>To handle crud operation please click below on bike button and goto bike page</h2>
          <br />

          <a className="btn btn-success" href="/bikes">Bikes</a>
        </>
      ) : (
        <>
          <h1>Welcome to the Bike CRUD Website</h1>
          <br />
          <h2>Please Login or Register to Handle CRUD</h2>
          <a className="btn btn-primary" href="/login">Login</a>
        </>
      )}
    </div>
  );
};

export default HomePage;




