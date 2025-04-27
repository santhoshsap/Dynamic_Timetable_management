import React, { useState } from 'react';
import axios from 'axios';
import AssignSubjectPopup from './AssignSubjectPopup';
import './ManageTimetable.css';
import TimetableView from './TimetableView.jsx';

export default function ManageTimetable() {
    const [classname, setClassname] = useState('');
    const [days, setDays] = useState('');
    const [periods, setPeriods] = useState('');
    const [startTime, setStartTime] = useState('08:00');
    const [duration, setDuration] = useState('');
    const [breaks, setBreaks] = useState('');

    const [showPopup, setShowPopup] = useState(false);
    const [createdClassId, setCreatedClassId] = useState(null);

    const handleCreate = async () => {
        try {
            const res = await axios.post('http://localhost:5000/create-timetable', {
                classname,
                days,
                periods,
                startTime,
                duration,
                breaks
            });
            alert(res.data);
            // Ideally, fetch created class id from backend
            setCreatedClassId(1); // Hardcoded for now
        } catch (error) {
            console.error(error);
            alert('Failed to create timetable');
        }
    };

    return (
        <div className='manage-container'>
            <h2>Create Time Table</h2>
            <input placeholder="Class Name" onChange={e => setClassname(e.target.value)} />
            <input type="number" placeholder="Days" value={days} onChange={e => setDays(e.target.value)} />
            <input type="number" placeholder="Periods" value={periods} onChange={e => setPeriods(e.target.value)} />
            <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
            <input type="number" placeholder="Duration (min)" value={duration} onChange={e => setDuration(e.target.value)} />
            <input type="number" placeholder="Breaks" value={breaks} onChange={e => setBreaks(e.target.value)} />
            <button onClick={handleCreate}>Create Timetable</button>
            <TimetableView/>

            {createdClassId && (
                <>
                    <button onClick={() => setShowPopup(true)}>Assign Subjects</button>
                    {showPopup && (
                        <AssignSubjectPopup classId={createdClassId} onClose={() => setShowPopup(false)} />
                    )}
                </>
            )}
        </div>
    );
}
