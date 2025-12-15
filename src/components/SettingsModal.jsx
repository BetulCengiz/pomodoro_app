import { useTheme } from '../contexts/ThemeContext';

export default function SettingsModal({ onClose }) {
    const { currentTheme, setCurrentTheme, themes } = useTheme();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative w-full max-w-md bg-[#151925] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-float">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-purple-400">palette</span>
                            Tema Ayarları
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-slate-400 hover:text-white transition-colors"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    <div className="space-y-4">
                        <p className="text-sm text-slate-400">Bir tema seçin:</p>
                        <div className="grid grid-cols-2 gap-3">
                            {Object.entries(themes).map(([key, theme]) => (
                                <button
                                    key={key}
                                    onClick={() => setCurrentTheme(key)}
                                    className={`relative p-3 rounded-xl border transition-all text-left flex items-center gap-3 overflow-hidden group
                                        ${currentTheme === key
                                            ? 'bg-white/10 border-purple-500 ring-1 ring-purple-500'
                                            : 'bg-[#1e2230] border-white/5 hover:bg-white/5 hover:border-white/10'
                                        }`}
                                >
                                    <div className="w-8 h-8 rounded-full shadow-lg flex-shrink-0" style={{ background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})` }}></div>
                                    <span className={`font-medium text-sm ${currentTheme === key ? 'text-white' : 'text-slate-300'}`}>
                                        {theme.name}
                                    </span>
                                    {currentTheme === key && (
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                            <span className="material-symbols-outlined text-purple-400 text-[20px]">check_circle</span>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
