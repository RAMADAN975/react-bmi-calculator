import React, { useEffect, useState } from 'react'

const AdviceBox = () => {

    const [advice, setAdvice] = useState('')
    const [loading, setLoading] = useState(false)

    const fetchAdvice = async () => {
        setLoading(true)
        try {
            const res = await fetch('https://api.adviceslip.com/advice')
            const data = await res.json()
            setAdvice(data.slip.advice)
        } catch {
            setAdvice("Stay hydrated and take care of your health.")
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchAdvice()
    }, [])

    return (
        <div className='advice-box mt-4'>

            <div className="d-flex justify-content-between mb-2">
                <h6>💡 Health Tip</h6>
                <button className="btn btn-sm btn-outline-info" onClick={fetchAdvice}>
                    Refresh
                </button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <p className="advice-text text-light">
                    {advice}
                </p>
            )}

        </div>
    )
}

export default AdviceBox