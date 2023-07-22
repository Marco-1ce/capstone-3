import { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext'

export default function ProductView() {

	// The "useParams" hook allows us to retrieve the courseId passed via the URL
	const {productId} = useParams();

	const { user } = useContext(UserContext);

	// an object with methods to redirect the user.
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);

	useEffect(()=>{
		console.log(productId)

		// a fetch request that will retrieve the details of a specific course
		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
		.then(res => res.json())
		.then(data =>{
			console.log(data);

			setName(data.name);
			setDescription(data.description);
			setPrice(data.price);
		})
	}, [productId])

	const purchase = (productId) => {
	  const quantity = 1; // Assuming the user is purchasing 1 product, you can modify this as needed.

	  fetch(`${process.env.REACT_APP_API_URL}/orders/purchase`, {
	    method: "POST",
	    headers: {
	      "Content-Type": "application/json",
	      Authorization: `Bearer ${localStorage.getItem('token')}`
	    },
	    body: JSON.stringify({ productId, quantity })
	  })
	  .then(res => res.json())
	  .then(data => {
	    console.log(data);

	    if (data) {
	      Swal.fire({
	        title: "Successfully purchased",
	        icon: "success",
	        text: "You have successfully purchased this product."
	      });

	      // Optionally, you can update the user context or handle the successful purchase in other ways.

	    } else {
	      Swal.fire({
	        title: "Something went wrong",
	        icon: "error",
	        text: "Please try again."
	      });
	    }
	  })
	  .catch(error => {
	    console.error(error);
	    Swal.fire({
	      title: "Error",
	      icon: "error",
	      text: "An error occurred while processing your request. Please try again later."
	    });
	  });
	}

	return(
		<Container className="mt-5">
			<Row>
				<Col lg={{ span: 6, offset: 3 }}>
					<Card>
						<Card.Body className="text-center">
							<Card.Title>{name}</Card.Title>
							<Card.Subtitle>Description:</Card.Subtitle>
							<Card.Text>{description}</Card.Text>
							<Card.Subtitle>Price:</Card.Subtitle>
							<Card.Text>PhP {price}</Card.Text>
							<Card.Subtitle>Class Schedule</Card.Subtitle>
							<Card.Text>8 am - 5 pm</Card.Text>
							{user.id !== null ?
								<Button variant="primary" onClick={() => purchase(productId)}>Checkout</Button>
							:
								<Button as={Link} to="/login" variant="danger">Log in to Checkout</Button>
							}
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}
