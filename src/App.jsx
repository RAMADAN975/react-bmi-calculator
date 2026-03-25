import { useEffect, useState } from 'react'
import './App.css'
import AdviceBox from './Components/AdviceBox'
import HistoryList from './Components/HistoryList'

const App = () => {
  // 1️⃣ State Management
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [bmi, setBmi] = useState(null)
  const [status, setStatus] = useState('')

  // 2️⃣ Initialize history from LocalStorage
  const [history, setHistory] = useState(() => {
    const savedData = localStorage.getItem('fitTrack_history')
    return savedData ? JSON.parse(savedData) : [];
  })

  // 3️⃣ Sync history with LocalStorage on every change
  useEffect(() => {
    localStorage.setItem("fitTrack_history", JSON.stringify(history))
  }, [history])

  // 4️⃣ Main Calculation Logic
  const handleCalculate = (e) => {
    e.preventDefault()

    const w = parseFloat(weight)
    let h = parseFloat(height) // Use 'let' to allow modification for CM to M conversion

    // Input Validation
    if (!w || !h || w <= 0 || h <= 0) {
      alert('Please enter valid weight and height values.')
      return
    }

    // Auto-convert CM to Meters if input is > 3
    if (h > 3) {
      h = h / 100
    }

    // BMI Formula: Weight (kg) / [Height (m) * Height (m)]
    const bmiNumber = w / (h * h)
    const bmiValue = bmiNumber.toFixed(1) // Round to 1 decimal place

    setBmi(bmiValue)

    // 5️⃣ Determine Health Category (BMI Logic)
    let currentStatus = ''
    if (bmiNumber < 18.5) {
      currentStatus = 'Underweight'
    } else if (bmiNumber < 25) {
      currentStatus = 'Normal Weight'
    } else if (bmiNumber < 30) {
      currentStatus = 'Overweight'
    } else {
      currentStatus = 'Obesity'
    }

    setStatus(currentStatus)

    // 6️⃣ Add new result to the top of the history list
    const newEntry = {
      id: Date.now(),
      val: bmiValue,
      stat: currentStatus,
      date: new Date().toLocaleDateString('en-US') // Changed date format to English
    }

    setHistory([newEntry, ...history])
  }

  // 7️⃣ Function to clear all history
  const clearHistory = () => {
    if (window.confirm("Are you sure you want to delete all history?")) {
      setHistory([])
    }
  }

  // Function to delete a single entry by its ID
  const deleteEntry = (id) => {
    const updatedHistory = history.filter(item => item.id !== id);
    setHistory(updatedHistory);
  };

  return (
    <div className='app-wrapper container py-5'>

      <h1 className='text-center text-white mb-4'>FitTrack Pro 2026</h1>

      {/* Input Form Card */}
      <form onSubmit={handleCalculate} className='card p-4 shadow'>
        <div className="mb-3">
          <label className="form-label">Weight (kg)</label>
          <input
            type="number"
            className="form-control"
            placeholder="e.g., 75"
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
            placeholder="e.g., 175 or 1.75"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-100 py-2">
          Calculate BMI
        </button>
      </form>

      {/* Result Display */}
      {bmi && (
        <div className="alert alert-info mt-4 text-center shadow-sm">
          <h5 className="mb-1">BMI Score: {bmi}</h5>
          <p className="mb-0 fw-bold">{status}</p>
        </div>
      )}

      {/* Sub-Components */}
      <AdviceBox />
      <HistoryList
        history={history}
        clearHistory={clearHistory}
        deleteEntry={deleteEntry} // مرري الدالة هنا
      />

    </div>
  )
}

export default App