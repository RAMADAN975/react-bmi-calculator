// السطر 1: استيراد مكتبة React والـ Hooks الأساسية.
// useState: لتخزين البيانات (الوزن، الطول، السجل).
// useEffect: لتنفيذ أوامر عند فتح التطبيق (مثل جلب بيانات الـ API أو الـ Local Storage).
import React, { useState, useEffect } from 'react';

// السطر 2: استيراد المكونات الفرعية (سننشئها لاحقاً في مجلد components).
import HistoryList from './components/HistoryList';
import AdviceBox from './components/AdviceBox';

// السطر 3: استيراد ملف التنسيقات المتطور (Glassmorphism).
import './App.css';

function App() {
  // --- [ قسم الحالات - States ] ---

  // السطر 4: حالة لتخزين الوزن والطول والنتيجة.
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState('');

  // السطر 5: حالة "السجل" (History) مع ميزة الـ Local Storage.
  // السطر المتقدم: نقوم بقراءة البيانات المخزنة سابقاً في المتصفح فور تشغيل التطبيق.
  const [history, setHistory] = useState(() => {
    const savedData = localStorage.getItem('fitTrack_history');
    return savedData ? JSON.parse(savedData) : [];
    // إذا وجدنا بيانات (JSON.parse) نحولها لمصفوفة، وإلا نبدأ بمصفوفة فارغة [].
  });

  // --- [ قسم التأثيرات الجانبية - useEffect ] ---

  // السطر 6: حفظ السجل في الـ Local Storage تلقائياً.
  // هذه الدالة تعمل "كلما تغيرت مصفوفة history".
  useEffect(() => {
    localStorage.setItem('fitTrack_history', JSON.stringify(history));
    // JSON.stringify: تحول المصفوفة لنص ليتمكن المتصفح من حفظها.
  }, [history]);

  // --- [ قسم المنطق الحسابي - Logic ] ---

  // السطر 7: دالة حساب الـ BMI وإضافة النتيجة للسجل.
  const handleCalculate = (e) => {
    e.preventDefault(); // منع الصفحة من التحديث (Reload).

    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // تحويل الطول لمتر.

    if (w > 0 && h > 0) {
      const bmiValue = (w / (h * h)).toFixed(1);
      setBmi(bmiValue);

      // تحديد الحالة الصحية (Logic Level 3)
      let currentStatus = '';
      if (bmiValue < 18.5) currentStatus = 'نحافة مفرطة';
      else if (bmiValue < 25) currentStatus = 'وزن مثالي';
      else if (bmiValue < 30) currentStatus = 'زيادة وزن';
      else currentStatus = 'سمنة';

      setStatus(currentStatus);

      // إضافة العملية الجديدة لأول المصفوفة (Level 5)
      const newEntry = {
        id: Date.now(), // رقم فريد باستخدام الوقت الحالي.
        val: bmiValue,
        stat: currentStatus,
        date: new Date().toLocaleDateString('ar-EG') // تاريخ اليوم بالعربي.
      };
      setHistory([newEntry, ...history]); // إضافة الجديد مع الحفاظ على القديم.
    }
  };

  // السطر 8: دالة مسح السجل بالكامل.
  const clearHistory = () => {
    if (window.confirm("هل أنت متأكد من مسح جميع البيانات؟")) {
      setHistory([]);
    }
  };

  return (
    <div className="app-wrapper p-3">
      {/* هنا سنضع كود الـ JSX المطور (الواجهة) في الخطوة القادمة */}
      <h1 className="text-center text-white">FitTrack Pro 2026</h1>
    </div>
  );
}

export default App;