
import {useContext} from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../UserContext';
import  {FaUser, FaPencilAlt    }   from 'react-icons/fa';


export default function AppNavbar() {

	const{ user } = useContext(UserContext);

	console.log(user);




	return (

		<Navbar expand="lg" className="bg-body-tertiary">
		      <Container fluid>
		        <Navbar.Brand as={Link} to="/">Marco</Navbar.Brand>
		        <Navbar.Toggle aria-controls="basic-navbar-nav" />
		        <Navbar.Collapse id="basic-navbar-nav">
		          <Nav className="ms-auto">
		            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
		            <Nav.Link as={NavLink} to="/products">Product</Nav.Link>
		            
		            {
		              (user.id !== null) ?
		              	  
		              		(user.isAdmin) ?
		              		<>
		              		<Nav.Link as={NavLink} to="/allUsers">All Users</Nav.Link>
		              		<Nav.Link as={NavLink} to="/orders">Orders</Nav.Link>
			              	<Nav.Link as={NavLink} to="/addProduct">Add Product</Nav.Link>
			              	<Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
			              	</>
			              	 
			              	:
			               	<>
			               	<Nav.Link as={NavLink} to="/cart">Cart</Nav.Link>
			               	<Nav.Link as={NavLink} to="/orders">Orders</Nav.Link>
			              	<Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
			              	<Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
			              	</>
			              	
			              	
		              	
		            	:
		            	<>
			            	<Nav.Link as={NavLink} to="/login"><FaUser/> Login</Nav.Link>
			            	<Nav.Link as={NavLink} to="/register"><FaPencilAlt  /> Register</Nav.Link>
			            </>
		            }

		          </Nav>
		        </Navbar.Collapse>
		      </Container>
		    </Navbar>

	)

};