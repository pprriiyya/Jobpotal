import React from "react";
import "./JobPortal.css";
import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, query, where, getDocs } from "firebase/firestore";





const JobPortal = () => {
  const [dateTime, setDateTime] = useState(new Date());
    const [searchTerm, setSearchTerm] = useState("");
    const [locations, setLocations] = useState([]);
  
    useEffect(() => {
      const timer = setInterval(() => {
        setDateTime(new Date());
      }, 1000);
      return () => clearInterval(timer);
    }, []);
  
    const handleSearch = async () => {
      if (!searchTerm) return;
      const q = query(collection(db, "locations"), where("name", "==", searchTerm));
      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map(doc => doc.data());
      setLocations(results);
    };
  return (
    <div className="job-portal">
      {/* Navigation Bar */}
      <header className="navbar">
        <div className="logo">
          <img src="logo for job portal.png" alt="Job Portal" />
          <h1>Job Portal</h1>
        </div>
        <nav>
          <ul className="nav-links">
            <a href="Home">Home</a> 
            <a href="About">About Us</a>
            <a href="JobseekerLogin">SignupforJobs </a> 
            <a href="EmployeeLogin">SignupforEmployer</a>
            <a href="ContactUs">ContactUs</a>
            <a href="/">Sign In</a>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1>"Empowering the leaders of Tomorrow"</h1>
        <p>{dateTime.toLocaleString()}</p>

       
        
      </section>

      {/* About Section */}
      <section className="about">
        <div className="about-image">
          <img src="job_search_portals.png" alt="Job Search Portals" />
        </div>
        <div className="about-text">
          <p><b>
            "Job Portal, we are dedicated to connecting top talent with exciting opportunities by providing a user-friendly platform where job seekers can<br /> easily discover relevant roles and employers can efficiently access a diverse pool of qualified candidates. Our commitment to innovation ensures we stay ahead of the curve, offering advanced search features and personalized recommendations to streamline the job
            <br /> search process. With a focus on transparency and accessibility, we strive to be the go-to destination for career exploration and meaningful employment connections. For example, Idealist is a website where you can find these kinds of jobs. It’s like a special place to find work that helps others. When the time comes to look for a job, you may need to take the initiative to ensure that you find work that meets your expectations. <br />
                                To encourage yourself to be proactive and create your own opportunities." <br /> </b>
          
          </p>
        </div>
      </section>

      {/* Job Types Section */}
      <section className="job-type-section">
        <h2>Job Type</h2>
        <label><input type="radio" name="job-type" value="freelancer" /> Freelancer</label>
        <label><input type="radio" name="job-type" value="part-time" /> Part Time</label>
        <label><input type="radio" name="job-type" value="full-time" /> Full Time</label>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
          <a href="Home">Home</a> <br /> <hr />
            <a href="About">About Us</a><br /> <hr />
            <a href="JobseekerLogin">SignupforJobs </a> <br /> <hr />
            <a href="EmployeeLogin">SignupforEmployer</a><br /> <hr />
            <a href="ContactUs">ContactUs</a><br /><hr />
            <a href="/">Sign In</a>
          </div>

          <div className="footer-quote">
            <p>
              "Your work is going to fill a large part of your life, and the only way 
              to be truly satisfied is to do what you believe is great work. 
              The only way to do great work is to love what you do. If you haven't found it yet, 
              keep looking. Don't settle."
            </p>
          </div>
        

          <div className="social-links">
            <p>SOCIAL LINKS</p>
            <a href="https://www.instagram.com/accounts/login/?hl=en" target="_blank" rel="noopener noreferrer">
              <img src="Instagram.jpg" alt="Instagram" />
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <img src="Facebook.png" alt="Facebook" />
            </a>
            <a href="https://twitter.com/?lang=en" target="_blank" rel="noopener noreferrer">
              <img src="download.png" alt="Twitter" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default JobPortal;
