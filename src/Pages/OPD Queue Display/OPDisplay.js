import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OPDisplay.css";
import { Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";

import robot from "../../Assests/Images/robot.svg";
import avtar from "../../Assests/Images/avtar.png";

function OPDisplay() {
  const tokenNo = process.env.REACT_APP_TOKEN_NO;
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [patientDetails, setPatientDetails] = useState([]);

  useEffect(() => {
    // Fetch department data from the API
    axios
      .get(
        `http://localhost:9191/adhocapi/department/clinicalDepartments?siteId=2468`,
        {
          headers: { Authorization: `Bearer ${tokenNo}` },
        }
      )
      .then((response) => {
        const departmentNames = response.data.data.map(
          (department) => department.deptName
        );
        setDepartments(departmentNames);
      })
      .catch((error) =>
        console.error("Error fetching department data:", error)
      );
  }, [tokenNo]);

  useEffect(() => {
    if (selectedDepartment) {
      axios
        .get(
          `http://localhost:9191/adhocapi/employee/doctorDetails?siteId=2468&departmentName=${selectedDepartment}`,
          {
            headers: { Authorization: `Bearer ${tokenNo}` },
          }
        )
        .then((response) => {
          const doctorData = response.data.data;
          setDoctors(doctorData);
          // Reset selected doctor when department changes
          setSelectedDoctor("");
        })
        .catch((error) => console.error("Error fetching doctor data:", error));
    }
  }, [selectedDepartment, tokenNo]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (selectedDoctor) {
      axios
        .get(
          `http://localhost:9191/adhocapi/doctorDashboard/outPatientDetails?siteId=2468&empNo=${selectedDoctor}`,
          {
            headers: { Authorization: `Bearer ${tokenNo}` },
          }
        )
        .then((response) => {
          setPatientDetails(response.data.opMapList);
        })
        .catch((error) =>
          console.error("Error fetching patient details:", error)
        );
    }
  }, [selectedDoctor, tokenNo]);

  const showDetails = selectedDepartment && selectedDoctor;

  return (
    <div className="MainContentBox">
      <div className="TitleLine">
        <div className="HeaderTitleName">OPD Queue Display</div>
      </div>
      <div className="ContentBox">
        <div className="opd-seach">
          <div>
            <select
              className="department-select"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="" disabled>
                Select Department
              </option>
              {departments.map((department, index) => (
                <option key={index} value={department}>
                  {department}
                </option>
              ))}
            </select>

            <select
              className="department-select"
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
            >
              <option value="" disabled>
                Select Doctor
              </option>
              {doctors.map((doctor) => (
                <option key={doctor.employeeNo} value={doctor.employeeNo}>
                  {doctor.doctorName}
                </option>
              ))}
            </select>
          </div>

          <div className="dateTime">{currentDateTime.toLocaleString()}</div>
        </div>

        {showDetails ? (
          <div className="doctor-patient-deatils">
            <div className="doctor-patient-header">
              <div className="doctor-details">
                <div className="left-div">
                  <div className="left-inner">
                    <img src={avtar} className="avtar" alt="Description" />
                  </div>
                  <div className="right-inner">
                    <div className="doctor-name">
                      {doctors.find((doctor) => doctor.employeeNo === selectedDoctor)?.doctorName || ""}
                      <br />
                      <span className="specialist">{selectedDepartment}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="patient-deatils">
                <div className="patient-left-div">
                  <div className="patient-header">Patient Call</div>
                  <div className="patient-queue-no">
                    <div className="q-label">Q No.</div>
                    <div className="queue-number">{patientDetails.length}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '100px' }}>
                    <div className="patient-left-inner">
                      <div className="patient-info">Patient Name</div>
                      <div className="patient-info">Mobile No.</div>
                      <div className="patient-info">PHRN No.</div>
                      <div className="patient-info">Reporting Time</div>
                    </div>
                    <div className="patient-right-inner">
                      {patientDetails.map((patient, index) => (
                        <div key={index}>
                          <div className="patient-info">{patient.patientName}</div>
                          <div className="patient-info">{patient.mobileNo}</div>
                          <div className="patient-info">{patient.phrnNo}</div>
                          <div className="patient-info">{patient.reportingTime}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="right-side" style={{ width: '59%' }}>
              <Table>
                <TableHead sx={{ backgroundColor: "#E5E9E9" }}>
                  <TableRow>
                    <TableCell>Q No.</TableCell>
                    <TableCell>Patient Name</TableCell>
                    <TableCell>MR No.</TableCell>
                    <TableCell>Encounter Date Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ overflowY: "auto" }}>
                  {patientDetails.map((patient, index) => (
                    <TableRow key={index}>
                      <TableCell>{patient.queueNo}</TableCell>
                      <TableCell>{patient.patientName}</TableCell>
                      <TableCell>{patient.mrno}</TableCell>
                      <TableCell>{patient.encounterDateTime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ) : (
          <div className="robot">
            <img src={robot} alt="bedIcon" className="robot-img" />
            <br />
            <p style={{ margin: "-45px 0 0 0", textAlign: "center" }} className="robot-text">
              Select Department & Doctor to view details
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default OPDisplay;
