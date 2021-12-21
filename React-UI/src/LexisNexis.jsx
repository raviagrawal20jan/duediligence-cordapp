
import React, { Component, Fragment,useState } from 'react';

import './App.css';
import Lenderform from './Lenderform';
import FerrariLenderBlocks from './FerrariLenderBlocks';
import Validatorform from './Validatorform';
import {Container, Row, Col} from 'react-bootstrap';
import PorscheBlocks from './PorscheBlocks';
import Header from './Component/Header';
import Footer from './Component/Footer';


function LexisNexis() {
const [showValidateGrid, setValidateGrid] = useState(false);
const [showFerrariGrid, setFerrariGrid] = useState(false);
const [showPorsheForm, setshowPorsheForm] = useState(false);
  const handleSubmit = ( showPorsche,showFerrari, showPorsheForm) => {
        setValidateGrid(showPorsche);

    }

  return (


    <div className="App">
      <Container fluid className="App-header">
         <Header type="2"/>
      </Container>
      <Container className="vh-100">

        <Row>
          <Col>

    <Validatorform />
          </Col>
        </Row>

        </Container>
         <Container fluid className="no-gutter">
                 <Footer type="2"/>
              </Container>

            </div>
            )




}

export default LexisNexis;

