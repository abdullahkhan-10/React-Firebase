// This component is used to get data from firebase realtime database and display on our application, and also preform CRUD operation with that.
// Create has done in (AddStudent.jsx) file. and in this file we will do the rest three. Retrieve, update and delete.

import{ getDatabase, ref, onValue, remove} from "firebase/database"
import {app} from "../Firebase"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentList(){
    // 2
    // The hook is used to track and display the data in our application.
    const [studentData, setStudentData] = useState({})

    // 4
    // useNavigate is used to navigate to our requiredurl.
    const navigate = useNavigate()

    // 1
    // whenever this page load the code inside useEffect hook will run.
    useEffect( () =>{
        const db = getDatabase(app)

        // The ref() function take two arguments. 1 instance of database and 2 the exact same path on which we have added the data to database. and we have store it in const (studentRef).
        const studenRef = ref(db, 'Students')

        // The onValue() function also take two arguments. 1 the const on which we have stored the ref() and 2. the arrow function. 
        // In the arrow function we have access to the information we are getting from ref() function which we have stored in const (studentRef).
        onValue(studenRef, (studentInfo) =>{
            // (studentInfo.val()) make all the data available for us which is stored in our firbase database. 
            // And we have stored it const (data) to perform furthur operation.
            const data = studentInfo.val()
            // console.log(data);

            // 2
            setStudentData(data)
            // Now with the help of hook we have store the information in const (studentData), now we can display it in our application.
            // Note. the information in (data) is an object form.    
        })
    },[])

     // 3
    //  in parameter we can write for id whatever we want. 
    const deleteData = (stuId) =>{
        const db = getDatabase(app)
        const studenRef = ref(db, 'Students/'+stuId)
        // we want to remove particular id (stuId) on that particular path ('Students/') from database (db)
        // we will store the path and id in const (studentRef) and will remove it
        remove(studenRef)
    }

    return(
        <div>
            <h1>Student List</h1>
            {/* conditional rendering which mean if we have the information in const (studentData) then dislay the following div. */}
            {studentData && (
                <div className="student-main">
                    {/* we have information in object, and can't iterate/map through the object, so we need to first change the type object to array. */}
                    {/* inside map() in arrow we have to pass the argument in array form, like first, index and then element */}
                    {Object.entries(studentData).map( ([id, obj]) =>{
                        return(
                            <div key={id} className="student-data">
                                <h1>{obj.studentName}</h1>
                                <p>{obj.studentPhone}</p>

                                {/* 3 */}
                                {/* when we click on particular name, we are actually passing its id to the delete() function as an argument */}
                                {/* we are declaring delete() above and the function will accept the id as parameter. */}
                                <button onClick={() =>{deleteData(id)}}>Delete</button>

                                {/* 4 */}
                                {/* When we click on this button we will be navigate to (UpdateStudent.jsx) file, with the object and inside object we have (state) array where the data is. */}
                                {/* In navigate we will pass two arguments, the path of component where we want to send and update the data, and the exact data we want to update */}
                                <button onClick={() =>{navigate("/update-student", {state: [id, obj]})}}>Update</button>
                                {/* whatever we send from here, we will access the state through useLocation hook in component (UpdateStudent.jsx) */}
                                {/* We will have the access of object in const (location) */}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>

    )
}

export default StudentList;