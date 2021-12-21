
import React, { Component, Fragment,useState } from 'react';

import './App.css';
import Lenderform from './Lenderform';
import FerrariLenderBlocks from './FerrariLenderBlocks';
import Validatorform from './Validatorform';
import {Container, Row, Col} from 'react-bootstrap';
import PorscheBlocks from './PorscheBlocks';
import Header from './Component/Header';
import Footer from './Component/Footer';


function Ferrari() {


  return (


    <div className="App">
      <Container fluid className="App-header">
         <Header    type="3"/>
      </Container>
      <Container className="vh-100">

        <Row>
          <Col>

    <FerrariLenderBlocks />
          </Col>
        </Row>

        </Container>
         <Container fluid className="no-gutter">
                 <Footer type="3"/>
              </Container>

            </div>
            )




}

export default Ferrari;

