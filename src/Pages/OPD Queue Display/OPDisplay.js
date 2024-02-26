import React, { useState, useEffect } from "react";
import "./OPDisplay.css";
import { Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";

import robot from "../../Assests/Images/robot.svg";
import avtar from "../../Assests/Images/avtar.png";

function OPDisplay() {
  return (
    <div className="MainContentBox">
      <div className="TitleLine">
        <div className="HeaderTitleName">OPD Queue Display</div>
      </div>
      <div className="ContentBox">
        <div className="opd-seach">
          <select className="department-select">
            <option value="" disabled selected>
              Select Department
            </option>
          </select>

          <select className="department-select">
            <option value="" disabled selected>
              Select Doctor
            </option>
          </select>
        </div>

        {/* <div className='robot'>
        <img src={robot} alt="bedIcon" className='robot-img' /><br/> 
        <p style={{ margin: '-45px 0 0 0',textAlign:'center' }} className='robot-text'>Select Department & Doctor to<br/> view details</p>
      </div> */}
         <div className="doctor-patient-deatils">
            <div className="doctor-patient-header">
            <div className="doctor-details">
              <div className="left-div">
                <div className="left-inner">
                  <img src={avtar} className="avtar" alt="Description" />
                </div>
                <div className="right-inner">
                  <div className="doctor-name">
                    Dr. Aditya Mishra
                    <br />
                    <span className="specialist">Cardiology</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="patient-deatils">
              <div className="patient-left-div">
                <div className="patient-header">
                  Patient Call
                </div>
                <div className="patient-queue-no">
                  <div className="q-label">Q No.</div>
                  <div className="queue-number">4</div>
                </div>

                <div style={{display:'flex',gap:'100px'}}>
                <div className="patient-left-inner">
                  <div className="patient-info">Patient Name</div>
                  <div className="patient-info">Mobile No.</div>
                  <div className="patient-info">PHRN No.</div>
                  <div className="patient-info">Reporting Time</div>
                </div>

                <div className="patient-right-inner">
                  <div className="patient-info">Rohit Senapati</div>
                  <div className="patient-info">9558612690</div>
                  <div className="patient-info">KIMS000001</div>
                  <div className="patient-info">10:30 AM</div>
                </div>
                </div>
              </div>
            </div>
            </div>
            <div className="right-side" style={{width:'59%'}}>
            <Table>
              <TableHead sx={{ backgroundColor: "#E5E9E9" }}>
                <TableRow>
                  <TableCell>Q No.</TableCell>
                  <TableCell>Patient Name</TableCell>
                  <TableCell>Mobile No.</TableCell>
                  <TableCell>PHRN No.</TableCell>
                  <TableCell>Approximate Waiting Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ overflowY: "auto" }}>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>Sujata Behera</TableCell>
                    <TableCell>9849843473</TableCell>
                    <TableCell>KIMS000001</TableCell>
                    <TableCell>20min</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>Sujata Behera</TableCell>
                    <TableCell>9849843473</TableCell>
                    <TableCell>KIMS000001</TableCell>
                    <TableCell>20min</TableCell>
                  </TableRow>
               
              </TableBody>
            </Table>
            </div>
         </div>
        
      </div>
    </div>
  );
}

export default OPDisplay;
