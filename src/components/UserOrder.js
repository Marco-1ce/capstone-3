import React, { useEffect, useState } from 'react';

const UserOrder = () => {
  const [userOrders, setUserOrders] = useState([]);

  const fetchUserOrders = () => {
    fetch('http://localhost:4000/orders/user-orders', {
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
    <div>
      <h1>User Orders View</h1>
      <table className="table mt-4">
        <thead className="thead-dark">
          <tr>
            <th>Order ID</th>
            <th>Purchased On</th>
            <th>Order Items</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {userOrders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
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

export default UserOrder;
