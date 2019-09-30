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
import Apiservices from "./services/Apiservices";
import LoaderModal from "./util/LoaderModal";
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
      loginType: "",
      mobileResolutions: false,
      loading: false,
      isValid: true,
      errorMessage: '',
      loggedIn
    };

    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
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
        const Servicecall = new Apiservices();

        let response = Servicecall.LOGIN_CALL("token", body, this.displaydata, this.errorHandle)

      }
    }
  }


  doesExists = function (obj: any) {
    return (obj != null && obj != undefined)
  }

  displaydata = (response: any) => {
    // debugger;

    let isError: boolean = this.doesExists(response.error);
    if (isError) {
      //
      this.setState({
        loading: false,
        isValid: false,
        errorMessage: response.error_description
      })
      return;
    }

    // console.log(JSON.parse(response.userAuthData));
    let authData = JSON.parse(response.userAuthData);
    let accessToken = response.access_token;
    let logedIn = this.doesExists(response.access_token);
    let userName = authData.Email
    let profilePicture = (authData.UserAttachment != "" && authData.UserAttachment != null) ? authData.UserAttachment[0].Attachment.Base64Text : ""
    this.props.updateSession({
      loggedIn: logedIn,
      token: accessToken,
      loginType: this.state.loginType,
      userName: userName,
      profileimg: profilePicture
    });
    var myOth = {
      "loggedIn": logedIn,
      "token": accessToken,
      "loginType": this.state.loginType,
      "userName": userName,
      "profileimg": profilePicture,
      "logo": "",
    };

    localStorage.setItem("authInfo", JSON.stringify(myOth))

    this.setState({
      loggedIn: logedIn,
      loading: false
    })

    if (response.ok) {

    }
  }

  errorHandle = (error: any) => {
    // console.log(error);
    this.setState({
      isValid: false,
      loading: false
    })
  }

  displayError = (data: any) => {
    this.setState({
      loading: false
    })
  }

  onChange = (e: any) => {

    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentWillMount() {
    this.setState({
      loginType: (this.props.match.params.usertype === "jobseeker" || this.props.match.params.usertype === "employer")
        ? this.props.match.params.usertype === "jobseeker" ? "jobseeker" : "employer"
        : 'jobseeker'
    })
  }

  componentWillUnmount() {
    this.props.updateSession({
      appProps: { showNav: true }
    });
    document.getElementById("root-container")!.style.height = "92%";
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
    this.props.updateSession({
      appProps: { showNav: false }
    });

    document.getElementById("root-container")!.style.height = "100%";
  }

  resize() {
    this.setState({
      mobileResolutions: (window.innerWidth <= 420) ? true : false
    })
    // this.setState({ hideNav: window.innerWidth <= 760 });
  }

  componentWillReceiveProps(nextProps: any) {
    this.setState({
      loginType: (this.props.match.params.usertype === "jobseeker" || this.props.match.params.usertype === "employer")
        ? this.props.match.params.usertype === "jobseeker" ? "jobseeker" : "employer"
        : 'jobseeker'
    })
  }



  render() {
    // console.log(this.props.match.params.usertype)

    if (this.state.loggedIn === true) {
      if (this.state.loginType === "employer") {
        return <Redirect to={"/Employeer-Dashbord"} />;

      } else {
        return <Redirect to={"/"} />;

      }
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
                            // pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,}).*"
                            required
                          />
                          {<div className="invalid-feedback text-left">
                            <h6> Please Provide Valid Password.</h6>
                            {/* <div>* Password Must Contain at least one number and one uppercase and lowercase letter and Special Character,
                              and  at least 8 or more characters</div> */}
                          </div>}
                        </div>
                        {!this.state.isValid ?
                          <div className="text-left text-danger mb-2">
                            <h6></h6>
                            <div>Please Provide Valid User Name and Password</div>
                          </div>
                          : ''}

                        <input type="submit" value="Login" className="btn btn-primary mb-2" />

                        <div className="text-primary">

                          <Link className="" to={"/ForgotPassword/" + this.state.loginType}>
                            Forgot Password
                                </Link>
                        </div>

                        <div className="text-primary">Please <span><Link to={"/Registration/" + this.state.loginType}><u>click here</u></Link> </span> for new user registration.</div>

                      </form>
                      {this.state.loginType == "employer" ? "" : ""
                        // <div className="row mt-2">
                        //   <div className="col">
                        //     <button className="btn  btn-block rounded-0 bg-danger border text-white">Google</button>
                        //   </div><div className="col">
                        //     <button className="btn  btn-block rounded-0 bg-primary border text-white">Facebook</button>
                        //   </div>
                        // </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </Col >
        </Row >
        {this.state.loading ?
          <LoaderModal></LoaderModal>
          : ''}
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