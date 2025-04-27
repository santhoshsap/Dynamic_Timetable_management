import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TimetableView() {
    const [timetableData, setTimetableData] = useState([]);
    const [classId, setClassId] = useState('');

    const fetchTimetable = async () => {
        if (!classId) {
            alert('Please enter Class ID');
            return;
        }
        try {
            const res = await axios.get(`http://localhost:5000/get-timetable/${classId}`);
            setTimetableData(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">📅 Timetable Overview</h2>

            <div className="row mb-5 justify-content-center">
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Enter Class ID"
                        value={classId}
                        onChange={(e) => setClassId(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <button className="btn btn-primary w-100" onClick={fetchTimetable}>
                        Fetch Timetable
                    </button>
                </div>
            </div>

            {timetableData.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-striped table-hover table-bordered">
                        <thead className="table-dark text-center">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Weekday</th>
                                <th scope="col">Period No.</th>
                                <th scope="col">Subject Name</th>
                                <th scope="col">Teacher Name</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {timetableData.map((row, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{row.weekday}</td>
                                    <td>{row.period_no}</td>
                                    <td>{row.subject_name}</td>
                                    <td>{row.teacher_name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center mt-5">No timetable found. Please enter a valid Class ID and click Fetch.</p>
            )}
        </div>
    );
}
