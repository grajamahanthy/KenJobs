import React, { CSSProperties } from "react";
import { Redirect } from "react-router-dom";
//Spinner

// import axios from 'axios';
import { AppState } from "../store/index";

import { Link } from 'react-router-dom';
// import { IsessionState } from "../store/auth/types";
import { updateSession } from "../store/auth/actions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux';
import { Tabs, Tab, Row, Col } from "react-bootstrap";
// import { ValidationForm, TextInput, TextInputGroup, FileInput, SelectGroup, Checkbox } from "react-bootstrap4-form-validation";


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
      loading: false,
      loggedIn
    };

    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.formType = this.formType.bind(this);
    this.resize = this.resize.bind(this);
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

      form.classList.add('was-validated');
      //e.preventDefault();
      const { username, password } = this.state;
      //Login Logic


      if (username != null && password != null) {
        let body = new URLSearchParams();
        body.set('username', username);
        body.set('password', password);
        body.set('grant_type', "password");
        this.setState({
          loading: true
        })
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
      loggedIn: logedIn, loading: false
    })

    if (response.ok) {

    }

  }

  displayError = (data: any) => {
    this.setState({
      loading: false
    })
    console.log(data);
  }

  onChange = (e: any) => {

    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

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

  componentWillUnmount() {
    this.props.updateSession({
      appProps: { showNav: true }
    });
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
    this.props.updateSession({
      appProps: { showNav: false }
    });
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
    let loader;
    if (this.state.loading) {
      loader =
        <div className="bg-white">
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-warning" role="status">
              <span className="sr-only text-dark">Loading...</span>
            </div>
            <br />
            <div>Loading...</div>
          </div>
        </div>
    } else {
      loader = ''
    }

    return (
      <>
        <Row className="ml-0 mr-0 h-100">
          {leftbar}
          <Col className="bg-white h-100 d-table">
            <div className="text-center d-table-cell align-middle h-100">
              <div className="mb-5" style={styles.userFriendlyNav}>

                <Link to="/" className="mr-5" style={styles.roundedCorners}>Home</Link>
                {this.state.loginType == "employer" ?
                  <Link to="/" className="mr-5" style={styles.roundedCorners}>Post Job</Link>
                  : <Link to="/" className="mr-5" style={styles.roundedCorners}>Search for Jobs</Link>}
              </div>
              <div id="container" className="">
                <h4 className="text-uppercase mt-20">{this.state.loginType + ' Login'}</h4>
                <div className="row text-white pt-4 pb-4 ">
                  <div className="col-sm-11 mx-auto pt-4 pb-4">

                    {/* <div className="btn-group btn-group-lg mb-5" role="group">
                      <button type="button" className={(this.state.isJobseekar) ? "btn  btn-Primary bg-primary  text-white" : "btn btn-secondary"} name="jobseeker" onClick={this.formType} >Job seeker</button>
                      <button type="button" className={(this.state.isJobseekar) ? "btn btn-secondary" : "btn  btn-Primary bg-primary  text-white"} name="employee" onClick={this.formType} >Employer</button>
                    </div> */}

                    <div className="info-form">
                      <form onSubmit={this.submitForm} className="needs-validation" noValidate>
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
                            required
                          />
                          <div className="invalid-feedback text-left">
                            <h6>
                              Please Provide Valid User Name.
                            </h6>
                          </div>
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
                        <input type="submit" value="Login" className="btn btn-primary mb-2" />

                        <div className="text-primary">

                          <Link className="" to={"/ForgotPassword/" + this.state.loginType}>
                            Forgot Password
                                </Link>
                        </div>

                        <div className="text-primary">Please <span><Link to={"/Registration/" + this.state.loginType}><u>click here</u></Link> </span> for new user registration.</div>

                      </form>
                      {this.state.loginType == "employer" ? "" :
                        <div className="row mt-2">
                          <div className="col">
                            <button className="btn  btn-block rounded-0 bg-danger border text-white">Google</button>
                          </div><div className="col">
                            <button className="btn  btn-block rounded-0 bg-primary border text-white">Facebook</button>
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col >
        </Row >
      </>
    );
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
)(Login)