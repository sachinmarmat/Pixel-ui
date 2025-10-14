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
import Resumebuilder from './Dashbord/DesComponant/Resumebuilder'
import Carrerresources from './Dashbord/DesComponant/Career'
import Jobs from './Dashbord/DesComponant/Jobs'
import Dask from './Dashbord/DesComponant/Dask'

import Signup from './Pages/Signup'
import GetAheadWithPixel from './Componants/Logout'

import Employedashboard from './Employer-Dashboard/Employedashboard'
import Postjobs from './Employer-Dashboard/Employerdas/Postjobs'
import Applica from './Employer-Dashboard/Employerdas/Application'
import Profiled from './Employer-Dashboard/Employerdas/Profile'
import Logout from './Employer-Dashboard/Employerdas/Logout'
import Managejobs from './Employer-Dashboard/Employerdas/Managejobs'
import Settings from './Employer-Dashboard/Employerdas/Settings'

import Admindashboard from './Admin/Admin'
// import Setting from './Admin/Admindashboard/Setting'
import Managejob from './Admin/Admindashboard/Managejob'
import Manageuser from './Admin/Admindashboard/Manageuser'
import Dashboards from './Admin/Admindashboard/Dashboard'
import AdminProfile from './Admin/Admindashboard/Profile'
import Employers from './Admin/Admindashboard/Employers'
import Jobseeker from './Admin/Admindashboard/Jobseeker'
import Revenue from './Admin/Admindashboard/Revenue'
import Termscondition from './Admin/Admindashboard/Termscondition'
import Privatepolicy from './Admin/Admindashboard/Private-policy'

import PremiumPlans from './Componants/Payment'
import Error from './Admin/Admindashboard/Error'
import Dashboardsetting from './Dashbord/DesComponant/Dashboardsetting'
import Notification from './Dashbord/DesComponant/Notification'
import { Changepassword } from './Dashbord/DesComponant/Changepassword'
import Deleteacc from './Dashbord/DesComponant/Deleteacc'
import Jobfilter from './Dashbord/DesComponant/Jobfilter'
import Adminlogin from './Pages/Adminlogin'
import JobApplyForm from './Componants/Applyjob'
import Jobsview from './Pages/Jobsview'

function App() {

  const location = useLocation();

  const hideNavbarFooter = ["/Login", "/Dashboard", "/Logout", "/Signup", "/PremiumPlans", "/Error","/Adminlogin","/Defaultnav" ];
  const shouldHide = hideNavbarFooter.includes(location.pathname);
  const deshpage = location.pathname.startsWith("/Dashboard")
  const employnavhide = location.pathname.startsWith("/Employedashboard")
  const Admin = location.pathname.startsWith("/Admin")


  return (
    <>

      {!shouldHide && !deshpage && !employnavhide && !Admin && <Navbar />}
      {deshpage && <Dashbordnav />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Aboutus' element={<Aboutus />} />
        <Route path='/navbar' element={<Navbar002 />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Companies' element={<Companies />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/PremiumPlans' element={<PremiumPlans />} />
        <Route path='/Error' element={<Error />} />
        <Route path='/Adminlogin' element={<Adminlogin />} />
        <Route path='/JobApplyForm' element={<JobApplyForm />} />
        <Route path='/Jobsview' element={<Jobsview />} />

        <Route path="/Dashboard" element={<Dashboard />}>
          <Route index element={<Dask />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="Jobs" element={<Jobs />} /> 
          <Route path="Jobfilter" element={<Jobfilter />} />
          <Route path="Application" element={<Application />} />
          <Route path="Savedjobs" element={<Savedjobs />} />
          <Route path="Carrerresources" element={<Carrerresources />} />
          <Route path="Resumebuilder" element={<Resumebuilder />} />

          <Route path="Dashboardsetting" element={<Dashboardsetting />} >
            <Route path='Notification' element={<Notification />} />
            <Route path='Changepassword' element={<Changepassword/>} />
            <Route path="Deleteacc" element={<Deleteacc />} />
          </Route>

          <Route path="GetAheadWithPixel" element={<GetAheadWithPixel />} />
        </Route>

        <Route path="/Employedashboard" element={<Employedashboard />}>
          <Route index element={<Postjobs />} />
          <Route path="Managejobs" element={<Managejobs />} />
          <Route path="Application" element={<Applica />} />
          <Route path="Profile" element={<Profiled />} />
          <Route path="Settings" element={<Settings />} />
          <Route path="Logout" element={<Logout />} />

        </Route>

        <Route path="/Admin" element={<Admindashboard />}>
          <Route index element={<Dashboards />} />
          <Route path='Manageuser' element={<Manageuser />} >
            <Route index element={<Jobseeker />} />
            <Route path='Employers' element={<Employers />} />
          </Route>

          <Route path='Managejob' element={<Managejob />} />
          <Route path='AdminProfile' element={< AdminProfile />} />

          <Route path='Setting'>
            <Route path='Termscondition' element={<Termscondition />} />
            <Route path='Privatepolicy' element={<Privatepolicy />} />
          </Route>

          <Route path='Revenue' element={<Revenue />} />

        </Route >

      </Routes>

      {!shouldHide && <Footer />}
    </>
  )
}

export default App
