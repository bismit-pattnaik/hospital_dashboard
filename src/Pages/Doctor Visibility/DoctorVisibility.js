import React, { useState, useEffect } from 'react';
import './DoctorVisibility.css';
import searchIcon from '../../Assests/Images/searchIcon.svg';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import axios from 'axios';

function DoctorVisibility() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    axios
      .get(`http://localhost:9191/adhocapi/dashboard/fetchOpIpList?date=16-02-2024`,{
        // headers: { Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcwODExMTIyNSwiaWF0IjoxNzA4MDgyNDI1fQ.mXeUv0kEt_UqzM1NILPst1O28rZsuXAjG9IE5vlcXJvgydQX-u46XtZlIVSgSg8SsvomAdl9bqbi-c1gagzl_w`}
      })
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });    
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
 console.log(data)
  return (
    <div className='MainContentBox'>
      <div className='TitleLine'>
        <div className='HeaderTitleName'>
           Doctor Visibility
        </div>
      </div>

      {/* White background Skeleton */}
      <div className='ContentBox'>
        <div className='DateSearchBoxHeaderLine'>
          <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='searchBarBox'>
              <input className='searchBarInput' placeholder='Search Doctor / Department' onChange={handleSearchChange} />
              <img style={{ cursor: "pointer" }} src={searchIcon} alt="search" />
            </div>
          </div>
          <div className='CalenterView'>
            <input type="date" style={{ color: 'black', outline: 'none', border: 'none' }} defaultValue={getTodayDate()} />
          </div>
        </div>

        <div className='TableContainer'>
          <Table>
            <TableHead sx={{ backgroundColor: '#E5E9E9' }}>
              <TableRow>
                <TableCell>Doctor Name</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>OP consultation</TableCell>
                <TableCell>IP consultation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ overflowY: "auto" }}>
              {data?.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.doctorName}</TableCell>
                  <TableCell>{row.departmentName}</TableCell>
                  <TableCell>{row.opCount}</TableCell>
                  <TableCell>{row.ipCount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default DoctorVisibility;
