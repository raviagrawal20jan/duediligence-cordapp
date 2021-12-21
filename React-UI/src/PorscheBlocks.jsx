import { FormattedMessage } from 'react-intl';
import React, { Component, Fragment, useState,useEffect } from 'react';
import { Row, Col,Button,Form,Image ,Table,Nav,OverlayTrigger,Tooltip  } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';


function PorscheBlocks(props) {

    // Declare a new state variable, which we'll call "count"
    const [mockResponse, setInput] = useState([]);
const [showSpinner, setSpinner] = useState(true);
  useEffect(() => {
     let mounted = true;
     getData();
     return () => mounted = false;
   }, [])

  const getData = () => {

  fetch('http://localhost:50005/porscheblocks')
                                            .then(res => res.json())
                                            .then((data) => {
                                             fetch('http://localhost:50005/ferrariblocks')
                                              .then(res => res.json())
                                              .then((Fdata) => {
                                              data.forEach(function(d){
                                              const filterData = Fdata.filter(x=>x.LinearId === d.LinearId)
                                              if(filterData.length){
                                              d.SharedwithFerrari = true;
                                              }

                                             });
                                              setInput(data);
                                            })
                                              })
                                             .catch( err => {
                                               console.log(err);
                                              })

  }




const ShareWithFerrari = (linearId, e) => {
e.preventDefault();
 setSpinner(false);
const confirmed = window.confirm("Are you sure want to share this with Ferrari?");
if(confirmed){
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
                                   setSpinner(true);
getData();
                                  })
                                   .catch( err => {
                                      err.text().then( errorMessage => {
                                        props.onSubmitLenderForm(false);
                                      })
                                    })
                                    }
                       }

    return (
    <div>
    <div className="title-bar">
        <h2 className="page-title">Dashboard</h2>
        <div className="link">

                                       <Nav className="me-auto">

                                           <Nav.Link href="#" onClick={event => props.onSubmitLenderForm(true)}>New KYC</Nav.Link>



                                       </Nav>

                                       </div>
</div>
         <div className="overlay"  hidden={showSpinner}></div>
                            <div className="loader-box">
                <Spinner animation="border" role="status" hidden={showSpinner} >
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                </div>


        <div className="Form-Content">
           <h3 >KYC Profiles</h3>

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

      <th>Vechicle Model</th>
      <th className="action-width">Action</th>
    </tr>
  </thead>


  <tbody>
  {mockResponse.map((data,i) => (
    <tr key={data.LinearId}>
      <td >{data.Name}</td>
      <td>{data.Address}</td>

      <td>{data.VehicleMake}</td>
      <td className="action-width">
      {data.Qualified == 'false' ? (

<OverlayTrigger
      placement="right"
         delay={{ show: 250, hide: 400 }}
      overlay={
        <Tooltip id="sdasd">
          Pending Approval
        </Tooltip>
      }
    >
    <span className="action-icon-disable action-btn" tooltip="PendingForApproval">


                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hourglass" viewBox="0 0 16 16">
                    <path d="M2 1.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1-.5-.5zm2.5.5v1a3.5 3.5 0 0 0 1.989 3.158c.533.256 1.011.791 1.011 1.491v.702c0 .7-.478 1.235-1.011 1.491A3.5 3.5 0 0 0 4.5 13v1h7v-1a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351v-.702c0-.7.478-1.235 1.011-1.491A3.5 3.5 0 0 0 11.5 3V2h-7z"/>
                  </svg>

                  </span>
                  </OverlayTrigger>

    ):

    (<div>

     {!data.SharedwithFerrari ?(
<OverlayTrigger
      placement="right"
         delay={{ show: 250, hide: 400 }}
      overlay={
        <Tooltip id="sdasd">
          Share with Ferrari
        </Tooltip>
      }
    >
                     <a tool-tip="Share with Ferrari" className="action-icon" onClick={event => ShareWithFerrari(data.LinearId,event)}>

                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-share" viewBox="0 0 16 16">

                                      <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>

                                  </svg>

                                  </a>
                                  </OverlayTrigger>

                    ):  <span className="action-icon-disable action-btn">
<OverlayTrigger
                             placement="right"
                                delay={{ show: 250, hide: 400 }}
                             overlay={
                               <Tooltip id="sdasd">
                                 Shared with Ferrari
                               </Tooltip>
                             }
                           >
                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-share Approved" viewBox="0 0 16 16">

                                         <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>

                                     </svg>
</OverlayTrigger>
                                     </span>  } </div>)

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



export default PorscheBlocks;

