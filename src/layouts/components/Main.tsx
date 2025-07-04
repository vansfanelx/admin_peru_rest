import React from 'react';

interface MainProps {
  children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => (
  <main className="main-content">
    {children}
  </main>
);

export default Main;
