import { useEffect, useState, useContext } from 'react';
import Swal from 'sweetalert2'
import UserContext from '../UserContext';
import { Navigate, useNavigate } from 'react-router-dom';

const CartPage = () => {

  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [isPurchaseSuccess, setIsPurchaseSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cart items from the backend API
    fetch(`${process.env.REACT_APP_API_URL}/users/cart/items`, {
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
    });
  }, []);

  useEffect(() => {
    // Update total price whenever cart items change
    const total = cartItems.reduce((acc, item) => acc + item.subtotal, 0);
    setTotalPrice(total);
  }, [cartItems]);

  const handleRemoveItem = (productId) => {
    // Remove item from the backend API
    fetch(`${process.env.REACT_APP_API_URL}/users/cart/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data) {
        // Item removed successfully, update the cart items
        setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
      }
    })
    .catch(error => {
      console.error(error);
      // Handle error
    });
  };

  const handleChangeQuantity = (productId, newQuantity) => {
    fetch(`${process.env.REACT_APP_API_URL}/users/cart/changeQuantity`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ productId, quantity: newQuantity })
    })
    .then(res => res.json())
    .then(data => {
      if (data) {
        // Quantity changed successfully, update the cart items
        setCartItems(prevItems =>
          prevItems.map(item =>
            item.productId === productId ? { ...item, quantity: newQuantity, subtotal: item.price * newQuantity } : item
          )
        );
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
      
    });
  };


 const handleCheckoutAll = () => {
  const itemsToPurchase = cartItems.map(item => ({
    productId: item.productId,
    quantity: item.quantity
  }));

  fetch(`${process.env.REACT_APP_API_URL}/orders/purchase`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ items: itemsToPurchase }) // Update the body to send an object with 'items' property
  })
  .then(res => res.json())
  .then(data => {
    if (data) {
      Swal.fire({
        title: "Successfully purchased",
        icon: "success",
        text: "You have successfully purchased all products in the cart."
      });

      setIsPurchaseSuccess(true);
      setCartItems([]); 
      setTotalPrice(0); 

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
};

useEffect(() => {
    if (isPurchaseSuccess) {
      navigate('/'); 
    }
  }, [isPurchaseSuccess, navigate]);


  return (

    (user.isAdmin) ?
      <Navigate to="/products" />
      :
    <div className="cart-container">
          <h2 className="cart-head">My Cart</h2>
          <table className="table">
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
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleChangeQuantity(item.productId, parseInt(e.target.value))}
                    />
                    </td>
                  <td>₱{item.price}</td>
                  <td>₱{item.subtotal}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => handleRemoveItem(item.productId)}>
                      Remove
                    </button>
                  </td>
                  
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3">
                    <button className="btn btn-primary" onClick={handleCheckoutAll}>
                      Checkout
                    </button>
                </td>
                <td colSpan="2"> Total Price: ₱{totalPrice}</td>
              </tr>
            </tfoot>
          </table>
        </div>
  );
};

export default CartPage;
