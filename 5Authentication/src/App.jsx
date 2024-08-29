
import './App.css'

import {RouterProvider, createBrowserRouter} from "react-router-dom"
import Dashboard from './components/Dashboard'
import FacultyList from './components/FacultyList'
import AddFaculty from './components/AddFaculty'
import UpdateFaculty from './components/UpdateFaculty'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Home from './components/Home'

const myRouter = createBrowserRouter([
  {path: '', Component: Home, children:[
    {path: "sign-up", Component: SignUp},
    {path: "login", Component: Login},
  ]},
  
  // nested routes in dashboard
  {path: "dashboard", Component: Dashboard,children:[
    {path: "", Component:FacultyList},
    {path: "add-faculty", Component:AddFaculty},
    {path: "faculty-list", Component: FacultyList},
    {path: "update-faculty",Component: UpdateFaculty}
  ]}
])

function App() {

  return (
    <>
      <RouterProvider router={myRouter}/>
    </>
  )
}

export default App
