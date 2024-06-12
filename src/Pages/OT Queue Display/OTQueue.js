import React, { useState, useEffect } from 'react';
import './OTQueue.css';
import bedIcon from '../../Assests/Images/bedIcon.svg';
import otIcon from '../../Assests/Images/otIcon.svg';
import robot from '../../Assests/Images/robot.svg';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import axios from 'axios';
import { BeatLoader } from "react-spinners";

function OTQueue() {
  const tokenNo = localStorage.getItem('tokenNo');
  const DASHBOARD_URL = process.env.REACT_APP_DASHBOARD_URL;
  const [otRooms, setOtRooms] = useState([]);
  const [selectedOt, setSelectedOt] = useState('');
  const [otPatients, setOtPatients] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showTable, setShowTable] = useState(false);
  const [loading, setLoading] = useState(true); // Set initial loading state to true

  useEffect(() => {
    // Fetch OT rooms data
    setLoading(true); // Set loading to true when starting data fetching
    axios
      .get(`${DASHBOARD_URL}/adhocapi/dashboard/fetchOtList?siteId=2468`, {
        headers: { Authorization: `Bearer ${tokenNo}` },
      })
      .then((response) => {
        setOtRooms(response.data.data);
        setLoading(false); // Set loading to false after data fetching is complete
      })
      .catch((error) => {
        console.error('Error fetching OT rooms data:', error);
        setLoading(false); // Set loading to false if there's an error
      });
  }, [tokenNo]);

  useEffect(() => {
    // Fetch OT patients data based on selected OT room
    if (selectedOt && selectedDate) {
      setLoading(true); // Set loading to true when starting patient data fetching
      axios
        .get(
          `${DASHBOARD_URL}/adhocapi/dashboard/fetchOtPatientList?serviceCenterId=${selectedOt}&date=${formatDate(selectedDate)}`,
          {
            headers: { Authorization: `Bearer ${tokenNo}` },
          }
        )
        .then((response) => {
          setOtPatients(response.data.data);
          setShowTable(true); // Show the table when OT and date are selected
          setLoading(false); // Set loading to false after data fetching is complete
        })
        .catch((error) => {
          console.error('Error fetching OT patients data:', error);
          setLoading(false); // Set loading to false if there's an error
        });
    } else {
      setShowTable(false); // Hide the table when either OT or date is not selected
    }
  }, [selectedOt, selectedDate, tokenNo]);

  const handleSearchChange = (e) => {
    setSelectedOt(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(new Date(e.target.value));
  };

  // Function to format the date as dd-MM-yyyy
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
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
                onChange={handleDateChange} // Update selectedDate
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loader-container">
            <BeatLoader
              color={"#2190B9"}
              loading={loading}
              size={15}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <>
            {/* Conditional rendering of the robot image and text */}
            {!showTable && (
              <div className='robot'>
                <img src={robot} alt="bedIcon" className='robot-img' /><br/> 
                <p style={{ margin: '-45px 0 0 0' }} className='.robot-text'>Select OT and date to view details</p>
              </div>
            )}

            {/* Conditional rendering of the table */}
            {showTable && (
              <div className="TableContainer">
                {otPatients.length === 0 ? (
                  <p>No Patient In the selected OT</p>
                ) : (
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
                          <TableCell style={{ fontSize: '12px' }} className='table-data'>
                            <span className="patientname">{patient.patientName}</span>&nbsp;
                            <span className="patientgender">{patient.gender}</span>&nbsp;
                            <span>({patient.dob})</span>
                            <br />
                            {patient.mrno}&nbsp;&nbsp;
                          </TableCell>
                          <TableCell style={{ fontSize: '12px' }} className='table-data'>
                            {patient.patientVisitId}
                            <br />
                            <img src={bedIcon} alt="bedIcon" />&nbsp;{patient.bedDetails}&nbsp;{patient.patientLocation}
                          </TableCell>
                          <TableCell style={{ fontSize: '12px' }} className='table-data'>
                            {patient.surgeryName}
                          </TableCell>
                          <TableCell style={{ fontSize: '12px' }} className='table-data'>
                            Chief Surgeon: {patient.surgeon}
                            <br />
                            Anesthetist: {patient.AnesthetistName}
                          </TableCell>
                          <TableCell style={{ fontSize: '12px' }} className='table-data'>{patient.surgeryStatus}<br />{patient.financeClearance}<br />{patient.pacStatus}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default OTQueue;
