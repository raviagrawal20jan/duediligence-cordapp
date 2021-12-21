
import React, { Component, Fragment,useState } from 'react';

import './App.css';
import Lenderform from './Lenderform';
import FerrariLenderBlocks from './FerrariLenderBlocks';
import Validatorform from './Validatorform';
import {Container, Row, Col,Form,Button,Nav,NavDropdown,Navbar} from 'react-bootstrap';
import PorscheBlocks from './PorscheBlocks';
import Header from './Component/Header';
import Footer from './Component/Footer';

import App from './App';
import LexisNexis from './LexisNexis';
import Ferrari from './Ferrari';

function Login(props) {
const [showLogin, setLogin] = useState(false);

 const submit = (data) => {


        localStorage.setItem("plogin", true);

    }


if(localStorage.getItem("plogin")=='false'){
  return (


    <div className="App login-bg">

      <Container fluid className="App-header">
         <Header type={props.type}/>
      </Container>
      <Container fluid className="">

      <Container>
      <div className="p100">
                         <div className="Form-Controls">
                             <div className="login-box">
                                 <Row>
                                     <Col>
                                     <Form>
                                         <Row>
                                             <Col>
                                             <Form.Group className="mb-3" controlId="formBasicEmail" id="fname">

                                                 <Form.Control type="input"  placeholder="User Name" />
                                             </Form.Group>
                                             </Col>

                                         </Row>
                                         <Row>

                                              <Col>
                                              <Form.Group className="mb-3" controlId="formBasicEmail" id="lname" name="lname">

                                                  <Form.Control type="password"  placeholder="Password" />
                                              </Form.Group>
                                              </Col>
                                          </Row>

                                         <Button variant="primary" onClick={submit} className="btn-primary mt-5" type="submit">
                                             Submit
                                         </Button>
                                     </Form>
                                      </Col>
                                      </Row>
                                      </div>
                                      </div>
                                      </div>
      </Container>



        </Container>
         <Container fluid className="no-gutter">
                    <div>
                         <Navbar bg="dark" variant="dark" className="footer lending_footer ">
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
              </Container>

            </div>
            )
            }else{
return(
            <App/>)

            }




}

export default Login;

