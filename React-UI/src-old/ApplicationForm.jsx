import { FormattedMessage } from 'react-intl';
import TextField from '@material-ui/core/TextField';
import React, { Component, Fragment, useState } from 'react';
import Button from '@material-ui/core/Button';
import { applyMiddleware } from 'redux';


import thunk from 'redux-thunk';
import { createStore } from 'redux-dynamic-reducer'

function Lenderform(props) {



    // Declare a new state variable, which we'll call "count"
    const [input, setInput] = useState('');
    const requestObject = {
                            "options": {
                              "trackProgress": true
                            },
                            "validater": {
                              "name": "O=LexisNexis,L=Boston,C=US"
                            },
                            "numberOfFiles": 1,
                            "name": "Jatin Agrawal",
                            "address": "Agra, UP",
                            "phoneNbr": "989787878",
                            "income": "999",
                            "vehicleMake": "Porsche",
                            "vehicleModel": "Cyne",
                            "vehicleStyle": "RXZ"
                          }
                          const requestOptions = {

                                  method: 'POST',
                                  headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*' },
                                  body: JSON.stringify(requestObject)
                              };
    const submit = () => {
       props.onSubmitLenderForm(true);
    }

    return (<div className="App-header"><h2 >PORSCHE LENDER</h2>
        <div className="Form-Content">
            <h3 >PORSCHE LENDER FORM</h3>
            <div className="Form-Controls">
                <div className="firstDiv">
                    <TextField
                        id="fname"

                        label="First Name"
                        value={input}
                        type="text"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <TextField
                        id="lname"
                        name="lname"
                        label="Last Name"
                    />
                </div>
                <div className="addressDiv">
                    <TextField
                        id="Address"
                        name="Address"
                        label="Address"
                    />
                </div>
                <div className="phoneDiv">
                    <TextField
                        id="phone"
                        name="phone"
                        label="Phone"
                    />
                </div>
                <div className="VechicleMake">
                    <TextField
                        id="VechicleMake"
                        name="VechicleMake"
                        label="Vechicle Make"
                    />
                </div>
                <div className="VechicleModel">
                    <TextField
                        id="VechicleModel"
                        name="VechicleModel"
                        label="Vechicle Model"
                    />
                </div>
                <div className="VechicleStyle">
                    <TextField
                        id="VechicleStyle"
                        name="VechicleStyle"
                        label="Vechicle Style"
                    />
                </div>
                <div className="SubmitButton">
                    <Button
                        variant="contained"
                        color="primary"
                        flex-xs={100}
                        role="button"
                        onClick={submit}
                        fullWidth
                    >Submit</Button>
                </div>
            </div></div></div>);
}



export default Lenderform;
