import React, { useState } from 'react';
import Swal from 'sweetalert2'

export default function UpdateProfile(){
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  
  
  const handleUpdateProfile = async () => {
    setMessage('');

    const profileData = {
      firstName,
      lastName,
      email,
      mobileNo,
      address

    };

    try {
      const token = localStorage.getItem('token'); 
      const response = await fetch(`${ process.env.REACT_APP_API_URL }/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData)
      });

      if (response.ok) {
        Swal.fire({
          title: "Profile Edited",
          icon: "success",
          text: "Profile Successfuly Edited"
        })
        setFirstName('');
        setLastName('');
        setEmail('');
        setMobileNo('');
        setAddress('');
      } else {
        const errorData = await response.json();
        Swal.fire({
        title: "Profile Edit Failed",
        icon: "error",
        text: "try again"
      })
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Update Profile</h2>
      {message && <div className="alert alert-danger">{message}</div>}
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          className="form-control"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="mobileNo">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="mobileNo">Mobile Number</label>
        <input
          type="tel"
          className="form-control"
          id="mobileNo"
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="mobileNo">Address</label>
        <input
          type="text"
          className="form-control"
          id="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary" onClick={handleUpdateProfile}>
        Update Profile
      </button>
    </div>
  );
};