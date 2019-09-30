import React, { CSSProperties } from "react";
import { Redirect } from "react-router-dom";
import { AppState } from "../store/index";
import { updateSession } from "../store/auth/actions";
import { connect } from 'react-redux';
import { Row, Col } from "react-bootstrap";
import CModal from "./util/Modal";
import { identifier } from "@babel/types";
import Apiservices from "./services/Apiservices";

class ChangePassword extends React.Component<any, any> {
  email: string = "";
  key: string = "";
  isPasswordSetSuccessfully: boolean = false;

  constructor(props: any) {
    super(props);
    this.email = (this.props.match.params.email);
    this.key = (this.props.match.params.key);

    this.validateKey(this, this.email, this.key);

    this.state = {
      isJobseeker: true,
      password: "",
      confirmpassword: "",
      mobileResolutions: false,
      matchpassword: true,
      message: false,
      isValidKey: false,
      showcontent: false,
      alert: {
        type: "success",
        title: "Thank You",
        body: "Your Password Changed Successfully",
        clickEvent: this.clickEvent,
        buttons: [{ id: 1, value: "Save" }, { id: 2, value: "Close" }],
        showModal: false,
        onHide: () => { this.setState({ alert: { showModal: false } }) }
      }
    };


    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.resize = this.resize.bind(this);
  }

  clickEvent(e: any, idx: number) {
    if (this.props.match.params.usertype !== "jobseeker") {
      this.setState({
        isJobseeker: false
      })
    }
  }

  validateKey = function (that: any, email: string, key: string) {
    //debugger;
    const Servicecall = new Apiservices();

    let responce = Servicecall.GET_CALL("User/ValidateKey?email=" + email + "&key=" + key + "&codeFor=changepassword", null, 
    that.isvalid,that.errorHandle)

  }

  isvalid = (data: any) => {
    if (data == 1)
      this.setState(
        {
          isValidKey: true,
          showcontent: true
        })
    else
      this.setState(
        {
          isValidKey: false,
          showcontent: true
        })
  }

  errorHandle=(error:any)=>{
  }

  submitForm(e: any) {
    let that: any = this;
    e.preventDefault();
    var form = document.forms[0];
    if (form.checkValidity() === false) {
      e.stopPropagation();
      form.classList.add('was-validated');
      return false;
    } else {
      this.setState(
        {
          matchpassword: true
        })

      const { password, confirmpassword } = this.state;


      if (password === confirmpassword) {
        let body = new URLSearchParams();
        body.set('Email', this.email);
        body.set('NewPassword', password);
        body.set('ConfirmPassword', confirmpassword);

        const Servicecall = new Apiservices();

        let responce = Servicecall.POST_CALL("account/ResetPassword", body, that.success,that.errorHandle)


      }
      else {
        this.setState(
          {
            matchpassword: false
          })
      }

    }
  }

  success = (data: any) => {
    this.isPasswordSetSuccessfully = true;
    this.setState({
      alert: {
        type: "success",
        title: "Success",
        body: "Your Password Changed Successfully",
        clickEvent: this.clickEvent,
        buttons: [{ id: 1, value: "Ok" }],
        showModal: true
      }
    })
  }

  onChange = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  resize() {
    this.setState({
      mobileResolutions: (window.innerWidth <= 420) ? true : false
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


  render() {
    if (!this.state.showcontent)
      return (<>Loading....</>);

    if (this.isPasswordSetSuccessfully)
      return this.state.isJobseeker ? <Redirect to="/Login/jobseeker" /> : <Redirect to="/Login/employer" />;

    //debugger;
    if (!this.state.isValidKey && this.state.showcontent)
      return (<>This link is expired. Please try again.</>)

    let modalClose = () => { this.setState({ showModal: false }) };
    let errormessage = !this.state.matchpassword ?
      <div className="alert alert-danger mt-1" role="alert">
        Password and Confirm Password does not match
      </div> : ''

    if (this.state.loggedIn === true)
      return <Redirect to="/" />;

    let leftbar;
    if (this.state.mobileResolutions)
      leftbar = ""
    else {
      leftbar = <Col className="bg-primary h-100 d-table">
        <div className="text-center d-table-cell align-middle"><h1 className="text-white">Ken Jobs</h1></div>
      </Col>;
    }


    if (this.state.showcontent)
      return (
        <>
          <Row className="ml-0 mr-0 h-100">
            {leftbar}
            <Col className="bg-white h-100 d-table">

              <div className=" row text-center d-table-cell align-middle h-100">
                <div className="row">
                  {/* {this.state.showModal?<CModal message={this.state.alert} show={this.state.showModal} onHide={modalClose}></CModal>:""} */}
                  <CModal message={this.state.alert}></CModal>
                </div>
                <div className="mb-5" style={styles.userFriendlyNav}>
                </div>
                <div id="container" className="">
                  <h4 className="text-uppercase mt-20">Please Reset Password</h4>
                  <div className="row text-white pt-4 pb-4 ">
                    <div className="col-sm-11 mx-auto pt-4 pb-4">
                      <div className="info-form">
                        <form onSubmit={this.submitForm} className="needs-validation" noValidate>
                          <div className="form-group">
                            <label className="sr-only">Password</label>
                            <input
                              type="text"
                              id="Password"
                              className="form-control"
                              placeholder="Password"
                              name="password"
                              value={this.state.password}
                              onChange={this.onChange}
                              pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,}).*"
                              required
                            />
                            <div className="invalid-feedback text-left">
                              {this.state.password.length < 1 ? 'Please Enter Password' : "Please Enter Valid Password"}
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="sr-only">Confirm Password</label>
                            <input
                              type="text"
                              id="confirmPassword"
                              className="form-control"
                              placeholder="Confirm Password"
                              name="confirmpassword"
                              value={this.state.confirmpassword}
                              onChange={this.onChange}
                              pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,}).*"
                              required
                            />
                            <div className="invalid-feedback text-left">
                              {this.state.confirmpassword.length < 1 ? 'Please Enter Confirm Password' : "Please Enter Valid Confirm Password"}
                            </div>
                            {errormessage}
                          </div>

                          <input type="submit" value="Reset Password" className="btn btn-primary mb-2" />

                        </form>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

        </>
      );
    else
      return (<></>)
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
)(ChangePassword)


