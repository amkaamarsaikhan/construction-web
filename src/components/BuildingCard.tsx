import React from 'react';
import { ArrowRight, Calculator, Home, Building2, LayoutGrid } from 'lucide-react'; 

interface BuildingCardProps {
    title: string;
    iconName: string; // Вэб дээр icon-ы нэрээр дамжуулах нь хялбар
    color: string;
    onPress: () => void;
    description: string;
}

export default function BuildingCard({ title, iconName, color, onPress, description }: BuildingCardProps) {
    
    // Icon сонгох логик (Ionicons-той төстэйг сонгох)
    const renderIcon = () => {
        const props = { size: 28, color: "white" };
        switch (iconName) {
            case 'business': return <Building2 {...props} />;
            case 'home': return <Home {...props} />;
            default: return <LayoutGrid {...props} />;
        }
    };

    return (
        <button 
            onClick={onPress}
            className="group relative flex flex-col w-full min-h-[180px] bg-white rounded-[20px] mb-[10px] overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 shadow-md text-left border border-gray-100"
        >
            {/* Background Overlay (color + '10' гэдгийг opacity-оор шийдэв) */}
            <div 
                className="p-5 flex-1 flex flex-col w-full h-full"
                style={{ backgroundColor: `${color}10` }}
            >
                {/* Icon Container */}
                <div 
                    className="w-[50px] h-[50px] rounded-[15px] flex items-center justify-center mb-[15px] transition-transform group-hover:scale-110"
                    style={{ backgroundColor: color }}
                >
                    {renderIcon()}
                </div>

                {/* Content */}
                <h3 className="text-[18px] font-bold text-[#263238] mb-1">
                    {title}
                </h3>
                
                <p className="text-[12px] text-[#78909c] mb-[15px] leading-4">
                    {description}
                </p>

                {/* Footer */}
                <div className="flex items-center mt-auto">
                    <span 
                        className="text-[13px] font-bold mr-[5px]"
                        style={{ color: color }}
                    >
                        Тооцоолох
                    </span>
                    <ArrowRight size={16} style={{ color: color }} />
                </div>
            </div>
        </button>
    );
}