import React, { useState, useRef, useEffect } from 'react'; // 🎯 React'ı import ettik

const TRACKS = [
    // ... (mevcut TRACKS dizisi)
    {
        id: 'rain',
        name: '1. Felicity',
        icon: '🌧️',
        url: '/audio/mixkit-1.mp3',
        image: 'https://images.unsplash.com/photo-1633176653564-557bc1a0c852?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        id: 'forest',
        name: '2. Pluviophile',
        icon: '🌲',
        url: '/audio/mixkit-2.wav',
        image: 'https://images.unsplash.com/photo-1755167611180-78c2231d71c2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        id: 'cafe',
        name: '3. Wanderlust',
        icon: '☕',
        url: '/audio/mixkit-3.mp3',
        image: 'https://images.unsplash.com/photo-1622737133809-d95047b9e673?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        id: 'yoga',
        name: '4. Serenity',
        icon: '🧘',
        url: '/audio/mixkit-4.mp3',
        image: 'https://images.unsplash.com/photo-1484589065579-248aad0d8b13?q=80&w=759&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        id: 'underwater',
        name: '5. Tranquillity',
        icon: '🌊',
        url: '/audio/mixkit-5.mp3',
        image: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        id: 'beach',
        name: '6. Serendipity',
        icon: '🏖️',
        url: '/audio/mixkit-6.mp3',
        image: 'https://plus.unsplash.com/premium_photo-1666739087558-c7e7a6d748a9?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        id: 'handpan',
        name: 'Handpan',
        icon: '🌧️',
        url: '/audio/handpan3.mp3',
        image: 'https://images.unsplash.com/photo-1762199715541-a42f25f48ecf?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
];

function MusicPlayer() { // Bileşen fonksiyonu artık export edilmiyor
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const currentTrack = TRACKS[currentTrackIndex];
    const audioRef = useRef(null);

    // ... (Tüm useEffect ve diğer fonksiyonlar aynı kalır)

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.load(); // Reload audio element when source changes
            if (isPlaying) {
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.error("Audio playback error:", error);
                        setIsPlaying(false);
                    });
                }
            }
        }
    }, [currentTrackIndex]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    // useEffect removed to avoid conflict with direct control logic

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };
    const toggleMute = () => {
        // Eğer ses seviyesi 0'dan büyükse, 0'a çek (mute)
        // Eğer 0 ise, 0.5'e çek (unmute)
        if (volume > 0) {
            setVolume(0);
        } else {
            setVolume(0.5);
        }
    };
    const formatTime = (time) => {
        if (isNaN(time)) return "00:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            console.log("Attempting to play:", currentTrack.url);
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log("Playback started successfully");
                        setIsPlaying(true);
                    })
                    .catch(error => {
                        console.error("Playback failed:", error);
                        setIsPlaying(false);
                    });
            }
        }
    };

    const handleNext = () => {
        if (isShuffle) {
            let nextIndex = Math.floor(Math.random() * TRACKS.length);
            // Avoid repeating the same song if there are multiple tracks
            while (nextIndex === currentTrackIndex && TRACKS.length > 1) {
                nextIndex = Math.floor(Math.random() * TRACKS.length);
            }
            setCurrentTrackIndex(nextIndex);
        } else {
            setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
        }
        setIsPlaying(true);
    };

    const handleTrackEnded = () => {
        if (isRepeat) {
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
            }
        } else {
            handleNext();
        }
    };

    const handlePrev = () => {
        setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
        setIsPlaying(true);
    };

    const handleTrackSelect = (index) => {
        setCurrentTrackIndex(index);
        setIsPlaying(true);
    };


    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleSeek = (e) => {
        const time = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    return (
        <div className="flex flex-col flex-1 bg-[#151925]/10 border border-white/5 rounded-[2rem] p-5 shadow-xl relative overflow-hidden group backdrop-blur-md transition-colors hover:bg-[#151925]/20 h-[400px] w-full">
            {/* Audio managed imperatively via ref */}
            <audio
                ref={audioRef}
                src={currentTrack.url}
                preload="auto"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleTrackEnded}
                onError={(e) => console.error("Audio error:", e)}
            />

            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-transparent pointer-events-none"></div>

            {/* Header */}
            <div className="flex items-center justify-between mb-6 z-10 relative shrink-0">
                <div className="flex items-center gap-2 text-white font-bold text-lg">
                    <span className="material-symbols-outlined text-purple-400">music_note</span>
                    Focus Müzikleri
                </div>
            </div>

            {/* Select Bar (Dropdown) */}
            <div className="relative z-10 mb-auto">
                <div className="relative">
                    <select
                        value={currentTrackIndex}
                        onChange={(e) => handleTrackSelect(Number(e.target.value))}
                        className="w-full appearance-none bg-[#1c2133] text-white border border-white/10 rounded-xl px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all cursor-pointer text-sm font-medium hover:bg-[#232942]"
                    >
                        {TRACKS.map((track, idx) => (
                            <option key={track.id} value={idx} className="bg-[#151925] text-white py-2">
                                {track.icon} {track.name}
                            </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-400">
                        <span className="material-symbols-outlined">expand_more</span>
                    </div>
                </div>

                {/* Now Playing Info - Simplified since we have the dropdown */}
                <div className="mt-4 px-1 py-2">
                    <div className="flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/5">
                        <div className="h-10 w-10 rounded-lg bg-cover bg-center shadow-lg shrink-0" style={{ backgroundImage: `url(${currentTrack.image})` }}></div>
                        <div className="min-w-0 flex-1">
                            <h3 className="text-sm font-bold text-white mb-0.5 truncate">{currentTrack.name}</h3>
                        </div>
                        {isPlaying && (
                            <span className="material-symbols-outlined text-purple-400 animate-pulse text-xl">equalizer</span>
                        )}
                    </div>
                </div>
            </div>

            <div className="z-10 relative mt-auto shrink-0 bg-[#151925]/50 p-3 rounded-xl border border-white/5 backdrop-blur-sm">

                {/* Progress Bar */}
                <div className="group/bar py-1 mb-1">
                    <input
                        type="range"
                        min="0"
                        max={duration || 100}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full h-1 bg-slate-700/50 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400 transition-all"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono font-medium mt-1">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between px-1 mt-2">
                    <button
                        onClick={() => setIsShuffle(!isShuffle)}
                        className={`transition-colors ${isShuffle ? 'text-purple-400' : 'text-slate-500 hover:text-white'}`}
                        title="Karıştır"
                    >
                        <span className="material-symbols-outlined text-[16px]">shuffle</span>
                    </button>
                    <button
                        onClick={() => setIsRepeat(!isRepeat)}
                        className={`transition-colors ${isRepeat ? 'text-purple-400' : 'text-slate-500 hover:text-white'}`}
                        title="Tekrarla"
                    >
                        <span className="material-symbols-outlined text-[16px]">{isRepeat ? 'repeat_one' : 'repeat'}</span>
                    </button>
                    <div className="flex items-center gap-3">
                        <button onClick={handlePrev} className="text-slate-300 hover:text-white transition-colors hover:scale-110 active:scale-95">
                            <span className="material-symbols-filled text-[24px]">skip_previous</span>
                        </button>
                        <button onClick={togglePlay} className="bg-white text-black w-8 h-8 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-purple-500/20">
                            <span className="material-symbols-filled text-[20px] text-black">
                                {isPlaying ? 'pause' : 'play_arrow'}
                            </span>
                        </button>
                        <button onClick={handleNext} className="text-slate-300 hover:text-white transition-colors hover:scale-110 active:scale-95">
                            <span className="material-symbols-filled text-[24px]">skip_next</span>
                        </button>
                    </div>
                    <div className="flex items-center gap-2">

                        {/* Mute Düğmesi */}
                        <button
                            onClick={toggleMute}
                            className={`transition-colors text-slate-500 hover:text-white ${volume === 0 ? 'text-red-400' : 'text-slate-500'}`}
                            title={volume > 0 ? "Sesi Kapat" : "Sesi Aç"}
                        >
                            {/* İkon: Ses 0 ise mute, 0.5+ ise yüksek, 0.1-0.5 arası ise düşük */}
                            <span className="material-symbols-outlined text-[18px]">
                                {volume === 0 ? 'volume_off' : volume > 0.5 ? 'volume_up' : 'volume_down'}
                            </span>
                        </button>

                        {/* Ses Seviyesi Çubuğu (Input Range) */}
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.05" // Küçük adımlarla daha hassas ayar
                            value={volume}
                            onChange={handleVolumeChange}
                            className="w-16 h-1 bg-slate-700/50 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400 transition-all"
                        />
                    </div>

                </div>
            </div>
        </div>
    );
}

// 🎯 Component'i React.memo ile sarmalayın
export default React.memo(MusicPlayer);