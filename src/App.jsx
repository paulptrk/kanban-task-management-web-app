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
      {isSidebarVisible ? (
        <Sidebar onHide={() => setIsSidebarVisible(false)} />
      ) : (
        <ShowSidebarButton onClick={() => setIsSidebarVisible(true)} />
      )}
      <TaskDetailModal />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <Board />
      </div>
    </div>
  );
}

export default App;
