// This component is ued To add data to firebase storage.

import { getDatabase, set, ref } from "firebase/database";
import { useState } from "react";
import {app} from "../FirebaseDetails"
import { useNavigate } from "react-router-dom";

import {getStorage, ref as employeeRef, uploadBytes, getDownloadURL} from "firebase/storage"

function AddStudent() {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState(null)
    const [admNo, setAdmNo] = useState(null)
    const navigate = useNavigate()

    // 1
    const[selectFile, setSelectFile] = useState(null)


    // 1
    const handleFileChange = (e) =>{
      // console.log(e.target);
      const file = e.target.files[0]
      setSelectFile(file)
    }

    // we will make this function await, because we are sending data to backend.
    const submitHandler = async(e) =>{
      e.preventDefault()

      // if file is selected in input field mean true, run this code, and update both the content and image. 
      // if the file is not selected in input field mean false, run code inside else statement, and update only content.
      if (selectFile) {
         // 1
        // To upload the file to storage.
        const myStorage = getStorage(app)
        const myRef = employeeRef(myStorage, 'images/' +admNo)

        // UploadBytes method take two arguments, reference from ref() method and and the file we have stored in the state.
        await uploadBytes(myRef, selectFile)

        // To send the image url to realtime database as well. and the getDownloadURL() method take one argument, the reference.
        const imageUrl = await getDownloadURL(myRef)

        const db = getDatabase(app)
        set(ref(db, 'Students/' +admNo), {
            studentName: name,
            studentPhone: phone,
            // to send the image url to real time database
            studentImage: imageUrl
        })
        .then(res=>{            
            navigate('/student-list')
        })
        .catch(err=>{
            console.log(err);
        })
      }else{
        const db = getDatabase(app)
        set(ref(db, 'Students/' +admNo), {
            studentName: name,
            studentPhone: phone,
        })
        .then(res=>{            
            navigate('/student-list')
        })
        .catch(err=>{
            console.log(err);
        })
      }
    }

  return (
    <>
      <form onSubmit={submitHandler}>
        <input type="text" placeholder="Student Name" onChange={(e) =>setName(e.target.value)}/>
        <input type="number" placeholder="Phone No" onChange={(e) =>setPhone(e.target.value)}/>
        <input type="number" placeholder="Admission No" onChange={(e) =>setAdmNo(e.target.value)}/>
        {/* 1 */}
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default AddStudent;
