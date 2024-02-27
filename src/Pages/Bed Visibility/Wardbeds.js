import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BedVisibility.css';
import statusImg from '../../Assests/Images/statusImg.svg';
import blockedBed from '../../Assests/Images/blockedbed.svg';
import occupiedBed from '../../Assests/Images/occupiedbed.svg';
import availableBed from '../../Assests/Images/availablebed.svg';
import unavailableBed from '../../Assests/Images/unavailableBed.svg';
import markedForDischarge from '../../Assests/Images/markedForDischargeBed.svg';

function WardBeds({ onBedDataChange }) {                                   //  Receive onBedDataChange as a prop
  const tokenNo = process.env.REACT_APP_TOKEN_NO;
  const [bedData, setBedData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9191/adhocapi/dashboard/bedavailability?type=', {
          headers: { Authorization: `Bearer ${tokenNo}` }
        });
        setBedData(response.data.data);
        // Calculate total and available beds and pass the data to the parent component
        const total = calculateTotalBeds(response.data.data); // Pass the fetched data to calculate functions
        const available = calculateAvailableBeds(response.data.data); // Pass the fetched data to calculate functions
        onBedDataChange({ total, available });;

      } catch (error) {
        console.error('Error fetching bed data:', error);
      }
    };

    fetchData();
  }, []);

  const renderBedStatus = (status) => {
    switch (status) {
      case 'Blocked':
        return <img src={blockedBed} alt="Blocked" />;
      case 'Occupied':
        return <img src={occupiedBed} alt="Occupied" />;
      case 'Available':
        return <img src={availableBed} alt="Available" />;
      case 'Unavailable':
        return <img src={unavailableBed} alt="Unavailable" />;
      case 'Marked For Discharge':
        return <img src={markedForDischarge} alt="MarkedDischarge" />;
      default:
        return null;
    }
  };

  const calculateTotalBeds = () => {
    let total = 0;
    Object.values(bedData).forEach(beds => {
      total += beds.length;
    });
    return total;
  };

  const calculateAvailableBeds = () => {
    let available = 0;
    Object.values(bedData).forEach(beds => {
      available += beds.filter(bed => bed.bedStatus === 'Available').length;
    });
    return available;
  };

  const calculateBedStatusCount = (status) => {
    let count = 0;
    Object.values(bedData).forEach(beds => {
      count += beds.filter(bed => bed.bedStatus === status).length;
    });
    return count;
  };
  


  return (
    <div className='BedContainer'>
      <div className='ContainerTitle'>
        ICU Bed Details
      </div>
      <div className='ContainerImg'>
        <div className='ColorCodeTag'><div className='ColorBox' style={{ background: '#969EB0' }}></div> <div className='ColorBoxTitle'>Occupied ({calculateBedStatusCount('Occupied')}) </div> </div>
        <div className='ColorCodeTag'><div className='ColorBox' style={{ background: '#29BF80' }}></div> <div className='ColorBoxTitle'>Available ({calculateBedStatusCount('Available')}) </div> </div>
        <div className='ColorCodeTag'><div className='ColorBox' style={{ background: '#DE972C' }}></div> <div className='ColorBoxTitle'>Blocked ({calculateBedStatusCount('Blocked')}) </div> </div>
        <div className='ColorCodeTag'><div className='ColorBox' style={{ background: '#F14E63' }}></div> <div className='ColorBoxTitle'>Under Maintainance ({calculateBedStatusCount('Unavailable')}) </div> </div>
        <div className='ColorCodeTag'><div className='ColorBox' style={{ background: '#9F57D7' }}></div> <div className='ColorBoxTitle'>Marked For Discharge ({calculateBedStatusCount('Marked For Discharge')}) </div> </div>
      </div>


      <div className='BlockContainer'>
        {Object.entries(bedData).map(([blockName, beds]) => (
          <div key={blockName} className='BlockBox'>
            <div className='BlockName'>
              {blockName}
            </div>
            <div className='BlockImgAndCount'>
              <div className='BlockCount'>
                <div>Total: {beds.length}</div>
                <div>Available: {beds.filter(bed => bed.bedStatus === 'Available').length}</div>
              </div>
              <div className='BedVisibilityStatus'>
                {beds.map((bed, index) => (
                  <div key={index} className='BedImg'>
                    <div>{renderBedStatus(bed.bedStatus)}</div>
                    <div className='BedNo'>{bed.bedNo}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WardBeds;
