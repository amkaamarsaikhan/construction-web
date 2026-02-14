import React from 'react';
import { ShieldCheck, CreditCard, RefreshCcw } from 'lucide-react';

export default function PaymentPolicy() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold text-[#0c213d] mb-8">Төлбөрийн нөхцөл</h1>
      
      <div className="grid gap-8">
        <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-blue-600">
            <CreditCard size={24} />
            <h2 className="text-xl font-bold">Төлбөр төлөх хэлбэр</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Хэрэглэгч Antigravity систем дээрх тооцооллын эрхийг нээхдээ дотоодын банкны аппликейшн 
            болон QPay систем ашиглан төлбөрөө шилжүүлнэ. Гүйлгээний утга дээр өөрийн бүртгэлтэй 
            утасны дугаарыг заавал бичих шаардлагатай.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-green-600">
            <ShieldCheck size={24} />
            <h2 className="text-xl font-bold">Баталгаажуулалт</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Төлбөр шилжсэнээс хойш систем автоматаар 1-5 минутын дотор тооцоолох эрхийг идэвхжүүлнэ. 
            Хэрэв эрх нээгдэхгүй бол хэрэглэгчийн дэмжлэгтэй холбогдоно уу.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-orange-600">
            <RefreshCcw size={24} />
            <h2 className="text-xl font-bold">Буцаан олголт</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Төлбөр нэгэнт төлөгдөж, тооцоолол хийх эрх олгогдсон тохиолдолд буцаан олголт хийх 
            боломжгүйг анхаарна уу. Учир нь систем тооцооллыг тухайн цаг мөчид гүйцэтгэдэг.
          </p>
        </section>
      </div>
    </div>
  );
}