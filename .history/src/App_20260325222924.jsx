import React, { useEffect, useState } from 'react'
import './App.css'

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

    const bmiNumber = w / (h * h)
    const bmiValue = bmiNumber.toFixed(1)

    setBmi(bmiValue)

    let currentStatus = ''

    if (bmiNumber < 18.5) currentStatus = 'نحافة'
    if (bmiNumber < 25) currentStatus = 'وزنك مثالي'
    if (bmiNumber < 30) currentStatus = 'زيادة وزن'
  }

  return (
    <div>

    </div>
  )
}

export default App
