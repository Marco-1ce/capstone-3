import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminOrder = ({ orders, fetchOrders }) => {
  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Admin Orders View</h1>
      <table className="table mt-4">
        <thead className="thead-dark">
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Purchased On</th>
            <th>Order Items</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.userId}</td>
              <td>{new Date(order.purchasedOn).toLocaleString()}</td>
              <td>
                <ul>
                  {order.products.map((product) => (
                    <li key={product.productId}>
                      <p>Product ID: {product.productId}</p>
                      <p>Quantity: {product.quantity}</p>
                      <p>Price: ${product.price}</p>
                    </li>
                  ))}
                </ul>
              </td>
              <td>${order.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrder;
