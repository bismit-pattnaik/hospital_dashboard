import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './IpdFootfall.css'

function IpdDoctorWise() {
  const tokenNo=process.env.REACT_APP_TOKEN_NO; 
    
  const [data, setData] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:9191/adhocapi/dashboard/footfall/doctor?type=IP',{
        headers: { Authorization: `Bearer ${tokenNo}`}
      })
      .then(response => {
        const responseData = response.data.data;
        const totalDates = Object.keys(responseData[0]).filter(key => key !== 'empId' && key !== 'empName');
        setDates(totalDates);
        const updatedData = responseData.map(doct => {
          const grandTotal = totalDates.reduce((total, date) => total + (doct[date] || 0), 0);
          return { ...doct, 'Grand Total': grandTotal };
        });
        setData(updatedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const renderRows = () => {
    return data.map((row, index) => {
      return (
        <tr key={index}>
          <td>{row.empName}</td>
          {dates.map(date => (
            <td key={date}>{row[date] || '0'}</td>
          ))}
          <td>{row['Grand Total']}</td>
        </tr>
      );
    });
  };

  return (
    <div>
      <table className='MainTable'>
        <thead>
          <tr>
            <th>Doctor Name</th>
            {dates.map(date => (
              <th key={date}>{date}</th>
            ))}
            <th>Grand Total</th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
    </div>
  );
}

export default IpdDoctorWise