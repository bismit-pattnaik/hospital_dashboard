import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import HomePic from '../Assests/Images/HomeImg.svg';

function Login() {


  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
 
  const handleLogin = () => {
    navigate('/DashboardView')
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
                        <input className='InputField' type="text" placeholder='Enter User Name' />
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
