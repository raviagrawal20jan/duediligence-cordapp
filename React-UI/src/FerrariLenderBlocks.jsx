import { FormattedMessage } from 'react-intl';
import React, { Component, Fragment, useState,useEffect } from 'react';
import { Row, Col,Button,Form,Image ,Table , Nav, Modal, Container} from 'react-bootstrap';


function FerrariLenderBlocks(props) {

    // Declare a new state variable, which we'll call "count"
    const [mockResponse, setInput] = useState([]);
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
let ferrariData = [];
  fetch('http://localhost:50005/porscheblocks')
                                            .then(res => res.json())
                                            .then((data) => {

                                             fetch('http://localhost:50005/ferrariblocks')
                                             .then(res => res.json())
                                             .then((Fdata) => {
                                             Fdata.forEach(function(d){
                                             const filterData = data.filter(x=>x.LinearId === d.LinearId)
ferrariData.push(...filterData);
                                             });
setInput(ferrariData);
                                             })
                                            })
                                             .catch( err => {
                                               console.log(err);
                                              })

  }



    const Approve = (linearId, e) => {
e.preventDefault();
                        const details = {

                                                    "linearId": linearId
                                                  }


                       fetch('http://localhost:50005/ApprovalByLexisNexis',  {
                                                                  method: 'POST',
                                                                  headers: {
                                                                    'Content-Type': 'application/json'
                                                                  },
                                                                  body: JSON.stringify(details)})
                                  .then(res => res.text)
                                  .then((data) => {
getData();
                                  })
                                   .catch( err => {
                                      err.text().then( errorMessage => {
                                        props.onSubmitLenderForm(false);
                                      })
                                    });
}

const ShareWithFerrari = (linearId, e) => {
e.preventDefault();
                        const details = {

                                                    "linearId": linearId,
                                                    "partyName": "O=Ferrari Lender,L=Miami,C=US"
                                                  }


                       fetch('http://localhost:50005/ShareWithFerrari',  {
                                                                  method: 'POST',
                                                                  headers: {
                                                                    'Content-Type': 'application/json'
                                                                  },
                                                                  body: JSON.stringify(details)})
                                  .then(res => res.text)
                                  .then((data) => {
getData();
                                  })
                                   .catch( err => {
                                      err.text().then( errorMessage => {
                                        props.onSubmitLenderForm(false);
                                      })
                                    })
                       }

    return (
    <div>

        <h2 className="page-title">Ferrari Lender</h2>

         <MyVerticallyCenteredModal Data={userData}
                        show={modalShow} approve={Approve}
                        onHide={() => setModalShow(false)}
                    />


        <div className="Form-Content">

            <div className="Form-Controls" >

{/* {mockResponse.map((data,i) => (


     <div key={i}> <div> {data.name}</div>
     <div> {data.address}</div>
      <div> {data.phoneNbr}</div>
      <div> {data.vehicleMake}</div>
     </div>
      ))

      } */}

<Table striped bordered hover>
  <thead>
    <tr>
      <th>Name</th>
      <th>Address</th>
      <th>Mobile</th>
      <th>Vechicle Model</th>

    </tr>
  </thead>


  <tbody>
  {mockResponse.map((data,i) => (
    <tr key={data.LinearId}>
      <td > <Nav className="me-auto">

                                                       <Nav.Link href="#" onClick={event => setSelectedUser(data)}>{data.Name}</Nav.Link>
                                                   </Nav></td>
      <td>{data.Address}</td>
      <td>{data.PhoneNbr}</td>
      <td>{data.VehicleMake}</td>

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
        <Modal  scrollable={true}
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
              <td>XXX-XX-9333</td>

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

        </Modal>
    );
}


export default FerrariLenderBlocks;

