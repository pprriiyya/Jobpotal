import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./JobPortal.css";




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
      <nav className="navbar">
        <div className="logo">
          <img src="logo for job portal.png" alt="Job Portal" />
          <h1>Job Portal</h1>
        </div>
        <ul className="nav-links">
      
          <li><a href="Home">Home</a></li>
          <li><a href="About">About Us</a></li>
          <li><a href="JobSeekerLogin"> Signup for Jobs</a></li>
          <li><a href="EmployeeLogin"> Sign up for Employer</a></li>
          <li><a href="ContactUs">Contact Us</a></li>
          <li> <a href = "JobListings">Job Listings</a></li>
          <li><a href="/">Sign In</a></li>
         
        </ul>
      </nav>

      {/* Hero Section */}
      <header className="Mission">
        <p>"Empowering the leaders of Tomorrow"</p>  
        <p>{dateTime.toLocaleString()}</p>
      </header>

      {/* Main Content */}
      <main>
        <section className="section">
          <h2>List Locations</h2>
          <p>Here you can list different locations for your organization or business.</p>
        </section>

        <section className="section search-section">
          <h2>Search Expert</h2>
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search Locations" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <button onClick={handleSearch}>Search</button>
          </div>
          <ul>
            {locations.map((location, index) => (
              <li key={index}>{location.name}</li>
            ))}
          </ul>
        </section>

        <section className="section submit-section">
          <h2>Submit Now</h2>
          <div className="search-container">
            <input type="text" placeholder="Job Title" />
            <button>Submit Now</button>
          </div>
        </section>

        <section className="section job-type-section">
          <h2>Job Type</h2>
          <label><input type="radio" name="job-type" value="freelancer" /> Freelancer</label>
          <label><input type="radio" name="job-type" value="part-time" /> Part Time</label>
          <label><input type="radio" name="job-type" value="full-time" /> Full Time</label>
        </section>
      </main>

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