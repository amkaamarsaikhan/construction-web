'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { UserPlus, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        phone: '',
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    
    const { register } = useAuth();
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        const { name, age, phone, email, password } = formData;

        // Баталгаажуулалт
        if (!name || !age || !phone || !email || !password) {
            alert('Бүх талбарыг бөглөнө үү.');
            return;
        }

        setIsLoading(true);
        try {
            // Таны AuthContext-ийн register функц руу UserInfo болон password-ыг дамжуулна
            await register({ 
                name, 
                age, 
                phone, 
                email 
            }, password);
            
            // Бүртгэл амжилттай болсны дараа Verify эсвэл Нүүр хуудас руу шилжинэ
            router.push('/'); 
        } catch (e: any) {
            let msg = 'Бүртгэл хийхэд алдаа гарлаа.';
            if (e.code === 'auth/email-already-in-use') msg = 'Энэ имэйл хаяг аль хэдийн бүртгэлтэй байна.';
            alert(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center p-6 sm:justify-center">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="flex flex-col items-center mb-10 text-center">
                    <div className="bg-blue-50 p-4 rounded-full mb-4">
                        <UserPlus size={40} className="text-[#1976d2]" />
                    </div>
                    <h1 className="text-2xl font-bold text-[#263238]">Шинэ бүртгэл</h1>
                    <p className="text-[#78909c] mt-2">Мэдээллээ оруулж бүртгүүлнэ үү</p>
                </div>

                {/* Form */}
                <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-[#546e7a] ml-1">Овог нэр</label>
                        <Input 
                            placeholder="Нэрээ оруулна уу"
                            className="h-12 border-gray-200 focus:ring-[#1976d2]"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-[#546e7a] ml-1">Нас</label>
                            <Input 
                                type="number"
                                placeholder="Нас"
                                className="h-12 border-gray-200"
                                value={formData.age}
                                onChange={(e) => setFormData({...formData, age: e.target.value})}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-[#546e7a] ml-1">Утасны дугаар</label>
                            <Input 
                                type="tel"
                                placeholder="Дугаар"
                                className="h-12 border-gray-200"
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-[#546e7a] ml-1">Имэйл хаяг</label>
                        <Input 
                            type="email"
                            placeholder="example@mail.com"
                            className="h-12 border-gray-200"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-[#546e7a] ml-1">Нууц үг</label>
                        <Input 
                            type="password"
                            placeholder="******"
                            className="h-12 border-gray-200"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                    </div>

                    <Button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#1976d2] hover:bg-[#1565c0] text-white h-14 rounded-xl font-bold mt-4 shadow-lg transition-all active:scale-95"
                    >
                        {isLoading ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Түр хүлээнэ үү...</>
                        ) : (
                            'БҮРТГҮҮЛЭХ'
                        )}
                    </Button>

                    <button 
                        type="button"
                        onClick={() => router.push('/login')}
                        className="w-full text-center text-[#1976d2] text-sm font-medium mt-4 flex items-center justify-center gap-2 hover:underline"
                    >
                        <ArrowLeft size={16} /> Нэвтрэх хэсэг рүү очих
                    </button>
                </form>
            </div>
        </div>
    );
}