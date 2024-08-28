// This file is used to retrieve/fetch data from firestore database and display on our application UI.
import React, { useEffect, useState } from 'react'
import { getFirestore, getDocs, collection, doc, deleteDoc } from "firebase/firestore"
import {app} from "../Firebase"
import { useNavigate } from 'react-router-dom'

const FacultyList = () => {
    const [facultyData, setFecultyData] = useState([])
    const navigate = useNavigate()

    useEffect( () =>{
        getData()
    },[])

    // 1
    // To retrieve data
    const getData = async()=>{
        const db = getFirestore(app)
        const collectionRef = collection(db, 'faculty')
        const collectionInfo = await getDocs(collectionRef)
        // To get the information in array formate.
        const data = collectionInfo.docs.map( (Obj) =>({
            id: Obj.id,
            ...Obj.data()
        }))
        // Now const (data) is an array and we have each information store in object.
        // console.log(data);
        setFecultyData(data) 
    }

    // 2
    // To delete data.
    const deleteData = async(facultyId) =>{
        const db = getFirestore(app)
        const dataRef = doc(db, 'faculty', facultyId)
        
        // we can use try and catch with async.
        try {
            await deleteDoc(dataRef)
            // To call the function again for retrieving data after a particular data is get deleted.
            // This will instantly remove the deleted data from UI.
            getData()
        } catch (error) {
            console.log(error);
            
        }
    }

  return (
    <div className='faculty-main'>
        <h1>Faculty List</h1>
        {facultyData.map( (myObj) =>{
            return(
                <div key={myObj.id} className='faculty-data'>
                    <h2>{myObj.facultyName}</h2>
                    <p>{myObj.facultyPhone}</p>
                    
                    <button onClick={() => {deleteData(myObj.id)}}>Delete</button>

                    <button onClick={() =>{navigate('/update-faculty', {state:myObj})}}>Update</button>
                </div>
            )
        })}
    </div>
  )
}

export default FacultyList;