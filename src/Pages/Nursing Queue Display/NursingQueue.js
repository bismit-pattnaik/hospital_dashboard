import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import './NursingQueue.css';
import robot from '../../Assests/Images/robot.svg';
import { BeatLoader } from "react-spinners";

function NursingQueue() {
    const tokenNo = localStorage.getItem('tokenNo');
    const DASHBOARD_URL = process.env.REACT_APP_DASHBOARD_URL;
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [serviceCenters, setServiceCenters] = useState([]); // Ensure it's initialized as an array
    const [selectedWard, setSelectedWard] = useState('');
    const [patientsData, setPatientsData] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [loading, setLoading] = useState(true);
    const [hospitalMasterList, setHospitalMasterList] = useState([]);
    const [selectedHospitalId, setSelectedHospitalId] = useState("");

    // Fetch hospital list for the dropdown
    useEffect(() => {
        axios
          .get(`${DASHBOARD_URL}/adhocapi/branch/master`)
          .then((response) => {
            const hospitals = response.data.data || []; // Default to an empty array if data is undefined
            setHospitalMasterList(hospitals);
            if (hospitals.length > 0) {
              setSelectedHospitalId(hospitals[0].siteId); // Automatically select the first hospital by default
            }
          })
          .catch((error) => {
            console.error("Error fetching hospital list:", error);
          });
    }, [DASHBOARD_URL]);

    // Fetch service centers
    useEffect(() => {
        setLoading(true);
        axios.get(`${DASHBOARD_URL}/adhocapi/dashboard/serviceCenters?siteId=${selectedHospitalId}`)
            .then(response => {
                const centers = response.data.data || []; // Default to an empty array if data is undefined
                setServiceCenters(centers);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching service centers:', error);
                setServiceCenters([]); // Set to an empty array if there's an error
                setLoading(false);
            });
    }, [DASHBOARD_URL, selectedHospitalId]);

    // Fetch patients data when selectedWard changes
    useEffect(() => {
        if (!selectedWard) return;
        setLoading(true);
        axios
            .get(`${DASHBOARD_URL}/adhocapi/dashboard/nqdPatientList?siteId=${selectedHospitalId}&serviceCenterId=${selectedWard.serviceCenterId}`)
            .then((response) => {
                const data = response.data.data || []; // Default to an empty array if data is undefined
                setPatientsData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching patient data:', error);
                setPatientsData([]); // Set to empty array on error
                setLoading(false);
            });
    }, [selectedWard, selectedHospitalId, DASHBOARD_URL]);

    const handleSelectChange = (e) => {
        const selectedServiceCenter = serviceCenters.find(center => center.serviceCenterName === e.target.value);
        setSelectedWard(selectedServiceCenter || null);
        setShowTable(true);
    };

    const handleHospitalChange = (e) => {
        setSelectedHospitalId(e.target.value);
        setSelectedWard(null); // Reset selected ward when hospital changes
        setPatientsData([]);
        setShowTable(false);
    };

    return (
        <div className='MainContentBox'>
            <div className='TitleLine'>
                <div className="TitleFilter">
                    <div className="HeaderTitleName">Doctor Visibility</div>
                    <div>
                        <select className="selectBarBox" onChange={handleHospitalChange}>
                            {hospitalMasterList.map((hospital) => (
                                <option key={hospital.siteId} value={hospital.siteId}>
                                    {hospital.hospitalName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className='ContentBox'>
                <div className="DateSearchBoxHeaderLine">
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='SelectBarBox'>
                            <select className='searchBarInput' value={selectedWard?.serviceCenterName || ''} onChange={handleSelectChange}>
                                <option value=''>Select Ward</option>
                                {Array.isArray(serviceCenters) && serviceCenters.map(center => (
                                    <option key={center.serviceCenterId} value={center.serviceCenterName}>{center.serviceCenterName}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="CalenterView">
                        <input
                            type="date"
                            style={{ color: "black", outline: "none", border: "none" }}
                            value={selectedDate.toISOString().split('T')[0]}
                            onChange={(e) => setSelectedDate(new Date(e.target.value))}
                        />
                    </div>
                </div>
                {loading ? (
                    <div className="loader-container">
                        <BeatLoader color={"#2190B9"} loading={loading} size={15} />
                    </div>
                ) : (
                    <>
                        {!showTable && (
                            <div className='robot'>
                                <img src={robot} alt="bedIcon" className='robot-img' /><br />
                                <p style={{ margin: '-45px 0 0 0' }} className='robot-text'>Select Ward to view details</p>
                            </div>
                        )}
                        {showTable && (
                            <div className='TableContainer'>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead sx={{ backgroundColor: "#E5E9E9", padding: '12px', fontWeight: '600' }}>
                                            <TableRow>
                                                <TableCell>Patient Details</TableCell>
                                                <TableCell>Visit & Bed Detail</TableCell>
                                                <TableCell>Admitted Doctor</TableCell>
                                                <TableCell>Department</TableCell>
                                                <TableCell>Admission Date</TableCell>
                                                <TableCell>Patient Status</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {patientsData.map(patient => (
                                                <TableRow key={patient.patientId}>
                                                    <TableCell>
                                                        <span className="Tablepatientname">{patient.patientName}</span>&nbsp;&nbsp;
                                                        <span className="Tablepatientgender">{patient.gender}</span>&nbsp;
                                                        <br /> <span> ☎ :{patient.mobileNo} </span> &nbsp; <span>Age : {patient.age} </span>
                                                        <br /> {patient.mrno}&nbsp;&nbsp;
                                                    </TableCell>
                                                    <TableCell><span>{patient.visitNo}</span><br /> Bed No. : {patient.bedNo}</TableCell>
                                                    <TableCell>{patient.doctorName}</TableCell>
                                                    <TableCell>{patient.departmentName}</TableCell>
                                                    <TableCell>{patient.admissionDate}</TableCell>
                                                    <TableCell>{patient.ipStatus}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default NursingQueue;
