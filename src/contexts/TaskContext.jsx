import { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext();

export const useTask = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTask must be used within TaskProvider');
    }
    return context;
};

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = () => {
        const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        setTasks(allTasks);
    };

    const addTask = (taskData) => {
        const newTask = {
            id: Date.now().toString(),
            ...taskData,
            completed: false,
            pomodorosCompleted: 0,
            createdAt: new Date().toISOString(),
        };

        const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        allTasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(allTasks));

        setTasks(prev => [...prev, newTask]);
        return newTask;
    };

    const updateTask = (taskId, updates) => {
        const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const taskIndex = allTasks.findIndex(t => t.id === taskId);

        if (taskIndex !== -1) {
            allTasks[taskIndex] = { ...allTasks[taskIndex], ...updates };
            localStorage.setItem('tasks', JSON.stringify(allTasks));
            setTasks(allTasks); // Update state directly
        }
    };

    const deleteTask = (taskId) => {
        const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const filteredTasks = allTasks.filter(t => t.id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(filteredTasks));
        setTasks(filteredTasks);
    };

    const incrementPomodoro = (taskId) => {
        const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const taskIndex = allTasks.findIndex(t => t.id === taskId);

        if (taskIndex !== -1) {
            allTasks[taskIndex].pomodorosCompleted = (allTasks[taskIndex].pomodorosCompleted || 0) + 1;
            localStorage.setItem('tasks', JSON.stringify(allTasks));
            setTasks(allTasks);
        }
    };

    const toggleTaskCompletion = (taskId) => {
        const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const taskIndex = allTasks.findIndex(t => t.id === taskId);

        if (taskIndex !== -1) {
            allTasks[taskIndex].completed = !allTasks[taskIndex].completed;
            localStorage.setItem('tasks', JSON.stringify(allTasks));
            setTasks(allTasks);
        }
    };

    const value = {
        tasks,
        addTask,
        updateTask,
        deleteTask,
        incrementPomodoro,
        toggleTaskCompletion,
    };

    return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
