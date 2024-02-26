import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BedVisibility.css';
import statusImg from '../../Assests/Images/statusImg.svg';
import blockedBed from '../../Assests/Images/blockedbed.svg';
import occupiedBed from '../../Assests/Images/occupiedbed.svg';
import availableBed from '../../Assests/Images/availablebed.svg';
import unavailableBed from '../../Assests/Images/unavailableBed.svg';
import markedForDischarge from '../../Assests/Images/markedForDischargeBed.svg';

function ICUbeds() {

    const tokenNo=process.env.REACT_APP_TOKEN_NO; 
    const [bedData, setBedData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9191/adhocapi/dashboard/bedavailability?type=ICU',{
            headers: { Authorization: `Bearer ${tokenNo}`}
        });
        setBedData(response.data.data);
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
      case 'MarkedDischarge':
        return <img src={markedForDischarge} alt="MarkedDischarge" />;
      default:
        return null;
    }
  };

  return (
    <div className='BedContainer'>
      <div className='ContainerTitle'>
        ICU Bed Details
      </div>
      <div className='ContainerImg'>
        <img src={statusImg} alt="Status" />
      </div>

      <div className='BlockContainer'>
        {Object.entries(bedData).map(([blockName, beds]) => (
          <div key={blockName} className='BlockBox'>
            <div className='BlockName'>
              {blockName}
            </div>
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
        ))}
      </div>
    </div>
  );
}

export default ICUbeds;
















// import React from 'react'
// import './BedVisibility.css'
// import statusImg from '../../Assests/Images/statusImg.svg'
// import blockedBed from '../../Assests/Images/blockedbed.svg'
// import occupiedBed from '../../Assests/Images/occupiedbed.svg'
// import availableBed from '../../Assests/Images/availablebed.svg'
// import unavailableBed from '../../Assests/Images/unavailableBed.svg'
// import markedForDischarge from '../../Assests/Images/markedForDischargeBed.svg'

// function ICUbeds() {
//   return (
//     <div className='BedContainer'>

//         <div className='ContainerTitle'>
//            ICU Bed Details
//         </div>
//         <div className='ContainerImg'>
//             <img src={statusImg} alt="Status" />
//         </div>


//         <div className='BlockContainer'>
//             <div className='BlockBox'>
//                <div className='BlockName'>
//                     Block A
//                </div>
//                <div className='BlockCount'>
//                   <div>Total : 120</div>
//                   <div>Available : 99</div>
//                </div>
//                <div className='BedVisibilityStatus'>
//                   <div className='BedImg'>
//                     <div><img src={blockedBed} alt="Blocked" /></div>
//                     <div className='BedNo'>ICU-5F-4</div>
//                   </div>
//                   <div className='BedImg'>
//                     <div><img src={blockedBed} alt="Blocked" /></div>
//                     <div className='BedNo'>ICU-5F-4</div>
//                   </div>
//                   <div className='BedImg'>
//                     <div><img src={occupiedBed} alt="Occupied" /></div>
//                     <div className='BedNo'>ICU-5F-0</div>
//                   </div>
//                   <div className='BedImg'>
//                     <div><img src={occupiedBed} alt="Occupied" /></div>
//                     <div className='BedNo'>ICU-5F-5</div>
//                   </div>
//                   <div className='BedImg'>
//                     <div><img src={availableBed} alt="Available" /></div>
//                     <div className='BedNo'>ICU-5F-4</div>
//                   </div>  
//                   <div className='BedImg'>
//                     <div><img src={unavailableBed} alt="Unavailable" /></div>
//                     <div className='BedNo'>B312</div>
//                   </div> 
//                   <div className='BedImg'>
//                     <div><img src={markedForDischarge} alt="MarkedDischarge" /></div>
//                     <div className='BedNo'>B432</div>
//                   </div> 
                  
//                </div>
//             </div>
//             <div className='BlockBox'>
//               B
//             </div>
//             <div className='BlockBox'>
//              C   
//             </div>
//             <div className='BlockBox'>
//              D
//             </div>
//             <div className='BlockBox'>
//              E
//             </div>
//         </div>




//     </div>
//   )
// }

// export default ICUbeds