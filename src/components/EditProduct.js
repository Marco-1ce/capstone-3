import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function EditProduct({product, fetchData}) {

	const [ productId, setProductId] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [showEdit, setShowEdit] = useState(false);

	// function fo opening the modal

	const openEdit = (productId) => {

		// to get the actual data from the form
		fetch(`http://localhost:4000/products/${productId}`)
		.then(res => res.json())
		.then(data => {

			// populate the input values with the course info that we fetched
			setProductId(data._id);
			setName(data.name);
			setDescription(data.description);
			setPrice(data.price);
		})

		// Then open the modal
		setShowEdit(true)
	}

	// function for closing the modal
	const closeEdit = () => {
		setShowEdit(false)
		setName('');
		setDescription('');
		setPrice('');
	}

	// function to update the course
	const editProduct = (e, productId) => {
		e.preventDefault();

		fetch(`${ process.env.REACT_APP_API_URL }/products/${productId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			if(data === true) {
				Swal.fire({
					title: 'Success!',
					icon: 'success',
					text: 'Course Successfully Updated'
				})
				closeEdit();
				fetchData();
			} else {
				Swal.fire({
					title: 'Error!',
					icon: 'error',
					text: 'Please try again'
				})
				closeEdit();
				fetchData();
			}
		})
	}

	return(
		<>
			<Button variant="primary" size="sm" onClick={() => openEdit(product)}>Edit</Button>

		{/*Edit Modal*/}
		<Modal show={showEdit} onHide={closeEdit}>
			<Form onSubmit={e => editProduct(e, productId)}>
				<Modal.Header closeButton>
		          	<Modal.Title>Edit Product</Modal.Title>
		        </Modal.Header>

		        <Modal.Body>
		        	<Form.Group controlId="productName">
		        	  <Form.Label>Name</Form.Label>
		        	  <Form.Control 
		        	  	type="text" 		        	  	  
		        	  	required
		        	  	value={name}
		        	  	onChange={e => {setName(e.target.value)}}
		        	  />
		        	</Form.Group>

		        	<Form.Group controlId="productDescription">
		        	  <Form.Label>Description</Form.Label>
		        	  <Form.Control 
		        	  	type="text" 		        	  	  
		        	  	required
		        	  	value={description}
		        	  	onChange={e => {setDescription(e.target.value)}}
		        	  />
		        	</Form.Group>

		        	<Form.Group controlId="productPricee">
		        	  <Form.Label>Price</Form.Label>
		        	  <Form.Control 
		        	  	type="number" 		        	  	  
		        	  	required
		        	  	value={price}
		        	  	onChange={e => {setPrice(e.target.value)}}
		        	  />
		        	</Form.Group>
		        </Modal.Body>

		        <Modal.Footer>
		        	<Button variant="secondary" onClick={closeEdit}>Close</Button>
		        	<Button variant="success" type="submit">Submit</Button>
		        </Modal.Footer>
			</Form>

		</Modal>
		</>
	)
}