import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footer bg-dark p-2 text-white mt-5">
      <Container>
        <p>&copy; {new Date().getFullYear()} MARCO. All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;
