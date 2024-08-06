import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Homepage'
import Review from './pages/Reviews'
import Hospitals from './pages/Hospitals'
import Services from './pages/Services'
import Doctors from './pages/Doctors'
import SignUp from './pages/SignUp'

function App() {
  return (
   <Router>
      <Routes>
        <Route index element={ <Home/> } />
        <Route path='/home' element={ <Home/> } /> 
        <Route path='/review' element={ <Review/> } />
        <Route path='/hospitals' element={ <Hospitals/> } />
        <Route path='/services' element={ <Services/> } />
        <Route path='/doctors' element={ <Doctors/> } />
        <Route path='/sign_up' element={ <SignUp/> } />
      </Routes>
   </Router>
  )
}

export default App
