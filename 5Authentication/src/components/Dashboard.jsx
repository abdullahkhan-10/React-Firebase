import { Link, Outlet } from "react-router-dom";

function Dashboard(){
    return(
        <div className="main">
            <div className="left">
                <Link to="/">Back To Home</Link>
                <Link to="/dashboard/add-faculty">Add Faculty</Link>
                <Link to="/dashboard/faculty-list">Faculty List</Link>
            </div>
            <div className="right">
                <Outlet/>
            </div>
        </div>
    )
}

export default Dashboard;