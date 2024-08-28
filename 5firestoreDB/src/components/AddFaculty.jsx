// This file is used to add faculty data to firestore database.

import { useState } from "react";
import { getFirestore, collection, addDoc, doc } from "firebase/firestore"
import {app} from "../Firebase"
import {useNavigate} from "react-router-dom"

const AddFaculty = () =>{
    const [name, setName] = useState("")
    const [phone, setPhone] = useState(null)
    const navigate = useNavigate()

    const submitHandler = async(event) =>{
        event.preventDefault()
        // console.log(name,phone);

        const db = getFirestore(app)
        // The addDoc() method take two arguments, 1. collection() function and 2. object through which data will be sent.
        // The collection() method also take two arguments, 1. instance of database and 2. Collection path on which the data will be store.
        const docRef = await addDoc( collection(db, 'faculty'), {
            facultyName: name,
            facultyPhone: phone,
        })
        .then(res =>{
            navigate('/faculty-list')
        })
        .catch(err =>{
            console.log(err);
        })

        // console.log(docRef, docRef.id);
        // Every time we add data to firstore database a unique id is automatically generated for it. on which the data will be store.
    }

    return(
        <div>
            <h1>Add Faculty</h1>
            <form onSubmit={submitHandler}>
                <input onChange={ (e) =>{setName(e.target.value)}} placeholder="Full Name" />
                <input onChange={ (e) =>{setPhone(e.target.value)}} placeholder="Phone Number" />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddFaculty;