import React, { useState } from 'react'
import './Navbar.css'
import logo from '../Assests/Images/soulcarelogo.svg';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';



function Navbar() {

  const [avatarUrl, setAvtarUrl] = useState(null);
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  const handleLogout = () => {
    
  }

  return (
    <>
    <div className='NavbarContainer'>
      <div className='NavbarHeader'>
        <div className='ImgBox'>
           <img style={{height:'50px'}} src={logo} alt="SOUL CARE" />
        </div>
        <div className='HeaderNavbarTitle'>
           Hospital Analytics
        </div>

      </div>

      <div className='NavbarTail'>
        
      <div style={{display:"flex", alignItems:"center",justifyContent:"center",gap:"30px"}}> 
          <div style={{display:"flex",flexDirection:"column",gap:"4px"}}>
            <div className='empName'>Ramesh Charan Srivastab</div>
            <div className='departName'>Admin</div>
          </div>
        
        <div className='logoutIcon'>
          
        {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="user"
                style={{ width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer' }}
                onClick={handleToggle}  ref={anchorRef} aria-controls={open ? 'composition-menu' : undefined}
                
              />
            ) : (
        <AccountCircleIcon style={{fontSize:"xxx-large",color:'white'}}
         ref={anchorRef} id="composition-button" aria-controls={open ? 'composition-menu' : undefined}
         aria-expanded={open ? 'true' : undefined} aria-haspopup="true" onClick={handleToggle}/>
        )}

        <Popper open={open} anchorEl={anchorRef.current} role={undefined} placement="bottom-start" transition disablePortal >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin:placement === 'bottom-start' ? 'left top' : 'left bottom',}}>
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="composition-menu" aria-labelledby="composition-button" onKeyDown={handleListKeyDown}>
                    {/* <MenuItem onClick={handleProfilePage}>Profile</MenuItem> */}
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
      </div>



      </div>

    </div>
    </>
  )
}

export default Navbar