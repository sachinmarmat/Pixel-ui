import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Home from './Componants/Home'
import Aboutus from './Pages/Aboutus'
import Navbar002 from './Componants/Navbar002'
import Navbar from './Componants/Navbar'
import Companies from './Pages/Companies'
import Contact from './Pages/Contact'
import Footer from './Componants/Footer'
import Login from './Pages/Login'
import Dashboard from './Dashbord/Dashboard'
import Dashbordnav from './Dashbord/Dashbordnav'
import Profile from './Dashbord/DesComponant/Profile'
import Application from './Dashbord/DesComponant/Application'
import Savedjobs from './Dashbord/DesComponant/Savedjobs'
import Satting from './Dashbord/DesComponant/Satting'
import Resumebuilder from './Dashbord/DesComponant/Resumebuilder'
import Carrerresources from './Dashbord/DesComponant/Career'
import Jobs from './Dashbord/DesComponant/Jobs'
import Dask from './Dashbord/DesComponant/Dask'
import { Changepassword } from './Componants/Changepassword'
import Deleteacc from './Componants/Deleteacc'
import Signup from './Pages/Signup'
import GetAheadWithPixel from './Componants/Logout'

import Employedashboard from './Employer-Dashboard/Employedashboard'
import Postjobs from './Employer-Dashboard/Employerdas/Postjobs'
import Applica from './Employer-Dashboard/Employerdas/Application'
import Profiled from './Employer-Dashboard/Employerdas/Profile'
import Logout from './Employer-Dashboard/Employerdas/Logout'
import Managejobs from './Employer-Dashboard/Employerdas/ManageJobs'
import Settings from './Employer-Dashboard/Employerdas/Settings'

function App() {

  const location = useLocation();

  const hideNavbarFooter = ["/Login", "/Dashboard", "/Logout", "/Signup", ];
  const shouldHide = hideNavbarFooter.includes(location.pathname);
  const deshpage = location.pathname.startsWith("/Dashboard")
  const employnavhide = location.pathname.startsWith("/Employedashboard")


  return (
    <>

      {!shouldHide && !deshpage && !employnavhide && <Navbar />}
      {deshpage && <Dashbordnav />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Aboutus' element={<Aboutus />} />
        <Route path='/navbar' element={<Navbar002 />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Companies' element={<Companies />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path="/Dashboard" element={<Dashboard />}>

          <Route index element={<Dask />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="Jobs" element={<Jobs />} />
          <Route path="Application" element={<Application />} />
          <Route path="Savedjobs" element={<Savedjobs />} />
          <Route path="Carrerresources" element={<Carrerresources />} />
          <Route path="Resumebuilder" element={<Resumebuilder />} />
          <Route path="Satting" element={<Satting />} />
          <Route path="Changepassword" element={<Changepassword />} />
          <Route path="Deleteacc" element={<Deleteacc />} />
          <Route path="GetAheadWithPixel" element={<GetAheadWithPixel />} />
        </Route>

        <Route path="/Employedashboard" element={<Employedashboard />}>
          <Route index element={<Postjobs/>} />
          <Route path="Managejobs" element={<Managejobs/>} />
          <Route path="Application" element={<Applica/>} />
          <Route path="Profile" element={<Profiled/>} />
          <Route path="Settings" element={<Settings/>} />
          <Route path="Logout" element={<Logout/>} />

        </Route>
      </Routes>

      {!shouldHide && <Footer />} 
    </>
  )
}

export default App
