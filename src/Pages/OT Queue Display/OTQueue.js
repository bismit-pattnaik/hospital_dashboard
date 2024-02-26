import React, { useState, useEffect } from 'react';
import './OTQueue.css';
import bedIcon from '../../Assests/Images/bedIcon.svg';
import otIcon from '../../Assests/Images/otIcon.svg'
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import axios from 'axios';

function OTQueue() {
  const tokenNo = process.env.REACT_APP_TOKEN_NO;
  const [otRooms, setOtRooms] = useState([]);
  const [selectedOt, setSelectedOt] = useState('');
  const [otPatients, setOtPatients] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
   // Get current date in "yyyy-mm-dd" format

  useEffect(() => {
    // Fetch OT rooms data
    axios
      .get(`http://localhost:9191/adhocapi/dashboard/fetchOtList?siteId=2468`, {
        headers: { Authorization: `Bearer ${tokenNo}` },
      })
      .then((response) => {
        setOtRooms(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching OT rooms data:', error);
      });
  }, [tokenNo]);

  useEffect(() => {
    // Fetch OT patients data based on selected OT room
    if (selectedOt) {
      axios
        .get(
          `http://localhost:9191/adhocapi/dashboard/fetchOtPatientList?serviceCenterId=${selectedOt}&date=23-02-2024`,
          {
            headers: { Authorization: `Bearer ${tokenNo}` },
          }
        )
        .then((response) => {
          setOtPatients(response.data.data);
        })
        .catch((error) => {
          console.error('Error fetching OT patients data:', error);
        });
    }
  }, [selectedOt, tokenNo]);

  const handleSearchChange = (e) => {
    setSelectedOt(e.target.value);
  };

  return (
    <div className="MainContentBox">
      <div className="TitleLine">
        <div className="HeaderTitleName">OT Queue Display</div>
      </div>
      <div className="ContentBox">
        <div className="ot-seach">
          <div className="ot-inputfield">
            <select className="department-select" onChange={handleSearchChange} value={selectedOt}>
              <option value="" disabled>
                Select OT
              </option>
              {otRooms.map((room, index) => (
                <option key={index} value={room.serviceCenterId}>
                  {room.serviceCenterName}
                </option>
              ))}
            </select>
          </div>
          <div className='calender-conatiner'>
          <div className="CalenterView">
            <input
              type="date"
              style={{ color: "black", outline: "none", border: "none" }}
              value={selectedDate.toISOString().split('T')[0]} // Set the value to the selectedDate
              onChange={(e) => setSelectedDate(new Date(e.target.value))} // Convert the input value to a Date object and update selectedDate
            />
          </div>
          </div>
        </div>

        <div className="TableContainer">
          <Table>
            <TableHead sx={{ backgroundColor: '#E5E9E9' }}>
              <TableRow>
                <TableCell style={{ width: '260px' }}>Patient Details</TableCell>
                <TableCell style={{ width: '200px' }}>Visit & Bed Details</TableCell>
                <TableCell style={{ width: '200px' }}>Surgery Details</TableCell>
                <TableCell style={{ width: '240px' }}>OT Team</TableCell>
                <TableCell>Surgery Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ overflowY: 'auto' }}>
              {otPatients.map((patient, index) => (   
                <TableRow key={index}>
                  <TableCell style={{fontSize:'12px'}} className='table-data'>
                    <span className="patientname">{patient.patientName}</span>&nbsp;
                    <span className="patientgender">{patient.gender}</span>&nbsp;
                    <span>({patient.age})</span>
                    <br />
                    {patient.mrno}&nbsp;&nbsp;
                  </TableCell>
                  <TableCell style={{fontSize:'12px'}} className='table-data'>
                    {patient.patientVisitId}
                    <br />
                    <img src={bedIcon} alt="bedIcon" />&nbsp;{patient.bedDetails}&nbsp;{patient.patientLocation}
                  </TableCell>
                  <TableCell style={{fontSize:'12px'}} className='table-data'>
                    {patient.surgeryName}
                    <br />
                    <img src={otIcon} alt="bedIcon" />&nbsp;{patient.otDetails}
                  </TableCell>
                  <TableCell style={{fontSize:'12px'}} className='table-data'>
                    Chief Surgeon: {patient.surgeon}
                    <br />
                    Anesthetist: {patient.AnesthetistName}
                  </TableCell>
                  <TableCell style={{fontSize:'12px'}} className='table-data'>{patient.surgeryStatus}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default OTQueue;
