import React from 'react';
import './JobPortal.css'; // Assuming you have a separate CSS file


const JobPortal = () => {
    return (
        <div style={{ backgroundColor: 'mediumaquamarine', textAlign: 'center' }}>
            <table border="0" width="100%" height="100%">
                <tr>
                    <td><img src="logo for job portal.png" alt="Job Portal" width="50px" height="50px" /></td>
                    <td><h1 style={{ textAlign: 'left', color: 'rgb(151, 56, 56)' }}>Job Portal</h1></td>
                    <td><h5 style={{ textAlign: 'center' }}><a href="Home">HOME</a></h5></td>
                    <td><h5 style={{ textAlign: 'center' }}><a href="About">ABOUT</a></h5></td>
                    <td><h5 style={{ textAlign: 'center' }}><a href="jobseeker">JOBS</a></h5></td>
                    <td><h5 style={{ textAlign: 'center' }}><a href="Employeer.html">Employer</a></h5></td>
                    <td><h5 style={{ textAlign: 'center' }}><a href="Signup">Sign Up</a></h5></td>
                    <td><h5 style={{ textAlign: 'center' }}><a href="/">Sign In</a></h5></td>
                </tr>
            </table>

            <header>
                <h1>"Empowering the leaders of Tomorrow"</h1>
            </header>

            <main>
                <section className="section">
                    <h2>List Locations</h2>
                    <p>Here you can list different locations for your organization or business.</p>
                </section>
                <section className="section">
                    <h2>Search Expert</h2>
                    <div className="search-container">
                        <img src="logo for job portal.png" alt="Expert" width="50px" height="50px" />
                        <input type="text" placeholder="Search Locations" />
                        <button>Search</button>
                    </div>
                </section>
                <section className="section">
                    <h2>Submit Now</h2>
                    <div className="search-container">
                        <input type="text" placeholder="Job Title" />
                        <button>Submit Now</button>
                    </div>
                </section>
                <section className="section">
                    <h2>Job Type</h2>
                    <label><input type="radio" name="job-type" value="freelancer" /> Freelancer</label>
                    <label><input type="radio" name="job-type" value="part-time" /> Part Time</label>
                    <label><input type="radio" name="job-type" value="full-time" /> Full Time</label>
                </section>
            </main>

            <footer>
                <hr />
                <table border="0" width="100%" height="100%">
                    <tr>
                        <td><h5 style={{ textAlign: 'left' }}><a href="Home">HOME</a></h5></td>
                        <td colSpan="3"><h2 style={{ textAlign: 'center' }}>JOBS</h2></td>
                        <td><h5 style={{ textAlign: 'right' }}>SOCIAL LINKS</h5></td>
                    </tr>
                    <tr>
                        <td><h5 style={{ textAlign: 'left' }}><a href="About">ABOUT</a></h5></td>
                        <td rowSpan="3">
                            <p style={{ textAlign: 'center' }}>
                                "Your work is going to fill a large part of your life, and <br />the only way to be truly satisfied is to do what you believe is great work.<br />
                                The only way to do great work is to love what you do.<br /> If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart,<br /> you'll know when you find it."
                            </p>
                        </td>
                        <td><a href="https://www.instagram.com/accounts/login/?hl=en" target="_blank" rel="noopener noreferrer"><img src="Instagram.jpg" alt="Instagram" width="50px" height="50px" /></a></td>
                        <td><a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><img src="Facebook.png" alt="Facebook" width="50px" height="50px" /></a></td>
                        <td><a href="https://twitter.com/?lang=en" target="_blank" rel="noopener noreferrer"><img src="download.png" alt="Twitter" width="50px" height="50px" /></a></td>
                    </tr>
                    <tr>
                        <td><h5 style={{ textAlign: 'left' }}><a href="Jobseeker.html">JOBS</a></h5></td>
                    </tr>
                    <tr>
                        <td><h5 style={{ textAlign: 'left' }}><a href="Employeer.html">Employer</a></h5></td>
                    </tr>
                    <tr>
                        <td><h5 style={{ textAlign: 'left' }}><a href="Signup">Sign Up</a></h5></td>
                    </tr>
                    <tr>
                        <td><h5 style={{ textAlign: 'left' }}><a href="/">Sign In</a></h5></td>
                    </tr>
                    <tr>
                        <td><img src="logo for job portal.png" alt="Job Portal" width="50px" height="50px" /></td>
                        <td><h1 style={{ textAlign: 'center', color: 'rgb(151, 56, 56)', height: '50px' }}>Job Portal</h1></td>
                    </tr>
                </table>
            </footer>
        </div>
    );
};

export default JobPortal;




