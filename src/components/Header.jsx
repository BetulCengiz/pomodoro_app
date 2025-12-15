import React from 'react';

function Header({ onOpenSettings }) {
    // Component'in tüm mantığı ve JSX içeriği buraya taşındı.
    return (
        <header className="relative z-20 flex w-full items-center justify-between px-4 py-4 md:px-12 md:py-4">
            <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[32px] text-purple-400">check_circle</span>
                <div className="flex flex-col">
                    <h1 className="text-xl font-bold text-white tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Pomodoro Timer & Focus Tool</h1>
                    <span className="text-xs text-slate-500 font-medium tracking-wide">Odaklanın, Daha Verimli Çalışın</span>
                </div>
            </div>
            <button
                onClick={onOpenSettings}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all text-slate-400 hover:text-white"
                title="Tema Ayarları"
            >
                <span className="material-symbols-outlined">brush</span>
            </button>
        </header>
    );
}

// 🎯 React.memo ile sarmalandı: Prop'ları değişmedikçe yeniden render edilmez.
export default React.memo(Header);