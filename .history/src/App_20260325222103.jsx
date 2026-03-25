import React, { useState } from 'react'
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

  return (
    <div>

    </div>
  )
}

export default App
