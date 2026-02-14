'use client';

import React from 'react';
import Link from 'next/link';
import {
    ChevronLeft,
    Building2,
    AlertCircle,
    CheckCircle2,
    Calculator,
    ShieldAlert,
    Clock,
    TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
                        <ChevronLeft size={20} />
                        <span className="font-medium">Буцах</span>
                    </Link>
                    <h1 className="text-lg font-bold text-gray-900">Үйлчилгээний тухай</h1>
                    <div className="w-20"></div> {/* Баланс баригч */}
                </div>
            </div>

            <main className="container mx-auto px-4 py-12 max-w-4xl">
                {/* Icon & Title */}
                <div className="text-center mb-16 space-y-6">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-50 text-blue-600 mb-4">
                        <Building2 size={48} />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
                        🏗️ Барилгын Төсөв Тооцоологч: <br />
                        <span className="text-blue-600 font-black">Таны Мөрөөдлийн Байшин, Бодит Төсөв</span>
                    </h2>
                    <p className="text-2xl font-bold text-green-600 italic">
                        "Төсвөө мэд, Түгшүүрээ март"
                    </p>
                </div>

                {/* Why Section */}
                <section className="mb-16 space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900">Яагаад энэ үйлчилгээ танд хэрэгтэй вэ?</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Хүн бүр өөрийн гэсэн тохилог хаус, дулаахан гэрээ барихыг мөрөөддөг. Гэвч барилгын ажил эхэлсний дараа
                        <span className="font-bold text-gray-900"> "төлөвлөөгүй зардал" </span> гарч, төсөв хэд дахин өсөх нь хамгийн том асуудал болдог.
                    </p>

                    {/* Risk Cards */}
                    <div className="grid gap-4 mt-8">
                        {[
                            "Материалын хэмжээг буруу тооцоолсноос болж илүү зардал гаргах.",
                            "Дутуу тооцоолсноос болж барилгын ажил дундаа зогсох.",
                            "Зах зээлийн үнийн хэлбэлзэлд бэлтгэлгүй байх."
                        ].map((risk, index) => (
                            <div key={index} className="flex items-start gap-4 p-5 bg-red-50 rounded-2xl border-l-4 border-red-500">
                                <ShieldAlert className="text-red-500 shrink-0 mt-1" size={20} />
                                <p className="text-red-800 font-medium">{risk}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Solution Box */}
                <div className="bg-green-50 rounded-3xl p-8 md:p-12 mb-16 border border-green-100">
                    <h3 className="text-xl font-bold text-green-800 mb-4">
                        Бидний шийдэл: ердөө 20,000 төгрөгөөр "Сэтгэл амар" төлөвлөлт
                    </h3>
                    <p className="text-green-700 leading-relaxed text-lg">
                        Та хэдэн зуун сая төгрөгөөр байшин барих гэж байж, ердөө 20,000 төгрөг хэмнэх гэж байгаад
                        сая саяар хэмжигдэх хохирол амсах эрсдэлтэй.
                    </p>
                </div>

                {/* Features Section */}
                <section className="mb-16 space-y-8">
                    <h3 className="text-2xl font-bold text-gray-900 text-center">
                        Манай системийг ашигласнаар:
                    </h3>
                    <div className="grid md:grid-cols-1 gap-6">
                        <FeatureItem
                            icon={<Calculator className="text-blue-600" />}
                            title="Нарийн тооцоолол"
                            description="Таны байшингийн урт, өргөн, өндөрт тохирсон материалын (тоосго, цемент, мод, арматур г.м) бодит орцыг гаргана."
                        />
                        <FeatureItem
                            icon={<TrendingUp className="text-blue-600" />}
                            title="Урьдчилсан сэргийлэл"
                            description="Санамсаргүй гардаг 'нуугдмал' зардлуудыг тооцож, төсвөө 95%-ийн магадлалтай зөв төлөвлөхөд тусална."
                        />
                        <FeatureItem
                            icon={<Clock className="text-blue-600" />}
                            title="Цаг хугацаа хэмнэлт"
                            description="Инженер хайж, цаас харан тоо бодох шаардлагагүй. Ердөө 1 минутын дотор бүх тооцоолол бэлэн болно."
                        />
                    </div>
                </section>

                {/* Final Quote */}
                <div className="bg-[#0c213d] rounded-[2.5rem] p-10 md:p-16 text-center text-white mb-16 space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <h3 className="text-2xl md:text-3xl font-black">"Сая саяыг алдахаас, 20 мянгаар хамгаал"</h3>
                    <p className="text-blue-100/80 leading-relaxed max-w-2xl mx-auto">
                        20,000 төгрөг бол барилгын нэг шуудай цементийн үнэтэй л дүйцэхүйц бага мөнгө.
                        Гэвч энэ багахан хөрөнгө оруулалт танд хэдэн арван сая төгрөгийн алдаа гаргахаас сэргийлэх "даатгал" болох юм.
                    </p>
                </div>

                {/* Bottom CTA */}
                <div className="flex justify-center pb-20">
                    <Link href="/" className="w-full max-w-md">
                        <Button className="w-full h-16 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-xl font-bold shadow-xl shadow-red-200 transition-all active:scale-[0.98]">
                            ТООЦООЛОЛ ХИЙЖ ЭХЛЭХ
                        </Button>
                    </Link>
                </div>
            </main>
        </div>
    );
}

function FeatureItem({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="flex gap-6 p-6 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
            <div className="shrink-0 w-12 h-12 bg-white shadow-sm border border-gray-100 rounded-xl flex items-center justify-center">
                {icon}
            </div>
            <div className="space-y-1">
                <h4 className="text-lg font-bold text-gray-900">{title}</h4>
                <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>
        </div>
    );
}