import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import HomePic from '../Assests/Images/HomeImg.svg';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const BACKEND_URL = process.env.REACT_APP_EMR_BACKEND_BASE_URL;

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    axios
      .post(
        `${BACKEND_URL}/emr/login?username=${username}&password=${password}`
      )
      .then((res) => {
        const profileData = res.data.profile;
        localStorage.setItem('profileData', JSON.stringify(profileData));

        // Save tokenNo in local storage
        const tokenNo = profileData.tokenNo;
        localStorage.setItem('tokenNo', tokenNo);

        navigate('/DashboardView');
      })
      .catch((error) => {
        console.error('There was a problem with the login request:', error);
      });
  };

  return (
    <div className='LoginMainPage'>
      <div className='LoginContainer1'>
        <img src={HomePic} alt="Home" />
      </div>
      <div className='LoginContainer2'>
        <div className='RightMidContainer'>
          <div className='FirstTitle'>
            Hi there!
          </div>
          <div className='HeaderInputBox'>
            <div className='InputTitle'>
              Username
            </div>
            <div>
              <input
                className='InputField'
                type="text"
                placeholder='Enter User Name'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className='HeaderInputBox'>
            <div className='InputTitle'>
              Password
            </div>
            <div className='PasswordInput'>
              <input
                className='InputField'
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className='EyeButton'
                onClick={handleTogglePasswordVisibility}
                type='button'
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <div className='BtnContainer' onClick={handleLogin}>
            <button className='LoginTextBtn'>Login</button>
          </div>

          <div className='ForgotBox'>
            <span className='ForgotText'>Forgot Password?</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
