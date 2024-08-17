import React from 'react';

interface PageProps {
  children: React.ReactNode;
}

const Layout: React.FC<PageProps> = ({ children }) => {
  return (
    <div className="relative w-screen h-screen bg-black py-8 px-12">
      {children}
    </div>
  );
};

export default Layout;
