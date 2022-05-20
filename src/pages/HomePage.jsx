import React from 'react';
import { Navigate } from 'react-router-dom';

function HomePage() {
  return (
    <Navigate to="/cameras" />
  );
}

export default HomePage;
