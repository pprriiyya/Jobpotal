import React, { useState } from 'react';
import { db } from './firebase';
import { auth } from "./firebase";
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    file: null
  });
  const [emailError, setEmailError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });

    if (name === 'email') {
      const emailRegex = /\S+@\S+\.\S+/;
      setEmailError(emailRegex.test(value) ? '' : 'Please enter a valid email address.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailError) {
      alert('Form submitted!');
      console.log(formData);
    }
  };

  return (
    
    <div className="contact-us-container">
      <div className="contact-us-info">
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
            <a href="JobListings">Job Listings</a>
            <a href="Review">Reviews</a>
            <a href="/">Sign In</a>

          </ul>
        </nav>
      </header>
        <h2 className="contact-us-header">Contact Us</h2>
        <p><i>We would love to hear from you! You can reach us via the contact form below, or through any of the following ways: </i></p>
        <div className="contact-details">
          <table>
            <tr>
              <td><h3>Address:</h3></td>
              <td><p>123 Avenue Querbes, Montreal, H3N 2B2</p></td>
              <td rowSpan="3" colspan="3" className="logo-cell">
                <img src="contact-us-image.jpg" alt="Company Logo" className="logoo" width="600px" height="200px" position = "right" align = "right" />
              </td>
            </tr>
            <tr>
              <td><h3>Email:</h3></td>
              <td><p>priyageover123@gmail.com</p></td>
            </tr>
            <tr>
              <td><h3>Phone:</h3></td>
              <td><p>(123) 456-7890</p></td>
            </tr>
          </table>
          <h3>Follow Us</h3>
          <p>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> | 
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"> Twitter</a> | 
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"> Instagram</a>
          </p>
        </div>
      </div>
      
      <form className="contact-us-formm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {emailError && <p className="error-message">{emailError}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="file">Attach a file:</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-button"> Submit <br /> </button>
      </form>
      
      <div className="contact-us-map">
        <h3>Our Location</h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.1184013703746!2d-122.40163578468159!3d37.791611319758085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064ad15433b%3A0xf3c5c8a3b66b1a9e!2sSalesforce+Tower!5e0!3m2!1sen!2sus!4v1512480472311"
          width="100%"
          height="250"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen
          aria-hidden="false"
          tabIndex="0"
          title="Google Map Location"
        />
      </div>
      
      <p className="contact-us-thankyou">Thank you for reaching out to us. We value every message and strive to respond promptly. Have a great day!</p>
      
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="Home">Home</a> <br /> <hr />
            <a href="About">About Us</a><br /> <hr />
            <a href="JobseekerLogin">SignupforJobs </a> <br /> <hr />
            <a href="EmployeeLogin">SignupforEmployer</a><br /> <hr />
            <a href="ContactUs">ContactUs</a><br /><hr />
            <a href ="JobListings">JobListing</a><br /><hr />
            <a href="Review">Reviews</a><br /><hr />
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

export default ContactUs;
