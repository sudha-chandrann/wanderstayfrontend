
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBarcomponents/NavBar'

function App() {


  return (
   <div className='bg-background'>
    <NavBar/>
     <Outlet/>
   </div>
  )
}

export default App
