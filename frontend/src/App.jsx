import { useCallback, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Loader from './components/Loader.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import Services from './components/Services.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import ComingSoon from './components/ComingSoon.jsx'

export default function App() {
  const [showLoader, setShowLoader] = useState(true)
  const { pathname } = useLocation()

  const handleLoaderFinish = useCallback(() => setShowLoader(false), [])

  // Start every page at the top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      {showLoader && <Loader onFinish={handleLoaderFinish} />}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<ComingSoon />} />
      </Routes>
      <Footer />
    </>
  )
}