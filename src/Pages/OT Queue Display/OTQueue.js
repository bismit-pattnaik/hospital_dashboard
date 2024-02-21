import React from 'react'
import './OTQueue.css'
// import searchIcon from "../../Assests/Images/searchIcon.svg";
import dropdownIcon from "../../Assests/Images/dropdownIcon.svg"
import bedIcon from "../../Assests/Images/bedIcon.svg"
import { Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";

function OTQueue() {
  const handleSearchChange = (e) => {
     
  };
  return (
    <div className="MainContentBox">
    <div className="TitleLine">
      <div className="HeaderTitleName">OT Queue Display</div>
    </div>
    <div className="ContentBox">
    <div className="DateSearchBoxHeaderLine">
      <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='searchBarBox'>
          <input className='searchBarInput' placeholder='Select OT' onChange={handleSearchChange} />
          <img style={{ cursor: "pointer" }} src={dropdownIcon} alt="search" />
        </div>
      </div>
    </div>


    <div className="TableContainer">
          
          
            <Table>
              <TableHead sx={{ backgroundColor: "#E5E9E9" }}>
                <TableRow>
                  <TableCell>Patient Details</TableCell>
                  <TableCell>Visit & Bed Details</TableCell>
                  <TableCell>Surgery Details</TableCell>
                  <TableCell>OT Team</TableCell>
                  <TableCell>Surgery Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ overflowY: "auto" }}>
              <TableRow>
                    <TableCell style={{width:'260px'}}><span className='patientname'>Mr. Saroj Sharma</span>&nbsp;<span className='patientgender'>Male</span>&nbsp; <span>(52Y 11M)</span><br/>PKIMS0000133994&nbsp;&nbsp;<span className='patientstatus'>Under Care</span></TableCell>
                    <TableCell style={{width:'200px'}}>GN-001<br/><img src= {bedIcon} alt="bedIcon" />&nbsp;CICU/CICU 6TH FLR/614</TableCell>
                    <TableCell style={{width:'200px'}}>FOREIGN BODY REMOVAL BY G.I. ENDOSCOPY<br/><img src= {bedIcon} alt="bedIcon" />&nbsp;OT-003</TableCell>
                    <TableCell>Chief Surgeon:Dr. Abhilipsa Pradhan<br/>Anesthetist:Dr. Suitable Pradhan</TableCell>
                    <TableCell>OT:Confirmed<br/>PAC:Pending<br/>FC:Cleared</TableCell>
                </TableRow>
              </TableBody>
            </Table>
        </div>


    </div>
    </div>
  )
}

export default OTQueue