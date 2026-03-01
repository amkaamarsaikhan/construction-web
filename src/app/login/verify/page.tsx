'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// TypeScript-ийн window алдааг засах хэсэг
declare global { interface Window { confirmationResult?: any } }

export default function VerifyPage() {
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { confirmCode } = useAuth();
    const router = useRouter();

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const confirmationResult = typeof window !== 'undefined' ? window.confirmationResult : null;

        if (!confirmationResult) {
            alert("Нэвтрэх процесс алдагдсан байна. Дахин нэвтэрнэ үү.");
            router.push('/login');
            return;
        }

        if (code.length < 6) {
            alert("6 оронтой кодыг оруулна уу.");
            return;
        }

        setIsLoading(true);
        try {
            await confirmCode(confirmationResult, code);
            router.push('/'); // Амжилттай бол нүүр хуудас руу
        } catch (error: any) {
            console.error(error);
            alert("Баталгаажуулах код буруу байна.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0c213d] flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10 shadow-2xl">
                <div className="text-center mb-8">
                    <div className="bg-[#ffa726]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShieldCheck className="text-[#ffa726]" size={32} />
                    </div>
                    <h1 className="text-white text-xl font-bold uppercase tracking-wider">Баталгаажуулах</h1>
                    <p className="text-white/60 text-sm mt-2">Танд ирсэн кодыг оруулна уу</p>
                </div>

                <form onSubmit={handleVerify} className="space-y-6">
                    <Input 
                        type="text" 
                        placeholder="000000" 
                        maxLength={6}
                        className="text-center text-2xl tracking-[0.5rem] bg-white/10 text-white border-white/20 h-16 rounded-xl focus:border-[#ffa726]"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />

                    <Button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-14 bg-[#ffa726] text-[#0c213d] font-bold rounded-xl text-lg hover:bg-[#fb8c00] transition-all"
                    >
                        {isLoading ? (
                            <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Шалгаж байна...</>
                        ) : "БАТАЛГААЖУУЛАХ"}
                    </Button>

                    <button 
                        type="button"
                        onClick={() => router.push('/login')}
                        className="w-full text-white/40 text-sm hover:text-white transition-colors"
                    >
                        Дугаараа солих
                    </button>
                </form>
            </div>
        </div>
    );
}