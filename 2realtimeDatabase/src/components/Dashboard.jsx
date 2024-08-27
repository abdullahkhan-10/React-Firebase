import { Link, Outlet } from "react-router-dom";

function Dashboard(){
    return(
        <div className="main">
            <div className="left">
                <Link to="add-student">Add Student</Link>
                <Link to="student-list">Student List</Link>
            </div>
            <div className="right">
                <Outlet/>
            </div>
        </div>
    )
}

export default Dashboard;