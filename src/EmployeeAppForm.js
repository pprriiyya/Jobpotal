import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import './EmployeeAppForm.css'; // Import the CSS file

function EmployeeAppForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    age: '',
    phoneNumber: '',
    gender: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    eligibility: '',
    expirationDate: '',
    employeeSignature: '',
    dateSigned: '',
    employerAcknowledgment: false,
    employerPermission: false,
    companyLogo: null,  // New field for company logo
    position: ''        // New field for position
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "employeeForms"), {
        ...formData,
        companyLogo: formData.companyLogo ? formData.companyLogo.name : null
      });
      console.log('Form data successfully submitted to Firebase! Document ID: ', docRef.id);
      alert('Form submitted successfully!');
    } catch (e) {
      console.error('Error adding document: ', e);
      alert('There was an error submitting the form.');
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Employment Eligibility Verification Form</h1>
      <form onSubmit={handleSubmit} className="employee-form">
        <div className="form-group">
          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required className="form-input" />
        </div>
        <div className="form-group">
          <input type="text" name="middleName" placeholder="Middle Name" value={formData.middleName} onChange={handleChange} className="form-input" />
        </div>
        <div className="form-group">
          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required className="form-input" />
        </div>
        <div className="form-group">
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="form-input" />
        </div>
        <div className="form-group">
          <input type="date" name="dateOfBirth" placeholder="Date of Birth" value={formData.dateOfBirth} onChange={handleChange} required className="form-input" />
        </div>
        <div className="form-group">
          <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required className="form-input" />
        </div>
        <div className="form-group">
          <input type="tel" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required className="form-input" />
        </div>
        <div className="form-group">
          <select name="gender" value={formData.gender} onChange={handleChange} required className="form-select">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <input type="text" name="address1" placeholder="Street Address" value={formData.address1} onChange={handleChange} required className="form-input" />
        </div>
        <div className="form-group">
          <input type="text" name="address2" placeholder="Street Address Line 2" value={formData.address2} onChange={handleChange} className="form-input" />
        </div>
        <div className="form-group">
          <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required className="form-input" />
        </div>
        <div className="form-group">
          <input type="text" name="state" placeholder="State/Province" value={formData.state} onChange={handleChange} required className="form-input" />
        </div>
        <div className="form-group">
          <input type="text" name="postalCode" placeholder="Postal/Zip Code" value={formData.postalCode} onChange={handleChange} required className="form-input" />
        </div>
        <div className="form-group">
          <select name="eligibility" value={formData.eligibility} onChange={handleChange} required className="form-select">
            <option value="">Select Eligibility</option>
            <option value="citizen">I am a citizen of this country</option>
            <option value="nonCitizenNational">I am a non-citizen national of the country</option>
            <option value="permanentResident">I am a lawful permanent resident</option>
            <option value="authorizedToWork">I am an alien authorized to work</option>
          </select>
        </div>
        <div className="form-group">
          <input type="date" name="expirationDate" placeholder="Expiration Date" value={formData.expirationDate} onChange={handleChange} required className="form-input" />
        </div>

        <h2 className="terms-title">Terms & Conditions: Employee</h2>
        <div className="checkbox-group">
          <label>
            <input type="checkbox" name="employeeConfirmation1" onChange={handleChange} required />
            I confirm that all the information I entered in this form is true and accurate.
          </label>
          <label>
            <input type="checkbox" name="employeeConfirmation2" onChange={handleChange} required />
            I understand that putting any false information in this form is against the law.
          </label>
          <label>
            <input type="checkbox" name="employeeConfirmation3" onChange={handleChange} required />
            I confirm that I am willing to enter my security details including Passport information.
          </label>
          <label>
            <input type="checkbox" name="employeeConfirmation4" onChange={handleChange} required />
            I understand the Terms and Conditions.
          </label>
        </div>

        <div className="form-group">
          <input type="text" name="employeeSignature" placeholder="Employee's Signature" value={formData.employeeSignature} onChange={handleChange} required className="form-input" />
        </div>
        <div className="form-group">
          <input type="date" name="dateSigned" placeholder="Date Signed" value={formData.dateSigned} onChange={handleChange} required className="form-input" />
        </div>

        <h2 className="terms-title">Acknowledgment & Confirmation: Employer</h2>
        <div className="checkbox-group">
          <label>
            <input type="checkbox" name="employerAcknowledgment" checked={formData.employerAcknowledgment} onChange={handleChange} required />
            As an employer, I carefully examined the documents submitted by the employee and I can verify that they are genuine.
          </label>
          <label>
            <input type="checkbox" name="employerPermission" checked={formData.employerPermission} onChange={handleChange} required />
            As an employer, I have the permission from the employee in receiving their information which includes sensitive data like Passport details.
          </label>
        </div>
            <p>Please upload your company logo</p>
        <div className="form-group">
          <input type="file" name="companyLogo" accept="image/*" onChange={handleChange} className="form-input" />
        </div>
        <p>Position</p>
        <div className="form-group">
          <input type="text" name="position" placeholder="Position" value={formData.position} onChange={handleChange} required className="form-input" />
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>   
  );
}

export default EmployeeAppForm;
