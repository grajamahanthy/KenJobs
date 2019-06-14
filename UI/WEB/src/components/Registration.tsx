import React from 'react';
import { Tabs, Tab, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default class Registration extends React.Component<any, any> {
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
            gender: ""
        };

        this.submitForm = this.submitForm.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    submitForm(e: any) {
        e.preventDefault();


        // let body = JSON.stringify(this.state)
        let body = new URLSearchParams();
        body.set('FirstName', this.state.firstName);
        body.set('LastName', this.state.lastName);
        body.set('Email', this.state.email);
        body.set('Password', this.state.password);
        body.set('ConfirmPassword', this.state.confirmpassword);
        body.set('PhoneNumber', this.state.phone);
        body.set('Gender_Id', this.state.gender);
        body.set('grant_type', "password");

        fetch("http://localhost:50768/api/Account/Register", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        }).then(response => {
            response.json().then((data) => {
            });
        })
            .catch(error => console.log("Error")
            )


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
                loginType: this.props.match.params.usertype
            })
        } else {

        }
    }

    componentWillReceiveProps(nextProps: any) {
        if (nextProps === "jobseeker" || nextProps === "employer")
            this.setState({
                isJobseekar: (nextProps.match.params.usertype === "jobseeker") ? true : false,
                loginType: nextProps.match.params.usertype

            })
    }

    render() {
        console.log(this.state);

        return (<>
            <Row className="ml-0 mr-0 h-100">
                <Col className="bg-primary h-100 d-table">
                    <div className="text-center d-table-cell align-middle"><h1 className="text-white">Ken Jobs</h1></div>
                </Col>
                <Col className="h-100 d-table">
                    <div className="text-center d-table-cell align-middle">
                        <div id="container" className="">
                            <h4 className="text-uppercase">{'Register as ' + this.state.loginType}</h4>
                            <div className="row text-white pt-5 pb-5 ">
                                <div className="col-sm-11 mx-auto pt-5 pb-5">
                                    <div className="info-form">
                                        <form onSubmit={this.submitForm} className="">
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
                                                />
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
                                                />
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
                                                />
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
                                                />
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
                                                />
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
                                                />
                                            </div>
                                            <div className="form-group">
                                                <div className="custom-control custom-radio custom-control-inline">
                                                    <input type="radio" id="gendermale" name="gender" value="1" onChange={this.onChange} className="custom-control-input" />
                                                    <label className="custom-control-label text-dark" htmlFor="gendermale">Male</label>
                                                </div>
                                                <div className="custom-control custom-radio custom-control-inline">
                                                    <input type="radio" id="genderfemale" name="gender" value="2" onChange={this.onChange} className="custom-control-input" />
                                                    <label className="custom-control-label text-dark" htmlFor="genderfemale">Female</label>
                                                </div>
                                                <div className="custom-control custom-radio custom-control-inline">
                                                    <input type="radio" id="genderother" name="gender" value="3" onChange={this.onChange} className="custom-control-input" />
                                                    <label className="custom-control-label text-dark" htmlFor="genderother">Others</label>
                                                </div>

                                            </div>

                                            <input type="submit" value="Register" className="btn btn-primary mb-2" />
                                            <div className="text-primary">Existing User ? <Link to={"/Login/" + this.state.loginType}><u>click here</u></Link> for Log in.</div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </>)
    }
}
