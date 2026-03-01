'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { 
    Trash2, ArrowLeft, ShieldAlert, User, Phone, CreditCard, Loader2 
} from 'lucide-react';

export default function SettingsPage() {
    // as any ашиглан isLoading алдааг хүчээр арилгав
    const { user, deleteAccount, isLoading, isAuthenticated } = useAuth() as any;
    const router = useRouter();
    
    const [isDeleting, setIsDeleting] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted && !isLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [mounted, isLoading, isAuthenticated, router]);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteAccount();
            router.push('/');
        } catch (error) {
            console.error("Устгахад алдаа гарлаа:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    if (!mounted || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-xl mx-auto">
                <button 
                    onClick={() => router.back()} 
                    className="flex items-center text-gray-500 hover:text-gray-900 mb-6 font-bold"
                >
                    <ArrowLeft size={20} className="mr-2" /> Буцах
                </button>

                <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
                    <div className="bg-[#0c213d] p-8 text-center">
                        <h1 className="text-white text-2xl font-black uppercase tracking-widest">Профайл</h1>
                    </div>

                    <div className="p-8 space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                                <User className="text-blue-600" />
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase">Нэр</p>
                                    <p className="font-bold text-gray-800">{user?.name}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                                <Phone className="text-green-600" />
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase">Утас</p>
                                    <p className="font-bold text-gray-800">{user?.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-2xl border border-orange-100">
                                <CreditCard className="text-orange-600" />
                                <div>
                                    <p className="text-[10px] font-black text-orange-400 uppercase">Эрх</p>
                                    <p className="font-black text-orange-700">{user?.calculationCredits} удаа</p>
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-gray-100" />

                        <div className="bg-red-50 p-6 rounded-[2rem] border border-red-100">
                            <h3 className="text-sm font-black text-red-500 uppercase flex items-center gap-2 mb-4">
                                <ShieldAlert size={18} /> Аюултай бүс
                            </h3>
                            {!confirmOpen ? (
                                <button 
                                    onClick={() => setConfirmOpen(true)}
                                    className="w-full bg-red-500 text-white h-12 rounded-xl font-bold"
                                >
                                    БҮРТГЭЛ УСТГАХ
                                </button>
                            ) : (
                                <div className="space-y-4">
                                    <p className="text-center font-bold text-red-700 text-sm">Та үнэхээр устгах уу?</p>
                                    <div className="flex gap-2">
                                        <button onClick={() => setConfirmOpen(false)} className="flex-1 h-12 bg-white border rounded-xl font-bold">Болих</button>
                                        <button onClick={handleDelete} className="flex-1 h-12 bg-red-600 text-white rounded-xl font-bold">
                                            {isDeleting ? "Устгаж байна..." : "Тийм"}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}