import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Product(props) {
	console.log(props);
	// props is used here to get the data and breakPoint from the FeaturedCourses.js
	const { breakPoint, data } = props

	// Destructure the courses data
	const { _id, name, description, price } = data

	return (
		<Col xs={12} md={breakPoint}>
		      <Card className="featuredProduct-cardHighlight">
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
}
