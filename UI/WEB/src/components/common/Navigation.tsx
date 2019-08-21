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
    let UserProfileAttachment = new UserAttachmentModel();
    let imgdata = new ImageModel();
    let UserProfilePicture;
    const displayProfilePicture = (data: any) => {
        UserProfileAttachment = data;

        // console.log(UserProfileAttachment.Attachment.Base64Text);
        // UserProfilePicture = (UserProfileAttachment.Attachment.Id != 0 && UserProfileAttachment.Attachment.Base64Text != "")
        //     ? <img src={UserProfileAttachment.Attachment.Base64Text } className="rounded-circle ml-2" width="30" height="40" />
        //     :
        //     <div id="container" style={container}>
        //         <div id="name" style={name}>
        //             {'Sekhar'}
        //         </div>
        //     </div>

        //     ;

    }


    const errorHandle = () => {

    }

    // if (props.app_prop.loggedIn === true) {
    //     const Servicecall = new Apiservices();
    //     let res1 = Servicecall.GET_SECURE_CALL('Attachment?attachmentTypeId=1', null, displayProfilePicture, errorHandle)
    // }

    if (props.app_prop.loggedIn === true) {
        loginInfo = (<>
        <img src={require('../../assets/images/profile.png')} className="rounded-circle img-fluid mt-2" height="20" width="25" alt='' />
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
    console.log(props.app_prop.loginType)
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
                                        <Link className="nav-link" to="/Jobs">
                                            Search Job
                                    </Link>
                                    </> :
                                    (props.app_prop.loginType == "employer") ?
                                        <Link className="nav-link" to="/recdash">
                                            Post Jobs
                                    </Link>
                                        : <Link className="nav-link" to="/Jobs">
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

