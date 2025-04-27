import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'
import TimetableView from './TimetableView.jsx';
export default function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className='dashboard-container'>
            <h2>Dashboard</h2>
            <button onClick={() => navigate('/manage-timetable')}>Manage Timetable</button>
        </div>
    );
}
