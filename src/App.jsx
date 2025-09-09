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

function App() {

  const location = useLocation();

  const hideNavbarFooter = ["/Login"];
  const shouldHide = hideNavbarFooter.includes(location.pathname);



  return (
    <>
      {!shouldHide && <Navbar />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Aboutus' element={<Aboutus />} />
        <Route path='/navbar' element={<Navbar002 />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Companies' element={<Companies />} />
        <Route path='/Login' element={<Login />} />
      </Routes>

      {!shouldHide && <Footer />}
    </>
  )
}

export default App
