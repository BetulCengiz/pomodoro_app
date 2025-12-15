import { useState } from 'react';
import { useTask } from '../contexts/TaskContext';

export default function TaskList() {
    const { tasks, addTask, deleteTask, toggleTaskCompletion } = useTask();
    const [isAdding, setIsAdding] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const handleAddTask = (e) => {
        e.preventDefault();
        if (newTaskTitle.trim()) {
            addTask({ title: newTaskTitle });
            setNewTaskTitle('');
            setIsAdding(false);
        }
    };

    return (
        <div className="flex flex-col bg-[#151925]/10 border border-white/5 rounded-[2rem] p-6 shadow-xl h-[180px] shrink-0 overflow-hidden backdrop-blur-md transition-colors hover:bg-[#151925]/20 w-full">

            {/* BAŞLIK VE BUTON BÖLÜMÜ (DÜZENLENDİ) */}
            <div className="flex items-center justify-between mb-4">
                {/* Sol Tarafta: Başlık */}
                <div className="flex items-center gap-2 text-white font-bold text-lg">
                    <span className="material-symbols-outlined text-purple-400">check_circle</span>
                    Görevlerim
                </div>

                {/* Sağ Tarafta: Renkli Görev Ekle Butonu (isAdding false ise görünür) */}
                {!isAdding && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="
                            bg-gradient-to-r from-purple-500 to-pink-500 
                            hover:from-purple-600 hover:to-pink-600 
                            text-white font-medium text-xs 
                            py-1 px-3 rounded-xl 
                            shadow-md shadow-purple-500/30 transition-all 
                            flex items-center gap-1 shrink-0
                        "
                    >
                        <span className="material-symbols-outlined text-[14px]">add</span>
                        Ekle
                    </button>
                )}

                {/* ESKİ GÖREV SAYISI KALDIRILDI */}
            </div>

            <div className="space-y-2 overflow-y-auto custom-scrollbar pr-1 flex-1">
                {tasks.length === 0 && !isAdding && (
                    <div className="text-center text-slate-500 text-sm py-4">
                        Henüz görev eklenmedi.
                    </div>
                )}

                {tasks.map((task) => (
                    <div key={task.id} className="group flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:border-purple-500/30 transition-all hover:bg-white/10">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <button
                                onClick={() => toggleTaskCompletion && toggleTaskCompletion(task.id)}
                                className="w-5 h-5 rounded-full border-2 border-slate-600 flex items-center justify-center group-hover:border-purple-500 transition-colors shrink-0"
                            >
                                {task.completed && <div className="w-2.5 h-2.5 bg-purple-500 rounded-full"></div>}
                            </button>
                            <span className={`text-sm font-medium line-clamp-1 break-all ${task.completed ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                                {task.title}
                            </span>
                        </div>

                        <button
                            onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}
                            className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all p-1"
                            title="Görevi Sil"
                        >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                    </div>
                ))}

                {isAdding ? (
                    <form onSubmit={handleAddTask} className="p-2 animate-fade-in">
                        <input
                            autoFocus
                            type="text"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            placeholder="Görev adı..."
                            className="w-full bg-[#1e2230] text-white text-sm rounded-lg px-3 py-2 border border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500"
                            onBlur={() => !newTaskTitle && setIsAdding(false)}
                        />
                        <div className="flex gap-2 mt-2">
                            <button type="submit" className="flex-1 bg-purple-500 hover:bg-purple-600 text-white text-xs font-bold py-1.5 rounded-lg transition-colors">Ekle</button>
                            <button type="button" onClick={() => setIsAdding(false)} className="px-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-1.5 rounded-lg transition-colors">İptal</button>
                        </div>
                    </form>
                ) : (
                    /* ESKİ 'YENİ GÖREV EKLE' BUTONU KALDIRILDI VEYA YUKARI TAŞINDI */
                    /* Bu alan boş kalmalı veya buraya başka bir ekleme mantığı gelmeli */
                    <div className="h-1"></div>
                )}
            </div>
        </div>
    );
}