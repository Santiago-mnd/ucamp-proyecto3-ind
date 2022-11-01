import React from 'react';

const MainContent = ({ children }) => {
  // posible bg-[url('https://www.toptal.com/designers/subtlepatterns/uploads/micro_carbon.png')] bg-opacity-70
  return (
    <main className="h-screen bg-gradient-to-b from-purple-500 to-pink-500 overflow-y-auto mainContent">
      {children}
    </main>
  );
};

export default MainContent;
