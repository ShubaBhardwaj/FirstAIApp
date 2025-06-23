import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import CheckAuth from './components/check-auth.jsx'
import Tickets from './pages/tickets.jsx'
import TicketDetailsPage from './pages/ticket.jsx'
import Login from './pages/login.jsx'
import Signup from './pages/signup.jsx'
import AdminPanel from './pages/admin.jsx'
import LandingPage from './components/landingPage.jsx'
import Navbar from './components/navbare.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route
       path = '/'
       element={
        <CheckAuth protecte={false} >
          <LandingPage/>
        </CheckAuth>
    }
      />

      <Route
       path = '/tickets/:id'
       element={
        <CheckAuth protecte={true} >
          <TicketDetailsPage/>
        </CheckAuth>
    }
      />

      <Route
       path = '/login'
       element={
        <CheckAuth protecte={false} >
          <Login/>
        </CheckAuth>
    }
      />

      <Route
       path = '/signup'
       element={
        <CheckAuth protecte={false} >
          <Signup/>
        </CheckAuth>
    }
      />

      <Route
       path = '/admin'
       element={
        <CheckAuth protecte={true} >
          <AdminPanel/>
        </CheckAuth>
    }
      />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
