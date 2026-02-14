'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MATERIALS } from '@/constants/materials';
import PaymentGate from '@/components/PaymentGate';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
    Calculator, 
    Plus, 
    Trash2, 
    Layers, 
    Maximize, 
    DoorOpen, 
    LayoutTemplate,
    Info
} from 'lucide-react';

interface Opening {
    w: string;
    h: string;
    q: string;
    subType?: '2L' | '3L';
}

export default function CalculatePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const type = searchParams.get('type') || 'brick';
    const { user, consumeCredit, isAuthenticated } = useAuth();

    // Үндсэн хэмжээсүүд
    const [length, setLength] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [floors, setFloors] = useState('1');
    const [thickness, setThickness] = useState(0.24);

    // Дулаалгын State
    const [insulationType, setInsulationType] = useState<'none' | 'eps' | 'min_wool'>('eps');
    const [insulationThickness, setInsulationThickness] = useState<10 | 15>(10);

    // Жагсаалтууд (Цонх, Хаалга)
    const [windows, setWindows] = useState<Opening[]>([{ w: '1.5', h: '1.5', q: '1', subType: '2L' }]);
    const [doorIn, setDoorIn] = useState<Opening[]>([{ w: '0.9', h: '2.1', q: '1' }]);
    const [doorOut, setDoorOut] = useState<Opening[]>([{ w: '1', h: '2.2', q: '1' }]);

    const [showPayment, setShowPayment] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const thicknessOptions: Record<string, number[]> = {
        brick: [0.24, 0.38],
        block: [0.20, 0.30, 0.40],
        wood: [0.20, 0.25, 0.30],
        concrete: [0.20, 0.30, 0.40],
        canadian: [0.20, 0.30, 0.40],
    };

    const titles: Record<string, string> = {
        wood: 'Модон Байшин',
        brick: 'Тоосгон Барилга',
        block: 'Блокөн Барилга',
        concrete: 'Цутгамал Барилга',
        canadian: 'Канад Хаус',
    };

    useEffect(() => {
        if (type && thicknessOptions[type as string]) {
            setThickness(thicknessOptions[type as string][0]);
        }
    }, [type]);

    const addRow = (setter: React.Dispatch<React.SetStateAction<Opening[]>>, isWindow = false) => {
        setter(prev => [...prev, { w: '', h: '', q: '', subType: isWindow ? '2L' : undefined }]);
    };

    const updateRow = (index: number, field: keyof Opening, value: string, list: Opening[], setter: React.Dispatch<React.SetStateAction<Opening[]>>) => {
        const newList = [...list];
        // @ts-ignore
        newList[index][field] = value;
        setter(newList);
    };

    const handleCalculate = async () => {
        const l = parseFloat(length);
        const w = parseFloat(width);
        const h = parseFloat(height);
        
        if (isNaN(l) || isNaN(w) || isNaN(h)) {
            alert("Урт, өргөн, өндрийг заавал оруулна уу.");
            return;
        }

        setIsLoading(true);
        try {
            const hasCredit = await consumeCredit();
            if (!hasCredit) {
                setShowPayment(true);
                return;
            }
            proceedToSummary();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const proceedToSummary = () => {
        const l = parseFloat(length);
        const w = parseFloat(width);
        const h = parseFloat(height);
        const fl = parseFloat(floors) || 1;

        let win2Area = 0, win3Area = 0;
        windows.forEach(win => {
            const area = (parseFloat(win.w) || 0) * (parseFloat(win.h) || 0) * (parseFloat(win.q) || 0);
            if (win.subType === '3L') win3Area += area; else win2Area += area;
        });

        const doorInArea = doorIn.reduce((acc, d) => acc + (parseFloat(d.w) || 0) * (parseFloat(d.h) || 0) * (parseFloat(d.q) || 0), 0);
        const doorOutArea = doorOut.reduce((acc, d) => acc + (parseFloat(d.w) || 0) * (parseFloat(d.h) || 0) * (parseFloat(d.q) || 0), 0);
        
        const openingArea = win2Area + win3Area + doorInArea + doorOutArea;
        const perimeter = 2 * (l + w);
        const footprint = l * w;
        const totalWallArea = (perimeter * h * fl) - openingArea;

        let items: {key: string, qty: any}[] = [];
        const foundationVolume = footprint * 0.25;
        items.push({ key: 'foundation_concrete', qty: foundationVolume.toFixed(2) });
        items.push({ key: 'labor_foundation', qty: foundationVolume.toFixed(1) });

        if (type === 'brick') {
            const wallVolume = totalWallArea * thickness;
            items.push({ key: 'brick', qty: Math.ceil(wallVolume * 400) }, { key: 'cement', qty: Math.ceil(wallVolume * 2) }, { key: 'sand', qty: (wallVolume * 0.25).toFixed(1) }, { key: 'labor_brick', qty: wallVolume.toFixed(1) });
        } else if (type === 'block') {
            items.push({ key: 'block', qty: Math.ceil(totalWallArea * 12.5) }, { key: 'labor_block', qty: totalWallArea.toFixed(1) });
        } else if (type === 'wood') {
            const logVol = totalWallArea * thickness;
            items.push({ key: 'log', qty: logVol.toFixed(2) }, { key: 'labor_log', qty: logVol.toFixed(1) });
        }

        // Дулаалгын тооцоолол
        if (['brick', 'block', 'concrete'].includes(type) && insulationType !== 'none') {
            items.push({ key: `insulation_${insulationType}_${insulationThickness}`, qty: totalWallArea.toFixed(1) });
            items.push({ key: 'labor_insulation', qty: totalWallArea.toFixed(1) });
        }

        const calculatedResults = items.map(item => {
            const mat = MATERIALS[item.key as keyof typeof MATERIALS];
            const q = parseFloat(item.qty);
            return { ...mat, quantity: q, cost: q * mat.defaultPrice };
        });

        const totalC = calculatedResults.reduce((acc, curr) => acc + curr.cost, 0);

        sessionStorage.setItem('calc_result', JSON.stringify({ results: calculatedResults, totalCost: totalC, houseType: titles[type] }));
        router.push('/summary');
    };

    return (
        <div className="container mx-auto py-10 px-4 max-w-4xl min-h-screen bg-gray-50/30">
            {/* Header Status Bar */}
            <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <Calculator size={18} />
                    </div>
                    <span className="font-bold text-gray-700">{titles[type]} тооцоолох</span>
                </div>
                <div className="bg-blue-600 px-4 py-1.5 rounded-full text-white text-sm font-bold">
                    Эрх: {user?.calculationCredits ?? 0}
                </div>
            </div>

            <Card className="border-none shadow-2xl rounded-[2rem] overflow-hidden">
                <CardHeader className="bg-[#0c213d] text-white p-8">
                    <CardTitle className="flex items-center gap-3 text-2xl font-black uppercase">
                        <LayoutTemplate className="text-[#ffa726]" />
                        Барилгын хэмжээ
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-10">
                    
                    {/* Үндсэн хэмжээсүүд */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase">Урт (м)</label>
                            <Input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="h-12 rounded-xl" placeholder="10" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase">Өргөн (м)</label>
                            <Input type="number" value={width} onChange={(e) => setWidth(e.target.value)} className="h-12 rounded-xl" placeholder="8" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase">Өндөр (м)</label>
                            <Input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="h-12 rounded-xl" placeholder="3" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase">Давхар</label>
                            <Input type="number" value={floors} onChange={(e) => setFloors(e.target.value)} className="h-12 rounded-xl" placeholder="1" />
                        </div>
                    </div>

                    {/* Ханын зузаан */}
                    {type && thicknessOptions[type] && (
                        <div className="space-y-4 pt-4">
                            <h3 className="text-sm font-black text-gray-700 uppercase flex items-center gap-2">
                                <Layers size={16} /> Ханын зузаан сонгох
                            </h3>
                            <div className="flex gap-3">
                                {thicknessOptions[type].map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => setThickness(opt)}
                                        className={`flex-1 py-3 rounded-xl font-bold transition-all border-2 ${thickness === opt ? 'border-[#0c213d] bg-[#0c213d] text-white shadow-lg' : 'border-gray-100 text-gray-400 hover:border-gray-200 bg-white'}`}
                                    >
                                        {opt * 100} см
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Дулаалга сонгох (Модноос бусад төрөлд гарч ирнэ) */}
                    {['brick', 'block', 'concrete'].includes(type) && (
                        <div className="space-y-4 pt-6 border-t border-gray-100">
                            <h3 className="text-sm font-black text-gray-700 uppercase flex items-center gap-2">
                                <Info size={16} className="text-blue-500" /> Дулаалгын материал
                            </h3>
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { id: 'none', label: 'Байхгүй' },
                                    { id: 'eps', label: 'Хөөсөнцөр' },
                                    { id: 'min_wool', label: 'Чулуун хөвөн' }
                                ].map((opt) => (
                                    <button
                                        key={opt.id}
                                        onClick={() => setInsulationType(opt.id as any)}
                                        className={`py-3 rounded-xl font-bold text-sm transition-all border-2 ${insulationType === opt.id ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm' : 'border-gray-100 text-gray-400 hover:border-gray-200 bg-white'}`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>

                            {insulationType !== 'none' && (
                                <div className="mt-4 p-4 bg-gray-50 rounded-2xl animate-in fade-in slide-in-from-top-2">
                                    <p className="text-[10px] font-black text-gray-400 uppercase mb-3 ml-1">Дулаалгын зузаан</p>
                                    <div className="flex gap-3">
                                        {[10, 15].map((thick) => (
                                            <button
                                                key={thick}
                                                onClick={() => setInsulationThickness(thick as 10 | 15)}
                                                className={`flex-1 py-2 rounded-lg font-bold text-xs transition-all border ${insulationThickness === thick ? 'bg-[#0c213d] text-white border-[#0c213d]' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-100'}`}
                                            >
                                                {thick} см
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Цонх, Хаалга */}
                    {[
                        { title: "Цонхнууд", list: windows, setter: setWindows, isWin: true, icon: <Maximize size={18} /> },
                        { title: "Дотор Хаалга", list: doorIn, setter: setDoorIn, isWin: false, icon: <DoorOpen size={18} /> },
                        { title: "Гадна Хаалга", list: doorOut, setter: setDoorOut, isWin: false, icon: <DoorOpen size={18} /> }
                    ].map((sec, idx) => (
                        <div key={idx} className="space-y-4 pt-6 border-t border-gray-100">
                            <div className="flex justify-between items-center">
                                <h3 className="text-sm font-black text-gray-700 uppercase flex items-center gap-2">
                                    {sec.icon} {sec.title}
                                </h3>
                                <Button variant="outline" size="sm" onClick={() => addRow(sec.setter, sec.isWin)} className="rounded-lg h-8 gap-1">
                                    <Plus size={14} /> Нэмэх
                                </Button>
                            </div>
                            {sec.list.map((item, i) => (
                                <div key={i} className="grid grid-cols-4 gap-3 bg-gray-50 p-4 rounded-2xl relative">
                                    <Input placeholder="Урт" value={item.w} onChange={(e) => updateRow(i, 'w', e.target.value, sec.list, sec.setter)} className="h-10 bg-white" />
                                    <Input placeholder="Өндөр" value={item.h} onChange={(e) => updateRow(i, 'h', e.target.value, sec.list, sec.setter)} className="h-10 bg-white" />
                                    <Input placeholder="Тоо" value={item.q} onChange={(e) => updateRow(i, 'q', e.target.value, sec.list, sec.setter)} className="h-10 bg-white" />
                                    <div className="flex gap-2">
                                        {sec.isWin && (
                                            <select value={item.subType} onChange={(e) => updateRow(i, 'subType', e.target.value as any, sec.list, sec.setter)} className="flex-1 rounded-md border border-gray-200 text-[10px] font-bold px-1">
                                                <option value="2L">2 давхар шил</option>
                                                <option value="3L">3 давхар шил</option>
                                            </select>
                                        )}
                                        <Button variant="ghost" size="icon" onClick={() => sec.setter(sec.list.filter((_, rowIdx) => rowIdx !== i))} className="text-red-400 hover:text-red-600">
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}

                    {/* Үйлдлийн товчлуур */}
                    <div className="pt-6">
                        <Button 
                            onClick={handleCalculate}
                            disabled={isLoading || !isAuthenticated}
                            className="w-full h-16 bg-[#ffa726] hover:bg-[#fb8c00] text-[#0c213d] font-black text-xl rounded-2xl shadow-xl shadow-orange-100 transition-all active:scale-[0.98]"
                        >
                            {isLoading ? "ТООЦООЛЖ БАЙНА..." : "ТООЦООЛОЛ ХИЙХ (1 ЭРХ)"}
                        </Button>
                        {!isAuthenticated && (
                            <p className="text-center text-red-500 text-sm font-bold mt-4">Тооцоолохын тулд нэвтэрнэ үү.</p>
                        )}
                    </div>
                </CardContent>
            </Card>

            <PaymentGate 
                visible={showPayment} 
                onClose={() => setShowPayment(false)} 
                onPaymentSuccess={() => proceedToSummary()} 
            />
        </div>
    );
}