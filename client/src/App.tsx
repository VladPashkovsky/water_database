import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Paths } from './routes/paths.ts'
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import Home from './pages/home/Home'
import AuthProvider from './hok/AuthProvider.tsx'
import RequireAuth from './hok/RequireAuth.tsx'
import AddWater from './pages/addWater/AddWater'
import Status from './pages/status/Status'
import WaterPage from './pages/water/WaterPage'
import WaterEdit from './pages/waterEdit/WaterEdit'


const router = createBrowserRouter([
  { path: Paths.login, element: <Login /> },
  { path: Paths.signup, element: <SignUp /> },
  { path: Paths.home, element: <RequireAuth children={<Home />} /> },
  { path: Paths.waterAdd, element: <RequireAuth children={<AddWater />} /> },
  // {path: `${Paths.status}/:status`, element: <Status /> }
  { path: `${Paths.water}/:id`, element: <RequireAuth children={<WaterPage />} /> },
  { path: `${Paths.waterEdit}/:id`, element: <RequireAuth children={<WaterEdit />} /> },
])

function App() {

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
