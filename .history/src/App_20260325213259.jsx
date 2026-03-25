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
  })

  return (
    <div>

    </div>
  )
}

export default App
