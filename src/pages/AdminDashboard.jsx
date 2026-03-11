import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";

export default function AdminDashboard(){

const [banks,setBanks] = useState([]);

useEffect(()=>{

const fetchBanks = async ()=>{

const snap = await getDocs(collection(db,"blood banks"));

setBanks(
snap.docs.map(doc=>({
id:doc.id,
...doc.data()
}))
);

};

fetchBanks();

},[]);


const updatePrice = async(id,newPrice)=>{

const ref = doc(db,"blood banks",id);

await updateDoc(ref,{
price:Number(newPrice)
});

alert("Price updated");

};


return(

<div style={{padding:"40px"}}>

<h2>Admin Dashboard</h2>

{banks.map(bank=>(
<div key={bank.id} style={{
border:"1px solid #ddd",
padding:"20px",
marginBottom:"20px"
}}>

<h3>{bank.name}</h3>

<p>City: {bank.city}</p>

<p>Price: {bank.price} EGP</p>

<input
type="number"
placeholder="New Price"
onBlur={(e)=>updatePrice(bank.id,e.target.value)}
/>

</div>
))}

</div>

);

}