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
      <div className='row justify-content-center'>
        <div className="col-md-5">
          <div className="card shadow border-0 p-4">
            <form onSubmit={calculateBmi}>
              <div className="mb-3">
                <label className='form-lable'>الوزن (كجم)</label>
                <input
                  type="text"
                  className='form-control'
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className='form-lable'>الطول (سم)</label>
                <input
                  type="number"
                  className='form-control'
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
              <button className="btn btn-primary w-100" type='submit'>
                احسب
              </button>
            </form>
            {bmi && (
              <div className="mt-4 text-center">
                <h3>{bmi}</h3>
                <p>{message}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
