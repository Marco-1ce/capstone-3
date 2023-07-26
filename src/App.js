import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router} from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Footer from './components/Footer';

import AddProduct from './pages/AddProduct'
import AllOrders from './pages/AllOrders'
import CartPage from './pages/CartPage'
import Home from './pages/Home'
import Login from './pages/Login';
import Logout from './pages/Logout';
import Products from './pages/Products';
import ProductView from './pages/ProductView'
import Profile from './pages/Profile'
import Register from './pages/Register';
import RetrieveUser from './pages/RetrieveUser'
import './App.css';

import { UserProvider } from './UserContext';

function App() {

    // This state hook is for the user statte that's defined here for a global.
    const [user, setUser] = useState({
        id:null,
        isAdmin:null
    });

    // Function for clearning the localStorage to logout the user.
    const unsetUser = () => {
      localStorage.clear();
    }

    //Because our user state's values are reset to null every time the user reloads the page (thus logging the user out), we want to use React's useEffect hook to fetch the logged-in user's details when the page is reloaded. By using the token saved in localStorage when a user logs in, we can fetch the their data from the database, and re-set the user state values back to the user's details.
    useEffect(() => {

        fetch(`http://localhost:4000/users/details`, {
            headers: {
                Authorization: `Bearer ${ localStorage.getItem('token') }`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            // Set the user states values with the user details upon successful login.
            if (typeof data._id !== "undefined") {

                setUser({
                    id: data._id,
                    isAdmin: data.isAdmin
                });

            // Else set the user states to the initial values
            } else {

                setUser({
                    id: null,
                    isAdmin: null
                });

            }

        })

    }, []);


    // Used to check if the user information is properly storred upon login and the localStrorage information is cleared out upon logout.
    useEffect(() =>{
        console.log(user);
        console.log(localStorage);
    }, [user])


  return (
    
    <UserProvider value={{user, setUser, unsetUser}}>
        <Router>
            <Container fluid>
                <AppNavbar/>  
                <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/products" element={<Products/>}/>
                  <Route path="/products/:productId" element={<ProductView/>}/>
                  <Route path="/register" element={<Register/>}/>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/logout" element={<Logout/>}/>
                  {/*<Route path="*" element={<Error/>}/>*/}
                  <Route path="/profile" element={<Profile/>}/>
                  <Route path="/addProduct" element={<AddProduct/>}/>
                  <Route path="/allUsers" element={<RetrieveUser/>}/>
                  <Route path="/orders" element={<AllOrders/>}/>
                  <Route path="/cart" element={<CartPage/>}/>
                </Routes>
                <Footer/>
            </Container>
        </Router>
    </UserProvider>
    
  );
}

export default App;
