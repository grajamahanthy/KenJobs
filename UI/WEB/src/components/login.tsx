import React from "react";
import { Redirect } from "react-router-dom";
// import axios from 'axios';
import { AppState } from "../store/index";

import { Link } from 'react-router-dom';
// import { IsessionState } from "../store/auth/types";
import { updateSession } from "../store/auth/actions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux';
import { Tabs, Tab, Row, Col } from "react-bootstrap";

class Login extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    const token = this.props.system.token
    let loggedIn = this.props.system.loggedIn;
    if (token == null) {
      loggedIn = false;
    }


    //let loggiedIn = false;
    this.state = {
      username: "",
      password: "",
      key: 'Login',
      isJobseekar: true,
      loginType: "",
      mobileResolutions: false,
      loggedIn
    };


    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.formType = this.formType.bind(this);
    this.resize = this.resize.bind(this);
  }

  submitForm(e: any) {

    e.preventDefault();
    const { username, password } = this.state;
    //Login Logic


    if (username != null && password != null) {
      let body = new URLSearchParams();
      body.set('username', username);
      body.set('password', password);
      body.set('grant_type', "password");

      fetch("http://localhost:50768/token", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
      }).then(response => {
        response.json().then((data) => {
          this.displaydata(data)

        });
      })
        .catch(error => this.displayError(error))
    }



  }

  displaydata = (response: any) => {


    let accessToken = response.access_token;
    let logedIn = (response.access_token !== '' && response.access_token !== undefined) ? true : false;
    let userName = response.userName
    this.props.updateSession({
      loggedIn: logedIn,
      token: accessToken,
      userName: userName
    });
    var myOth = {
      "loggedIn": logedIn,
      "token": accessToken,
      "userName": userName
    };

    localStorage.setItem("authInfo", JSON.stringify(myOth))

    this.setState({
      loggedIn: logedIn
    })

    if (response.ok) {

    }

  }

  displayError = (data: any) => {
    console.log(data);
  }

  onChange = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  change = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  formType = (e: any) => {
    this.setState({
      isJobseekar: (e.target.name === "jobseeker") ? true : false
    });
  }

  componentWillMount() {
    this.setState({
      isJobseekar: (this.props.match.params.usertype === "jobseeker") ? true : false,
      loginType: this.props.match.params.usertype
    })
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    this.setState({
      mobileResolutions: (window.innerWidth <= 420) ? true : false
    })
    // this.setState({ hideNav: window.innerWidth <= 760 });
  }

  componentWillReceiveProps(nextProps: any) {
    this.setState({
      isJobseekar: (nextProps.match.params.usertype === "jobseeker") ? true : false,
      loginType: nextProps.match.params.usertype

    })
  }


  render() {
    // console.log(this.props.match.params.usertype)
    console.log(this.state.mobileResolutions);
    if (this.state.loggedIn === true) {
      return <Redirect to="/" />;
    }
    let leftbar;
    if (this.state.mobileResolutions) {
      leftbar = ""
    } else {
      leftbar = <Col className="bg-primary h-100 d-table">
        <div className="text-center d-table-cell align-middle"><h1 className="text-white">Ken Jobs</h1></div>
      </Col>;
    }



    return (
      <>
        <Row className="ml-0 mr-0 h-100">
          {leftbar}
          <Col className="bg-white h-100 d-table">
            <div className="text-center d-table-cell align-middle">
              <div id="container" className="">
                <h4 className="text-uppercase">{this.state.loginType + ' Login'}</h4>
                <div className="row text-white pt-4 pb-4 ">
                  <div className="col-sm-11 mx-auto pt-4 pb-4">

                    {/* <div className="btn-group btn-group-lg mb-5" role="group">
                      <button type="button" className={(this.state.isJobseekar) ? "btn  btn-Primary bg-primary  text-white" : "btn btn-secondary"} name="jobseeker" onClick={this.formType} >Job seeker</button>
                      <button type="button" className={(this.state.isJobseekar) ? "btn btn-secondary" : "btn  btn-Primary bg-primary  text-white"} name="employee" onClick={this.formType} >Employer</button>
                    </div> */}

                    <div className="info-form">
                      <form onSubmit={this.submitForm} className="">
                        <div className="form-group">
                          <label className="sr-only">Email</label>
                          <input
                            type="email"
                            id="inputEmail"
                            className="form-control"
                            placeholder="User Name"
                            name="username"
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
                        <input type="submit" value="Login" className="btn btn-primary mb-2" />
                        <div className="text-primary">Please <span><Link to={"/Registration/" + this.state.loginType}><u>click here</u></Link> </span> for new user registration.</div>

                      </form>
                      <div className="row mt-2">
                        <div className="col">
                          <button className="btn  btn-block rounded-0 bg-danger border text-white">Google</button>
                        </div><div className="col">
                          <button className="btn  btn-block rounded-0 bg-primary border text-white">Facebook</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

      </>
    );
  }
}
const mapStateToProps = (state: AppState) => ({
  system: state.system
});

export default connect(
  mapStateToProps,
  { updateSession }
)(Login)

