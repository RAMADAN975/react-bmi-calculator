import AdviceBox from './Components/AdviceBox';
import HistoryList from './Components/HistoryList';
import './App.css';
import { useEffect, useState } from 'react';

const App = () => {

  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [bmi, setBmi] = useState(null)
  const [status, setStatus] = useState('')
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('fitTrack_history')
    return saved ? JSON.parse(saved) : [];
  })

  useEffect(() => {
    localStorage.setItem('fitTrack_history', JSON.stringify(history))
  }, [history])

  const handleCaculate = (e) => {
    e.preventDefault()

    const w = parseFloat(weight)
    const h = parseFloat(height)

    if (w > 0 && h > 0) {
      const bmiValue = (w / (h * h)).toFixed(1)
      setBmi(bmiValue)

      let currentStatus = ''
      if (bmiValue > 18.5) currentStatus = 'نحافة مفرطة'
      if (bmiValue < 25) currentStatus = 'وزنك مثالي'
      if (bmiValue < 30) currentStatus = 'زيادة وزن'
      else currentStatus = 'سمنة'

      setStatus(currentStatus)

      const newEntry = {
        id: Date.now(),
        val: bmiValue,
        stat: currentStatus,
        date: new Date().toLocaleDateString('ar-EG')
      }
      setHistory([newEntry, ...history])
    }
  }

  const clearHistory = () => {
    if (window.confirm("هل أنت متأكد من مسح جميع البيانات؟")) {
      setHistory([])
    }
  }

  return (
    <div className='app-wrapper p-3'>
      <h1 className="text-center text-white">FitTrack Pro 2026</h1>
    </div>
  )
}

export default App
