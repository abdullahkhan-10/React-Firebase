// This file is used to update data.

import { useState } from "react";
import { getFirestore, doc, updateDoc } from "firebase/firestore"
import {app} from "../Firebase"
import {useLocation, useNavigate} from "react-router-dom"

const UpdateFaculty = () =>{
    const location = useLocation()
    // console.log(location.state);
    
    const [name, setName] = useState(location.state.facultyName)
    const [phone, setPhone] = useState(location.state.facultyPhone)
    const navigate = useNavigate()

    // To Update the data
    const submitHandler = async(event) =>{
        event.preventDefault()
        // console.log(name,phone);

        const db = getFirestore(app)
        const docRef = doc(db, 'faculty', location.state.id)

        try {
            await updateDoc(docRef, {
                facultyName: name,
                facultyPhone:phone
            })
            navigate('/faculty-list')
        } catch (error) {
         console.log(error);
            
        }
    }

    return(
        <div>
            <h1>Update Faculty</h1>
            <form onSubmit={submitHandler}>
                <input value={name} onChange={ (e) =>{setName(e.target.value)}} placeholder="Full Name" />
                <input value={phone} onChange={ (e) =>{setPhone(e.target.value)}} placeholder="Phone Number" />
                <button type="submit">Update</button>
            </form>
        </div>
    )
}

export default UpdateFaculty;