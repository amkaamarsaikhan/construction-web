'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import {
    Home, Trees, Construction, LayoutGrid,
    Box, Zap, Settings, ShieldCheck,
    LogOut, UserCircle, X
} from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuth();

    const menuItems = [
        { label: 'Нүүр хуудас', icon: <Home size={20} />, href: '/' },
        { label: 'Модон байшин', icon: <Trees size={20} />, href: '/calculate?type=wood' },
        { label: 'Тоосгон байшин', icon: <Construction size={20} />, href: '/calculate?type=brick' },
        { label: 'Блок байшин', icon: <LayoutGrid size={20} />, href: '/calculate?type=block' },
        { label: 'Канад хаус', icon: <Zap size={20} />, href: '/calculate?type=canadian' },
        { label: 'Цутгамал байшин', icon: <Box size={20} />, href: '/calculate?type=concrete' },
    ];

    const handleLogout = async () => {
        if (confirm("Та системээс гарахдаа итгэлтэй байна уу?")) {
            await logout();
            setIsOpen(false);
            router.push('/');
        }
    };

    return (
        <>
            {/* Overlay - lg:hidden-ийг хасав, ингэснээр компьютер дээр ч ажиллана */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <aside className={`
                fixed top-0 right-0 bottom-0 w-72 bg-white z-[70] shadow-2xl border-l border-gray-100
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : 'translate-x-full'}
            `}>
                <div className="flex flex-col h-full">

                    {/* Header: relative нэмсэнээр X товч харагдана */}
                    <div className="relative p-6 border-b border-gray-50 flex items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                <UserCircle size={28} />
                            </div>
                            <div className="overflow-hidden pr-8"> {/* X товчны зай гаргав */}
                                <h4 className="font-bold text-gray-900 truncate">{user?.name || 'Хэрэглэгч'}</h4>
                                <p className="text-xs text-gray-500 truncate">{user?.email || 'нэвтрээгүй'}</p>
                            </div>
                        </div>

                        {/* X Button - Заавал харагдах ёстой хэсэг */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-5 right-4 p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors z-[80]"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href ||
                                (pathname === '/calculate' && item.href.includes(new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '').get('type') || ''));

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`
                                        flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                                        ${isActive
                                            ? 'bg-blue-50 text-blue-600 shadow-sm shadow-blue-100'
                                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
                                    `}
                                >
                                    {item.icon}
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-50 space-y-1">
                        <Link
                            href="/settings"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                            <Settings size={20} />
                            Тохиргоо
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                        >
                            <LogOut size={20} />
                            Системээс гарах
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}