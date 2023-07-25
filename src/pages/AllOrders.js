import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';
import AdminOrder from '../components/AdminOrder';
import UserOrder from '../components/UserOrder';

export default function Orders() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    fetch("http://localhost:4000/orders/all-orders")
      .then(res => res.json())
      .then(data => {
        setOrders(data.orders);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (!user.id) {
      // If user is not logged in, navigate to "/products" page
      navigate('/products');
    } else {
      fetchOrders();
    }
  }, [user.id, navigate]);

  return (
    <>
      {user.isAdmin ? (
        <AdminOrder orders={orders} fetchOrders={fetchOrders} />
      ) : (
        <UserOrder orders={orders} />
      )}
    </>
  );
}
