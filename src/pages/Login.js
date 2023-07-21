import { useState, useEffect, useContext } from 'react'
import { Form, Button, Container } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

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

		fetch("http://localhost:4000/users/login", {
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

				// set the token of the authenticated user in he local storage
				// Syntax:
					// localStorage.setItem("propertyName", value)
				localStorage.setItem("token", data.access);

				// Sets the global user state to have the properties obtained frrom localStorage.
				// setUser({
				// 	access: localStorage.getItem("token")
				// })

				// We will invoke the fuction for retrieving the user details
				retrieveUserDetails(data.access)


				// alert("Thankyou for logging in!")
				Swal.fire({
					title: "Login Successful",
					icon: "success",
					text: "Welcome to Zuitt!"
				})

			} else {

				// alert("Unsuccessful Login")
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

		// The token will be sent as part of the request's header information.
		// We put "Bearer" in front of the token to follow the implementation standards for JWTs.
		fetch('http://localhost:4000/users/details', {
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
			<Navigate to="/courses" />
			:
			<Container>
				<Form onSubmit={e => loginUser(e)}>
					<h1 className="my=5 text-center">Login</h1>

				      <Form.Group className="mb-3" controlId="Email">
				        <Form.Label>Email Address</Form.Label>
				        <Form.Control 
				        	type="email" 
				        	placeholder="Enter email" 
				        	required 
				        	value={email}
				        	onChange={e => {setEmail(e.target.value)}}
				        />
				      </Form.Group>

				      <Form.Group className="mb-3" controlId="Password">
				        <Form.Label>Password</Form.Label>
				        <Form.Control 
				        type="password" 
				        placeholder="Password" 
				        required 
				        value={password}
				        onChange={e => {setPassword(e.target.value)}}
				        />
				      </Form.Group>

				      {
				      	isActive 
				      		? <Button variant="success" type="submit" id="submitBtn">Submit</Button>
				      		: <Button variant="danger" type="submit" id="submitBtn" disabled>Submit</Button>
				      }
			    </Form>
			</Container>

	)
}