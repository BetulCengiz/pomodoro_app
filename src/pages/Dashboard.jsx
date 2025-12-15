import { useState, lazy, Suspense, useCallback } from 'react'; // 'lazy' ve 'Suspense' eklendi
import Header from '../components/Header';
import Timer from '../components/Timer';
import MusicPlayer from '../components/MusicPlayer';
import TaskList from '../components/TaskList';
// import LiquidEther from '../components/LiquidEther'; // DİKKAT: Artık doğrudan import edilmeyecek!
import SettingsModal from '../components/SettingsModal';
import { useTheme } from '../contexts/ThemeContext';


// ----------------------------------------------------------------------
// LAZY LOADING (TEMBEL YÜKLEME)
// three.js gibi büyük kütüphaneleri içeren bu bileşen,
// ana sayfa yüklendikten sonra (ayrı bir chunk olarak) indirilecektir.
const LazyLiquidEther = lazy(() => import('../components/LiquidEther'));
// ----------------------------------------------------------------------

export default function Dashboard() {
    const [showSettings, setShowSettings] = useState(false);
    const { currentTheme, themes } = useTheme();

    const activeColors = [
        themes[currentTheme].colors.primary,
        themes[currentTheme].colors.secondary,
        themes[currentTheme].colors.primary
    ];
    const handleOpenSettings = useCallback(() => {
        setShowSettings(true);
    }, []);
    return (
        <div className="relative min-h-screen w-full flex-col bg-[#0a0c10] transition-colors duration-500 overflow-x-hidden">

            {/* Ambient Background & Particles - SUSPENSE İLE SARILI */}
            <div className="absolute inset-0 z-0 ambient-bg transition-colors duration-500">
                {/* LiquidEther'in yüklenmesini beklerken bir bekleme (fallback) gösterilir.
                  Bu sayede, 1.6MB'lık three.js indirilirken tarayıcı bloke olmaz.
                */}
                <Suspense fallback={<div className="h-full w-full bg-[#0a0c10]/50" />}>
                    <LazyLiquidEther
                        colors={activeColors}
                        mouseForce={20}
                        cursorSize={100}
                        isViscous={false}
                        viscous={30}
                        iterationsViscous={32}
                        iterationsPoisson={32}
                        resolution={0.5}
                        isBounce={false}
                        autoDemo={true}
                        autoSpeed={0.5}
                        autoIntensity={2.2}
                        takeoverDuration={0.25}
                        autoResumeDelay={3000}
                        autoRampDuration={0.6}
                        
                    />
                </Suspense>
            </div>

            <Header onOpenSettings={handleOpenSettings} />

            <main className="relative z-10 flex flex-col lg:flex-row w-full max-w-[1600px] mx-auto p-4 md:p-8 gap-6 md:gap-8 items-start lg:items-center justify-centerr">
                {/* Left/Center - Timer (Kritik İçerik, hemen yüklenir) */}
                <Timer />

                {/* Right Side - Tasks & Music (Kritik İçerik, hemen yüklenir) */}
                <div className="flex flex-col w-full lg:w-96 gap-6 shrink-0 pb-6 lg:pb-0">
                    <TaskList />
                    <MusicPlayer />
                </div>
            </main>

            {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
        </div>
    );
}