import React from 'react'

const HistoryList = ({ history, clearHistory }) => {

    // 📌 لو مفيش بيانات
    if (history.length === 0) {
        return (
            <p className="text-center mt-4 text-muted">
                لا يوجد سجل حتى الآن
            </p>
        )
    }

    return (
        <div className="mt-5">

            {/* 📌 العنوان + زر المسح */}
            <div className="d-flex justify-content-between align-items-center mb-3">

                <h5 className="fw-bold">📊 السجل</h5>

                <button
                    className="btn btn-danger btn-sm"
                    onClick={clearHistory}
                >
                    مسح الكل
                </button>

            </div>

            {/* 📌 القائمة */}
            <ul className="list-group">

                {history.map((item) => (

                    <li
                        key={item.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                    >

                        {/* الجزء الأيسر */}
                        <div>
                            <strong>{item.val}</strong> - {item.stat}
                        </div>

                        {/* الجزء الأيمن */}
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