import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import LoginPage from './pages/Login';
import SignupPage from './pages/SignupPage';


const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:'/login',
        element:<LoginPage/>
      },
      {
        path:'/register',
        element:<SignupPage/>
      }
    ]
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <RouterProvider router={router}/>
  </StrictMode>,
)
