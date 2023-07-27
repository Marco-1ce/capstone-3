
import React, { useState } from 'react';
import ProductCard from './ProductCard';

const ProductSearch = ({ setProducts }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`${ process.env.REACT_APP_API_URL }/products/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productName: searchQuery })
      });
      const data = await response.json();
      setSearchResults(data);
      setProducts(data); 
    } catch (error) {
      console.error('Error searching for products:', error);
    }
  };

  return (
    <div className="pt-5 container">
      <h2>Course Search</h2>
      <div className="form-group">
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          className="form-control"
          value={searchQuery}
          onChange={event => setSearchQuery(event.target.value)}
        />
      </div>
      <button className="btn btn-primary my-4" onClick={handleSearch}>
        Search
      </button>
      <h3>Search Results:</h3>
      <ul>
        {searchResults.map(product => (
          <ProductCard productProp={product} key={product._id}/>
        ))}
      </ul>
    </div>
  );
};

export default ProductSearch;
