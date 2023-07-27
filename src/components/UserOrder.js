import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap'

const UserOrder = () => {
  const [userOrders, setUserOrders] = useState([]);

  const fetchUserOrders = () => {
    fetch(`${ process.env.REACT_APP_API_URL }/orders/user-orders`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserOrders(data.orders);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  return (
    <Container>
          <h1 className="text-center my-4">User Orders View</h1>
          <Row>
            {userOrders.map((order) => (
              <Col key={order._id} md={3}>
                <Card className="mb-4 order-card">
                  <Card.Header>
                    <h5>Order ID: {order._id}</h5>
                  </Card.Header>
                  <Card.Body>
                    <h6>Order Items:</h6>
                    <ul>
                      {order.products.map((product) => (
                        <li key={product.productId}>
                          <p>Product ID: {product.productId}</p>
                          <p>Quantity: {product.quantity}</p>
                          <p>Price: <span className="order-value-price">${product.price}</span></p>
                        </li>
                      ))}
                    </ul>
                    <p>Total Amount: <span className="order-value-price">${order.totalAmount}</span></p>
                  </Card.Body>
                  <Card.Footer>
                     <small className="text-muted">Purchased On:{new Date(order.purchasedOn).toLocaleString()}</small>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
  );
};

export default UserOrder;
