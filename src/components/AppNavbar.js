// Old practice of importing components
// import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';


// New practice in importing components/modules
// We destructure our components to import them separately
// import {Fragment} from 'react';
import {useContext} from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../UserContext';


export default function AppNavbar() {

	// const [user, setUser] = useState(localStorage.getItem("token"));

	const{ user } = useContext(UserContext);

	console.log(user);




	return (

		<Navbar expand="lg" className="bg-body-tertiary">
		      <Container fluid>
		        <Navbar.Brand as={Link} to="/">Zuitt</Navbar.Brand>
		        <Navbar.Toggle aria-controls="basic-navbar-nav" />
		        <Navbar.Collapse id="basic-navbar-nav">
		          <Nav className="ms-auto">
		            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
		            <Nav.Link as={NavLink} to="/courses">Courses</Nav.Link>
		            
		            {
		              (user.id !== null) ?
		              	  
		              		(user.isAdmin) ?
		              		<>
			              	<Nav.Link as={NavLink} to="/addCourse">Add Course</Nav.Link>
			              	<Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
			              	</>
			              	 
			              	:
			               	<>
			              	<Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
			              	<Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
			              	</>
			              	
			              	
		              	
		            	:
		            	<>
			            	<Nav.Link as={NavLink} to="/login">Login</Nav.Link>
			            	<Nav.Link as={NavLink} to="/register">Register</Nav.Link>
			            </>
		            }

		          </Nav>
		        </Navbar.Collapse>
		      </Container>
		    </Navbar>

	)

};