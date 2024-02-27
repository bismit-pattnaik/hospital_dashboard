import React from 'react';
// import axios from 'axios';
import './BedVisibility.css';
// import statusImg from '../../Assests/Images/statusImg.svg';
import blockedBed from '../../Assests/Images/blockedbed.svg';
import occupiedBed from '../../Assests/Images/occupiedbed.svg';
import availableBed from '../../Assests/Images/availablebed.svg';
import unavailableBed from '../../Assests/Images/unavailableBed.svg';
import markedForDischarge from '../../Assests/Images/markedForDischargeBed.svg';
import { BeatLoader } from 'react-spinners';

function WardBeds({ bedData }) {                          // Receive bedData as a prop


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

  const calculateBedStatusCount = (status) => {
    let count = 0;
    Object.values(bedData).forEach(beds => {
      count += beds.filter(bed => bed.bedStatus === status).length;
    });
    return count;
  };
  
 // Render loader if bedData is not yet fetched
 if (!bedData || Object.keys(bedData).length === 0) {
  return <div className='Loader'><BeatLoader color="#36d7b7" /></div>;
}

  return (
    <div className='BedContainer'>
      <div className='ContainerTitle'>
        Ward Bed Details
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
