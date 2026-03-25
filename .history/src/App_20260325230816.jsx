import { useEffect, useState } from 'react'
import './App.css'
import AdviceBox from './Components/AdviceBox'
import HistoryList from './Components/HistoryList'

const App = () => {

  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [bmi, setBmi] = useState(null)
  const [status, setStatus] = useState('')

  const [history, setHistory] = useState(() => {
    const savedData = localStorage.getItem('fitTrack_history')
    return savedData ? JSON.parse(savedData) : [];
  })

  useEffect(() => {
    localStorage.setItem("fitTrack_history", JSON.stringify(history))
  }, [history])

  const handleCalculate = (e) => {
    e.preventDefault()

    const w = parseFloat(weight)
    const h = parseFloat(height)

    if (!w || !h || w <= 0 || h <= 0) {
      alert('أدخل قيم صحيحة')
      return
    }

    if (h > 3) {
      h = h / 100
    }

    const bmiNumber = w / (h * h)
    const bmiValue = bmiNumber.toFixed(1)

    setBmi(bmiValue)

    let currentStatus = ''

    if (bmiNumber < 18.5) currentStatus = 'نحافة'
    if (bmiNumber < 25) currentStatus = 'وزنك مثالي'
    if (bmiNumber < 30) currentStatus = 'زيادة وزن'

    setStatus(currentStatus)

    const newEntry = {
      id: Date.now(),
      val: bmiValue,
      stat: currentStatus,
      date: new Date().toLocaleDateString('ar-EG')
    }

    setHistory([...history, newEntry])

  }
  const clearHistory = () => {
    if (window.confirm("هل أنت متأكد من مسح جميع البيانات؟")) {
      setHistory([])
    }
  }

  return (
    <div className='app-wrapper container py-5'>

      <h1 className='text-center text-white mb-4'>FitTrack Pro 2026</h1>

      <form onSubmit={handleCalculate} className='card p-4 shadow'>
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

      {bmi && (
        <div className="alert alert-info mt-4 text-center">
          <h5>القيمة: {bmi}</h5>
          <p>{status}</p>
        </div>
      )}

      <AdviceBox />
      <HistoryList history={history} clearHistory={clearHistory} />
    </div>
  )
}

export default App
