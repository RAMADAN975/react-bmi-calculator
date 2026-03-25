import React from 'react'

// Added deleteEntry to props
const HistoryList = ({ history, clearHistory, deleteEntry }) => {

    if (history.length === 0) {
        return (
            <p className="text-center mt-4 text-muted">
                No history records yet.
            </p>
        )
    }

    return (
        <div className="mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold text-white">📊 History Log</h5>
                <button className="btn btn-danger btn-sm" onClick={clearHistory}>
                    Clear All
                </button>
            </div>

            <ul className="list-group">
                {history.map((item) => (
                    <li
                        key={item.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                    >
                        <div>
                            <strong className="text-info">{item.val}</strong> — {item.stat}
                            <br />
                            <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                                {item.date}
                            </small>
                        </div>

                        {/* زر حذف العنصر الواحد */}
                        <button
                            className="btn btn-outline-danger btn-sm border-0"
                            onClick={() => deleteEntry(item.id)}
                            style={{ borderRadius: '50%' }}
                        >
                            ✕
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default HistoryList