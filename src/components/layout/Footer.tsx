'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Instagram, Send } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#0c213d] text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold tracking-tighter text-[#ffa726]">
                            ТӨСӨВЧИН
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Барилгын материалын төсвийг хамгийн хурдан бөгөөд 
                            үнэн зөвөөр тооцоолох таны ухаалаг туслах.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Цэс</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><Link href="/" className="hover:text-[#ffa726] transition-colors">Нүүр хуудас</Link></li>
                            <li><Link href="/calculate" className="hover:text-[#ffa726] transition-colors">Тооцоолуур</Link></li>
                            <li><Link href="/materials" className="hover:text-[#ffa726] transition-colors">Материалын үнэ</Link></li>
                        </ul>
                    </div>

                    {/* Policy & Help */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Тусламж</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><Link href="/privacy" className="hover:text-[#ffa726] transition-colors">Нууцлалын бодлого</Link></li>
                            <li><Link href="/payment-policy" className="hover:text-[#ffa726] transition-colors">Төлбөрийн нөхцөл</Link></li>
                            <li><Link href="/faq" className="hover:text-[#ffa726] transition-colors">Түгээмэл асуултууд</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Холбоо барих</h3>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li className="flex items-center gap-3">
                                <Phone size={16} className="text-[#ffa726]" />
                                <span>+976 8888-XXXX</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={16} className="text-[#ffa726]" />
                                <span>support@antigravity.mn</span>
                            </li>
                            <li className="flex items-center gap-3 italic">
                                <MapPin size={16} className="text-[#ffa726]" />
                                <span>Улаанбаатар хот, Сүхбаатар дүүрэг</span>
                            </li>
                        </ul>
                        
                        {/* Social Icons */}
                        <div className="flex gap-4 pt-4">
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-[#ffa726] hover:text-[#0c213d] transition-all">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-[#ffa726] hover:text-[#0c213d] transition-all">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-[#ffa726] hover:text-[#0c213d] transition-all">
                                <Send size={18} />
                            </a>
                        </div>
                    </div>
                </div>

                <hr className="border-white/10 mb-8" />

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs">
                    <p>© {currentYear} Antigravity. Бүх эрх хуулиар хамгаалагдсан.</p>
                    <div className="flex gap-6">
                        <span>Powered by Antigravity Team</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}