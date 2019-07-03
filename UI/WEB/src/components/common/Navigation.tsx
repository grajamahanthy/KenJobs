import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';

function Navigation(props: any) {

    let loginInfo;
    let Title = (props.login_state.loggedIn === true) ? "Ken Jobs" : "";
    let UserName;

    if (props.login_state.loggedIn === true) {
        loginInfo = (<>
            <Link className="nav-link" to="/Jobs">
                Search Job
         </Link>
            <NavDropdown title={props.login_state.userName} id="nav-dropdown">
                <NavDropdown.Item eventKey="4.1">
                    <Link className="nav-link" to="/Logout">
                        Log Out
                    </Link>
                </NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item eventKey="4.2">
                    <Link className="nav-link" to="/profile">
                        Profile
                </Link>
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="4.3">
                    <Link className="nav-link" to="/Adduser">
                        Edit Profile
                    </Link>
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="4.4">
                    <Link className="nav-link" to="/postjob">
                        Post Job
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
        <div className="bg-primary">
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


                            <Link className="nav-link" to="/recdash">
                                Post Job
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

