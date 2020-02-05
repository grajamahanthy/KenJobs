import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, Button, Accordion, Card } from 'react-bootstrap';
import { AppState } from '../../store';
import { connect } from "react-redux";
import { updateSession } from "../../store/auth/actions";
import { UpdateSearchSession } from "../../store/search/actions";
import Apiservices from '../services/Apiservices';
import UserAttachmentModel from '../../Models/UserAttachment';
import ProfileImg from '../common/ProfileImg';
import ImageModel from '../../Models/Image'
import Home from '../Home';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function Navigation(props: any) {
    let loginInfo;
    let Title = (props.app_prop.loggedIn === true) ? "KEN JOBS" : "KEN JOBS";

    let imgdata = new ImageModel();


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
            <NavItem>
                <ProfileImg imgdata={props}></ProfileImg>
            </NavItem>

        </>)
    } else {
        loginInfo =
            (
                <>
                    <NavItem>
                        <Link className=" btn btn-outline-light btn-lg my-2 my-sm-0" to="/Login/employer"> Employer Login</Link>

                    </NavItem>
                    <NavItem>
                        <Link className=" btn btn-outline-light btn-lg" to="/Login/jobseeker"> Jobseeker Login</Link>
                    </NavItem>
                    <NavItem>
                        <Link className="nav-link" to="/Login/jobseeker"> Post Your Resume</Link>
                    </NavItem>
                </>
            )
    }
    return (<>

        <div className={props.app_prop.appProps.showNav ? "bg-primary" : "d-none"}>
            <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" className="navbar">
                <Navbar.Brand className="">
                    <Link className="nav-link mt-2" to="/">
                        <h2 className="text-white">{Title}</h2>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                    <Nav>
                        {props.app_prop.loginType == "employer" ?
                            <NavItem>
                                <Link className="nav-link" to="/Employeer-Dashbord">
                                    Home
                                </Link>
                            </NavItem>
                            :
                            <NavItem>
                                <Link className="nav-link" to="/">
                                    Home
                             </Link>
                            </NavItem>
                        }
                        {
                            props.app_prop.loginType == "" ?
                                <>
                                    <NavItem>
                                        <Link className="nav-link" to="/recdash">
                                            Post Job
                                    </Link>
                                    </NavItem>
                                    <NavItem>
                                        {/* <Link className="nav-link" to="/filterjobs">
                                            Search Job
                                    </Link> */}
                                        <Link className="nav-link" to="/Searchresult">
                                            Search Jobs
                                    </Link>
                                    </NavItem>
                                </> :
                                (props.app_prop.loginType == "employer") ?
                                    <NavItem>
                                        <Link className="nav-link" to="/recdash">
                                            Post Jobs
                                         </Link>
                                    </NavItem>

                                    : <NavItem>
                                        {/* <Link className="nav-link" to="/filterjobs">
                                            Search Jobs
                                    </Link> */}
                                        <Link className="nav-link" to="/Searchresult">
                                            Search Jobs
                                    </Link>
                                    </NavItem>
                        }
                        {loginInfo}
                    </Nav>
                </Navbar.Collapse>


            </Navbar>

            <Accordion className="mobileSearchbar">
                <div className="bg-primary">
                    <Accordion.Toggle as={Button} variant="link" eventKey="0" className="border-0">
                        <span className="text-white float-right">
                            <FontAwesomeIcon icon="search" size="lg" className="mr-2" />
                            Search Job                            </span>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <div>
                            {(props.system.loginType === "employer") ? "" : <Home />}
                        </div>
                    </Accordion.Collapse>
                </div>
            </Accordion>

            <div className="searchbar">
                {(props.system.loginType === "employer") ? "" : <Home />}
            </div>




        </div>
    </>
    )
}



const mapStateToProps = (state: AppState) => ({
    system: state.system,
    search: state.search

});

export default connect(
    mapStateToProps,
    { updateSession, UpdateSearchSession }
)(Navigation);

