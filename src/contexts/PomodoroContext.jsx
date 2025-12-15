import { createContext, useContext, useState, useEffect } from 'react';

const PomodoroContext = createContext();

export const usePomodoro = () => {
    const context = useContext(PomodoroContext);
    if (!context) {
        throw new Error('usePomodoro must be used within PomodoroProvider');
    }
    return context;
};

export const PomodoroProvider = ({ children }) => {
    const [workMinutes, setWorkMinutes] = useState(25);
    const [workSeconds, setWorkSeconds] = useState(0);
    const [breakMinutes, setBreakMinutes] = useState(5);
    const [breakSeconds, setBreakSeconds] = useState(0);
    const [currentMinutes, setCurrentMinutes] = useState(25);
    const [currentSeconds, setCurrentSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isWorkTime, setIsWorkTime] = useState(true);
    const [selectedTask, setSelectedTask] = useState(null);
    const [stats, setStats] = useState({
        completedSessions: 0,
        totalMinutes: 0,
        currentStreak: 0,
    });

    useEffect(() => {
        loadStats();
    }, []);

    // Play notification sound
    const playBell = () => {
        const audio = new Audio('/audio/church-bell.wav');
        audio.play().catch(e => console.log('Audio play failed:', e));
    };

    useEffect(() => {
        let interval = null;

        if (isRunning) {
            interval = setInterval(() => {
                // Play bell 3 seconds before end
                if (currentMinutes === 0 && currentSeconds === 12) {
                    playBell();
                }

                if (currentSeconds === 0) {
                    if (currentMinutes === 0) {
                        handleTimerComplete();
                    } else {
                        setCurrentMinutes(prev => prev - 1);
                        setCurrentSeconds(59);
                    }
                } else {
                    setCurrentSeconds(prev => prev - 1);
                }
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRunning, currentMinutes, currentSeconds, isWorkTime]);

    const loadStats = () => {
        const savedStats = JSON.parse(localStorage.getItem('pomodoroStats') || 'null');

        if (savedStats && savedStats.date === new Date().toDateString()) {
            setStats(savedStats);
        } else {
            setStats({
                completedSessions: 0,
                totalMinutes: 0,
                currentStreak: 0,
            });
        }
    };

    const saveStats = (newStats) => {
        const statToSave = {
            ...newStats,
            date: new Date().toDateString(),
        };
        localStorage.setItem('pomodoroStats', JSON.stringify(statToSave));
        setStats(newStats);
    };

    const handleTimerComplete = () => {

        if (isWorkTime) {
            const newStats = {
                completedSessions: stats.completedSessions + 1,
                totalMinutes: stats.totalMinutes + workMinutes,
                currentStreak: stats.currentStreak + 1,
            };
            saveStats(newStats);

            // Show notification
            if ('Notification' in window && Notification.permission === 'granted') {
                new Notification('Harika! 🎉', {
                    body: 'Çalışma süresi tamamlandı. Mola zamanı!',
                });
            }
        } else {
            if ('Notification' in window && Notification.permission === 'granted') {
                new Notification('Mola Bitti! 💪', {
                    body: 'Tekrar çalışma zamanı!',
                });
            }
        }

        // Switch between work and break
        setIsWorkTime(!isWorkTime);
        if (!isWorkTime) {
            setCurrentMinutes(workMinutes);
            setCurrentSeconds(workSeconds);
        } else {
            setCurrentMinutes(breakMinutes);
            setCurrentSeconds(breakSeconds);
        }
        setIsRunning(true);
    };

    const startTimer = () => {
        setIsRunning(true);
        // Request notification permission
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    };

    const pauseTimer = () => {
        setIsRunning(false);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setCurrentMinutes(isWorkTime ? workMinutes : breakMinutes);
        setCurrentSeconds(isWorkTime ? workSeconds : 0);
    };

    const setPreset = (work, breakTime) => {
        setWorkMinutes(work);
        setWorkSeconds(0);
        setBreakMinutes(breakTime);
        setBreakSeconds(0);
        setCurrentMinutes(work);
        setCurrentSeconds(0);
        setIsRunning(false);
        setIsWorkTime(true);
    };

    const updateWorkTime = (minutes, seconds = 0) => {
        setWorkMinutes(minutes);
        setWorkSeconds(seconds);
        if (isWorkTime && !isRunning) {
            setCurrentMinutes(minutes);
            setCurrentSeconds(seconds);
        }
    };

    const updateBreakTime = (minutes, seconds = 0) => {
        setBreakMinutes(minutes);
        setBreakSeconds(seconds);
        if (!isWorkTime && !isRunning) {
            setCurrentMinutes(minutes);
            setCurrentSeconds(seconds);
        }
    };

    const value = {
        workMinutes,
        workSeconds,
        breakMinutes,
        breakSeconds,
        currentMinutes,
        currentSeconds,
        isRunning,
        isWorkTime,
        selectedTask,
        stats,
        setSelectedTask,
        startTimer,
        pauseTimer,
        resetTimer,
        setPreset,
        updateWorkTime,
        updateBreakTime
    };

    return <PomodoroContext.Provider value={value}>{children}</PomodoroContext.Provider>;
};
