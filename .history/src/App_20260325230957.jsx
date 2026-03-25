import { useEffect, useState } from 'react'
import './App.css'
import AdviceBox from './Components/AdviceBox'
import HistoryList from './Components/HistoryList'

const App = () => {
  // 1️⃣ تعريف مخازن البيانات (States)
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [bmi, setBmi] = useState(null)
  const [status, setStatus] = useState('')

  // 2️⃣ جلب السجل من ذاكرة المتصفح عند بداية التشغيل
  const [history, setHistory] = useState(() => {
    const savedData = localStorage.getItem('fitTrack_history')
    return savedData ? JSON.parse(savedData) : [];
  })

  // 3️⃣ حفظ السجل تلقائياً في ذاكرة المتصفح عند أي تغيير
  useEffect(() => {
    localStorage.setItem("fitTrack_history", JSON.stringify(history))
  }, [history])

  // 4️⃣ دالة الحساب الرئيسية
  const handleCalculate = (e) => {
    e.preventDefault()

    const w = parseFloat(weight)
    let h = parseFloat(height) // استخدمنا let لتعديل القيمة إذا كانت بالسنتيمتر

    // فحص إذا كانت المدخلات أرقاماً صحيحة
    if (!w || !h || w <= 0 || h <= 0) {
      alert('الرجاء إدخال وزن وطول صحيحين')
      return
    }

    // ✨ ذكاء اصطناعي بسيط: إذا أدخل المستخدم الطول بالسنتيمتر (مثل 170) نحوله لمتر (1.7)
    if (h > 3) {
      h = h / 100
    }

    // معادلة BMI: الوزن / (الطول * الطول)
    const bmiNumber = w / (h * h)
    const bmiValue = bmiNumber.toFixed(1) // تقريب لرقم عشري واحد

    setBmi(bmiValue)

    // 5️⃣ تحديد الحالة الصحية بدقة (Logic Correction)
    let currentStatus = ''
    if (bmiNumber < 18.5) {
      currentStatus = 'نحافة'
    } else if (bmiNumber < 25) {
      currentStatus = 'وزنك مثالي'
    } else if (bmiNumber < 30) {
      currentStatus = 'زيادة وزن'
    } else {
      currentStatus = 'سمنة مفرطة'
    }

    setStatus(currentStatus)

    // 6️⃣ إضافة النتيجة الجديدة إلى أعلى السجل
    const newEntry = {
      id: Date.now(),
      val: bmiValue,
      stat: currentStatus,
      date: new Date().toLocaleDateString('ar-EG')
    }

    setHistory([newEntry, ...history]) // وضع العنصر الجديد في البداية
  }

  // 7️⃣ دالة مسح السجل بالكامل
  const clearHistory = () => {
    if (window.confirm("هل أنت متأكد من مسح جميع البيانات؟")) {
      setHistory([])
    }
  }

  return (
    <div className='app-wrapper container py-5'>

      <h1 className='text-center text-white mb-4'>FitTrack Pro 2026</h1>

      {/* نموذج إدخال البيانات */}
      <form onSubmit={handleCalculate} className='card p-4 shadow'>
        <div className="mb-3">
          <label className="form-label">الوزن (كجم)</label>
          <input
            type="number"
            className="form-control"
            placeholder="مثال: 75"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">الطول (سم أو متر)</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            placeholder="مثال: 175 أو 1.75"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-100 py-2">
          احسب مؤشر الكتلة BMI
        </button>
      </form>

      {/* عرض النتيجة الحالية */}
      {bmi && (
        <div className="alert alert-info mt-4 text-center shadow-sm">
          <h5 className="mb-1">مؤشر الكتلة: {bmi}</h5>
          <p className="mb-0 fw-bold">{status}</p>
        </div>
      )}

      {/* مكون النصائح الصحية ومكون السجل */}
      <AdviceBox />
      <HistoryList history={history} clearHistory={clearHistory} />

    </div>
  )
}

export default App