import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, Navigate } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';


export default function AddProduct() {
	const { user } = useContext(UserContext);

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [isActive, setIsActive] = useState(false);


	const navigate = useNavigate();

	useEffect(() => {
	  if (name !== '' && description !== '' && price !== '') {
	    setIsActive(true);
	  } else {
	    setIsActive(false);
	  }
	}, [name, description, price]);

	function registerproduct(e) {
	  e.preventDefault();

	  if (!user.isAdmin) {
	    Swal.fire({
	    	title: "Unathorized User",
	    	icon: "error",
	    	text: "Please try again."
	    });
	    return;
	  }

	  fetch(`${process.env.REACT_APP_API_URL}/products`, {
	    method: 'POST',
	    headers: {
	      'Content-Type': 'application/json',
	      Authorization: `Bearer ${localStorage.getItem('token')}`,
	    },
	    body: JSON.stringify({
	      name: name,
	      description: description,
	      price: price,
	    }),
	  })
	    .then((res) => res.json())
	    .then((data) => {
	      
	      console.log(data);

	      if(data){
	      	Swal.fire({
	      		title: "Successfully Added Course",
	      		icon: "success",
	      		text: "You have Successfully Added course."
	      	})

	      	// Allow us to navigate the user back to the course page programmaticlly insted of using component.
	      	navigate("/products")

	      } else {
	      	Swal.fire({
	      		title: "Something went wrong",
	      		icon: "error",
	      		text: "Please try again."
	      	})
	      }
	    })

	}

	return(

		(!user.isAdmin) ?
		  <Navigate to="/products" />
		  :
		  <Form onSubmit={registerproduct}>
		    <h1>Add Product</h1>
		    <Form.Group>
		      <Form.Label>Name</Form.Label>
		      <Form.Control
		        type="text"
		        placeholder="Enter Name"
		        required
		        value={name}
		        onChange={(e) => setName(e.target.value)}
		      />
		    </Form.Group>

		    <Form.Group>
		      <Form.Label>Description</Form.Label>
		      <Form.Control
		        type="text"
		        placeholder="Enter Description"
		        required
		        value={description}
		        onChange={(e) => setDescription(e.target.value)}
		      />
		    </Form.Group>

		    <Form.Group>
		      <Form.Label>Price</Form.Label>
		      <Form.Control
		        type="text"
		        placeholder="Enter Price"
		        required
		        value={price}
		        onChange={(e) => setPrice(e.target.value)}
		      />
		    </Form.Group>

		    {isActive ? (
		      <Button  className="mt-3" variant="primary" type="submit" id="submitBtn">
		        Submit
		      </Button>
		    ) : (
		      <Button className="mt-3" variant="danger" type="submit" id="submitBtn" disabled>
		        Submit
		      </Button>
		    )}
		  </Form>
	)
}