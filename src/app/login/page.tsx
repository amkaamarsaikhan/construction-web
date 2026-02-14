'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Phone, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { signInWithPhone } = useAuth();
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!phoneNumber) return alert('Утасны дугаараа оруулна уу.');
        
        setIsLoading(true);
        let cleanedPhone = phoneNumber.replace(/\s+/g, '');
        if (cleanedPhone.startsWith('0')) cleanedPhone = cleanedPhone.substring(1);
        const fullPhone = cleanedPhone.startsWith('+') ? cleanedPhone : `+976${cleanedPhone}`;

        try {
            await signInWithPhone(fullPhone);
            router.push('/login/verify');
        } catch (error) {
            alert('Алдаа гарлаа. Дугаараа шалгана уу.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0c213d] flex items-center justify-center p-6 relative">
            <div id="recaptcha-container"></div>
            <div className="w-full max-w-md z-10">
                <div className="text-center mb-10">
                    <img src="/images/logo.png" className="w-24 h-24 mx-auto mb-4" alt="Logo" />
                    <h1 className="text-[#ffa726] text-2xl font-bold uppercase">20,000 төгрөгөөр</h1>
                    <p className="text-white opacity-80 font-medium">сая саяын эрсдэлээс сэргийл</p>
                </div>

                <div className="bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10 shadow-2xl">
                    <form onSubmit={handleLogin} className="space-y-4">
                        {/* Утасны дугаар оруулах хэсэг */}
                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <Input 
                                type="tel" 
                                placeholder="Утасны дугаар" 
                                className="pl-12 bg-white/10 text-white border-white/20 h-14 focus:border-[#ffa726] transition-all rounded-xl"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>

                        {/* Нэвтрэх товчлуур */}
                        <Button 
                            type="submit"
                            className="w-full h-14 bg-[#ffa726] text-[#0c213d] font-bold hover:bg-[#fb8c00] rounded-xl text-lg transition-transform active:scale-95"
                            disabled={isLoading}
                        >
                            {isLoading ? "Илгээж байна..." : "Нэвтрэх"}
                        </Button>

                        {/* Хуваагч зураас */}
                        <div className="flex items-center gap-4 py-2">
                            <div className="h-[1px] bg-white/10 flex-1"></div>
                            <span className="text-white/30 text-xs font-medium uppercase tracking-widest">Эсвэл</span>
                            <div className="h-[1px] bg-white/10 flex-1"></div>
                        </div>

                        {/* Бүртгүүлэх товчлуур */}
                        <Button 
                            type="button"
                            onClick={() => router.push('/register')}
                            variant="outline"
                            className="w-full h-14 bg-transparent text-white border-white/20 hover:bg-white/10 hover:text-white rounded-xl font-bold flex gap-2"
                        >
                            <UserPlus size={20} />
                            Шинээр бүртгүүлэх
                        </Button>
                    </form>
                </div>

                <p className="mt-8 text-center text-white/40 text-sm">
                    © 2026 ТӨСӨВЧИН. Бүх эрх хуулиар хамгаалагдсан.
                </p>
            </div>
        </div>
    );
}