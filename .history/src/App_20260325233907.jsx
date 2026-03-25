import { useEffect, useState } from 'react'
import './App.css'
import AdviceBox from './Components/AdviceBox'
import HistoryList from './Components/HistoryList'

const App = () => {

  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [bmi, setBmi] = useState(null)
  const [status, setStatus] = useState('')
  const [loadingCalc, setLoadingCalc] = useState(false)

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
    let h = parseFloat(height)

    if (!w || !h || w <= 0 || h <= 0) {
      alert('Please enter valid values')
      return
    }

    if (h > 3) h = h / 100

    setLoadingCalc(true)

    setTimeout(() => {

      const bmiNumber = w / (h * h)
      const bmiValue = bmiNumber.toFixed(1)

      setBmi(bmiValue)

      let currentStatus = ''
      if (bmiNumber < 18.5) currentStatus = 'Underweight'
      else if (bmiNumber < 25) currentStatus = 'Normal Weight'
      else if (bmiNumber < 30) currentStatus = 'Overweight'
      else currentStatus = 'Obesity'

      setStatus(currentStatus)

      const newEntry = {
        id: Date.now(),
        val: bmiValue,
        stat: currentStatus,
        date: new Date().toLocaleDateString('en-US')
      }

      setHistory([newEntry, ...history])
      setLoadingCalc(false)

    }, 500)

  }

  const clearHistory = () => {
    if (window.confirm("Delete all history?")) {
      setHistory([])
    }
  }

  const deleteEntry = (id) => {
    setHistory(history.filter(item => item.id !== id))
  }

  return (
    <div className='app-wrapper container py-5'>

      <h1 className='text-center text-white mb-4'>FitTrack Pro 2026</h1>

      {/* FORM */}
      <form onSubmit={handleCalculate} className='card p-4 shadow-lg border-0'>

        <div className="mb-3">
          <label className="form-label">Weight (kg)</label>
          <input
            type="number"
            className="form-control"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Height (cm or m)</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-100 py-2">
          {loadingCalc ? "Calculating..." : "Calculate BMI 🚀"}
        </button>

      </form>

      {/* RESULT */}
      {bmi && (
        <div className={`result-box mt-4 text-center ${status}`}>
          <h5>BMI: {bmi}</h5>
          <p>{status}</p>

          <div className="progress mt-3" style={{ height: '8px' }}>
            <div
              className="progress-bar"
              style={{ width: `${Math.min(bmi * 3, 100)}%` }}
            ></div>
          </div>
        </div>
      )}

      <AdviceBox />

      <HistoryList
        history={history}
        clearHistory={clearHistory}
        deleteEntry={deleteEntry}
      />

    </div>
  )
}

export default App