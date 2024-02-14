import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import DashboardView from './Components/DashboardView';

function App() {
  return (
    <>
     <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/DashboardView' element={<DashboardView/>}/>
      
     </Routes>

    </>
  )
}

export default App