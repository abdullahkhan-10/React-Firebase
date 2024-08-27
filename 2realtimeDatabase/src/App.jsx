
import './App.css'
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import Dashboard from './components/Dashboard'
import AddStudent from './components/AddStudent'
import StudentList from './components/StudentList'
import UpdateStudent from './components/UpdateStudent'

const myRouter = createBrowserRouter([
  {path: "", Component: Dashboard, children:[
    {path: "", Component:StudentList}, 
    {path: "add-student", Component:AddStudent}, 
    {path: "student-list", Component:StudentList}, 
    {path: "update-student", Component:UpdateStudent} 
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
