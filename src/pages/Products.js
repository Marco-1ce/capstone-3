import { useEffect, useState, useContext } from 'react';
import UserContext from '../UserContext';

import AdminView from '../components/AdminView';
import UserView from '../components/UserView';

export default function Products() {
  const { user } = useContext(UserContext);

  // State that will be used to store course retrieved from the database.
  const [products, setProducts] = useState([]);

  // Create a function to fetch all products
  const fetchData = () => {
    fetch(`${ process.env.REACT_APP_API_URL }/products/all`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        // Sets the "products" state to map the data retrieved from the fetch request into several "ProductCard" components.
        setProducts(data);
      });
  };

  // Retrieves the products from the database upon initial render of the "Products" component
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {user.isAdmin ? (
        // If the user is an admin, show the Admin Dashboard.
        <AdminView productsData={products} fetchData={fetchData} />
      ) : (
        // If the user is not an admin, show the Regular Products Page.
        <UserView productsData={products} />
      )}
    </>
  );
}
