import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OpdFootfall.css';

function OpdDepartmentWise() {

  const tokenNo=process.env.REACT_APP_TOKEN_NO; 
    
  const [data, setData] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:9191/adhocapi/dashboard/footfall/department?type=OP',{
        headers: { Authorization: `Bearer ${tokenNo}`}
      })
      .then(response => {
        const responseData = response.data.data;
        const totalDates = Object.keys(responseData[0]).filter(key => key !== 'deptId' && key !== 'deptName');
        setDates(totalDates);
        const updatedData = responseData.map(dept => {
          const grandTotal = totalDates.reduce((total, date) => total + (dept[date] || 0), 0);
          return { ...dept, 'Grand Total': grandTotal };
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
          <td>{row.deptName}</td>
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
            <th>Department Name</th>
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

export default OpdDepartmentWise;
