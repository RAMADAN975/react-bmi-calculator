import React, { useEffect, useState } from 'react'

const AdviceBox = () => {

    const [advice, setAdvice] = useState('')

    const fetchAdvice = async () => {
        try {
            const response = await fetch('https://api.adviceslip.com/advice');
            const data = await response.json();
            setAdvice(data.slip.advice);
        } catch (error) {
            setAdvice("تذكر دائماً أن شرب الماء هو أساس الصحة." + error)
        }
    }

    useEffect(() => {
        fetchAdvice()
    }, [])

    return (
        <div>

        </div>
    )
}

export default AdviceBox
