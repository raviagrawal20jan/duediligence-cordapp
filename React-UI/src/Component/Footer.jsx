import React from 'react';
import {Nav,NavDropdown,Navbar,Container} from 'react-bootstrap';


function Footer() {
    return (
    <div>
        <Navbar bg="dark" variant="dark" className="footer mt-5 ">
            <Container>
                <span>© 2021 PORSCHE LENDER</span>
            <Nav className="me-auto">
                <Nav.Link href="#">About</Nav.Link>
                <Nav.Link href="#">Privacy Policy</Nav.Link>
                <Nav.Link href="#">Contact Us</Nav.Link>
            </Nav>
            </Container>
        </Navbar>

    </div>
    )
  }

export default Footer;