import AdviceBox from './Components/AdviceBox';
import HistoryList from './Components/HistoryList';
import './App.css';
import { useState } from 'react';

const App = () => {

  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [bmi, setBmi] = useState(null)
  const [status, setStatus] = useState('')

  return (
    <div>

    </div>
  )
}

export default App
