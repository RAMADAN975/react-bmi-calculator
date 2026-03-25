import React from 'react'

const HistoryList = ({ history, clearHistory, deleteEntry }) => {

    // If no data exists
    if (history.length === 0) {
        return (
            <p className="text-center mt-4 text-muted">
                No history records yet.
            </p>
        )
    }

    return (
        <div className="mt-5">
            {/* Header & Clear Button */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold text-white">📊 History Log</h5>
                <button
                    className="btn btn-danger btn-sm"
                    onClick={clearHistory}
                >
                    Clear All
                </button>
            </div>

            {/* Records List */}
            <ul className="list-group">
                {history.map((item) => (
                    <li
                        key={item.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                    >
                        {/* Left Side: Value and Status */}
                        <div>
                            <strong className="text-info">{item.val}</strong> — {item.stat}
                        </div>

                        {/* Right Side: Date */}
                        <small className="text-muted">
                            {item.date}
                        </small>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default HistoryList