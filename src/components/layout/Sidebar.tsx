'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import {
    Home, Trees, Construction, LayoutGrid,
    Box, Zap, Settings, LogOut, UserCircle, X, LogIn
} from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {
    const pathname = usePathname();
    const router = useRouter();
    
    // isLoading дээр алдаа заахгүй байх үүднээс төрлийг нь 'any' гэж зааж өгч болно
    const { user, logout, isAuthenticated, isLoading } = useAuth() as any; 
    
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const menuItems = [
        { label: 'Нүүр хуудас', icon: <Home size={20} />, href: '/' },
        { label: 'Модон байшин', icon: <Trees size={20} />, href: '/calculate?type=wood' },
        { label: 'Тоосгон байшин', icon: <Construction size={20} />, href: '/calculate?type=brick' },
        { label: 'Блок байшин', icon: <LayoutGrid size={20} />, href: '/calculate?type=block' },
        { label: 'Канад хаус', icon: <Zap size={20} />, href: '/calculate?type=canadian' },
        { label: 'Цутгамал байшин', icon: <Box size={20} />, href: '/calculate?type=concrete' },
    ];

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 z-[60]" onClick={() => setIsOpen(false)} />
            )}

            <aside className={`fixed top-0 right-0 bottom-0 w-80 bg-white z-[70] shadow-2xl border-l transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="relative p-8 border-b flex items-center bg-gray-50/50">
                        <div className="flex items-center gap-4 w-full">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isAuthenticated ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-400'}`}>
                                <UserCircle size={32} />
                            </div>
                            <div className="flex-1 overflow-hidden">
                                {isLoading ? (
                                    <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
                                ) : isAuthenticated && user ? (
                                    <div className="space-y-1">
                                        <h4 className="font-bold text-gray-900 truncate leading-none">{user.name}</h4>
                                        <p className="text-[11px] text-gray-500 truncate">{user.phone}</p>
                                        <div className="inline-block px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 text-[10px] font-black uppercase">
                                            Эрх: {user.calculationCredits}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-1">
                                        <h4 className="font-bold text-gray-900">Зочин</h4>
                                        <Link href="/login" onClick={() => setIsOpen(false)} className="text-[11px] text-blue-600 font-bold flex items-center gap-1">
                                            <LogIn size={12} /> Нэвтрэх
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="absolute top-6 right-4 p-2 text-gray-400 hover:text-gray-900">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto p-5 space-y-1.5">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link 
                                    key={item.href} 
                                    href={item.href} 
                                    onClick={() => setIsOpen(false)} 
                                    className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${isActive ? 'bg-[#0c213d] text-white shadow-lg' : 'text-gray-500 hover:bg-gray-100'}`}
                                >
                                    {item.icon} {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer */}
                    <div className="p-5 border-t space-y-2">
                        <Link 
                            href="/settings" 
                            onClick={() => setIsOpen(false)} 
                            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-gray-500 hover:bg-gray-50"
                        >
                            <Settings size={20} /> Тохиргоо
                        </Link>
                        {isAuthenticated && (
                            <button 
                                onClick={logout} 
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50"
                            >
                                <LogOut size={20} /> Системээс гарах
                            </button>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
}