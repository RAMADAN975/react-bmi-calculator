import AdviceBox from './Components/AdviceBox';
import HistoryList from './Components/HistoryList';
import './App.css';
import { useEffect, useState } from 'react';

const App = () => {

  // 📌 1. البيانات
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [bmi, setBmi] = useState(null)
  const [status, setStatus] = useState('')

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('fitTrack_history')
    return saved ? JSON.parse(saved) : [];
  })

  // 📌 حفظ في LocalStorage
  useEffect(() => {
    localStorage.setItem('fitTrack_history', JSON.stringify(history))
  }, [history])

  // 📌 2. حساب BMI
  const handleCaculate = (e) => {
    e.preventDefault()

    const w = parseFloat(weight)
    const h = parseFloat(height)

    if (!w || !h || w <= 0 || h <= 0) {
      alert("أدخل قيم صحيحة")
      return
    }

    const bmiNumber = w / (h * h)
    const bmiValue = bmiNumber.toFixed(1)

    setBmi(bmiValue)

    // 📌 3. تحديد الحالة (الصحيح)
    let currentStatus = ''

    if (bmiNumber < 18.5) currentStatus = 'نحافة'
    else if (bmiNumber < 25) currentStatus = 'وزنك مثالي'
    else if (bmiNumber < 30) currentStatus = 'زيادة وزن'
    else currentStatus = 'سمنة'

    setStatus(currentStatus)

    // 📌 حفظ في السجل
    const newEntry = {
      id: Date.now(),
      val: bmiValue,
      stat: currentStatus,
      date: new Date().toLocaleDateString('ar-EG')
    }

    setHistory([newEntry, ...history])
  }

  // 📌 مسح السجل
  const clearHistory = () => {
    if (window.confirm("هل أنت متأكد من مسح جميع البيانات؟")) {
      setHistory([])
    }
  }

  // 📌 4. الواجهة
  return (
    <div className='app-wrapper container py-5'>

      <h1 className="text-center text-white mb-4">FitTrack Pro 2026</h1>

      {/* الفورم */}
      <form onSubmit={handleCaculate} className="card p-4 shadow">

        <div className="mb-3">
          <label className="form-label">الوزن (كجم)</label>
          <input
            type="number"
            className="form-control"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">الطول (متر)</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-100">
          احسب BMI
        </button>

      </form>

      {/* النتيجة */}
      {bmi && (
        <div className="alert alert-info mt-4 text-center">
          <h5>القيمة: {bmi}</h5>
          <p>{status}</p>
        </div>
      )}

      {/* المكونات */}
      <AdviceBox />
      <HistoryList history={history} clearHistory={clearHistory} />

    </div>
  )
}

export default App