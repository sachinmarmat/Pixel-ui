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
import Resumebuilder from './Dashbord/DesComponant/resumebuilder'
import Carrerresources from './Dashbord/DesComponant/Career'
import Jobs from './Dashbord/DesComponant/Jobs'
import Dask from './Dashbord/DesComponant/Dask'

function App() {

  const location = useLocation();

  const hideNavbarFooter = ["/Login", "/Dashboard", "/Logout"];
  const shouldHide = hideNavbarFooter.includes(location.pathname);
  const deshpage = location.pathname.startsWith("/Dashboard")


  return (
    <>

      {!shouldHide && !deshpage && <Navbar />}
      {deshpage && <Dashbordnav />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Aboutus' element={<Aboutus />} />
        <Route path='/navbar' element={<Navbar002 />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Companies' element={<Companies />} />
        <Route path='/Login' element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />}>

          <Route index element={<Dask />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="Jobs" element={<Jobs />} />
          <Route path="Application" element={<Application />} />
          <Route path="Savedjobs" element={<Savedjobs />} />
          <Route path="Carrerresources" element={<Carrerresources />} />
          <Route path="Satting" element={<Satting />} />
          <Route path="Resumebuilder" element={<Resumebuilder />} />
        </Route>
      </Routes>

      {!shouldHide && <Footer />}
    </>
  )
}

export default App
