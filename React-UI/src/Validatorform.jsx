import { FormattedMessage } from 'react-intl';
import React, { Component, Fragment, useState, useEffect } from 'react';
import { Row, Col, Button, Form, Image, Table, OverlayTrigger, Tooltip, Alert, Nav, Modal, Container } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';


function Validatorform(props) {

    // Declare a new state variable, which we'll call "count"
    const [mockResponse, setInput] = useState([]);
    const [showSpinner, setSpinner] = useState(true);
    const [show, setShow] = useState(true);
    const [userData, setData] = useState({});
    const [modalShow, setModalShow] = React.useState(false);

    useEffect(() => {
        let mounted = true;
        getData();
        return () => mounted = false;
    }, [])

    const setSelectedUser = (data) => {
        setData(data);
        setModalShow(true);

    }

    const getData = () => {

        fetch('http://localhost:50005/porscheblocks')
            .then(res => res.json())
            .then((data) => {
                fetch('http://localhost:50005/ferrariblocks')
                    .then(res => res.json())
                    .then((Fdata) => {
                        data.forEach(function (d) {
                            const filterData = Fdata.filter(x => x.LinearId === d.LinearId)
                            if (filterData.length) {
                                d.SharedwithFerrari = true;
                            }

                        });
                        setInput(data);
                    })
            })
            .catch(err => {
                console.log(err);
            })

    }



    const Approve = (linearId, e) => {
        e.preventDefault();
        setSpinner(false);
        const confirmed = window.confirm("Are you sure want to Approve?");
        if (confirmed) {
            const details = {

                "linearId": linearId
            }


            fetch('http://localhost:50005/ApprovalByLexisNexis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(details)
            })
                .then(res => res.text)
                .then((data) => {
                    setSpinner(true);
                    getData();
                    setModalShow(false);
                })
                .catch(err => {
                    err.text().then(errorMessage => {
                        props.onSubmitLenderForm(true, false);
                    })
                });
        }
    }



    return (
        <div>

            <h2 className="page-title">Lexis Nexis</h2>

            <div className="overlay" hidden={showSpinner}></div>
            <div className="loader-box">
                <Spinner animation="border" role="status" hidden={showSpinner} >
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>

            <MyVerticallyCenteredModal Data={userData}
                show={modalShow} approve={Approve}
                onHide={() => setModalShow(false)}
            />




            <div className="Form-Content">
                {/* <h3 >KYC Profiles</h3> */}
                <div className="Form-Controls" >



                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>

                                <th>Vechicle Model</th>
                                <th className="action-width">Status</th>
                            </tr>
                        </thead>


                        <tbody>
                            {mockResponse.map((data, i) => (
                                <tr key={data.LinearId}>
                                    <td >

                                        <Nav className="me-auto">

                                            <Nav.Link href="#" onClick={event => setSelectedUser(data)}>{data.Name}</Nav.Link>
                                        </Nav>
                                    </td>
                                    <td>{data.Address}</td>

                                    <td>{data.VehicleMake}</td>
                                    <td className="action-width">
                                        {data.Qualified == 'false' ? (
<span>Pending Approval</span>

                                        ) :

                                            (<span>Approved</span>)

                                        }


                                    </td>

                                </tr>
                            ))
                            }
                        </tbody>


                    </Table>

                </div>
            </div>
        </div>);
}

function MyVerticallyCenteredModal(props) {
    return (
    <>
        <Modal scrollable={true}
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    KYC Detail
        </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Container>


        <Table striped bordered hover>

          <tbody>
            <tr>
              <td rowspan="5" className="td-width">
            <img src="photo.jpg" className="photo"/></td>
            <td colspan="5">
            <h3>Mr. {props.Data.Name}</h3>
            </td>
            </tr>
            <tr>
              <td><b>SSN</b></td>
              <td>XXX-XXXX-9333</td>

            </tr>
 <tr>
              <td><b>DOB</b></td>
               <td>20-JAN-1986</td>

            </tr>
             <tr>
                          <td><b>Phone</b></td>
                          <td>234-45678</td>

                        </tr>
                         <tr>
                                     <td><b>Address</b></td>
                                     <td>{props.Data.Address}</td>

                                    </tr>
                                     <tr>
                                 <td><b>Vechile Style</b></td>
                                 <td><b>Vechile Model</b></td>
                                 <td><b>Vechile Make</b></td>

                                     </tr>
                                       <tr>
                                  <td>SUV</td>
                                  <td>SX</td>
                                  <td>{props.Data.VehicleMake}</td>

                                    </tr>
                                     <tr>
                          <td   colspan="3"> <b>Credit Score</b></td>


                                                                                                            </tr>
                                      <tr>
                                                                      <td   colspan="3"> <img src="creditscore.PNG" className="Form-Content"/></td>


                                                                        </tr>


          </tbody>
        </Table>



                </Container>

            </Modal.Body>
            {props.Data.Qualified == 'false' &&
            <Modal.Footer>
                <Button onClick={event => props.approve(props.Data.LinearId, event)} className="colorGreen">Approve</Button>

                <Button onClick={props.onHide}>Reject</Button>
            </Modal.Footer>
            }
        </Modal>
        </>
    );
}

export default Validatorform;

