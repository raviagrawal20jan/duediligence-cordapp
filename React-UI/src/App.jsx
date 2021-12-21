
import React, { Component, Fragment,useState } from 'react';

import './App.css';
import Lenderform from './Lenderform';
import FerrariLenderBlocks from './FerrariLenderBlocks';
import Validatorform from './Validatorform';
import {Container, Row, Col} from 'react-bootstrap';
import PorscheBlocks from './PorscheBlocks';
import Header from './Component/Header';
import Footer from './Component/Footer';


function App() {

const [showPorsheForm, setshowPorsheForm] = useState(false);
  const handleSubmit = ( showPorsheForm) => {

        setshowPorsheForm(showPorsheForm);
    }
 if(!showPorsheForm){
  return (


    <div className="App">
      <Container fluid className="App-header">
         <Header type="1"/>
      </Container>
      <Container className="vh-100">

        <Row>
          <Col>

    <PorscheBlocks onSubmitLenderForm={handleSubmit}/>
          </Col>
        </Row>

        </Container>
         <Container fluid className="no-gutter">
                 <Footer type="1"/>
              </Container>

            </div>
            )
            }

        else {
                return (
                <div className="App">
                      <Container fluid className="App-header">
                         <Header type="1"/>
                      </Container>
                      <Container>
                <Row>
                  <Col>
                   <Lenderform onSubmitLenderForm={handleSubmit}/>
                  </Col>
                </Row>
                </Container>
                         <Container fluid className="no-gutter">
                                 <Footer type="2"/>
                              </Container>

                            </div>
                )
                }



}

export default App;

