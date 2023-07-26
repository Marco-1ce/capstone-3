import { useState, useEffect } from 'react';
import { CardGroup } from 'react-bootstrap';
import PreviewProduct from './PreviewProduct';

export default function FeaturedProducts() {
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/all`)
      .then(res => res.json())
      .then(data => {
        console.log(data);

        // Filter out inactive products from the data
        const activeProducts = data.filter(product => product.isActive);

        const numbers = [];
        const featured = [];

        const generateRandomNums = () => {
          let randomNum = Math.floor(Math.random() * activeProducts.length);

          if (numbers.indexOf(randomNum) === -1) {
            numbers.push(randomNum);
          } else {
            generateRandomNums();
          }
        };

        for (let i = 0; i < 5; i++) {
          generateRandomNums();

          featured.push(
            <PreviewProduct
              data={activeProducts[numbers[i]]}
              key={activeProducts[numbers[i]]._id}
              breakPoint={2}
            />
          );
        }
        setPreviews(featured);
      });
  }, []);

  return (
    <>
      <h2 className="text-center my-5 text-dark">FEATURED PRODUCTS</h2>
      <CardGroup className="justify-content-center">
        {previews}
      </CardGroup>
    </>
  );
}
