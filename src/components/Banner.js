import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'

export default function Banner() {
	
	return (
		<section id="banner-image">
                <div class="banner-bg">
                    <div class="banner-container">
                        <h1 class="banner-title">Arm Yourself with Confidence: Your Trusted Gun Shop for Quality Firearms and Accessories!</h1>
                        <h2 class="banner-subtitle">
                            Our One-Stop Destination for Firearm Expertise, Safety Education, and Unbeatable Selection.
                        </h2>
                        <Link to="/products">
                        	<Button className="banner-apply-button">Buy now!</Button>
                        </Link>
                    </div>
                </div> 
            </section>
			
		) 
};