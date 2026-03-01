'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Printer, ArrowLeft, Receipt, Home } from 'lucide-react';

export default function SummaryPage() {
    const [data, setData] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        // sessionStorage-оос тооцооллын үр дүнг унших
        const savedResult = sessionStorage.getItem('calc_result');
        if (savedResult) {
            setData(JSON.parse(savedResult));
        } else {
            // Хэрэв дата байхгүй бол буцаах
            router.push('/calculate');
        }
    }, [router]);

    if (!data) return <div className="min-h-screen flex items-center justify-center">Уншиж байна...</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-3xl mx-auto space-y-6">
                
                {/* Толгой хэсэг */}
                <div className="flex justify-between items-center">
                    <Button variant="ghost" onClick={() => router.back()} className="gap-2">
                        <ArrowLeft size={18} /> Буцах
                    </Button>
                    <Button onClick={() => window.print()} className="bg-[#0c213d] gap-2">
                        <Printer size={18} /> Хэвлэх
                    </Button>
                </div>

                <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
                    <CardHeader className="bg-[#0c213d] text-white p-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-orange-400 font-bold text-sm uppercase tracking-widest">Тооцооллын үр дүн</p>
                                <CardTitle className="text-3xl font-black mt-2">{data.houseType}</CardTitle>
                            </div>
                            <Receipt size={40} className="text-white/20" />
                        </div>
                    </CardHeader>
                    
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="p-4 text-xs font-black text-gray-500 uppercase">Материал</th>
                                        <th className="p-4 text-xs font-black text-gray-500 uppercase text-center">Хэмжээ</th>
                                        <th className="p-4 text-xs font-black text-gray-500 uppercase text-right">Нийт үнэ</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {data.results.map((item: any, idx: number) => (
                                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-4">
                                                <div className="font-bold text-gray-800">{item.name}</div>
                                                <div className="text-xs text-gray-400">{item.unitPrice}₮ / {item.unit}</div>
                                            </td>
                                            <td className="p-4 text-center font-medium text-gray-600">
                                                {item.quantity} {item.unit}
                                            </td>
                                            <td className="p-4 text-right font-black text-[#0c213d]">
                                                {item.cost?.toLocaleString()} ₮
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Нийт дүн */}
                        <div className="bg-[#ffa726] p-8 text-[#0c213d]">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold uppercase tracking-tighter">Нийт төсөвлөсөн дүн:</span>
                                <span className="text-4xl font-black italic">
                                    {data.totalCost?.toLocaleString()} ₮
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="text-center pt-6">
                    <Button 
                        variant="link" 
                        onClick={() => router.push('/')}
                        className="text-gray-400 hover:text-[#0c213d]"
                    >
                        <Home size={16} className="mr-2" /> Нүүр хуудас руу буцах
                    </Button>
                </div>
            </div>
        </div>
    );
}