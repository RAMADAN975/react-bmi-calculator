// السطر 1: استيراد React والـ Hooks اللازمة للتعامل مع الإنترنت.
import React, { useState, useEffect } from 'react';

const AdviceBox = () => {
    // السطر 2: حالة لتخزين النصيحة القادمة من الـ API.
    const [advice, setAdvice] = useState('جاري البحث عن نصيحة صحية لك...');

    // السطر 3: دالة جلب البيانات (Fetch API) - Level 5.
    const fetchAdvice = async () => {
        try {
            // نستخدم API خارجي مشهور لجلب نصائح عشوائية.
            const response = await fetch('https://api.adviceslip.com/advice');
            const data = await response.json();
            setAdvice(data.slip.advice); // تخزين النصيحة في الـ State.
        } catch (error) {
            setAdvice("اشرب الكثير من الماء وحافظ على نشاطك!"); // رسالة بديلة في حال انقطع الإنترنت.
        }
    };

    // السطر 4: تشغيل الدالة بمجرد فتح التطبيق (مرة واحدة فقط).
    useEffect(() => {
        fetchAdvice();
    }, []);

    return (
        // السطر 5: استخدام كلاسات Bootstrap المختصرة (border-start, shadow-sm, rounded).
        <div className="p-3 mt-4 border-start border-primary border-4 bg-light rounded shadow-sm">
            <h6 className="text-primary fw-bold mb-1">💡 نصيحة اليوم:</h6>
            {/* السطر 6: عرض النصيحة بخط مائل وأنيق */}
            <p className="mb-0 fst-italic text-dark" style={{ fontSize: '0.9rem' }}>
                "{advice}"
            </p>

            {/* السطر 7: زر صغير لتحديث النصيحة يدويًا (اختياري) */}
            <button
                onClick={fetchAdvice}
                className="btn btn-sm btn-outline-primary mt-2 border-0 shadow-none"
                style={{ fontSize: '0.7rem' }}
            >
                تحديث النصيحة ↻
            </button>
        </div>
    );
};

// السطر 8: تصدير الملف لاستخدامه في App.jsx.
export default AdviceBox;