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
			<Card className="cardHighlight">
				<Card.Body>
					<Card.Title className="text-center">
						<Link to={`/products/${_id}`}>{name}</Link>
					</Card.Title>
					<Card.Text>{description}</Card.Text>
				</Card.Body>

				<Card.Footer>
					<h5 className="text-center">₱ {price}</h5>
					<Link to={`/products/${_id}`} className="btn btn-primary d-block">Details</Link>
				</Card.Footer>
			</Card>
		</Col>
	)
}
