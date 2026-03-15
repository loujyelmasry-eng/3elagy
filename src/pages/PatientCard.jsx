import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";

function PatientCard(){

const { uid } = useParams();
const [patient,setPatient] = useState(null);

useEffect(()=>{

const loadPatient = async()=>{

const ref = doc(db,"users",uid);
const snap = await getDoc(ref);

if(snap.exists()){
setPatient(snap.data());
}

};

loadPatient();

},[uid]);

if(!patient){
return <p>Loading patient...</p>
}

return(

<div style={{padding:"40px",fontFamily:"system-ui"}}>

<h2>3elagy Patient Card</h2>

<p><strong>Name:</strong> {patient.name}</p>

<p><strong>Blood Type:</strong> {patient.bloodType}</p>

<p><strong>Age:</strong> {patient.age}</p>

<p><strong>Phone:</strong> {patient.phone}</p>

</div>

);

}

export default PatientCard;