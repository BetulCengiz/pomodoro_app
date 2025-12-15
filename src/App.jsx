import { TaskProvider } from './contexts/TaskContext';
import { PomodoroProvider } from './contexts/PomodoroContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <TaskProvider>
      <PomodoroProvider>
        <ThemeProvider>
          <Dashboard />
        </ThemeProvider>
      </PomodoroProvider>
    </TaskProvider>
  );
}

export default App;

