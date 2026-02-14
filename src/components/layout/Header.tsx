'use client';

import React from 'react';
import Link from 'next/link';

export default function Header() {
    return (
        <section className="relative h-[340px] w-full overflow-hidden rounded-b-[35px] bg-[#1a237e]">
            <div className="flex h-full w-full items-center justify-center bg-black/45 p-[25px]">
                <div className="flex flex-col items-center">
                    {/* Slogan Container */}
                    <div className="flex flex-col items-center mb-[30px]">
                        <div className="w-[50px] h-[3px] bg-[#ffeb3b] my-[10px] rounded-[2px]" />
                        
                        <span className="text-white text-[14px] font-bold tracking-[4px] mb-[5px] opacity-90">
                            ХАМГИЙН БОДИТ
                        </span>
                        
                        <h1 className="text-[#ffeb3b] text-[38px] font-[900] text-center leading-[44px] drop-shadow-lg uppercase">
                            ТӨСВӨӨ МЭД <br /> ТҮГШҮҮРЭЭ МАРТ
                        </h1>

                        <div className="w-[50px] h-[3px] bg-[#ffeb3b] my-[10px] rounded-[2px]" />
                    </div>

                    {/* CTA Button */}
                    <Link href="/about">
                        <button className="flex items-center bg-white px-[25px] py-[14px] rounded-[30px] transition-all duration-200 active:scale-95 shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.4)] group">
                            <span className="text-[#1976d2] text-[16px] font-bold mr-[10px]">
                                Дэлгэрэнгүй үзэх
                            </span>
                            <span className="text-[#1976d2] group-hover:translate-y-1 transition-transform">↓</span>
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}