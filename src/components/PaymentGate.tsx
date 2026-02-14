'use client';

import React, { useEffect } from 'react';
import { X, Star } from 'lucide-react'; 

interface PaymentGateProps {
    visible: boolean;
    onClose: () => void;
    onPaymentSuccess: () => void;
}

export default function PaymentGate({ visible, onClose, onPaymentSuccess }: PaymentGateProps) {
    
    // Модал нээлттэй үед цаад талын scroll-ыг хаах
    useEffect(() => {
        if (visible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [visible]);

    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center bg-black/50 backdrop-blur-sm transition-opacity">
            {/* Modal Container */}
            <div className="bg-white w-full max-w-lg rounded-t-[25px] sm:rounded-[25px] max-h-[90vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300">
                
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <h2 className="text-[18px] font-bold text-[#263238]">Тооцооллыг нээх</h2>
                    <button 
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={24} className="text-[#546e7a]" />
                    </button>
                </div>

                {/* Content - Scrollable */}
                <div className="overflow-y-auto p-5 flex flex-col items-center">
                    
                    {/* Info Card */}
                    <div className="w-full bg-[#fff9c4] border border-[#fbc02d] p-5 rounded-[15px] flex flex-col items-center mb-5">
                        <Star size={32} className="text-[#fbc02d] mb-[10px]" fill="#fbc02d" />
                        <h3 className="text-[16px] font-bold text-[#f57f17] mb-[5px]">Дэлгэрэнгүй тайлан</h3>
                        <p className="text-[13px] text-[#7f8c8d] text-center leading-[18px]">
                            Төлбөр төлснөөр бүх материалын задаргаа, нэгж үнэ болон PDF тайланг гаргаж авна.
                        </p>
                        <span className="text-[20px] font-bold text-[#d32f2f] mt-[10px]">Үнэ: 20,000 ₮</span>
                    </div>

                    <div className="w-full text-left">
                        <h4 className="text-[14px] font-semibold text-[#2c3e50] mb-1">Төлбөр төлөх заавар:</h4>
                        <p className="text-[13px] text-[#7f8c8d] mb-5">
                            Доорх QR кодыг дурын банкны апп-аар уншуулж төлбөрөө илгээнэ үү.
                        </p>
                    </div>

                    {/* QR Section */}
                    <div className="w-full flex flex-col items-center mb-[30px]">
                        <div className="bg-white p-2 border border-gray-100 rounded-xl shadow-sm mb-4">
                            {/* Зурагны замыг солиорой */}
                            <img
                                src="/images/qr-code.png" 
                                alt="Payment QR"
                                className="w-[200px] h-[200px] rounded-[10px]"
                            />
                        </div>
                        
                        <div className="w-full bg-[#f8f9fa] p-[15px] rounded-[10px] space-y-1 flex flex-col items-center">
                            <p className="text-[14px] text-[#34495e]">Хаан Банк: 5022XXXXXX</p>
                            <p className="text-[14px] text-[#34495e]">Хүлээн авагч: Амарболд</p>
                            <p className="text-[14px] text-[#34495e] font-medium text-blue-600">Гүйлгээний утга: [Утасны дугаар]</p>
                        </div>
                    </div>

                    {/* Pay Button */}
                    <button 
                        onClick={onPaymentSuccess}
                        className="w-full bg-[#2ecc71] hover:bg-[#27ae60] text-white py-4 rounded-xl font-bold text-[16px] transition-all active:scale-[0.98] shadow-md"
                    >
                        БИ ТӨЛСӨН (Unlock)
                    </button>

                    <p className="text-[11px] text-[#95a5a6] mt-[15px] text-center">
                        Төлбөр төлөгдсөний дараа автоматаар эрх нээгдэх болно.
                    </p>
                </div>
            </div>
        </div>
    );
}