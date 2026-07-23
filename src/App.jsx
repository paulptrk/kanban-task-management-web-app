import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Board from './components/Board';
import TaskDetailModal from './components/TaskDetailModal';

function App() {
  return (
    <div className="bg-very-dark-grey flex h-screen overflow-hidden">
      <Sidebar />
      <TaskDetailModal />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <Board />
      </div>
    </div>
  );
}

export default App;
