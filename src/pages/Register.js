import { useState, useEffect, useContext } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';


export default function Register() {

	const { user } = useContext(UserContext);

	// State hooks to store the values of the register form input fields.
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	// State to determine whether the submit button is enabled or not.
	const [ isActive, setIsActive ] = useState(false);

	// check if the values are successfully binded
	console.log(firstName);
	console.log(lastName);
	console.log(email);
	console.log(password);
	console.log(confirmPassword);


	function registerUser(e) {

		// Prevents the page redirection via form submission
		e.preventDefault();

		fetch("http://localhost:4000/users/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json" 
			},
			body: JSON.stringify({
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: password
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			if(data) {

				setFirstName("");
				setLastName("");
				setEmail("");
				setPassword("");
				setConfirmPassword("");

				Swal.fire({
					title: "Successfully Registered",
					icon: "success",
					text: "You have Successfully Register."
				})

			} else {

				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					text: "Please try again."
				})
				
			}
		})

	}




	/*
		This side effect is to validate the states whether each state is empty or string or not, if password is correct and if mobileNo has 11 digits.
	*/
	useEffect(() => {

		if((firstName !== "" && lastName !== "" && email !== "" && password !== "" && confirmPassword !== "") && (password === confirmPassword) ) {

			setIsActive(true)
		} else {

			setIsActive(false)
		}

	}, [firstName, lastName, email, password, confirmPassword])



	return (

		(user.id !== null) ?
			<Navigate to="/courses" />
			:
		<Container>
			<Form onSubmit={e => registerUser(e)}>
			<h1 className="my=5 text-center">Register</h1>

				<Form.Group className="mb-3" controlId="First Name">
				  <Form.Label>First Name</Form.Label>
				  <Form.Control 
				  type="text" 
				  placeholder="Enter First Name" 
				  required 
				  value={firstName}
				  onChange={e => {setFirstName(e.target.value)}}
				  />
				</Form.Group>

				<Form.Group className="mb-3" controlId="Last Name">
				  <Form.Label>Last Name</Form.Label>
				  <Form.Control 
				  type="text" 
				  placeholder="Enter Last Name" 
				  required
				  value={lastName}
				  onChange={e => {setLastName(e.target.value)}}
				  />
				</Form.Group>

			    <Form.Group className="mb-3" controlId="Email address">
			        <Form.Label>Email address</Form.Label>
			        <Form.Control 
			        type="email" 
			        placeholder="name@example.com" 
			        required
			        value={email}
				  	onChange={e => {setEmail(e.target.value)}}
			        />
			     </Form.Group>

				<Form.Group className="mb-3" controlId="Password1">
				  <Form.Label>Password</Form.Label>
				  <Form.Control 
				  type="password" 
				  placeholder="Enter Password" 
				  required 
				  value={password}
				  onChange={e => {setPassword(e.target.value)}}
				  />
				</Form.Group>

				<Form.Group className="mb-3" controlId="Password2">
				  <Form.Label>Confirm Password</Form.Label>
				  <Form.Control 
				  type="password" 
				  placeholder="Confirm Password" 
				  required 
				  value={confirmPassword}
				  onChange={e => {setConfirmPassword(e.target.value)}}
				  />
				</Form.Group>
			
				{
				  isActive
				 		? <Button variant="primary" type="submit" id="submitBtn">Submit</Button>
				 		: <Button variant="danger" type="submit" id="submitBtn" disabled>Submit</Button>
				}

			    </Form>
			</Container>
		

	)

};