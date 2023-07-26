import {Row, Col, Card, } from 'react-bootstrap';


export default function Highlights() {

	return (

		<Row className="mt-3 mb-3">
			<Col xs={12} md={4}>
				<Card className="cardHighlight p-3">
				      <Card.Body>
				        <Card.Title>Personal Protection and Self-Defense</Card.Title>
				        <Card.Text>
				           One of the primary reasons individuals choose to own a gun is for personal protection and self-defense. 
				        </Card.Text>
				      </Card.Body>
				</Card>
			</Col>

			<Col xs={12} md={4}>
				<Card className="cardHighlight p-3">
				      <Card.Body>
				        <Card.Title>Recreational Shooting and Sports</Card.Title>
				        <Card.Text>
				          For many enthusiasts, owning a gun allows them to participate in recreational shooting sports such as target shooting, skeet shooting, and competitive shooting events. 
				        </Card.Text>
				      </Card.Body>
				</Card>
			</Col>

			<Col xs={12} md={4}>
				<Card className="cardHighlight p-3">
				      <Card.Body>
				        <Card.Title>Hunting and Wildlife Management</Card.Title>
				        <Card.Text>
				          For hunters and conservationists, guns are tools used for hunting game responsibly and ethically. 
				        </Card.Text>
				      </Card.Body>
				</Card>
			</Col>
		
		</Row>

	)

};