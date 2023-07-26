import { Button, Row, Col, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom'

export default function Banner() {
	
	return (
		<section id="banner-image">
                <div class="front-bg">
                    <div class="container">
                        <h1 class="title">Arm Yourself with Confidence: Your Trusted Gun Shop for Quality Firearms and Accessories!</h1>
                        <h2 class="subtitle">
                            Our One-Stop Destination for Firearm Expertise, Safety Education, and Unbeatable Selection.
                        </h2>
                        <Link to="/products">
                        	<Button className="apply-button">Buy now!</Button>
                        </Link>
                    </div>
                </div> 
            </section>
			
		) 
};