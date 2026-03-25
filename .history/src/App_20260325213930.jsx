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
    }
  }

  return (
    <div>

    </div>
  )
}

export default App
