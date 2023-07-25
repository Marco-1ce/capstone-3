// import { useState, useEffect } from 'react';

import { Card, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ProductCard({productProp}) {


	// Destructured the courseProp to access its properties.
	const {_id, name, description, price } = productProp;



	return(

		<div className="product-card-container">
		      <Card className="product-card mt-5">
		        <Card.Body>
		          <Card.Title className="product-title">{name}</Card.Title>
		          <Card.Text>{description}</Card.Text>
		          <Card.Text className="product-price">₱ {price}</Card.Text>
		          <hr />
		          <div className="button-container">
		            <Button
		              as={Link}
		              to={`/products/${_id}`}
		              variant="primary"
		              className="view-details-button"
		            >
		              View Details
		            </Button>
		          </div>
		        </Card.Body>
		      </Card>
		    </div>
	)
};