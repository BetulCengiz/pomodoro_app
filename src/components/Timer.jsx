import { usePomodoro } from '../contexts/PomodoroContext';
import { useEffect, useState } from 'react';

export default function Timer() {
    const {
        currentMinutes,
        currentSeconds,
        isRunning,
        isWorkTime,
        startTimer,
        pauseTimer,
        resetTimer,
        workMinutes,
        workSeconds,
        breakMinutes,
        breakSeconds,
        updateWorkTime,
        updateBreakTime,
        setPreset
    } = usePomodoro();

    // Calculate progress for the SVG circle
    const totalSecondsValue = isWorkTime ? (workMinutes * 60 + workSeconds) : (breakMinutes * 60);
    const currentTotalSeconds = currentMinutes * 60 + currentSeconds;
    const progress = totalSecondsValue > 0 ? currentTotalSeconds / totalSecondsValue : 0;

    const strokeDasharray = 1250;
    const strokeDashoffset = strokeDasharray - (strokeDasharray * progress);

    // Form input state
    const [inputMinutes, setInputMinutes] = useState(workMinutes);
    const [inputSeconds, setInputSeconds] = useState(workSeconds);
    const [inputBreak, setInputBreak] = useState(breakMinutes);
    const [inputBreakSeconds, setInputBreakSeconds] = useState(breakSeconds);

    useEffect(() => {
        setInputMinutes(workMinutes);
        setInputSeconds(workSeconds);
        setInputBreak(breakMinutes);
        setInputBreakSeconds(breakSeconds);
    }, [workMinutes, workSeconds, breakMinutes, breakSeconds]);

    const handleMinutesChange = (e) => {
        let val = parseInt(e.target.value);
        if (isNaN(val) || val < 0) val = 0;
        if (val > 120) val = 120;
        setInputMinutes(val);
        updateWorkTime(val, inputSeconds);
    };

    const handleSecondsChange = (e) => {
        let val = parseInt(e.target.value);
        if (isNaN(val) || val < 0) val = 0;
        if (val > 59) val = 59;
        setInputSeconds(val);
        updateWorkTime(inputMinutes, val);
    };

    const handleBreakChange = (e) => {
        let val = parseInt(e.target.value);
        if (isNaN(val) || val < 0) val = 0;
        if (val > 60) val = 60;
        setInputBreak(val);
        updateBreakTime(val, inputBreakSeconds);
    };

    const handleBreakSecondsChange = (e) => {
        let val = parseInt(e.target.value);
        if (isNaN(val) || val < 0) val = 0;
        if (val > 59) val = 59;
        setInputBreakSeconds(val);
        updateBreakTime(inputBreak, val);
    };

    return (
        <div className="flex flex-col flex-grow 
    w-full lg:w-auto            {/* Mobilde tam genişlik (w-full) almalı */}
    h-auto lg:h-[590px]         {/* Yükseklik mobilde otomatik */}
    
    // YENİ HİZALAMA: Mobilde içeriği en üste (start) hizala
    items-start lg:items-center 
    justify-start lg:justify-center 
    
    // ... Diğer Stil Sınıfları ...
    shrink-0 bg-[#151925]/10 backdrop-blur-md border border-white/5 rounded-[2rem] shadow-2xl overflow-hidden relative p-4 md:p-6 transition-all duration-300">
            <div className="relative flex items-center justify-center mb-6 md:mb-8 w-full max-w-[280px] aspect-square mx-auto">
                <svg className="w-full h-full transform -rotate-90">
                    <defs>
                        <linearGradient id="gradient" x1="0%" x2="100%" y1="0%" y2="100%">
                            <stop offset="0%" stopColor="var(--color-primary)"></stop>
                            <stop offset="100%" stopColor="var(--color-secondary)"></stop>
                        </linearGradient>
                    </defs>
                    <circle cx="50%" cy="50%" fill="transparent" r="45%" stroke="rgba(255,255,255,0.05)" strokeWidth="6"></circle>
                    <circle
                        className="gradient-stroke transition-all duration-100 ease-linear"
                        cx="50%"
                        cy="50%"
                        fill="transparent"
                        r="45%"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        strokeWidth="6"
                    ></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-2 font-[Spline Sans] bg-clip-text text-transparent bg-gradient-to-br from-purple-200 to-white">
                        {String(currentMinutes).padStart(2, '0')}:{String(currentSeconds).padStart(2, '0')}
                    </h2>
                    <div className="flex items-center gap-2 text-white font-semibold tracking-widest uppercase text-xs md:text-sm mt-1">
                        <span className="material-symbols-outlined text-[16px] md:text-[18px] material-symbols-filled">bolt</span>
                        {isWorkTime ? 'ÇALIŞMA ZAMANI' : 'MOLA ZAMANI'}
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 mb-6 w-full justify-center">
                {!isRunning ? (
                    <button
                        onClick={startTimer}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all active:scale-95 flex items-center gap-2 min-w-[120px] justify-center"
                    >
                        <span className="material-symbols-filled text-[24px]">play_arrow</span>
                        Başlat
                    </button>
                ) : (
                    <button
                        onClick={pauseTimer}
                        className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-red-500/20 hover:shadow-red-500/40 transition-all active:scale-95 flex items-center gap-2 min-w-[120px] justify-center"
                    >
                        <span className="material-symbols-filled text-[24px]">pause</span>
                        Duraklat
                    </button>
                )}

                <button
                    onClick={resetTimer}
                    className="bg-white/5 hover:bg-white/10 text-slate-300 font-medium py-3 px-6 rounded-xl border border-white/10 transition-all hover:text-white active:scale-95 flex items-center gap-2 min-w-[120px] justify-center"
                >
                    <span className="material-symbols-outlined text-[20px]">refresh</span>
                    Sıfırla
                </button>
            </div>

            {/* Presets */}
            <div className="grid grid-cols-4 gap-2 mb-6 w-full max-w-sm">
                {[
                    { work: 25, break: 5, label: '25/5' },
                    { work: 30, break: 10, label: '30/10' },
                    { work: 40, break: 10, label: '40/10' },
                    { work: 50, break: 10, label: '50/10' }
                ].map((preset) => (
                    <button
                        key={preset.label}
                        onClick={() => setPreset(preset.work, preset.break)}
                        className="bg-[#1e2230] hover:bg-[#2a2e40] text-slate-400 hover:text-purple-300 text-xs font-semibold py-2 rounded-lg border border-white/5 transition-colors"
                    >
                        {preset.label}
                    </button>
                ))}
            </div>

            {/* Inputs */}
            <div className="flex items-center justify-between 
    gap-3 sm:gap-6 w-full max-w-sm 
    bg-[#1e2230]/50 p-4 rounded-2xl border border-white/10">
                <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">Çalışma</span>
                    <div className="flex items-center gap-1 bg-[#151925] rounded-xl px-3 py-2 border border-white/10">
                        <input
                            className="bg-transparent text-white border-none p-0 w-12 text-center text-2xl font-bold focus:ring-0 placeholder-slate-600 font-mono no-spinner"
                            type="number"
                            value={inputMinutes}
                            onChange={handleMinutesChange}
                        />
                        <span className="text-slate-500 text-lg font-bold">:</span>
                        <input
                            className="bg-transparent text-white border-none p-0 w-12 text-center text-2xl font-bold focus:ring-0 placeholder-slate-600 font-mono no-spinner"
                            type="number"
                            value={inputSeconds}
                            onChange={handleSecondsChange}
                        />
                    </div>
                </div>

                <div className="h-12 w-px bg-white/10"></div>

                <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">Mola</span>
                    <div className="flex items-center gap-1 bg-[#151925] rounded-xl px-3 py-2 border border-white/10">
                        <input
                            className="bg-transparent text-white border-none p-0 w-12 text-center text-2xl font-bold focus:ring-0 placeholder-slate-600 font-mono no-spinner"
                            type="number"
                            value={inputBreak}
                            onChange={handleBreakChange}
                        />
                        <span className="text-slate-500 text-lg font-bold">:</span>
                        <input
                            className="bg-transparent text-white border-none p-0 w-12 text-center text-2xl font-bold focus:ring-0 placeholder-slate-600 font-mono no-spinner"
                            type="number"
                            value={inputBreakSeconds}
                            onChange={handleBreakSecondsChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
