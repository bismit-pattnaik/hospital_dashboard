import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OpdFootfall.css';
import { BeatLoader } from 'react-spinners';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function OpdDepartmentWise() {

  // const tokenNo=process.env.REACT_APP_TOKEN_NO; 
  const tokenNo = localStorage.getItem('tokenNo');
  const DASHBOARD_URL = process.env.REACT_APP_DASHBOARD_URL;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dates, setDates] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  useEffect(() => {
    axios
      .get(`${DASHBOARD_URL}/adhocapi/dashboard/footfall/department?type=OP`
      //   ,{
      //   headers: { Authorization: `Bearer ${tokenNo}`}
      // }
    )
      .then(response => {
        const responseData = response.data.data;
        const totalDates = Object.keys(responseData[0]).filter(key => key !== 'deptId' && key !== 'deptName');
        setDates(totalDates);
        const updatedData = responseData.map(dept => {
          const grandTotal = totalDates.reduce((total, date) => total + (dept[date] || 0), 0);
          return { ...dept, 'Grand Total': grandTotal };
        });
        setData(updatedData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleOpenDialog = (department) => {
    setSelectedDepartment(department);
  };

  const handleCloseDialog = () => {
    setSelectedDepartment(null);
  };

  const renderRows = () => {
    return data.map((row, index) => {
      return (
        <tr key={index}>
          <td>{row.deptName}</td>
          {dates.map(date => (
            <td key={date}>{row[date] || '0'}</td>
          ))}
          <td>{row['Grand Total']}</td>
          <td>
            <span style={{cursor:'pointer'}} role="img" aria-label="Show Graph" onClick={() => handleOpenDialog(row)}>📊</span>
            {/* <img style={{height:'20px', width:'20px'}} src={showGraph} alt="Show Graph" onClick={() => handleOpenDialog(row)} /> */}
          </td>
        </tr>
      );
    });
  };

  const DepartmentLineChart = ({ data }) => {
    return (
      <LineChart
        width={900}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    );
  };


  return (
    <div>
      {loading ? (
        <div className="loader-container">
          <BeatLoader color="#2190B9" />
        </div>
      ) : (
      <div>
      <table className='MainTable'>
        <thead>
          <tr>
            <th>Department Name</th>
            {dates.map(date => (
              <th key={date}>{date}</th>
            ))}
            <th>Grand Total</th>
            <th>Show Graph</th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>

      <Dialog maxWidth="lg" open={selectedDepartment !== null} onClose={handleCloseDialog}>
            <DialogTitle className='DialogTitle'>Graph for {selectedDepartment && selectedDepartment.deptName}</DialogTitle>
            <DialogContent>
              {selectedDepartment && <DepartmentLineChart data={dates.map(date => ({ date, count: selectedDepartment[date] || 0 }))} />}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
      </Dialog>
      </div>
      )}
    </div>
  );
}

export default OpdDepartmentWise;
