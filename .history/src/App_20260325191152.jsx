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
      else if (bmiVal >= 18.5 && bmiVal < 24.5) setMessage('وزنك مثالي')
      else setMessage('لديك زيادة في الوزن')
    }
  }

  return (
    <div className='container py-5'>
      <div className='row justify-content-center'></div>
    </div>
  )
}

export default App
