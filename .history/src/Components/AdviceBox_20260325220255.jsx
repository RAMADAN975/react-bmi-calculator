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
        <div className='bg-light p-3 rounded-3 border-start border-4 border-info shadow-sm mt-4'>

            <h6 className='text-info fw-bold mb-2'>💡 نصيحة صحية:</h6>
            <p className="mb-0 text-seconry fst-italic" style={{ fontSize: '0.9rem' }}></p>

        </div>
    )
}

export default AdviceBox
