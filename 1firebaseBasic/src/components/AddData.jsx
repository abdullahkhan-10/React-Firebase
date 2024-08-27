// we do this to check if our app is connected with firebase.
import{getDatabase, set, ref} from "firebase/database"
import {app} from "../Firebase"

function AddData(){

    // decalare a function.
    // we accept those arguments here as aparameter when click on button.
    function addDemoData(userId, name, phone){     
        // console.log(userId, name, phone);

        // create instance of database.
        const db = getDatabase(app)
        
        // then we will use the (set()) function to put data to database in firebase
        // The set() function take two arguments. 1. ref() function and 2. an object on which we will send data.
        // The ref() function also take two arguments. 1. instance of database, path and id.  
        set(ref(db,'Employees/'+userId),{
            studentName: name,
            studentPhone: phone,
        })
    }

    return(
        <div>
            <h1>Firebase test</h1>

            <button onClick={ ()=>{addDemoData(101, "khan", 3014504579)}}>add demo data</button>
        </div>
    )
}

export default AddData;