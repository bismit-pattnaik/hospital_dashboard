import React, { useState, useEffect } from "react";
import "./DoctorVisibility.css";
import searchIcon from "../../Assests/Images/searchIcon.svg";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import downloadPdf from '../../Assests/Images/downloadpdf.svg'
import downloadExcel from '../../Assests/Images/downloadExcel.svg'


function DoctorVisibility() {

  // const tokenNo=process.env.REACT_APP_TOKEN_NO;
  const tokenNo = localStorage.getItem('tokenNo');  // Retrieve token from localStorage
  const DASHBOARD_URL = process.env.REACT_APP_DASHBOARD_URL;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Set initial date to today's date
  const [hospitalMasterList, setHospitalMasterList] = useState([]);
  const [selectedHospitalId, setSelectedHospitalId] = useState("");

  function formatDate(dateTimeString) {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
    const formattedDateTime = new Date(dateTimeString).toLocaleDateString('en-GB', options);
    return formattedDateTime;
  }

   // Fetch hospital list for the dropdown
   useEffect(() => {
    axios
      .get(`${DASHBOARD_URL}/adhocapi/branch/master`)
      .then((response) => {
        setHospitalMasterList(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching hospital list:", error);
      });
  }, [DASHBOARD_URL]);
  
  useEffect(() => {
    setLoading(true); 
    axios
      .get(`${DASHBOARD_URL}/adhocapi/dashboard/fetchOpIpList?date=${formatDate(selectedDate)}&siteId=${selectedHospitalId}`
        // ,{ headers: { Authorization: `Bearer ${tokenNo}`}}
      )
      .then((response) => {
        setData(response.data.data);
        setLoading(false); // Set loading to false after data fetching is complete
        setFilteredData(response.data.data); // Initialize filtered data with fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false if there's an error
      });
  },[selectedDate, selectedHospitalId, DASHBOARD_URL]);

  const handleHospitalChange = (e) => {
    setSelectedHospitalId(e.target.value);  // Set the selected hospitalId or "" for "All"
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    filterData(e.target.value);
  };

  const filterData = (query) => {
    if (!query) {
      setFilteredData(data); // If no query, show all data
      return;
    }
    const filtered = data.filter((item) =>
      item.doctorName.toLowerCase().includes(query.toLowerCase()) ||
      item.departmentName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleTableRowClick = (doctorName, departmentName) => {
    setSearchQuery(`${doctorName}, ${departmentName}`);
  };

  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    const tableColumn = ["Doctor Name", "Department", "OP consultation", "IP consultation"];
    const tableRows = [];
  
    // Prepare table rows
    filteredData.forEach((row) => {
      const rowData = [
        row.doctorName,
        row.departmentName,
        row.opCount,
        row.ipCount
      ];
      tableRows.push(rowData);
    });
  
    // Add data to the table
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });
  
    // Save the PDF
    doc.save("doctor_visibility.pdf");
  };
  

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = {
      Sheets: { 'data': worksheet },
      SheetNames: ['data']
    };
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const fileName = "doctor_visibility.xlsx";
    saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), fileName);
  };

  return (
    <div className="MainContentBox">
      <div className="TitleLine">
        <div className="TitleFilter">
        <div className="HeaderTitleName">Doctor Visibility</div>
        <div className="">
           <select className="selectBarBox" onChange={handleHospitalChange}>
                <option value="">All Hospitals</option>
                {hospitalMasterList.map((hospital) => (
                  <option key={hospital.siteId} value={hospital.siteId}>
                    {hospital.hospitalName}
                  </option>
                ))}
              </select>       
        </div>
        </div>

      <div className="DownloadSection">
        <div onClick={handleDownloadExcel}><img src={downloadExcel} alt="Download Excel" /></div>
        <div onClick={handleDownloadPdf} ><img src={downloadPdf} alt="Download Pdf" /></div>
      </div>

      </div>

      <div className="ContentBox">
        <div className="DateSearchBoxHeaderLine">
          <div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='searchBarBox'>
              <input className='searchBarInput' placeholder='Search Doctor / Department' onChange={handleSearchChange} />
              <img style={{ cursor: "pointer" }} src={searchIcon} alt="search" />
            </div>
          </div>
          <div className="CalenterView">
            <input
              type="date"
              style={{ color: "black", outline: "none", border: "none" }}
              value={selectedDate.toISOString().split('T')[0]} // Set the value to the selectedDate
              onChange={(e) => setSelectedDate(new Date(e.target.value))} // Convert the input value to a Date object and update selectedDate
            />
          </div>
        </div>

        <div className="TableContainer">
          <div className="loader-container" >
            <BeatLoader
              color={"#2190B9"}
              loading={loading}
              size={15}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
          {!loading && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: "#E5E9E9" }}>
                <TableRow>
                  <TableCell>Doctor Name</TableCell>
                  {/* <TableCell>Doctor Id</TableCell> */}
                  <TableCell>Department</TableCell>
                  <TableCell>OP consultation</TableCell>
                  <TableCell>IP consultation</TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ overflowY: "auto" }}>
                {filteredData.map((row, index) => (
                  <TableRow key={index} onClick={() => handleTableRowClick(row.doctorName, row.departmentName)}>
                    <TableCell>{row.doctorName}</TableCell>
                    {/* <TableCell>{row.doctorId}</TableCell> */}
                    <TableCell>{row.departmentName}</TableCell>
                    <TableCell>{row.opCount}</TableCell>
                    <TableCell>{row.ipCount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </TableContainer>  
          )}
        </div>
      </div>
    </div>
  );
}

export default DoctorVisibility;
