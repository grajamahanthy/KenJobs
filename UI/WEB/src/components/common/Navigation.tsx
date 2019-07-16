import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';

function Navigation(props: any) {

    let loginInfo;
    let Title = (props.app_prop.loggedIn === true) ? "Ken Jobs" : "";
    let UserName;

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
                    <Link className="nav-link" to="/Adduser">
                        Edit Profile
                    </Link>
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
                            <Link className="nav-link Active" to="/">
                                Home
                             </Link>

                            {/* {
                                props.app_prop.state.loginType == "employer" ?
                                    <Link className="nav-link" to="/recdash">
                                        Post Job
                                </Link>
                                    : <Link className="nav-link" to="/Jobs">
                                        Search Job
                                </Link>
                            } */}
                            <Link className="nav-link" to="/recdash">
                                Post Job
                                </Link>
                            <Link className="nav-link" to="/Jobs">
                                Search Job
                                </Link>

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

