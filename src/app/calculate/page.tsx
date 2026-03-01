'use client';

import React, { useState, useEffect, Suspense } from 'react';
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
    Info,
    Loader2
} from 'lucide-react';

interface Opening {
    w: string;
    h: string;
    q: string;
    subType?: '2L' | '3L';
}

function CalculateForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user, consumeCredit, isAuthenticated } = useAuth();

    const [type, setType] = useState<string>('brick');
    const [length, setLength] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [floors, setFloors] = useState('1');
    const [thickness, setThickness] = useState(0.24);

    const [insulationType, setInsulationType] = useState<'none' | 'eps' | 'min'>('eps');
    const [insulationThickness, setInsulationThickness] = useState<10 | 15>(10);

    const [windows, setWindows] = useState<Opening[]>([{ w: '1.5', h: '1.5', q: '1', subType: '2L' }]);
    const [doorIn, setDoorIn] = useState<Opening[]>([{ w: '0.9', h: '2.1', q: '1' }]);
    const [doorOut, setDoorOut] = useState<Opening[]>([{ w: '1', h: '2.2', q: '1' }]);

    const [showPayment, setShowPayment] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const titles: Record<string, string> = {
        wood: 'Модон Байшин',
        brick: 'Тоосгон Барилга',
        block: 'Блокөн Барилга',
        concrete: 'Цутгамал Барилга',
        canadian: 'Канад Хаус',
    };

    const thicknessOptions: Record<string, number[]> = {
        brick: [0.24, 0.38],
        block: [0.20, 0.30, 0.40],
        wood: [0.20, 0.25, 0.30],
        concrete: [0.20, 0.30, 0.40],
        canadian: [0.15, 0.20],
    };

    useEffect(() => {
        const t = searchParams.get('type');
        if (t && titles[t]) {
            setType(t);
            if (thicknessOptions[t]) setThickness(thicknessOptions[t][0]);
        }
    }, [searchParams]);

    const addRow = (setter: React.Dispatch<React.SetStateAction<Opening[]>>, isWindow = false) => {
        setter(prev => [...prev, { w: '', h: '', q: '', subType: isWindow ? '2L' : undefined }]);
    };

    const updateRow = (index: number, field: keyof Opening, value: string, list: Opening[], setter: React.Dispatch<React.SetStateAction<Opening[]>>) => {
        const newList = [...list];
        (newList[index] as any)[field] = value;
        setter(newList);
    };

    const handleCalculate = async () => {
        if (!length || !width || !height) {
            alert("Хэмжээг бүрэн оруулна уу.");
            return;
        }
        setIsLoading(true);
        try {
            if (!user || (user.calculationCredits || 0) <= 0) {
                setShowPayment(true);
                return;
            }
            const hasCredit = await consumeCredit();
            if (hasCredit) {
                setTimeout(() => proceedToSummary(), 300);
            } else {
                setShowPayment(true);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const proceedToSummary = () => {
        const l = parseFloat(length) || 0;
        const w = parseFloat(width) || 0;
        const h = parseFloat(height) || 0;
        const fl = parseFloat(floors) || 1;

        // 1. ТАЛБАЙН ТООЦООЛОЛ
        let win2Qty = 0, win3Qty = 0, win2Area = 0, win3Area = 0;
        windows.forEach(win => {
            const q = parseFloat(win.q) || 0;
            const area = (parseFloat(win.w) || 0) * (parseFloat(win.h) || 0) * q;
            if (win.subType === '3L') { win3Qty += q; win3Area += area; }
            else { win2Qty += q; win2Area += area; }
        });

        const doorInQty = doorIn.reduce((acc, d) => acc + (parseFloat(d.q) || 0), 0);
        const doorOutQty = doorOut.reduce((acc, d) => acc + (parseFloat(d.q) || 0), 0);
        const doorInArea = doorIn.reduce((acc, d) => acc + (parseFloat(d.w) || 0) * (parseFloat(d.h) || 0) * (parseFloat(d.q) || 0), 0);
        const doorOutArea = doorOut.reduce((acc, d) => acc + (parseFloat(d.w) || 0) * (parseFloat(d.h) || 0) * (parseFloat(d.q) || 0), 0);

        const footprint = l * w;
        const perimeter = 2 * (l + w);
        const totalWallArea = (perimeter * h * fl) - (win2Area + win3Area + doorInArea + doorOutArea);

        let items: { key: string, qty: number | string }[] = [];

        // 2. СУУРЬ
        const foundationVol = footprint * 0.25;
        items.push({ key: 'foundation_concrete', qty: foundationVol.toFixed(2) });
        items.push({ key: 'labor_foundation', qty: foundationVol.toFixed(1) });

        // 3. ХАНА (ТЕХНОЛОГИЙН ЗАСВАРУУД)
        if (type === 'brick') {
            const wallVol = totalWallArea * thickness;
            items.push({ key: 'brick', qty: Math.ceil(wallVol * 400) });
            items.push({ key: 'cement', qty: Math.ceil(wallVol * 2) });
            items.push({ key: 'labor_brick', qty: wallVol.toFixed(1) });
        } else if (type === 'block') {
            items.push({ key: 'block', qty: Math.ceil(totalWallArea * 12.5) });
            items.push({ key: 'labor_block', qty: totalWallArea.toFixed(1) });
        } else if (type === 'concrete') {
            const wallConcreteVol = totalWallArea * thickness;
            items.push({ key: 'foundation_concrete', qty: wallConcreteVol.toFixed(2) }); // Ханын бетон
            items.push({ key: 'rebar', qty: (wallConcreteVol * 0.085).toFixed(3) }); // Арматур
            items.push({ key: 'labor_foundation', qty: wallConcreteVol.toFixed(1) }); // Цутгалтын хөлс
        } else if (type === 'canadian') {
            items.push({ key: 'lumber', qty: (totalWallArea * 0.035).toFixed(2) }); // Каркас мод
            items.push({ key: 'osb', qty: Math.ceil((totalWallArea * 2) / 2.97) }); // 2 тал OSB
            items.push({ key: 'labor_frame', qty: totalWallArea.toFixed(1) });
        } else if (type === 'wood') {
            const logVol = totalWallArea * thickness;
            items.push({ key: 'log', qty: logVol.toFixed(2) });
            items.push({ key: 'labor_log', qty: logVol.toFixed(1) });
        }

        // 4. ДУЛААЛГА & ШАВАРДЛАГА (КАНАДАД ШАВАРДЛАГА ОРОХГҮЙ)
        if (insulationType !== 'none') {
            const insKey = `insulation_${insulationType}_${insulationThickness}`;
            items.push({ key: insKey, qty: totalWallArea.toFixed(1) });
            items.push({ key: 'labor_insulation', qty: totalWallArea.toFixed(1) });

            if (['brick', 'block', 'concrete'].includes(type)) {
                items.push({ key: 'plaster_mat', qty: totalWallArea.toFixed(1) });
                items.push({ key: 'labor_plaster', qty: totalWallArea.toFixed(1) });
            }
        }

        // 5. ЦОНХ ХААЛГА
        if (win2Area > 0) items.push({ key: 'window_2ly', qty: win2Area.toFixed(2) });
        if (win3Area > 0) items.push({ key: 'window_3ly', qty: win3Area.toFixed(2) });
        if (doorInArea > 0) items.push({ key: 'door_interior', qty: doorInArea.toFixed(2) });
        if (doorOutArea > 0) items.push({ key: 'door_exterior', qty: doorOutArea.toFixed(2) });
        items.push({ key: 'labor_window_install', qty: win2Qty + win3Qty });
        items.push({ key: 'labor_door_install', qty: doorInQty + doorOutQty });

        // 6. ДЭЭВЭР
        const roofArea = footprint * 1.4;
        items.push({ key: 'roof_metal', qty: roofArea.toFixed(1) });
        items.push({ key: 'lumber', qty: (roofArea * 0.045).toFixed(2) });
        items.push({ key: 'osb', qty: Math.ceil(roofArea / 2.97) });
        items.push({ key: 'labor_roof', qty: roofArea.toFixed(1) });

        const calculatedResults = items.map(item => {
            const mat = (MATERIALS as any)[item.key];
            if (!mat) return null;
            const q = typeof item.qty === 'string' ? parseFloat(item.qty) : item.qty;
            return { ...mat, quantity: q, cost: q * (mat.defaultPrice || 0) };
        }).filter(Boolean);

        if (typeof window !== 'undefined') {
            sessionStorage.setItem('calc_result', JSON.stringify({
                results: calculatedResults,
                totalCost: calculatedResults.reduce((acc, curr: any) => acc + curr.cost, 0),
                houseType: titles[type]
            }));
            router.push('/summary');
        }
    };

    return (
        <div className="container mx-auto py-10 px-4 max-w-4xl min-h-screen bg-gray-50/30">
            <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-2xl shadow-sm border">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><Calculator size={18} /></div>
                    <span className="font-bold text-gray-700 uppercase tracking-tighter">{titles[type]}</span>
                </div>
                <div className="bg-[#0c213d] px-4 py-1.5 rounded-full text-white text-sm font-bold">ЭРХ: {user?.calculationCredits ?? 0}</div>
            </div>

            <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden">
                <CardHeader className="bg-[#0c213d] text-white p-8">
                    <CardTitle className="flex items-center gap-3 text-2xl font-black uppercase tracking-widest"><LayoutTemplate className="text-orange-400" /> Хэмжээ оруулах</CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {['Урт', 'Өргөн', 'Өндөр', 'Давхар'].map((l, i) => (
                            <div key={i} className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase ml-1">{l} (м)</label>
                                <Input type="number" value={i===0?length:i===1?width:i===2?height:floors} onChange={(e)=> i===0?setLength(e.target.value):i===1?setWidth(e.target.value):i===2?setHeight(e.target.value):setFloors(e.target.value)} className="h-14 rounded-2xl bg-gray-50 border-none font-bold text-lg focus:ring-2 focus:ring-blue-500" />
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-black text-gray-700 uppercase flex items-center gap-2"><Layers size={18} className="text-orange-500" /> Ханын зузаан</h3>
                        <div className="flex gap-4">
                            {thicknessOptions[type]?.map(opt => (
                                <button key={opt} onClick={() => setThickness(opt)} className={`flex-1 py-4 rounded-2xl font-black transition-all border-2 ${thickness === opt ? 'border-[#0c213d] bg-[#0c213d] text-white' : 'border-gray-100 text-gray-400 bg-white'}`}>{opt * 100} СМ</button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6 pt-6 border-t border-gray-100">
                        <h3 className="text-sm font-black text-gray-700 uppercase flex items-center gap-2"><Info size={18} className="text-blue-500" /> Дулаалга</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {[{id:'none',n:'Байхгүй'},{id:'eps',n:'Хөөсөнцөр'},{id:'min',n:'Минвата'}].map(opt=>(
                                <button key={opt.id} onClick={()=>setInsulationType(opt.id as any)} className={`py-3 rounded-xl font-bold border-2 ${insulationType===opt.id?'border-blue-600 bg-blue-50 text-blue-700':'border-gray-100 text-gray-400'}`}>{opt.n}</button>
                            ))}
                        </div>
                        {insulationType !== 'none' && (
                            <div className="flex gap-4 animate-in fade-in zoom-in-95">
                                {[10, 15].map(thick => (
                                    <button key={thick} onClick={() => setInsulationThickness(thick as 10|15)} className={`flex-1 py-3 rounded-xl font-bold border-2 ${insulationThickness === thick ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-100 text-gray-400'}`}>{thick} СМ</button>
                                ))}
                            </div>
                        )}
                    </div>

                    {[
                        { title: "Цонхнууд", list: windows, setter: setWindows, isWin: true, icon: <Maximize size={18} /> },
                        { title: "Дотор Хаалга", list: doorIn, setter: setDoorIn, isWin: false, icon: <DoorOpen size={18} /> },
                        { title: "Гадна Хаалга", list: doorOut, setter: setDoorOut, isWin: false, icon: <DoorOpen size={18} /> }
                    ].map((sec, idx) => (
                        <div key={idx} className="space-y-4 pt-8 border-t border-gray-100">
                            <div className="flex justify-between items-center">
                                <h3 className="text-sm font-black text-gray-700 uppercase flex items-center gap-2">{sec.icon} {sec.title}</h3>
                                <Button variant="outline" size="sm" onClick={() => addRow(sec.setter, sec.isWin)} className="rounded-xl"><Plus size={16} /> Нэмэх</Button>
                            </div>
                            {sec.list.map((item, i) => (
                                <div key={i} className="grid grid-cols-4 gap-4 bg-gray-50/50 p-5 rounded-3xl">
                                    <Input placeholder="Өргөн" value={item.w} onChange={(e) => updateRow(i, 'w', e.target.value, sec.list, sec.setter)} className="bg-white rounded-xl" />
                                    <Input placeholder="Өндөр" value={item.h} onChange={(e) => updateRow(i, 'h', e.target.value, sec.list, sec.setter)} className="bg-white rounded-xl" />
                                    <Input placeholder="Тоо" value={item.q} onChange={(e) => updateRow(i, 'q', e.target.value, sec.list, sec.setter)} className="bg-white rounded-xl" />
                                    <div className="flex gap-2">
                                        {sec.isWin && (
                                            <select value={item.subType} onChange={(e) => updateRow(i, 'subType', e.target.value as any, sec.list, sec.setter)} className="flex-1 rounded-xl border text-[10px] font-black px-1 bg-white">
                                                <option value="2L">2 Давхар</option>
                                                <option value="3L">3 Давхар</option>
                                            </select>
                                        )}
                                        <Button variant="ghost" size="icon" onClick={() => sec.setter(sec.list.filter((_, rowIdx) => rowIdx !== i))} className="text-red-400"><Trash2 size={18} /></Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}

                    <div className="pt-10">
                        <Button onClick={handleCalculate} disabled={isLoading || !isAuthenticated} className="w-full h-20 bg-[#ffa726] hover:bg-[#fb8c00] text-[#0c213d] font-black text-2xl rounded-3xl shadow-xl transition-all active:scale-[0.98]">
                            {isLoading ? <Loader2 className="animate-spin w-8 h-8" /> : "ТООЦООЛОЛ ХИЙХ (1 ЭРХ)"}
                        </Button>
                        {!isAuthenticated && <p className="text-center text-red-500 font-bold mt-4 uppercase text-xs">Тооцоолохын тулд нэвтэрнэ үү.</p>}
                    </div>
                </CardContent>
            </Card>

            <PaymentGate visible={showPayment} onClose={() => setShowPayment(false)} onPaymentSuccess={() => proceedToSummary()} />
        </div>
    );
}

export default function CalculatePage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>}>
            <CalculateForm />
        </Suspense>
    );
}