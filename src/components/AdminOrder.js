import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminOrder = ({ orders, fetchOrders }) => {
  return (
    <Container className="admin-orders-container mt-5">
          <h1 className="admin-orders-heading mb-4 text-center">Admin Orders View</h1>
          <Row>
            {orders.map((order) => (
              <Col key={order._id} lg={3} className="mb-4">
                <Card className="admin-orders-card">
                  <Card.Header className="admin-orders-card-header">
                    <h5 className="mb-3">Order ID: {order._id}</h5>
                    <p>User ID: {order.userId}</p>
                  </Card.Header>
                  <Card.Body className="admin-orders-card-body">
                    <h6>Order Items:</h6>
                    <ul className="admin-orders-list">
                      {order.products.map((product) => (
                        <li key={product.productId} className="admin-orders-list-item">
                          <p>Product ID: {product.productId}</p>
                          <p>Quantity: {product.quantity}</p>
                          <p>Price: <span className="admin-oder-amount">${product.price}</span></p>
                        </li>
                      ))}
                    </ul>
                    <p className="admin-orders-paragraph">Total Amount: <span className="admin-oder-amount">${order.totalAmount}</span></p>
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

export default AdminOrder;
