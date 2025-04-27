import React, { useState } from 'react';
import axios from 'axios';
import './AssignSubjectPopup.css'

export default function AssignSubjectPopup({ classId, onClose }) {
    const [weekday, setWeekday] = useState('Monday');
    const [periodNo, setPeriodNo] = useState(1);
    const [subjectName, setSubjectName] = useState('');
    const [teacherName, setTeacherName] = useState('');

    const handleAssign = async () => {
        try {
            const res = await axios.post('http://localhost:5000/assign-subject-teacher', {
                class_id: classId,
                weekday,
                period_no: periodNo,
                subject_name: subjectName,
                teacher_name: teacherName
            });
            alert(res.data);
        } catch (error) {
            console.error(error);
            alert('Assignment Failed');
        }
    };

    return (
        <div className='popup-container' style={{
            position: 'fixed', top: '20%', left: '30%', backgroundColor: '#fff',
            padding: '20px', border: '2px solid #000'
        }}>
            <h3>Assign Subject and Teacher</h3>
            <select value={weekday} onChange={e => setWeekday(e.target.value)}>
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
                <option>Saturday</option>
            </select>
            <input type="number" placeholder="Period No" value={periodNo} onChange={e => setPeriodNo(e.target.value)} />
            <input type="text" placeholder="Subject Name" onChange={e => setSubjectName(e.target.value)} />
            <input type="text" placeholder="Teacher Name" onChange={e => setTeacherName(e.target.value)} />
            <button onClick={handleAssign}>Assign</button>
            <button onClick={onClose} style={{ marginLeft: '10px' }}>Close</button>
        </div>
    );
}
