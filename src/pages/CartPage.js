import { useEffect, useState } from 'react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/cart/items`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data && data.cartItems) {
        setCartItems(data.cartItems);
        const total = data.cartItems.reduce((acc, item) => acc + item.subtotal, 0);
        setTotalPrice(total);
      }
    })
    .catch(error => {
      console.error(error);
      // Handle error
    });
  }, []);

  const handleRemoveItem = (productId) => {
    fetch(`${process.env.REACT_APP_API_URL}/cart/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data) {
        // Item removed successfully, update the cart items and total price
        setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
        const total = cartItems.reduce((acc, item) => acc + item.subtotal, 0);
        setTotalPrice(total);
      }
    })
    .catch(error => {
      console.error(error);
      // Handle error
    });
  };

  return (
    <div>
      <h2>Your Cart</h2>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.productId}>
              <td>{item.productName}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.subtotal}</td>
              <td>
                <button onClick={() => handleRemoveItem(item.productId)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Total Price:</td>
            <td colSpan="2">{totalPrice}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default CartPage;
