import React, { useState } from 'react';
import Swal from 'sweetalert2'

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
      	title: "Password do not match",
      	icon: "error",
      	text: "try again"
      })
      return;
    }

    try {
      const token = localStorage.getItem('token'); // Replace with your actual JWT token
      const response = await fetch(`${ process.env.REACT_APP_API_URL }/users/reset-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword: password }),
      });

      if (response.ok) {
        Swal.fire({
        	title: "Reset Password Successful",
        	icon: "success",
        	text: "You change password!"
        })
        setPassword('');
        setConfirmPassword('');
      } else {
        const errorData = await response.json();
        Swal.fire({
        	title: "Reset Password Failed",
        	icon: "error",
        	text: "resetting pasword faild"
        })
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            New Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {message && <div className="alert alert-danger">{message}</div>}
        <button type="submit" className="btn btn-primary">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
