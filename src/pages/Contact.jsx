import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import "./Contact.css";

import { Mail, Phone, MapPin, MessageSquare, Facebook, Instagram } from "lucide-react";

function Contact(){
  const [openIndex,setOpenIndex] = useState(null)
  const faqs = [

    {
    question:"How do I search for medicines?",
    answer:"Use the medicine search feature to find pharmacies that have the medicine available."
    },
    
    {
    question:"Are all pharmacies verified?",
    answer:"Yes, pharmacies listed on 3elagy are verified to ensure trusted healthcare services."
    },
    
    {
    question:"How do I book a lab test?",
    answer:"You can book lab tests directly from the Lab Tests page and choose a nearby lab."
    },
    
    {
    question:"Is my medical data secure?",
    answer:"Yes, we use secure systems to protect your medical data and privacy."
    },
    
    {
    question:"How can I request blood?",
    answer:"You can request blood through the blood banks service available in the platform."
    },
    
    {
    question:"Is 3elagy free to use?",
    answer:"Yes, the platform is free for users to search medicines, labs and healthcare services."
    }
    
    ]
return(

<>
<Navbar/>

<div className="contact-page">

{/* HEADER */}

<div className="contact-header">

<div className="contact-icon">
<MessageSquare size={40}/>
</div>

<h1>Contact & Support</h1>
<p>We're here to help</p>

</div>


{/* CONTACT CARDS */}

<div className="contact-cards">

<div className="contact-card">

<div className="card-icon email">
<Mail size={28}/>
</div>

<h3>Email</h3>
<p>support@3elagy.com</p>

</div>


<div className="contact-card">

<div className="card-icon phone">
<Phone size={28}/>
</div>

<h3>Phone</h3>
<p>+20 2 1234 5678</p>

</div>


<div className="contact-card">

<div className="card-icon address">
<MapPin size={28}/>
</div>

<h3>Address</h3>
<p>Cairo, Egypt</p>

</div>

</div>


{/* CONTACT FORM + FAQ */}

<div className="contact-grid">


{/* CONTACT FORM */}
<div className="contact-form">

<h3>Send us a Message</h3>

<input placeholder="Your Name" />
<input placeholder="Your Email" />
<input placeholder="Subject" />

<textarea placeholder="Message"></textarea>

<button className="send-btn">
Send Message
</button>

</div>
{/* FAQ */}
<div className="faq">

<h3>Frequently Asked Questions</h3>

{faqs.map((faq,index)=>(
  
<div className={`faq-item ${openIndex === index ? "active" : ""}`} key={index}>

<div
className="faq-question"
onClick={()=> setOpenIndex(openIndex === index ? null : index)}
>

<span>{faq.question}</span>

<span className="faq-arrow">
{openIndex === index ? "⌄" : "›"}
</span>

</div>

{openIndex === index && (

<div className="faq-answer">
{faq.answer}
</div>

)}

</div>

))}

</div>

</div>


{/* SUPPORT SECTION */}

<div className="support-banner">

<MessageSquare size={40}/>

<h3>Need Immediate Assistance?</h3>

<p>
Our support team is available 24/7 to help you with any questions.
Don't hesitate to reach out.
</p>


<div className="support-buttons">

<button className="call-btn">
<Phone size={18}/> Call Now
</button>

<div className="social-icons">

<a href="https://www.facebook.com/share/1Zeza5DA3z/?mibextid=wwXIfr" target="_blank">
<Facebook size={20}/>
</a>

<a href="https://www.instagram.com/3elagy_" target="_blank">
<Instagram size={20}/>
</a>

<a href="https://www.tiktok.com/@3elagy" target="_blank">
TikTok
</a>

</div>

</div>

</div>

</div>

<Footer/>

</>

)

}

export default Contact;