
import './App.css'

import {RouterProvider, createBrowserRouter} from "react-router-dom"
import Dashboard from './components/Dashboard'
import FacultyList from './components/FacultyList'
import AddFaculty from './components/AddFaculty'
import UpdateFaculty from './components/UpdateFaculty'

const myRouter = createBrowserRouter([
  {path: "", Component: Dashboard,children:[
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
