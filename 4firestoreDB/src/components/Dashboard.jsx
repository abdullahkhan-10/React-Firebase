import { Link, Outlet } from "react-router-dom";

function Dashboard(){
    return(
        <div className="main">
            <div className="left">
                <Link to="add-faculty">Add Faculty</Link>
                <Link to="faculty-list">Faculty List</Link>
            </div>
            <div className="right">
                <Outlet/>
            </div>
        </div>
    )
}

export default Dashboard;