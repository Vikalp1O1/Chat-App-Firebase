import './App.css'
import Login from './components/Login'
import { BrowserRouter, Routes , Route } from 'react-router-dom'
import Signup from './components/Signup'
import Home from './components/Home'
import PrivateRoutes from './HOC/PrivateRoutes'
import { Suspense } from 'react'
import PublicRoutes from './HOC/PublicRoutes'



function App() {

  return (
    
    
      <Routes>
        <Route path='/' element={ <PrivateRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          </PrivateRoutes>}>
        </Route>


        <Route path='/login' element={<PublicRoutes>
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        </PublicRoutes>} />
        <Route path='/signup' element={<PublicRoutes>
          <Suspense fallback={<div>Loading...</div>}>
            <Signup />
          </Suspense>
        </PublicRoutes>} />
      </Routes>
  )
}
export default App
