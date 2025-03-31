import React, { useState, useEffect } from "react";
import { ref, push, onValue } from "firebase/database";
import { realtimeDB } from "./firebase"; // Make sure you're exporting realtimeDB from your firebase.js
import "./Review.css";

function Review() {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [notification, setNotification] = useState("");

  // Fetch reviews from Firebase Realtime Database
  useEffect(() => {
    const reviewsRef = ref(realtimeDB, "reviews");
    onValue(reviewsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const reviewsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setReviews(reviewsArray);
      }
    });
  }, []);

  // Handle review submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setNotification("Please write a review before submitting.");
      return;
    }

    const newReview = {
      rating,
      comment,
      timestamp: Date.now(),
    };

    push(ref(realtimeDB, "reviews"), newReview)
      .then(() => {
        setNotification("Review submitted successfully!");
        setComment("");
        setRating(5);
      })
      .catch((error) => {
        setNotification("Error submitting review: " + error.message);
      });
  };

  return (
    
    <div className="review-container">
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
        
        
      <h2>Leave a Review</h2>
      {notification && <p className="notification">{notification}</p>}

      <form onSubmit={handleSubmit} className="review-form">
        <label>Rating:</label>
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} Stars
            </option>
          ))}
        </select>

        <label>Comment:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review here..."
          required
        ></textarea>

        <button type="submit">Submit Review</button>
      </form>

      <h2>Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <div className="reviews-list">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <p>⭐ {review.rating} Stars</p>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      )}

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="Home">Home</a> <br /> <hr />
            <a href="About">About Us</a><br /> <hr />
            <a href="JobseekerLogin">Signup for Jobs </a> <br /> <hr />
            <a href="EmployeeLogin">Signup for Employer</a><br /> <hr />
            <a href="ContactUs">Contact Us</a><br /><hr />
            <a href="JobListings">Job Listings</a><br /> <hr />
            <a href="Review">Reviews</a><br /> <hr />
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
}

export default Review;
