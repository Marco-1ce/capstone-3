// import { useState, useEffect } from 'react';

import { Card, Button, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ProductCard({productProp}) {


	// Destructured the courseProp to access its properties.
	const {_id, name, description, price } = productProp;



	return(
		<Col xs={12} md={4} className="mt-4">
		      <Card className="featuredProduct-cardHighlight">
		      <Card.Img variant="top" src="https://i0.wp.com/blog.cheaperthandirt.com/wp-content/uploads/2020/01/Smith-Wesson-MP-EZ-9mm.jpg?fit=800%2C800&ssl=1" />
		        <Card.Body>
		          <Card.Title className="featuredProduct-title">
		            <Link to={`/products/${_id}`}>{name}</Link>
		          </Card.Title>
		          <Card.Text className="featuredProduct-text">{description}</Card.Text>
		        </Card.Body>

		        <Card.Footer>
		          <h5 className="featuredProduct-price">₱ {price}</h5>
		          <Link to={`/products/${_id}`} className="featuredProduct-btn d-block">
		            Details
		          </Link>
		        </Card.Footer>
		      </Card>
		    </Col>
	)
};