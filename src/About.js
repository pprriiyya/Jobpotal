import React from 'react';
import './JobPortal.css';  // Create a separate CSS file or add styles inline.

const JobPortal = () => {
    return (
        <div style={{ backgroundColor: 'mediumaquamarine', textAlign: 'center' }}>
            <table border="0" width="100%" height="100%">
                <tbody>
                    <tr>
                        <td>
                            <img src="logo for job portal.png" alt="Job Portal" width="50" height="50" />
                        </td>
                        <td>
                            <h1 style={{ color: 'rgb(151, 56, 56)' }}>Job Portal</h1>
                        </td>
                        <td className="header-links">
                            <h5><a href="Home">HOME</a></h5>
                        </td>
                        <td className="header-links">
                            <h5><a href="About">ABOUT</a></h5>
                        </td>
                        <td className="header-links">
                            <h5><a href="jobseeker">JOBS</a></h5>
                        </td>
                        <td className="header-links">
                            <h5><a href="Employeer.html">Employeer</a></h5>
                        </td>
                        <td className="header-links">
                            <h5><a href="Signup">Sign Up</a></h5>
                        </td>
                        <td className="header-links">
                            <h5><a href="/">Sign In</a></h5>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="8"><hr /></td>
                    </tr>
                </tbody>
            </table>

            <table>
                <tbody>
                    <tr>
                        <td>
                            <img src="job_search_portals.png" alt="Job Search Portals" style={{ height: '80%', width: '80%' }} />
                        </td>
                        <td>
                            <p>
                                "At Job Portal, we are dedicated to connecting top talent with exciting opportunities by providing a user-friendly platform where job seekers can easily discover relevant roles and employers can efficiently access a diverse pool of qualified candidates. Our commitment to innovation ensures we stay ahead of the curve, offering advanced search features and personalized recommendations to streamline the job search process. With a focus on transparency and accessibility, we strive to be the go-to destination for career exploration and meaningful employment connections."
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>
                                Nonprofit job portals are websites where people can find jobs to work for organizations that want to do good things for the community, environment, or society. These websites list job openings like helping with programs, fundraising, and community projects. If you care about making a positive difference, these websites can help you find jobs that match your interests.
                                For example, Idealist is a website where you can find these kinds of jobs. It’s like a special place to find work that helps others. When the time comes to look for a job, you may need to take the initiative to ensure that you find work that meets your expectations. You can achieve this by creating your own opportunities instead of waiting for things to happen. For example, you can reach out to your existing network for leads or attend networking events to establish more connections. You can use the following quotes to encourage yourself to be proactive and create your own opportunities.
                            </p>
                        </td>
                        <td>
                            <img src="What-Next_.png" alt="What Next" style={{ height: '50%', width: '50%' }} />
                        </td>
                    </tr>
                </tbody>
            </table>

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
