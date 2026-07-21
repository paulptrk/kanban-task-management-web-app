import React from 'react';
import data from '../data.json';
import logoLight from '../assets/logo-light.svg';

function App() {
  return (
    <div className="bg-very-dark-grey flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="bg-dark-grey border-lines-dark flex w-[300px] shrink-0 flex-col border-r">
        <div className="mb-[55px] pt-8 pl-[34px]">
          <img src={logoLight} alt="Kanban Logo" className="logo-class" />
        </div>
      </div>
    </div>
  );
}

export default App;
