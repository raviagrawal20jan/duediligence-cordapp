import React from 'react';
import {Nav,NavDropdown,Image,Container} from 'react-bootstrap';
import { Helmet } from 'react-helmet'

function Header(props) {


 const Logout = () => {


if(props.type=="1"){
        localStorage.setItem("plogin", false);

        }
       else if(props.type=="2"){
                localStorage.setItem("llogin", false);

                }
              else  if(props.type=="3"){
                        localStorage.setItem("flogin", false);

                        }
window.location.reload();
    }


if(props.type==="1"){
    return (
    <div>
    <Helmet>
                  <title>Porsche</title>
                </Helmet>
        <Container className="pos-rel">
        <Nav defaultActiveKey="/PorscheBlocks" as="ul">
            <Nav.Item as="li">
                <Nav.Link href="/PorscheBlocks">
                <Image src="https://cdn.ui.porsche.com/porsche-design-system/marque/porsche-marque-trademark.medium.min.aa801f42028b1c385a5e26ae115da598@2x.png" className="logo-img" alt="logo" />
                </Nav.Link>



            </Nav.Item>
{localStorage.getItem("plogin")=='true'&&
            <Nav.Item as="li">
                            <Nav.Link onClick={Logout} className="logout_btn">
                            LogOut
                            </Nav.Link>



                        </Nav.Item>
                        }
        </Nav>

        </Container>

    </div>
    )
    }else if(props.type==="2"){
              return (
              <div>
              <Helmet>
                            <title>LexisNexis</title>
                          </Helmet>
                  <Container className="pos-rel">
                  <Nav defaultActiveKey="/PorscheBlocks" as="ul">
                      <Nav.Item as="li">
                          <Nav.Link href="/LexisNexis">
                          <Image src="LexisNexis-logo.png" className="logo-lexis" alt="logo" />
                          </Nav.Link>
                      </Nav.Item>
                      {localStorage.getItem("llogin")=='true'&&
                                  <Nav.Item as="li">
                                                  <Nav.Link onClick={Logout} className="logout_btn">
                                                  LogOut
                                                  </Nav.Link>



                                              </Nav.Item>
                                              }
                  </Nav>
                  </Container>

              </div>
              )
              }
              else if(props.type==="3"){
                            return (
                            <div>
                            <Helmet>
                                          <title>Ferrari</title>
                                        </Helmet>
                                <Container className="pos-rel">
                                <Nav defaultActiveKey="/PorscheBlocks" as="ul">
                                    <Nav.Item as="li">
                                        <Nav.Link href="/Ferrari">
                                        <Image src="Ferrari-Emblem.png" className="logo-img" alt="logo" />
                                        </Nav.Link>
                                    </Nav.Item>
                                    {localStorage.getItem("flogin")=='true'&&
                                                <Nav.Item as="li">
                                                                <Nav.Link onClick={Logout} className="logout_btn">
                                                                LogOut
                                                                </Nav.Link>



                                                            </Nav.Item>
                                                            }
                                </Nav>
                                </Container>

                            </div>
                            )
                            }
  }

export default Header;