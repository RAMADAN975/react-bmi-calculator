// 1. استيراد المكتبات اللازمة
import React, { useState } from 'react';
// import: كلمة محجوزة لجلب الأدوات.
// React: المكتبة الأم.
// { useState }: "Hook" نستخدمه لتخزين البيانات التي تتغير في الصفحة (مثل الوزن والطول).

import './App.css';
// هنا نستدعي ملف التنسيقات الخاص بنا (الـ 20% CSS) لدمجه مع البوتستراب.

function App() {
  // تعريف الوظيفة الكبرى (Component) التي تحمل كل كود التطبيق.

  // 2. تعريف الـ States (مخازن البيانات)
  const [weight, setWeight] = useState('');
  // weight: المتغير الذي يحمل القيمة الحالية للوزن.
  // setWeight: الدالة التي نستخدمها لتغيير قيمة الوزن.
  // useState(''): نبدأ بقيمة فارغة.

  const [height, setHeight] = useState('');
  // نفس المنطق للطول (Height).

  const [bmi, setBmi] = useState(null);
  // لتخزين رقم النتيجة النهائي بعد الحساب.

  const [message, setMessage] = useState('');
  // لتخزين النص (نحيف، مثالي، إلخ) الذي سيظهر للمستخدم.

  // 3. دالة الحساب (Logic)
  const calculateBmi = (e) => {
    e.preventDefault();
    // تمنع المتصفح من عمل "Refresh" للصفحة عند الضغط على الزر، لنحافظ على البيانات.

    if (weight > 0 && height > 0) {
      const hMetres = height / 100; // تحويل الطول من سم إلى متر.
      const bmiVal = (weight / (hMetres * hMetres)).toFixed(1);
      // المعادلة: الوزن تقسيم (الطول × الطول).
      // .toFixed(1): تقريب النتيجة لرقم عشري واحد فقط (مثلاً 24.5).

      setBmi(bmiVal); // حفظ النتيجة في الـ State.

      // تحديد الحالة الصحية بناءً على الرقم
      if (bmiVal < 18.5) setMessage('لديك نقص في الوزن');
      else if (bmiVal >= 18.5 && bmiVal < 24.9) setMessage('وزنك مثالي');
      else setMessage('لديك زيادة في الوزن');
    }
  };

  return (
    // ما بداخل return هو ما يراه المستخدم (HTML/JSX)
    <div className="container py-5">
      {/* container: كلاس بوتستراب يترك مسافات من الجوانب. py-5: بادنج علوي وسفلي */}

      <div className="row justify-content-center">
        {/* row: لعمل صف. justify-content-center: لتوسيط المحتوى في منتصف الشاشة */}

        <div className="col-md-5">
          {/* col-md-5: يأخذ تقريباً نصف عرض الشاشة في الأجهزة المتوسطة */}

          <div className="card shadow border-0 p-4">
            {/* card: إطار أبيض. shadow: ظل خفيف. border-0: إلغاء الحدود التقليدية */}

            <form onSubmit={calculateBmi}>
              {/* عند إرسال الفورم، نفذ دالة calculateBmi */}

              <div className="mb-3">
                <label className="form-label">الوزن (كجم)</label>
                <input
                  type="number"
                  className="form-control"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                // onChange: كلما كتب المستخدم حرفاً، يتم تحديث الـ State فوراً.
                />
              </div>

              <div className="mb-3">
                <label className="form-label">الطول (سم)</label>
                <input
                  type="number"
                  className="form-control"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>

              <button className="btn btn-primary w-100" type="submit">احسب</button>
            </form>

            {/* عرض النتيجة إذا كانت موجودة */}
            {bmi && (
              <div className="mt-4 text-center">
                <h3>{bmi}</h3>
                <p>{message}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; // تصدير المكون لاستخدامه في الملفات الأخرى.