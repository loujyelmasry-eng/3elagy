import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./LabTests.css";
import { TestTube, Home, Clock, FileText, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const popularTests = [
{
name:"Complete Blood Count (CBC)",
description:"Comprehensive blood analysis including red and white blood cells",
price:150,
time:"24 hours",
includes:["Hemoglobin","White Blood Cells","Platelets","Red Blood Cells"]
},
{
name:"Lipid Profile",
description:"Cholesterol and triglycerides analysis",
price:200,
time:"24 hours",
includes:["Total Cholesterol","HDL","LDL","Triglycerides"]
},
{
name:"Liver Function Test",
description:"Comprehensive liver enzymes and function",
price:250,
time:"48 hours",
includes:["ALT","AST","Bilirubin","Albumin"]
},
{
name:"Thyroid Profile",
description:"TSH, T3, and T4 hormone levels",
price:300,
time:"48 hours",
includes:["TSH","Free T3","Free T4","Antibodies"]
},
{
name:"Diabetes Panel",
description:"Blood sugar and HbA1c testing",
price:220,
time:"24 hours",
includes:["Fasting Glucose","HbA1c","Random Glucose"]
}
];

const allTests = [
  {
  name:"Kidney Function Test",
  description:"Creatinine, urea, and kidney health markers",
  price:180,
  time:"24 hours",
  includes:["Creatinine","Urea","Electrolytes"]
  },
  {
  name:"Vitamin D",
  description:"25-Hydroxy Vitamin D blood test",
  price:280,
  time:"48 hours",
  includes:["Vitamin D Level","Calcium","Bone Health"]
  },
  {
  name:"COVID-19 PCR",
  description:"RT-PCR test for COVID-19 detection",
  price:350,
  time:"12 hours",
  includes:["PCR Detection","Virus Screening"]
  }
  ];

function LabTests(){
  const navigate = useNavigate();
return(

<>
<Navbar/>

<div className="lab-container">
<div className="lab-header">

<div className="lab-icon">
🧪
</div>

<h1>Lab Tests & Booking</h1>
<p>Book tests and get results online</p>

</div>

<div className="features-grid">

<div className="feature-card">
<div className="feature-icon">🏠</div>
<h3>Home Collection</h3>
<p>Sample collection at your doorstep</p>
</div>

<div className="feature-card">
<div className="feature-icon">⏱</div>
<h3>Fast Results</h3>
<p>Get results within 24-48 hours</p>
</div>

<div className="feature-card">
<div className="feature-icon">📄</div>
<h3>Digital Reports</h3>
<p>Access reports online anytime</p>
</div>

</div>
<h2 className="popular-title">Popular Lab Tests</h2>

<div className="tests-grid">

{popularTests.map((test,index)=>(

<div className="test-card popular" key={index}>

<div className="popular-tag">Popular</div>

<h3>{test.name}</h3>

<p>{test.description}</p>

<h4>Includes:</h4>

<ul>

{test.includes.map((item,i)=>(
<li key={i}>
<Check size={16}/> {item}
</li>
))}

</ul>

<div className="card-bottom">

<div className="price-time">

<p className="price">
<span>From</span> <strong>{test.price} EGP</strong>
</p>

<p className="time">
<Clock size={16}/> {test.time}
</p>

</div>

<button
className="book-btn"
onClick={() => navigate(`/lab-booking?test=${test.name}`)}
>
Book Now
</button>

</div>

</div>

))}

</div>

<h2 className="section-title">All Lab Tests</h2>

<div className="tests-grid">

{allTests.map((test,index)=>(

<div className="test-card popular" key={index}>

<div className="popular-badge">Popular</div>

<h3>{test.name}</h3>

<p className="desc">{test.description}</p>

<p className="includes-title">Includes:</p>

<ul className="includes-list">

{test.includes.map((item,i)=>(
<li key={i}>✓ {item}</li>
))}

</ul>

<div className="price-row">

<div>
<p className="from">From</p>
<p className="price">{test.price} EGP</p>
</div>

<div className="time">🕒 {test.time}</div>

</div>

<button
className="book-btn"
onClick={()=>navigate(`/lab-booking?test=${test.name}`)}
>
Book Now
</button>

</div>

))}

</div>

</div>

<Footer/>

</>

);

}

export default LabTests;