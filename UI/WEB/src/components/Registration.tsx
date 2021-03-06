import React, { CSSProperties } from 'react';
import { Tabs, Tab, Row, Col, Navbar, Nav } from "react-bootstrap";
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AppState } from "../store/index";
import { connect } from 'react-redux';
import { updateSession } from "../store/auth/actions";
import Apiservices from './services/Apiservices';
import LoaderModal from './util/LoaderModal';


class Registration extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            isJobseekar: true,
            loginType: "",
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            password: "",
            confirmpassword: "",
            gender: "",
            isIndividual: '0',
            companyname: '',
            userRoleId: '',
            redirect: false,
            validemail: true,
            loading: false,
        };

        this.submitForm = this.submitForm.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    submitForm(e: any) {
        e.preventDefault();
        var form = document.forms[0];
        if (form.checkValidity() === false) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return false;
        }
        else {
            // let body = JSON.stringify(this.state)
            form.classList.add('was-validated');

            if (this.state.password === this.state.confirmpassword) {

                this.setState({
                    loading: true,
                })
                let body = new URLSearchParams();
                body.set('FirstName', this.state.firstName);
                body.set('LastName', this.state.lastName);
                body.set('Email', this.state.email);
                body.set('Password', this.state.password);
                body.set('ConfirmPassword', this.state.confirmpassword);
                body.set('PhoneNumber', this.state.phone);
                body.set('Gender_Id', this.state.gender);
                body.set('IsIndividual', this.state.isIndividual);
                body.set('CompanyName', this.state.companyname);
                body.set('UserRoleId', this.state.userRoleId);
                body.set('grant_type', "password");

                const Servicecall = new Apiservices();

                let responce = Servicecall.POST_CALL('Account/Register', body, this.success, this.errorHandle)


            } else {
                return false;
            }
        }
    }
    errorHandle = (error: any) => {
        this.setState({
            loading: false,
        })

    }
    success = (data: any) => {
        this.setState({
            loading: false,
        })
        if (data == 1) {
            this.setState({
                redirect: true
            })
        } else if (data == 2) {
            this.setState({
                validemail: false,
            })
        }
    }
    onChange = (e: any) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    componentWillMount() {
        if (this.props.match.params.usertype === "jobseeker" || this.props.match.params.usertype === "employer") {
            this.setState({
                isJobseekar: (this.props.match.params.usertype === "jobseeker") ? true : false,
                loginType: this.props.match.params.usertype,
                userRoleId: (this.props.match.params.usertype === "jobseeker") ? 1 : 2,
            })
        }
    }

    componentDidMount() {
        this.props.updateSession({
            appProps: { showNav: false }
        });
        document.getElementById("root-container")!.style.height = "100%";

    }

    componentWillUnmount() {
        this.props.updateSession({
            appProps: { showNav: true }
        });
        document.getElementById("root-container")!.style.height = "92%";

    }

    componentWillReceiveProps(nextProps: any) {
        if (nextProps === "jobseeker" || nextProps === "employer")
            this.setState({
                isJobseekar: (nextProps.match.params.usertype === "jobseeker") ? true : false,
                loginType: nextProps.match.params.usertype,
                userRoleId: (this.props.match.params.usertype === "jobseeker") ? 1 : 2,
            })
    }

    render() {


        if (this.state.redirect) {
            return <Redirect to={"/Login/" + this.state.loginType} />;
        }
        let Registeroptions;
        if (this.state.userRoleId === 2) {
            Registeroptions = <div className="form-group">
                <div className="text-left">
                    <label className="text-dark mr-2 ">Register as :</label>
                    <div className="custom-control custom-radio custom-control-inline ">
                        <input type="radio" id="isIndividual" name="isIndividual" value="0" onChange={this.onChange} className="custom-control-input" required />
                        <label className="custom-control-label text-dark" htmlFor="isIndividual">Individual</label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline ">
                        <input type="radio" id="isnotIndividual" name="isIndividual" value="1" onChange={this.onChange} className="custom-control-input" required />
                        <label className="custom-control-label text-dark" htmlFor="isnotIndividual">Company</label>
                        <div className="invalid-feedback ml-5">
                            <h6> Required</h6>
                        </div>
                    </div>
                </div>
            </div>
        }

        let companyname;
        if (this.state.isIndividual == "1") {
            companyname = <div className="form-group">
                <label className="sr-only">Company Name</label>
                <input
                    type="text"
                    className="form-control"
                    name="companyname"
                    id="companyname"
                    placeholder="Company Name"
                    value={this.state.companyname}
                    onChange={this.onChange}
                    required
                />
                <div className="invalid-feedback text-left">
                    <h6>
                        Please Provide Company Name.
                    </h6>
                </div>
            </div>
        }

        return (<>
            <Navbar fixed="top">
                <Navbar.Brand className="">
                    <Link className="nav-link mt-2" to="/">
                        <h2 className="text-white">{"KEN JOBS"}</h2>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                    <Nav className="float-right">
                        <Link to="/">
                            <FontAwesomeIcon icon="search" className="text-primary" />
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>


            <Row className="ml-0 mr-0 h-100 bg-white">
                <div className="col-sm login_leftimg text-right">
                    <div className="login_centered  mr-2">
                        <h3 className="font-weight-bold text-white">
                            MAXIMISE
                        </h3>
                        <h4 className="font-weight-light text-white" style={{ verticalAlign: "middle" }}>
                            YOUR CAREER
                            <p> POTENTIAL</p>
                        </h4>
                    </div>
                </div>
                <div className="col-sm">
                    <div className="mt-5 align-middle">

                        <div id="container" className="">
                            <div className="col-sm-8 mx-auto pt-4 pb-4">
                                <div className="pl-3 mt-20">
                                    <span className="text-warning display-4">
                                        {this.state.loginType === "employer" ? "Employer" : "Jobseeker"}
                                    </span>
                                    <h3>Registration</h3>

                                </div>
                                <div className="info-form">
                                    <form onSubmit={this.submitForm} className="needs-validation" noValidate>
                                        <div className="form-group">
                                            <label className="sr-only">Firs tName</label>
                                            <input
                                                type="text"
                                                id="inputFirstName"
                                                className="form-control"
                                                placeholder="First Name"
                                                name="firstName"
                                                value={this.state.firstName}
                                                onChange={this.onChange}
                                                required
                                            />
                                            <div className="invalid-feedback text-left">
                                                <h6>
                                                    Please Provide First Name.
                                                    </h6>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="sr-only">Lastt Name</label>
                                            <input
                                                type="text"
                                                id="inputlastName"
                                                className="form-control"
                                                placeholder="Last Name"
                                                name="lastName"
                                                value={this.state.lastName}
                                                onChange={this.onChange}
                                                required
                                            />
                                            <div className="invalid-feedback text-left">
                                                <h6>
                                                    Please Provide Last Name.
                                                    </h6>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="sr-only">Phone number</label>
                                            <input
                                                type="text"
                                                id="inputphone"
                                                className="form-control"
                                                placeholder="Phone number"
                                                name="phone"
                                                value={this.state.phone}
                                                onChange={this.onChange}
                                                required
                                                pattern="(?=.*[0-9])(?=.{10,}).*"
                                            />
                                            <div className="invalid-feedback text-left">
                                                <h6>
                                                    Please Provide Phone number.
                                                    </h6>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="sr-only">Email</label>
                                            <input
                                                type="email"
                                                id="inputEmail"
                                                className="form-control"
                                                placeholder="Emaail Address"
                                                name="email"
                                                value={this.state.username}
                                                onChange={this.onChange}
                                                required
                                            />
                                            <div className="invalid-feedback text-left">
                                                <h6>
                                                    Please Provide Email.
                                                    </h6>
                                            </div>
                                            {
                                                this.state.validemail ? "" :
                                                    <div className="has-error mt-2 text-left text-danger">
                                                        <h6>
                                                            Email Already Exists, Please Try Another.
                                                    </h6>
                                                    </div>
                                            }
                                        </div>
                                        <div className="form-group">
                                            <label className="sr-only">Password</label>
                                            <input
                                                type="password"
                                                id="inputPassword"
                                                className="form-control"
                                                placeholder="password"
                                                name="password"
                                                value={this.state.password}
                                                onChange={this.onChange}
                                                pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,}).*"

                                                required
                                            />
                                            <div className="invalid-feedback text-left">
                                                <h6> Please Provide Valid Password.</h6>
                                                <div>* Password Must Contain at least one number and one uppercase and lowercase letter and Special Character,
                                                         and  at least 8 or more characters</div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="sr-only">Confirm Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                name="confirmpassword"
                                                id="confirmpassword"
                                                placeholder="Confirm Password"
                                                value={this.state.confirmpassword}
                                                onChange={this.onChange}
                                                pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,}).*"
                                                required
                                            />
                                            <div className="invalid-feedback text-left">
                                                <h6>
                                                    {(this.state.password === this.state.confirmpassword) ? '' : 'Password and Confim Password not matched'}
                                                    Please Provide Confirm Password.
                                                    </h6>
                                            </div>
                                        </div>
                                        {Registeroptions}
                                        {companyname}
                                        <div className="form-group">
                                            <div className="text-left">
                                                <label className="text-dark mr-2">Gender :</label>

                                                <div className="custom-control custom-radio custom-control-inline">
                                                    <input type="radio" id="gendermale" name="gender" value="1" onChange={this.onChange} className="custom-control-input" required />
                                                    <label className="custom-control-label text-dark" htmlFor="gendermale">Male</label>
                                                </div>
                                                <div className="custom-control custom-radio custom-control-inline">
                                                    <input type="radio" id="genderfemale" name="gender" value="2" onChange={this.onChange} className="custom-control-input" required />
                                                    <label className="custom-control-label text-dark" htmlFor="genderfemale">Female</label>
                                                </div>
                                                <div className="custom-control custom-radio custom-control-inline">
                                                    <input type="radio" id="genderother" name="gender" value="3" onChange={this.onChange} className="custom-control-input" required />
                                                    <label className="custom-control-label text-dark" htmlFor="genderother">Others</label>
                                                    <div className="invalid-feedback ml-5">
                                                        <h6> Required</h6>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                        <input type="submit" value="Register" className="btn btn-primary btn-md btn-block mb-2" />
                                        {/* <div className="text-primary">Existing User ? <Link to={"/Login/" + this.state.loginType}><u>click here</u></Link> for Log in.</div> */}
                                        <div className="text-primary text-center mt-4">
                                            <Link to={"/Login/" + this.state.loginType}> <b>Existing User ?</b></Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Row>
            {this.state.loading ?
                <LoaderModal></LoaderModal> : ""}
        </>)
    }
}

const styles = {
    userFriendlyNav: {
        position: "absolute",
        top: "20px",
        right: "20px"
    } as CSSProperties,
    roundedCorners: {
        borderRadius: "50px"
    } as CSSProperties

};

const mapStateToProps = (state: AppState) => ({
    system: state.system
});

export default connect(
    mapStateToProps,
    { updateSession }
)(Registration)
