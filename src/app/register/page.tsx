'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { UserPlus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '', age: '', phone: '', email: '', password: ''
    });
    const { register } = useAuth();
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        const { name, age, phone, email, password } = formData;

        if (!name || !age || !phone || !email || !password) {
            alert('Бүх талбарыг бөглөнө үү.');
            return;
        }

        try {
            await register({ name, age, phone, email }, password);
            // Verify хуудасны замыг өөрийн бүтэцтэйгээ тулгаж шалгаарай
            router.push('/login/verify'); 
        } catch (e: any) {
            alert(e.code === 'auth/email-already-in-use' ? 'Имэйл бүртгэлтэй байна.' : 'Алдаа гарлаа.');
        }
    };

    return (
        <div className="min-h-screen bg-[#0c213d] flex flex-col items-center p-6">
            <div className="w-full max-w-md mt-10">
                {/* Header */}
                <div className="flex flex-col items-center mb-10 text-center">
                    <div className="bg-white/10 p-4 rounded-full mb-4 backdrop-blur-md">
                        <UserPlus size={48} className="text-[#ffa726]" />
                    </div>
                    <h1 className="text-2xl font-bold text-white uppercase tracking-tight">Шинэ бүртгэл</h1>
                    <p className="text-white/60 mt-2">Мэдээллээ оруулж бүртгүүлнэ үү</p>
                </div>

                {/* Form Wrapper */}
                <div className="bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10 shadow-2xl">
                    <form onSubmit={handleRegister} className="space-y-5">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-[#ffa726] ml-1 uppercase">Овог нэр</label>
                            <Input 
                                placeholder="Нэрээ оруулна уу"
                                className="bg-white/5 border-white/10 text-white rounded-xl h-12 focus:border-[#ffa726] transition-all"
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-[#ffa726] ml-1 uppercase">Нас</label>
                                <Input 
                                    type="number"
                                    placeholder="Нас"
                                    className="bg-white/5 border-white/10 text-white rounded-xl h-12 focus:border-[#ffa726]"
                                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-[#ffa726] ml-1 uppercase">Утас</label>
                                <Input 
                                    type="tel"
                                    placeholder="Дугаар"
                                    className="bg-white/5 border-white/10 text-white rounded-xl h-12 focus:border-[#ffa726]"
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-[#ffa726] ml-1 uppercase">Имэйл хаяг</label>
                            <Input 
                                type="email"
                                placeholder="example@mail.com"
                                className="bg-white/5 border-white/10 text-white rounded-xl h-12 focus:border-[#ffa726]"
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-[#ffa726] ml-1 uppercase">Нууц үг</label>
                            <Input 
                                type="password"
                                placeholder="******"
                                className="bg-white/5 border-white/10 text-white rounded-xl h-12 focus:border-[#ffa726]"
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                        </div>

                        <Button 
                            type="submit"
                            className="w-full bg-[#ffa726] hover:bg-[#fb8c00] text-[#0c213d] h-14 rounded-xl font-bold mt-6 text-lg transition-transform active:scale-95 shadow-lg shadow-orange-900/20"
                        >
                            БҮРТГҮҮЛЭХ
                        </Button>

                        <button 
                            type="button"
                            onClick={() => router.push('/login')} // <--- Энэ хэсгийг /login болгож засав
                            className="w-full text-center text-white/60 hover:text-[#ffa726] text-sm font-medium mt-4 flex items-center justify-center gap-2 transition-colors"
                        >
                            <ArrowLeft size={16} /> Нэвтрэх хэсэг рүү очих
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}