'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; // Чиглүүлэгч нэмэв
import Hero from "@/components/layout/Hero";
import BuildingCard from "@/components/BuildingCard";
import { Trees, Construction, LayoutGrid, Box, Zap } from "lucide-react";

export default function Home() {
  const router = useRouter(); // Router-ийг идэвхжүүлэх

  // Байшингийн төрлүүдийн дата
  const buildingTypes = [
    {
      title: "Модон байшин",
      description: "Байгальд ээлтэй, дулаан хадгалалт сайн модон байшингийн төсөв.",
      icon: <Trees className="w-8 h-8 text-green-600" />,
      type: "wood",
      color: "bg-green-50"
    },
    {
      title: "Тоосгон байшин",
      description: "Уламжлалт бат бөх чанар, удаан эдэлгээтэй тоосгон байшин.",
      icon: <Construction className="w-8 h-8 text-red-600" />,
      type: "brick",
      color: "bg-red-50"
    },
    {
      title: "Блок байшин",
      description: "Хурдан босох, эдийн засгийн хэмнэлттэй блок байшин.",
      icon: <LayoutGrid className="w-8 h-8 text-blue-600" />,
      type: "block",
      color: "bg-blue-50"
    },
    {
      title: "Канад хаус",
      description: "Орчин үеийн технологи, эрчим хүчний хэмнэлттэй Канад байшин.",
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      type: "canadian",
      color: "bg-yellow-50"
    },
    {
      title: "Цутгамал байшин",
      description: "Олон давхар болон орчин үеийн шийдэл бүхий цутгамал хийц.",
      icon: <Box className="w-8 h-8 text-purple-600" />,
      type: "concrete",
      color: "bg-purple-50"
    }
  ];

  return (
    <main className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Building Types Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-[#0c213d] mb-4">
            Төсвөө тооцоолох төрлөө сонгоно уу
          </h2>
          <div className="w-20 h-1.5 bg-[#ffa726] rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {buildingTypes.map((item) => (
            <BuildingCard 
              key={item.type}
              title={item.title}
              description={item.description}
              iconName={item.type}
              color={item.color}
              // onPress дээр дарахад тухайн төрлийн query-тэй хуудас руу шилжинэ
              onPress={() => router.push(`/calculate?type=${item.type}`)}
            />
          ))}
        </div>
      </section>

      {/* 3. Stats Section */}
      <section className="bg-gray-50 py-16 border-y border-gray-100">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <p className="text-3xl font-black text-blue-600">5+</p>
            <p className="text-sm text-gray-500 font-medium">Байшингийн төрөл</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black text-blue-600">100%</p>
            <p className="text-sm text-gray-500 font-medium">Бодит тооцоолол</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black text-blue-600">24/7</p>
            <p className="text-sm text-gray-500 font-medium">Онлайн хандалт</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black text-blue-600">Шууд</p>
            <p className="text-sm text-gray-500 font-medium">Төсөв гаргах</p>
          </div>
        </div>
      </section>
    </main>
  );
}   