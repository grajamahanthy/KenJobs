import React, { CSSProperties } from "react";
import { Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';
import { updateSession } from "../store/auth/actions";
import { Row, Col } from "react-bootstrap";
import { AppState } from "../store";
import { connect } from 'react-redux';
import CModal from "./util/Modal";
import Apiservices from "./services/Apiservices";

class ForgotPassword extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    //Custom Functions binding Start
    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.resize = this.resize.bind(this);
    //Custom Functions binding End



    //UI Elements State Start
    this.state = {
      username: "",
      alert: {
        type: "success",
        title: "Thank You",
        body: "Please use the link sent to your email for setting the password.",
        clickEvent: this.clickEvent,
        buttons: [{ id: 1, value: "OK" }],
        showModal: false,
        onHide: () => { this.setState({ alert: { showModal: false } }) }
      }
    }
    //UI Elements State End
  }



  //Custom Functions Start-------------------------------------------------------------
  clickEvent(e: any, idx: number) {

  }
  onChange = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitForm(e: any) {
    e.preventDefault();
    var form = document.forms[0];
    if (form.checkValidity() === false) {
      e.stopPropagation();
      form.classList.add('was-validated');
      return false;
    }
    else {
      const { username } = this.state;

      if (username && username != "") {
        let body = new URLSearchParams();
        body.set('Email', username);

        let Servicecall = new Apiservices();


        let url = 'User/ForgotPassword';
        let responce = Servicecall.POST_CALL(url, body, this.Success,this.errorHandle)
      }
      else {
        console.log("Please provide your email for resetting the password.");
      }
    }
  }
  errorHandle=(error:any)=>{

  }
  Success = () => {
    this.setState({
      alert: {
        type: "success",
        title: "Success",
        body: "Please use the link sent to your email for setting the password.",
        clickEvent: this.clickEvent,
        buttons: [{ id: 1, value: "Ok" }],
        showModal: true
      }
    });
  }

  resize() {
    this.setState({
      mobileResolutions: (window.innerWidth <= 420) ? true : false
    })
  }
  //Custom Functions End-------------------------------------------------------------





  //Component life cycle events start-------------------------------------------------------------
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
  //Component life cycle events End-------------------------------------------------------------


  render() {
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



    return (
      <>
        <CModal message={this.state.alert}></CModal>
        <Row className="ml-0 mr-0 h-100">
          {leftbar}
          <Col className="bg-white h-100 d-table">
            <div className="text-center d-table-cell align-middle h-100">
              <div className="mb-5" style={styles.userFriendlyNav}>
                <Link to="/" className="mr-5" style={styles.roundedCorners}>Home</Link>
              </div>
              <div id="container" className="">
                <h4 className="text-uppercase mt-20">Forgot Password</h4>
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
                            Please Enter Valid Email Id
                          </div>

                        </div>
                        <input type="submit" value="Change Password" className="btn btn-primary mb-2" />
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
)(ForgotPassword)

