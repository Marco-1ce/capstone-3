import { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col, Form } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function ProductView() {
  const { productId } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1); // New state variable for quantity

  useEffect(() => {
    console.log(productId);

    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
      });
  }, [productId]);

  const purchase = () => {
    fetch(`${process.env.REACT_APP_API_URL}/orders/purchase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ productId, quantity }) // Use the quantity state variable
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

  return (
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
              {user.id !== null ? (
                <div>
                  <Card.Subtitle>Quantity:</Card.Subtitle>
                  <Form.Control
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  />
                  <Button variant="primary" onClick={purchase}>
                    Checkout
                  </Button>
                </div>
              ) : (
                <Button as={Link} to="/login" variant="danger">
                  Log in to Checkout
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
