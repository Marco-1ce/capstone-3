import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Col, Row, Container } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function UserData({ usersData, fetchData }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Set the initial state when the prop 'usersData' changes
    setUsers(usersData);
  }, [usersData]);

  const updateUserToAdmin = async (userId) => {
    try {
      const response = await fetch(`http://localhost:4000/users/updateAdmin/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      });

      const data = await response.json();
      if (data) {
        Swal.fire({
          title: 'Success!',
          icon: 'success',
          text: 'Admin Privileges Successfully Updated'
        });
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeUserFromAdmin = async (userId) => {
    try {
      const response = await fetch(`http://localhost:4000/users/removeAdmin/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      });

      const data = await response.json();
      if (data) {
        Swal.fire({
          title: 'Success!',
          icon: 'success',
          text: 'Admin Privileges Successfully Removed'
        });
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h1 className="text-center my-4">Admin Dashboard</h1>
      <Row>
        <Col>
          <Table striped bordered hover responsive>
            <thead>
              <tr className="text-center">
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Mobile No</th>
                <th>Address</th>
                <th>Is Admin</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.mobileNo}</td>
                  <td>{user.address}</td>
                  <td className={user.isAdmin ? 'text-success' : 'text-danger'}>
                    {user.isAdmin ? 'Yes' : 'No'}
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => removeUserFromAdmin(user._id)}
                      >
                        Remove Admin
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => updateUserToAdmin(user._id)}
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
