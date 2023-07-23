import {useState,useEffect, useContext} from 'react';
import {Row, Col} from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';
import ResetPassword from '../components/ResetPassword';

export default function Profile(){

    const {user} = useContext(UserContext);

    const [details,setDetails] = useState({})

    useEffect(()=>{

        fetch(`http://localhost:4000/users/details`, {
      headers: {
        Authorization: `Bearer ${ localStorage.getItem('token') }`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      // Set the user states values with the user details upon successful login.
      if (typeof data._id !== "undefined") {

        setDetails(data);

      }
        });

    },[])

  return (
        // (user.email === null) ?
        // <Navigate to="/courses" />
        // :
        (user.id === null) ?
        <Navigate to="/products" />
        :
        <>
            <Row>
              <Col className="p-5 bg-primary text-white">
                <h1 className="my-5 ">Profile</h1>
                        {/* <h2 className="mt-3">James Dela Cruz</h2> */}
                <h2 className="mt-3">{`${details.firstName} ${details.lastName}`}</h2>
                <hr />
                <h4>Contacts</h4>
                <ul>
                  <li>Email: {details.email}</li>
                  <li>Mobile No: {details.mobileNo}</li>
                  <li>Address: {details.address}</li>
                </ul>
              </Col>
            </Row>

            <Row className="pt-4 mt-4">
                <Col>
                    <ResetPassword/>
                </Col>
            </Row>
        </>

  )

}
