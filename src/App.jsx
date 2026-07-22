import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Board from './components/Board';

function App() {
  return (
    <div className="bg-very-dark-grey flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <Board />
      </div>
    </div>
  );
}

export default App;
