// This component is ued To update the data in database from application UI..

import { getDatabase, set, ref, update } from "firebase/database";
import { useState } from "react";
import { app } from "../Firebase";
import { useLocation, useNavigate } from "react-router-dom";

function UpdateStudent() {
  const navigate = useNavigate();

  // The useLocation Hook is used to get the data which is send naviget method along the url of the component.
  // In the (stuentList.jsx) file we have mention the url of this component in navigate method, so That's why we are getting the data here.
  const location = useLocation();
  // console.log(location);

  // To set the data of particular student on which update button we have clicked in inside every inputfield.
  // In const (location) we hold the object that we have recieved from (studentList.jsx) and state we hold the array which consist of data.
  const [name, setName] = useState(location.state[1].studentName);
  const [phone, setPhone] = useState(location.state[1].studentPhone);
  const [admNo, setAdmNo] = useState(location.state[0]);


  const submitHandler = (e) => {
    e.preventDefault();

    const db = getDatabase(app);
    
    // logic for updating data
    const studentRef = ref(db, 'Students/' +admNo)
    // it also take two arguments.
    // In const (studentRef) we have access to the database, path and id.
    // In update() we pass that access and telling to update data related to these information, mean path and id. 
    update(studentRef, {
      studentName: name,
      studentPhone: phone
    })                           // we can use then() and catch() with update() method. 
    .then( res =>{
      navigate("/student-list")
    })
    .catch( err=>{
      console.log(err);
      
    })
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
        <button type="submit">Update</button>
      </form>
    </>
  );
}

export default UpdateStudent;
