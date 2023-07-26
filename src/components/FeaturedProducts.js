import { useState, useEffect } from 'react';
import { CardGroup } from 'react-bootstrap';
import PreviewProduct from './PreviewProduct';

export default function FeaturedProducts() {
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/all`) // Update the API endpoint to fetch products instead of courses
      .then(res => res.json())
      .then(data => {
        console.log(data);

        const numbers = [];
        const featured = [];

        const generateRandomNums = () => {
          let randomNum = Math.floor(Math.random() * data.length);

          if (numbers.indexOf(randomNum) === -1) {
            numbers.push(randomNum);
          } else {
            generateRandomNums();
          }
        };

        for (let i = 0; i < 5; i++) {
          generateRandomNums();

          featured.push(
            <PreviewProduct // Use PreviewProducts component instead of PreviewCourses
              data={data[numbers[i]]}
              key={data[numbers[i]]._id}
              breakPoint={2}
            />
          );
        }
        setPreviews(featured);
      });
  }, []);

  return (
    <>
      <h2 className="text-center my-5">Featured Products</h2>
      <CardGroup className="justify-content-center">
        {previews}
      </CardGroup>
    </>
  );
}