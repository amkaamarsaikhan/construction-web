'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
    LogOut, 
    Calculator, 
    Menu, 
    LogIn 
} from 'lucide-react';

interface NavbarProps {
    onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
    const { user, logout, isAuthenticated } = useAuth();

    return (
        <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 w-full">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                
                {/* Зүүн тал: Лого */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="bg-[#0c213d] p-1.5 rounded-lg shadow-sm">
                        <Calculator size={20} className="text-[#ffa726]" />
                    </div>
                    <span className="font-black text-xl text-[#0c213d] tracking-tighter">
                       ТӨСӨВЧИН
                    </span>
                </Link>

                {/* Баруун тал: Үйлдэл болон Цэс */}
                <div className="flex items-center gap-2 md:gap-4">
                    
                    {isAuthenticated ? (
                        /* Нэвтэрсэн үед харагдах хэсэг */
                        <div className="flex items-center gap-3">
                            <div className="hidden sm:block text-right">
                                <p className="text-sm font-bold text-gray-700 leading-none">
                                    {user?.name || 'Хэрэглэгч'}
                                </p>
                            </div>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => { if(confirm("Гарах уу?")) logout(); }}
                                className="rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50"
                            >
                                <LogOut size={20} />
                            </Button>
                        </div>
                    ) : (
                        /* Нэвтрээгүй үед харагдах хэсэг */
                        <Link href="/login">
                            <Button variant="ghost" className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-blue-600">
                                <LogIn size={18} />
                                <span className="hidden xs:block">Нэвтрэх</span>
                            </Button>
                        </Link>
                    )}

                    {/* Sidebar нээх товчлуур (Нэвтрэх товчны ард байрлана) */}
                    <div className="pl-2 border-l border-gray-100">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={onMenuClick} 
                            className="bg-gray-50 hover:bg-gray-100 rounded-xl"
                        >
                            <Menu size={24} className="text-[#0c213d]" />
                        </Button>
                    </div>

                </div>
            </div>
        </nav>
    );
}