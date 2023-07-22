import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

export default function UserView({productsData}) {

	const [products, setProducts] = useState([])

	useEffect(() => {
	  const productsArr = productsData.map(product => {

	    //only render the active courses since the route used is /all from Course.js page
	    if(product.isActive === true) {
	      return (
	        <ProductCard productProp={product} key={product._id}/>
	        )
	    } else {
	      return null;
	    }
	  })

	  //set the courses state to the result of our map function, to bring our returned course component outside of the scope of our useEffect where our return statement below can see.
	  setProducts(productsArr)

	}, [productsData])

	return(

		<div className="product-cards-container">{products}</div>	)
}