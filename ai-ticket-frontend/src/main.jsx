import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CheckAuth from './components/check-auth.jsx'
import Tickets from './pages/tickets.jsx'
import TicketDetailsPage from './pages/ticket.jsx'
import Login from './pages/login.jsx'
import Signup from './pages/signup.jsx'
import Admin from './pages/admin.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route
       path = '/'
       element={
        <CheckAuth protecte={true} >
          <Tickets/>
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
       path = '/singup'
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
          <Admin/>
        </CheckAuth>
    }
      />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
