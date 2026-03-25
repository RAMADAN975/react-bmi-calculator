import React, { useEffect, useState } from 'react'

const AdviceBox = () => {

    const [advice, setAdvice] = useState('')
    const [loading, setLoading] = useState(false)

    const fetchAdvice = async () => {
        setLoading(true)
        try {
            const response = await fetch('https://api.adviceslip.com/advice');
            const data = await response.json();
            setAdvice(data.slip.advice);
        } catch (error) {
            setAdvice("تذكر دائماً أن شرب الماء هو أساس الصحة." + error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchAdvice()
    }, [])

    return (
        <div className='bg-light p-3 rounded-3 border-start border-4 border-info shadow-sm mt-4'>

            <div className="d-flex justify-content-between align-items-center mb-2">

                <h6 className='text-info fw-bold mb-0'>💡 نصيحة صحية:</h6>

                <button
                    className="btn btn-sm btn-outline-info"
                    onClick={fetchAdvice}
                >
                    تحديث
                </button>

            </div>

            {/* 📌 حالة التحميل */}
            {loading ? (
                <p className="mb-0 text-secondary">جاري تحميل النصيحة...</p>
            ) : (
                <p className="mb-0 text-secondary fst-italic" style={{ fontSize: '0.9rem' }}>
                    {advice}
                </p>
            )}

        </div>
    )
}

export default AdviceBox
