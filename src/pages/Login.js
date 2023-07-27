import { useState, useEffect, useContext } from 'react'
import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import { Navigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import  {FaUser}   from 'react-icons/fa';

export default function Login() {

	// Allows us to consume the User conteext object and it's properties to be used for user validation.
	const { user, setUser } = useContext(UserContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [ isActive , setIsActive ] = useState(false);

	console.log(email);
	console.log(password);


	function loginUser(e) {

			// Prevent the page redirection via form submission
			e.preventDefault();

			fetch(`${ process.env.REACT_APP_API_URL }/users/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					email: email,
					password: password
				})
			})
			.then(res => res.json())
			.then(data => {
				console.log(data);

				if(data.access) {


					localStorage.setItem("token", data.access);


					retrieveUserDetails(data.access)

					Swal.fire({
						title: "Login Successful",
						icon: "success",
						text: "Welcome to Zuitt!"
					})

				} else {

					Swal.fire({
						title: "Authentication Failed",
						icon: "error",
						text: "Check your login details and try again."
					})
				}

			})
			
			setEmail("");
			setPassword("");
		};

		const retrieveUserDetails = (token) => {

			fetch(`${ process.env.REACT_APP_API_URL }/users/details`, {
				headers:{
					Authorization: `Bearer ${token}`
				}
			})
			.then(res => res.json())
			.then(data =>{
				console.log(data)

				// Changes the global "user" state to store the "id" and the "isAdmin" property of the user which will be used for validation accross the whole application
				setUser({
					id: data._id,
					isAdmin: data.isAdmin
				})
			})
		}

		useEffect(() => {

			if(email !== "" && password !=="") {

				setIsActive(true)
			} else {

				setIsActive(false)
			}

		}, [email, password]);	


	return(

		(user.id !== null) ?
			<Navigate to="/products" />
			:
	<body id="Login-body">
		<Container className="Login-Container">
		      <Row>
		        <Col md={12}>
		          <Form onSubmit={(e) => loginUser(e)}>
		          <h1 className="login-title">Login Account</h1>
		            <h1 className="my=5 text-center">
		              <FaUser />
		            </h1>

		            <Form.Group className="mb-3" controlId="Email">
		              <Form.Label>Email Address</Form.Label>
		              <Form.Control
		                type="email"
		                placeholder="Enter email"
		                required
		                value={email}
		                onChange={(e) => {
		                  setEmail(e.target.value);
		                }}
		              />
		            </Form.Group>

		            <Form.Group className="mb-3" controlId="Password">
		              <Form.Label>Password</Form.Label>
		              <Form.Control
		                type="password"
		                placeholder="Password"
		                required
		                value={password}
		                onChange={(e) => {
		                  setPassword(e.target.value);
		                }}
		              />
		            </Form.Group>

		            {isActive ? (
		              <Button variant="success" type="submit" id="submitBtn">
		                Submit
		              </Button>
		            ) : (
		              <Button variant="danger" type="submit" id="submitBtn" disabled>
		                Submit
		              </Button>
		            )}
		            <p className="text-center pt-3">
		              Already have an account? <Link to="/register">Click here</Link> to log in.
		            </p>
		          </Form>
		        </Col>
		      </Row>
		    </Container>
	</body>
	)
}
