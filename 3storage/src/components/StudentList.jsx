
import{ getDatabase, ref, onValue, remove} from "firebase/database"
import {app} from "../FirebaseDetails"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// 1
import {getStorage, ref as storageRef, deleteObject} from "firebase/storage"

function StudentList(){
    const [studentData, setStudentData] = useState({})
    const navigate = useNavigate()

    useEffect( () =>{
        const db = getDatabase(app)
        const studenRef = ref(db, 'Students')

        onValue(studenRef, (studentInfo) =>{
            const data = studentInfo.val()
            // console.log(data);

            setStudentData(data)
        })
    },[])

    const deleteData = (stuId) =>{
        const db = getDatabase(app)
        const studenRef = ref(db, 'Students/'+stuId)

        // 1
        // to delete image from storage.
        const myStorage = getStorage(app)
        const myRef = storageRef(myStorage, 'images/'+stuId)
        // deleteObject() method take on argument, the reference.
        deleteObject(myRef)
        // when the image get remove succefully, then remove the other data as well.
        .then( res=>{
            remove(studenRef)
        })
        .catch(err =>{
            console.log(err);
            
        })
    }

    return(
        <div>
            <h1>Student List</h1>
            {studentData && (
                <div className="student-main">
                    {Object.entries(studentData).map( ([id, obj]) =>{
                        return(
                            <div key={id} className="student-data">
                                <h1>{obj.studentName}</h1>
                                <p>{obj.studentPhone}</p>
                                <img src={obj.studentImage} style={{width: "20%", borderRadius: "20px"}}/>

                                <button onClick={() =>{deleteData(id)}}>Delete</button>

                                <button onClick={() =>{navigate("/update-student", {state: [id, obj]})}}>Update</button>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>

    )
}

export default StudentList;