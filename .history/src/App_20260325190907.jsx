import { useState } from 'react';
import './App.css';
const App = () => {

  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [bmi, setBmi] = useState(null)
  const [message, setMessage] = useState("")

  const calculateBmi = () => {
    e.preventDefault()

    if (weight > 0 && height > 0) {
      const hMeters = height / 100
      const bmiVal = (weight / (hMeters * hMeters).toFixed(1))

      setBmi(bmiVal)

      if (bmiVal < 18.5) setMessage('لديك نقص في الوزن')
    }
  }

  return (
    <div>

    </div>
  )
}

export default App
