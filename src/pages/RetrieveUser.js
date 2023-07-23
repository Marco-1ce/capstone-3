import { useEffect, useState, useContext } from 'react';
import UserContext from '../UserContext';
import { Navigate } from 'react-router-dom';
import RetrieveUserData from '../components/RetrieveUserData';

export default function Users() {
  const { user } = useContext(UserContext);

  // State that will be used to store users retrieved from the database.
  const [users, setUsers] = useState([]);

  // Create a function to fetch all users
  const fetchData = () => {
    fetch("http://localhost:4000/users/getallusers")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        // Sets the "users" state to map the data retrieved from the fetch request into UserView component.
        setUsers(data);
      });
  };

  // Retrieves the users from the database upon initial render of the "Users" component
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {user.isAdmin ? (
        // If the user is an admin, show the Admin Dashboard (UserView component).
        <RetrieveUserData usersData={users} fetchData={fetchData} />
      ) : (
        // If the user is not an admin, redirect to the Regular Products Page.
        <Navigate to="/products" />
      )}
    </>
  );
}
