import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';
import { AppState } from '../../store';
import { connect } from "react-redux";
import { updateSession } from "../../store/auth/actions";
import Apiservices from '../services/Apiservices';
import UserAttachmentModel from '../../Models/UserAttachment';
import ProfileImg from '../common/ProfileImg';
import ImageModel from '../../Models/Image'
const container = {
    width: '40px',
    height: '5px solid pink',
    borderRadius: '100px',
    background: '#333'
};
const name = {
    width: '100%',
    // textAlign: 'center',
    color: 'white',
    fontSize: '28px',
    lineHeight: '100px',
};


function Navigation(props: any) {
    let loginInfo;
    let Title = (props.app_prop.loggedIn === true) ? "Ken Jobs" : "";

    let imgdata = new ImageModel();
   //  console.log(props);

    if (props.app_prop.loggedIn === true) {
        loginInfo = (<>
          
            <NavDropdown title={props.app_prop.userName} id="nav-dropdown">
                <NavDropdown.Item eventKey="4.1">
                    <Link className="nav-link" to="/Logout">
                        Log Out
                    </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item eventKey="4.3">
                    {
                        (props.app_prop.loginType == "employer") ?
                            <Link className="nav-link" to="/editemployee">
                                Edit Profile
                        </Link>
                            : <Link className="nav-link" to="/edituser">
                                Edit Profile
                        </Link>
                    }
                </NavDropdown.Item>
            </NavDropdown>
            <ProfileImg imgdata={props}></ProfileImg>

        </>)
    } else {
        loginInfo =
            (
                <>
                    <NavItem>
                        <Link className="nav-link" to="/Login/employer"> Employer Login</Link>
                    </NavItem>
                    <NavItem>
                        <Link className="nav-link" to="/Login/jobseeker"> Jobseeker Login</Link>
                    </NavItem>
                </>
            )
    }
    return (<>
        <div className={props.app_prop.appProps.showNav ? "bg-primary" : "d-none"}>
            <div className="container">
                <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
                    <Navbar.Brand href="/">{Title}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        </Nav>
                        <Nav >
                            {props.app_prop.loginType == "employer" ?
                                <Link className="nav-link Active" to="/Employeer-Dashbord">
                                    Home
                                </Link>
                                : <Link className="nav-link Active" to="/">
                                    Home
                             </Link>
                            }

                            {

                                props.app_prop.loginType == "" ?
                                    <>
                                        <Link className="nav-link" to="/recdash">
                                            Post Job
                                    </Link>
                                        <Link className="nav-link" to="/filterjobs">
                                            Search Job
                                    </Link>
                                    </> :
                                    (props.app_prop.loginType == "employer") ?
                                        <Link className="nav-link" to="/recdash">
                                            Post Jobs
                                    </Link>
                                        : <Link className="nav-link" to="/filterjobs">
                                            Search Jobs
                                    </Link>


                            }

                            {loginInfo}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

            </div>
        </div>
    </>
    )
}

export default Navigation

