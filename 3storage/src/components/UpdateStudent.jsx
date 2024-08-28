
import { getDatabase, set, ref, update } from "firebase/database";
import { useState } from "react";
import { app } from "../FirebaseDetails";
import { useLocation, useNavigate } from "react-router-dom";

// 1
import {getStorage, ref as employeeRef, uploadBytes, getDownloadURL} from "firebase/storage"


function UpdateStudent() {
  const navigate = useNavigate();

  const location = useLocation();
  // console.log(location);

  const [name, setName] = useState(location.state[1].studentName);
  const [phone, setPhone] = useState(location.state[1].studentPhone);
  const [admNo, setAdmNo] = useState(location.state[0]);

  // 1
  // To access the file.
  const[selectFile, setSelectFile] = useState(null)

  const handleFileChange = (e) =>{
    // console.log(e.target);
    const file = e.target.files[0]
    setSelectFile(file)
  }


  const submitHandler = async(e) => {
    e.preventDefault();

    // if file is selected in input field mean true, run this code, and update both the content and image. 
    // if the file is not selected in input field mean false, run code inside else statement, and update only content.
    if (selectFile) {
      // for content updating
    const db = getDatabase(app);
    const studentRef = ref(db, 'Students/' +admNo )
    
    // for file updating
    const myStorage = getStorage(app)
    const myRef = employeeRef(myStorage, 'images/' +admNo)
    await uploadBytes(myRef, selectFile)
    const imageUrl = await getDownloadURL(myRef)
    
    // logic for updating data
    update(studentRef, {
      studentName: name,
      studentPhone: phone,
      studentImage: imageUrl
    })                           
    .then( res =>{
      navigate("/student-list")
    })
    .catch( err=>{
      console.log(err);
      
    })
    }else{
      // for content updating
    const db = getDatabase(app);
    const studentRef = ref(db, 'Students/' +admNo )
    
    // logic for updating data
    update(studentRef, {
      studentName: name,
      studentPhone: phone,
    })                           
    .then( res =>{
      navigate("/student-list")
    })
    .catch( err=>{
      console.log(err);
      
    })
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Student Name"
          onChange={(e) => setName(e.target.value)}
          // to display value in field
          value={name}
        />
        <input
          type="number"
          placeholder="Phone No"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
        />
        <input
          type="number"
          placeholder="Admission No"
          onChange={(e) => setAdmNo(e.target.value)}
          value={admNo}
          // To make the id field unchangeable.
          disabled
        />
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Update</button>
      </form>
    </>
  );
}

export default UpdateStudent;
