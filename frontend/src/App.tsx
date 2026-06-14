import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsCounter from './components/StatsCounter'
import Programs from './components/Programs'
import CompanySlider from './components/CompanySlider'
import FeaturedActivities from './components/FeaturedActivities/FeaturedActivities'
import ActivitiesGallery from './components/ActivitiesGallery/ActivitiesGallery'
import Testimonials from './components/Testimonials'

import PlacementTimeline from './components/PlacementTimeline'
import Resources from './components/Resources'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'

// Admin Views
import AdminLogin from './pages/Admin/AdminLogin'
import { ProtectedRoute } from './components/ProtectedRoute'
import AdminLayout from './components/AdminLayout/AdminLayout'
import Dashboard from './pages/Admin/Dashboard'
import ActivityForm from './pages/Admin/ActivityForm'
import GalleryManager from './pages/Admin/GalleryManager'
import About from './pages/About/About'
import UpcomingEvents from './pages/UpcomingEvents/UpcomingEvents'
import EventForm from './pages/Admin/EventForm'

function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const timer = window.setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
      return () => window.clearTimeout(timer)
    }
    if (pathname === '/') {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsCounter />
        <Programs />
        <CompanySlider />
        <FeaturedActivities />
        <ActivitiesGallery />
        <Testimonials />

        <PlacementTimeline />
        <Resources />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <>
    <ScrollToHash />
    <Routes>
      {/* Public Facing Web Portal */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/upcoming-events" element={<UpcomingEvents />} />
      
      {/* Secured Admin Authorization */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected SaaS Backoffice Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/gallery" element={<GalleryManager />} />
          <Route path="/admin/create" element={<ActivityForm />} />
          <Route path="/admin/edit/:id" element={<ActivityForm />} />
          <Route path="/admin/events/create" element={<EventForm />} />
          <Route path="/admin/events/edit/:id" element={<EventForm />} />
        </Route>
      </Route>
    </Routes>
    </>
  )
}
