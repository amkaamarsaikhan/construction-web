'use client';

import React, { useState } from 'react';
import { MATERIALS, Material } from '@/constants/materials'; // Замаа өөрийнхөөрөө шалгаарай
import { 
    Search, 
    HardHat, 
    Box, 
    Info, 
    ArrowUpDown,
    Hammer,
    Package
} from 'lucide-react';

export default function MaterialsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<'all' | 'material' | 'labor'>('all');

    // Өгөгдлийг шүүх логик
    const filteredMaterials = Object.entries(MATERIALS).filter(([key, item]) => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const isLabor = key.startsWith('labor_');
        
        if (filterType === 'material') return matchesSearch && !isLabor;
        if (filterType === 'labor') return matchesSearch && isLabor;
        return matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gray-50/50 py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                
                {/* Гарчиг хэсэг */}
                <div className="mb-10 space-y-4">
                    <h1 className="text-3xl font-black text-[#0c213d]">
                        Материалын үнийн жагсаалт <span className="text-[#ffa726]">2026</span>
                    </h1>
                    <p className="text-gray-500 flex items-center gap-2">
                        <Info size={18} />
                        Эдгээр үнэ нь зах зээлийн дундаж ханш бөгөөд тооцоололд ашиглагдана.
                    </p>
                </div>

                {/* Search & Filter Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input 
                            type="text"
                            placeholder="Материалын нэрээр хайх..."
                            className="w-full pl-12 pr-4 h-14 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#ffa726] outline-none transition-all shadow-sm"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex bg-white p-1 rounded-2xl border border-gray-200 shadow-sm">
                        <button 
                            onClick={() => setFilterType('all')}
                            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${filterType === 'all' ? 'bg-[#0c213d] text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            Бүгд
                        </button>
                        <button 
                            onClick={() => setFilterType('material')}
                            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${filterType === 'material' ? 'bg-[#0c213d] text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            Материал
                        </button>
                        <button 
                            onClick={() => setFilterType('labor')}
                            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${filterType === 'labor' ? 'bg-[#0c213d] text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            Ажил гүйцэтгэл
                        </button>
                    </div>
                </div>

                {/* Хүснэгт */}
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider">Материал / Ажил</th>
                                    <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider text-center">Нэгж</th>
                                    <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider text-right">Нэгж үнэ (₮)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredMaterials.length > 0 ? (
                                    filteredMaterials.map(([key, item]) => {
                                        const isLabor = key.startsWith('labor_');
                                        return (
                                            <tr key={key} className="hover:bg-gray-50/80 transition-colors group">
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`p-2 rounded-lg ${isLabor ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'}`}>
                                                            {isLabor ? <Hammer size={18} /> : <Package size={18} />}
                                                        </div>
                                                        <span className="font-bold text-gray-700 group-hover:text-[#0c213d]">
                                                            {item.name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5 text-center text-gray-500 font-medium">
                                                    {item.unit}
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <span className="inline-block px-4 py-1.5 bg-gray-100 rounded-lg font-black text-[#0c213d] min-w-[120px]">
                                                        {item.defaultPrice.toLocaleString()} ₮
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="px-8 py-20 text-center text-gray-400">
                                            Таны хайсан илэрц олдсонгүй.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer мэдээлэл */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-400">
                        Үнийн өөрчлөлт болон шинэ санал хүсэлт байвал <span className="text-blue-500 underline cursor-pointer">бидэнд мэдэгдээрэй</span>.
                    </p>
                </div>
            </div>
        </div>
    );
}