import React from 'react';
import { Lock, EyeOff, Server } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold text-[#0c213d] mb-4">Нууцлалын бодлого</h1>
      <p className="text-gray-500 mb-10">Сүүлд шинэчлэгдсэн: 2024.05.20</p>
      
      <div className="space-y-10">
        <div className="flex gap-6">
          <div className="shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">1</div>
          <div>
            <h3 className="text-lg font-bold mb-2">Мэдээлэл цуглуулах</h3>
            <p className="text-gray-600 leading-relaxed">
              Бид зөвхөн хэрэглэгчийг таних зорилгоор утасны дугаар болон нэрийг Firebase Authentication 
              ашиглан цуглуулдаг. Таны оруулсан барилгын хэмжээ, талбайн мэдээлэл нь зөвхөн тооцоолол 
              хийхэд ашиглагдана.
            </p>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">2</div>
          <div>
            <h3 className="text-lg font-bold mb-2">Мэдээллийн аюулгүй байдал</h3>
            <p className="text-gray-600 leading-relaxed">
              Таны бүх мэдээлэл SSL нууцлал бүхий Google Firebase серверт хадгалагдана. Бид таны 
              хувийн мэдээллийг гуравдагч этгээдэд худалдахгүй, задруулахгүй байх үүргийг хүлээнэ.
            </p>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">3</div>
          <div>
            <h3 className="text-lg font-bold mb-2">Жигнэмэг (Cookies)</h3>
            <p className="text-gray-600 leading-relaxed">
              Вэбсайт нь хэрэглэгчийн нэвтрэлтийг хадгалах зорилгоор cookies ашигладаг. Та хөтөчийн 
              тохиргоогоор үүнийг хаах боломжтой боловч энэ тохиолдолд зарим функц ажиллахгүй байж болзошгүй.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 p-8 bg-gray-50 rounded-3xl text-center">
        <p className="text-sm text-gray-500">
          Асуух зүйл байвал <a href="mailto:support@antigravity.mn" className="text-blue-600 underline">support@antigravity.mn</a> хаягаар холбогдоно уу.
        </p>
      </div>
    </div>
  );
}