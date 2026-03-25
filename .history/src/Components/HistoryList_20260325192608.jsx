// السطر 1: استيراد مكتبة React الأساسية لتعريف المكون.
import React from 'react';

// السطر 2: تعريف المكون كدالة (Function Component) وتمرير الـ props.
// { data }: هي البيانات (المصفوفة) التي سيرسلها ملف App.js لهذا الملف.
const HistoryList = ({ data }) => {

    return (
        // السطر 3: وعاء (Container) بسيط يحتوي على السجل.
        <div className="history-container mt-4">

            {/* السطر 4: عنوان فرعي للسجل بتنسيق بوتستراب */}
            <h4 className="h6 text-secondary mb-3 border-bottom pb-2">السجل الأخير</h4>

            {/* السطر 5: بداية قائمة البوتستراب (List Group) */}
            <ul className="list-group list-group-flush">

                {/* السطر 6: التحقق إذا كان السجل فارغاً أم يحتوي على بيانات */}
                {data.length === 0 ? (
                    // إذا كان فارغاً، اظهر هذه الرسالة.
                    <p className="text-muted small text-center">لا توجد عمليات سابقة بعد.</p>
                ) : (
                    // إذا كان يحتوي على بيانات، سنستخدم الـ map (جوهر المستوى الخامس).
                    data.map((item) => (

                        // السطر 7: إنشاء عنصر قائمة لكل عملية حسابية.
                        // key={item.id}: ضروري جداً في ريآكت لتمييز كل عنصر بشكل فريد.
                        <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center bg-transparent px-0 border-light">

                            {/* السطر 8: عرض قيمة الـ BMI وحالة الوزن */}
                            <div>
                                <span className="badge bg-primary rounded-pill me-2">{item.val}</span>
                                <small className="fw-bold">{item.stat}</small>
                            </div>

                            {/* السطر 9: عرض وقت العملية بخط صغير باهت */}
                            <small className="text-muted" style={{ fontSize: '10px' }}>
                                {item.time}
                            </small>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

// السطر 10: تصدير المكون لكي نتمكن من استدعائه في App.jsx.
export default HistoryList;