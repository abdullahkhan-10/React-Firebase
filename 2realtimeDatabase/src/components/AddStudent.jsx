// This component is ued To add data to firebase realtime database.

import { getDatabase, set, ref } from "firebase/database";
import { useState } from "react";
import {app} from "../Firebase"
import { useNavigate } from "react-router-dom";

function AddStudent() {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState(null)
    const [admNo, setAdmNo] = useState(null)
    const navigate = useNavigate()

    const submitHandler = (e) =>{
        // To prevent the default behavour of the event coming from form, which refresh the url.
        e.preventDefault()
        // console.log(name, phone, admNo);

        // now we have to send data to firebase database.
        const db = getDatabase(app)
        set(ref(db, 'Students/' +admNo), {
            studentName: name,
            studentPhone: phone
        })
        //  we can use then() and catch() width set() method.
        // when data is send successfuly, navigate to the student list page again.
        .then(res=>{            
            navigate('/student-list')
        })
        .catch(err=>{
            console.log(err);
        })
    }

  return (
    <>
      <form onSubmit={submitHandler}>
        <input type="text" placeholder="Student Name" onChange={(e) =>setName(e.target.value)}/>
        <input type="number" placeholder="Phone No" onChange={(e) =>setPhone(e.target.value)}/>
        <input type="number" placeholder="Admission No" onChange={(e) =>setAdmNo(e.target.value)}/>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default AddStudent;
