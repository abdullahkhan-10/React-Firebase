import { Link, Outlet, useNavigate } from "react-router-dom";
import { getAuth, signOut} from "firebase/auth"
import {app} from "../Firebase"

function Dashboard(){
    const navigate = useNavigate()

    const logOuT = ()=>{
        const outAuth = getAuth(app)
        signOut(outAuth)
        .then( (res) =>{
            console.log("user get log out");
            
            navigate('/login')
        })
    }
    
    return(
        <div className="main">
            <div className="left">
                <Link to="/">Back To Home</Link>
                <Link to="/dashboard/add-faculty">Add Faculty</Link>
                <Link to="/dashboard/faculty-list">Faculty List</Link>
                
                <button type="button" onClick={logOuT}>Logout</button>
            </div>
            <div className="right">
                <Outlet/>
            </div>
        </div>
    )
}

export default Dashboard;