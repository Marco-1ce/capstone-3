import {useState,useEffect, useContext} from 'react';
import {Row, Col, Container, Card, ListGroup} from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';
import ResetPassword from '../components/ResetPassword';
import EditProfile from '../components/EditProfile';


export default function Profile(){

    const {user} = useContext(UserContext);

    const [details,setDetails] = useState({})

    useEffect(()=>{

        fetch(`${ process.env.REACT_APP_API_URL }/users/details`, {
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
        <section className="profile-bg">
                <Row>
                  <Col className="p-5 text-white">
                    <h1 className="my-5 text-center">Profile</h1>
                    <Card className="profile-card">
                      <Card.Img
                        variant="top"
                        src="https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg"
                      />
                      <Card.Body>
                        <Card.Title>{`${details.firstName} ${details.lastName}`}</Card.Title>
                        <Card.Text>
                          Some quick example text to build on the card title and make up the bulk of
                          the card's content.
                        </Card.Text>
                      </Card.Body>
                      <ListGroup className="list-group-flush">
                        <ListGroup.Item>Email: {details.email}</ListGroup.Item>
                        <ListGroup.Item>Mobile No: {details.mobileNo}</ListGroup.Item>
                        <ListGroup.Item>Address: {details.address}</ListGroup.Item>
                      </ListGroup>
                      <Card.Body>
                        <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
        </section>

        <section>
            <Container className="profile-reset-password">
              <Row className="pt-4 mt-4">
                  <Col lg={12}>
                      <ResetPassword/>
                  </Col>
              </Row>
            </Container>
        </section>
        <section>
            <Container className="profile-edit-details">
              <Row className="pt-4 mt-4">
                  <Col lg={12}>
                      <EditProfile/>
                  </Col>
              </Row>
            </Container>
        </section>
        </>

  )

}
