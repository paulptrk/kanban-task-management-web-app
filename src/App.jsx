import React, { useState } from 'react';
import data from '../data.json';

function App() {
  const [boards, setBoards] = useState(data.boards || []);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col items-center justify-center p-6 transition-colors duration-200">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-indigo-600 dark:text-indigo-400">
          Kanban Task Management
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          React + Vite + Tailwind CSS v4 Scaffold
        </p>
      </header>
      
      <main className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 transition-colors duration-200">
        <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-100 border-b border-slate-100 dark:border-slate-700 pb-4">
          Boards Available in data.json:
        </h2>
        
        <ul className="space-y-4">
          {boards.map((board, index) => (
            <li 
              key={index} 
              className="p-5 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-700 flex justify-between items-center hover:shadow-md transition-all duration-200"
            >
              <div>
                <span className="font-semibold text-lg text-slate-800 dark:text-slate-200">{board.name}</span>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Columns: {board.columns?.map(col => col.name).join(', ') || 'None'}
                </p>
              </div>
              <span className="px-3 py-1.5 bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-semibold rounded-full uppercase tracking-wider">
                {board.columns?.length || 0} Columns
              </span>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
