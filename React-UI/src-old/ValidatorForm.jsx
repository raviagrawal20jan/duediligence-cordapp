import { FormattedMessage } from 'react-intl';
import TextField from '@material-ui/core/TextField';
import React, { Component, Fragment, useState } from 'react';
import Button from '@material-ui/core/Button';
import { applyMiddleware } from 'redux';


import thunk from 'redux-thunk';
import { createStore } from 'redux-dynamic-reducer'

function Validatorform(props) {



    // Declare a new state variable, which we'll call "count"
    const [input, setInput] = useState('');
    const mockResponse = {
                              "stateTypes": "UNCONSUMED",
                              "states": [
                                  {
                                      "ref": {
                                          "index": 0,
                                          "txhash": "67500814CC90FE24ECC7148D8A552C57D218F6BE8F6C966B8DC2C87522D95EDD"
                                      },
                                      "state": {
                                          "constraint": {
                                              "type": "signature",
                                              "key": {
                                                  "fingerprint": "not implemented"
                                              }
                                          },
                                          "contract": "net.corda.samples.duediligence.contracts.CorporateRecordsContract",
                                          "data": {
                                              "address": "Jaipur, Rajasthan",
                                              "applicant": {
                                                  "name": "O=Porsche Lender, L=Delhi, C=IN"
                                              },
                                              "income": "999",
                                              "linearId": {
                                                  "id": "83f59343-f3dc-45df-8bd7-4b5fd5daeac0"
                                              },
                                              "name": "Vijay Kumar",
                                              "numberOfFiles": 1,
                                              "phoneNbr": "989787878",
                                              "qualification": false,
                                              "validater": {
                                                  "name": "O=LexisNexis, L=Boston, C=US"
                                              },
                                              "vehicleMake": "Renault",
                                              "vehicleModel": "Duster",
                                              "vehicleStyle": "RXZ"
                                          },
                                          "notary": {
                                              "name": "O=Notary, L=London, C=GB"
                                          }
                                      }
                                  },
                                  {
                                      "ref": {
                                          "index": 0,
                                          "txhash": "75EADE2EC051C0621D8622EFA86C72BA198B92048A4BE15396A9C0BA9B6B21CD"
                                      },
                                      "state": {
                                          "constraint": {
                                              "type": "signature",
                                              "key": {
                                                  "fingerprint": "not implemented"
                                              }
                                          },
                                          "contract": "net.corda.samples.duediligence.contracts.CorporateRecordsContract",
                                          "data": {
                                              "address": "Agra, UP",
                                              "applicant": {
                                                  "name": "O=Porsche Lender, L=Delhi, C=IN"
                                              },
                                              "income": "999",
                                              "linearId": {
                                                  "id": "2cca76cb-4a4f-466f-a8cf-f148b4c3bd5b"
                                              },
                                              "name": "Ravi Agrawal",
                                              "numberOfFiles": 1,
                                              "phoneNbr": "989787878",
                                              "qualification": true,
                                              "validater": {
                                                  "name": "O=LexisNexis, L=Boston, C=US"
                                              },
                                              "vehicleMake": "Porsche",
                                              "vehicleModel": "Cyne",
                                              "vehicleStyle": "RXZ"
                                          },
                                          "notary": {
                                              "name": "O=Notary, L=London, C=GB"
                                          }
                                      }
                                  },
                                  {
                                      "ref": {
                                          "index": 0,
                                          "txhash": "A8A5CDF4F83A6C138A36352D18A28EC55CA8283900A82D2E601960742A49FBCB"
                                      },
                                      "state": {
                                          "constraint": {
                                              "type": "signature",
                                              "key": {
                                                  "fingerprint": "not implemented"
                                              }
                                          },
                                          "contract": "net.corda.samples.duediligence.contracts.CorporateRecordsContract",
                                          "data": {
                                              "address": "Agra, UP",
                                              "applicant": {
                                                  "name": "O=Porsche Lender, L=Delhi, C=IN"
                                              },
                                              "income": "999",
                                              "linearId": {
                                                  "id": "6fada8ee-b95e-445f-b78c-eb219c5915bf"
                                              },
                                              "name": "Pulkit Agrawal",
                                              "numberOfFiles": 1,
                                              "phoneNbr": "989787878",
                                              "qualification": false,
                                              "validater": {
                                                  "name": "O=LexisNexis, L=Boston, C=US"
                                              },
                                              "vehicleMake": "Porsche",
                                              "vehicleModel": "Cyne",
                                              "vehicleStyle": "RXZ"
                                          },
                                          "notary": {
                                              "name": "O=Notary, L=London, C=GB"
                                          }
                                      }
                                  },
                                  {
                                      "ref": {
                                          "index": 0,
                                          "txhash": "35BB0E50BA08A824C2BC0CABEDE614E360AAC5667DF246B2B9E35186D390B023"
                                      },
                                      "state": {
                                          "constraint": {
                                              "type": "signature",
                                              "key": {
                                                  "fingerprint": "not implemented"
                                              }
                                          },
                                          "contract": "net.corda.samples.duediligence.contracts.CorporateRecordsContract",
                                          "data": {
                                              "address": "Agra, UP",
                                              "applicant": {
                                                  "name": "O=Porsche Lender, L=Delhi, C=IN"
                                              },
                                              "income": "999",
                                              "linearId": {
                                                  "id": "cf163b33-b63e-4ccd-aa4f-544670ae4b93"
                                              },
                                              "name": "JJ Agrawal",
                                              "numberOfFiles": 1,
                                              "phoneNbr": "989787878",
                                              "qualification": true,
                                              "validater": {
                                                  "name": "O=LexisNexis, L=Boston, C=US"
                                              },
                                              "vehicleMake": "Porsche",
                                              "vehicleModel": "Cyne",
                                              "vehicleStyle": "RXZ"
                                          },
                                          "notary": {
                                              "name": "O=Notary, L=London, C=GB"
                                          }
                                      }
                                  }
                              ],
                              "statesMetadata": [
                                  {
                                      "constraintInfo": {
                                          "constraint": {
                                              "type": "signature",
                                              "key": {
                                                  "fingerprint": "not implemented"
                                              }
                                          }
                                      },
                                      "contractStateClassName": "net.corda.samples.duediligence.states.CorporateRecordsAuditRequest",
                                      "notary": {
                                          "name": "O=Notary, L=London, C=GB"
                                      },
                                      "recordedTime": "2021-11-24T05:07:52.329Z",
                                      "ref": {
                                          "index": 0,
                                          "txhash": "67500814CC90FE24ECC7148D8A552C57D218F6BE8F6C966B8DC2C87522D95EDD"
                                      },
                                      "relevancyStatus": "RELEVANT",
                                      "status": "UNCONSUMED"
                                  },
                                  {
                                      "constraintInfo": {
                                          "constraint": {
                                              "type": "signature",
                                              "key": {
                                                  "fingerprint": "not implemented"
                                              }
                                          }
                                      },
                                      "contractStateClassName": "net.corda.samples.duediligence.states.CorporateRecordsAuditRequest",
                                      "notary": {
                                          "name": "O=Notary, L=London, C=GB"
                                      },
                                      "recordedTime": "2021-11-25T11:18:58.286Z",
                                      "ref": {
                                          "index": 0,
                                          "txhash": "75EADE2EC051C0621D8622EFA86C72BA198B92048A4BE15396A9C0BA9B6B21CD"
                                      },
                                      "relevancyStatus": "RELEVANT",
                                      "status": "UNCONSUMED"
                                  },
                                  {
                                      "constraintInfo": {
                                          "constraint": {
                                              "type": "signature",
                                              "key": {
                                                  "fingerprint": "not implemented"
                                              }
                                          }
                                      },
                                      "contractStateClassName": "net.corda.samples.duediligence.states.CorporateRecordsAuditRequest",
                                      "notary": {
                                          "name": "O=Notary, L=London, C=GB"
                                      },
                                      "recordedTime": "2021-11-25T11:23:41.404Z",
                                      "ref": {
                                          "index": 0,
                                          "txhash": "A8A5CDF4F83A6C138A36352D18A28EC55CA8283900A82D2E601960742A49FBCB"
                                      },
                                      "relevancyStatus": "RELEVANT",
                                      "status": "UNCONSUMED"
                                  },
                                  {
                                      "constraintInfo": {
                                          "constraint": {
                                              "type": "signature",
                                              "key": {
                                                  "fingerprint": "not implemented"
                                              }
                                          }
                                      },
                                      "contractStateClassName": "net.corda.samples.duediligence.states.CorporateRecordsAuditRequest",
                                      "notary": {
                                          "name": "O=Notary, L=London, C=GB"
                                      },
                                      "recordedTime": "2021-11-25T11:34:49.602Z",
                                      "ref": {
                                          "index": 0,
                                          "txhash": "35BB0E50BA08A824C2BC0CABEDE614E360AAC5667DF246B2B9E35186D390B023"
                                      },
                                      "relevancyStatus": "RELEVANT",
                                      "status": "UNCONSUMED"
                                  }
                              ],
                              "totalStatesAvailable": 4
                          }

    const submit = () => {

    }

    return (<div className="App-header"><h2 >Lexis Nexis</h2>
        <div className="Form-Content">
            <h3 >KYC Profiles</h3>
            <div className="Form-Controls" >

{mockResponse.states.map((data,i) => (
     <div key={i}> <div> {data.state.data.name}</div>
     <div> {data.state.data.address}</div>
      <div> {data.state.data.phoneNbr}</div>
      <div> {data.state.data.vehicleMake}</div>
     </div>
      ))}

            </div></div></div>);
}



export default Validatorform;
