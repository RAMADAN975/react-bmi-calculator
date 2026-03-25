import React, { useState } from 'react'

const AdviceBox = () => {

    const [advice, setAdvice] = useState('')

    const fetchAdvice = async () => {
        const response = await fetch('https://api.adviceslip.com/advice');
        const data = await response.json();
        setAdvice(data.slip.advice);
    }

    return (
        <div>

        </div>
    )
}

export default AdviceBox
