import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ShowSidebarButton from './components/ShowSidebarButton';
import Header from './components/Header';
import Board from './components/Board';
import TaskDetailModal from './components/TaskDetailModal';

function App() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  return (
    <div className="bg-very-dark-grey flex h-screen overflow-hidden">
      <div
        className={`flex shrink-0 overflow-hidden transition-[width] duration-300 ease-in-out ${
          isSidebarVisible ? 'w-[300px]' : 'w-[0]'
        }`}
      >
        <Sidebar onHide={() => setIsSidebarVisible(false)} />
      </div>
      <ShowSidebarButton
        visible={!isSidebarVisible}
        onClick={() => setIsSidebarVisible(true)}
      />
      <TaskDetailModal />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header showLogo={!isSidebarVisible} />
        <Board />
      </div>
    </div>
  );
}

export default App;
