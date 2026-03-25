// السطر 1: استيراد React والـ Hooks اللازمة (useState لحفظ النص، و useEffect للتنفيذ التلقائي).
import React, { useState, useEffect } from 'react';

// السطر 2: تعريف المكون كدالة سهمية (Arrow Function) وهي الطريقة الحديثة في المستوى الخامس.
const AdviceBox = () => {

    // السطر 3: إنشاء "مخزن" (State) للنصيحة، ونضع له قيمة أولية تظهر للمستخدم أثناء التحميل.
    const [advice, setAdvice] = useState('جاري جلب نصيحة صحية...');

    // السطر 4: تعريف دالة "غير متزامنة" (async) لجلب البيانات من الإنترنت دون تعطيل المتصفح.
    const fetchAdvice = async () => {
        try {
            // السطر 5: إرسال طلب (Request) لعنوان الـ API والحصول على رد (Response).
            const response = await fetch('https://api.adviceslip.com/advice');

            // السطر 6: تحويل الرد القادم من الإنترنت من صيغة JSON إلى كائن جافاسكريبت نفهمه.
            const data = await response.json();

            // السطر 7: تحديث المخزن (setAdvice) بالنصيحة الفعلية الموجودة داخل الكائن data.
            setAdvice(data.slip.advice);

        } catch (error) {
            // السطر 8: في حال حدوث خطأ (مثل انقطاع الإنترنت)، نضع نصيحة احتياطية لكي لا يتعطل التطبيق.
            setAdvice("تذكر دائماً أن شرب الماء هو أساس الصحة.");
        }
    };

    // السطر 9: الـ Hook المسؤول عن تشغيل دالة جلب النصيحة "مرة واحدة فقط" عند فتح الموقع.
    useEffect(() => {
        fetchAdvice();
    }, []); // المصفوفة الفارغة [] تعني: "نفذ هذا الكود عند أول ظهور للمكون فقط".

    return (
        // السطر 10: واجهة العرض باستخدام كلاسات Bootstrap المختصرة (Utilities).
        // bg-light: خلفية فاتحة، p-3: حشوة داخلية، rounded: حواف دائرية، border-start: خط جانبي.
        <div className="bg-light p-3 rounded-3 border-start border-4 border-info shadow-sm mt-4">

            {/* السطر 11: عنوان صغير للنصيحة مع أيقونة تعبيرية */}
            <h6 className="text-info fw-bold mb-2">💡 نصيحة صحية:</h6>

            {/* السطر 12: عرض النصيحة الفعلية (المخزنة في الـ state) بخط مائل (fst-italic). */}
            <p className="mb-0 text-secondary fst-italic" style={{ fontSize: '0.9rem' }}>
                "{advice}"
            </p>

        </div>
    );
};

// السطر 13: تصدير المكون لكي نستطيع استدعاءه واستخدامه داخل ملف App.jsx.
export default AdviceBox;