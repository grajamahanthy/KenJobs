import React from "react";
import { connect } from "react-redux";
import "./scss/styles.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/Home";
import Dashboard from "./components/dashbord";
// import { Registration } from "./components/Registration";
import Logout from "./components/Logout";
import Jobs from "./components/Jobs/Jobs";
import Postjob from "./components/Jobs/Postjob";
import Userprofile from "./components/User/Userprofile"
import Employeeprofile from "./components/User/Employeeprofile"
import Applyjob from "./components/Jobs/Applyjob";
import Navigation from './components/common/Navigation';
import { AppState } from "./store/index";
import Employeedashbord from "./components/User/Employeedashbord";
import Jobdescription from "./components/Jobs/JobDescription";
import Registration from "./components/Registration";
import ForgotPassword from "./components/ForgotPassword";
import ChangePassword from "./components/ChangePassword";
// import ConfirmVerification from "./components/ConfirmVerification";
import CandidateList from "./components/User/Candidatelist";
import Postjobdescription from "./components/Jobs/PostedJobDescription";
import Editjob from "./components/Jobs/EditJob";
import Candidate from "./components/User/Candidate";
import CandidateProfile from "./components/User/candidateprofile";
import favoritejob from "./components/Jobs/FavoriteJob";
import EmployerHome from "./components/EmployerHome";
// import { IsessionState } from "./store/auth/types";
import { updateSession } from "./store/auth/actions";




//Font ICONS Importing
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab, faFacebook } from '@fortawesome/free-brands-svg-icons'
import {
  faSuitcase, faMapMarkerAlt, faBuilding, faChessKing, faNewspaper, faWallet, faUserTie, faTransgender,
  faGlobe, faNetworkWired, faTrashAlt, faPlusSquare, faFileAlt, faUser, faEnvelope, faMobileAlt, faUniversity,
  faLaptopCode, faUpload, faDownload, faFilter, faGripVertical, faSort, faSortUp, faSortDown, faFileExcel
} from '@fortawesome/free-solid-svg-icons'
import { ToastContainer } from "react-toastify";
import Apiservices from "./components/services/Apiservices";
import FilterJobs from "./components/Jobs/FilterJobs";

library.add(faSuitcase, faMapMarkerAlt, faBuilding, faChessKing, faNewspaper, faWallet, faUserTie, faTransgender,
  faGlobe, faNetworkWired, faTrashAlt, faPlusSquare, faFileAlt, faUser, faEnvelope, faMobileAlt, faUniversity, faLaptopCode,
  faUpload, faDownload, faFilter, faGripVertical, faSort, faSortUp, faSortDown, faFileExcel)

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    const token = localStorage.getItem("token");
    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      loggedIn,
      profileImg: '',
    }
    const isAuthenticated = localStorage.getItem("authInfo");
    // console.log(localStorage.getItem("authInfo"));
    if (isAuthenticated) {

      this.props.updateSession(JSON.parse(isAuthenticated))
    }
  }


  componentDidMount() {

  }

  render() {
    return (<>
      <Router>
        {/* {login_page} */}
        < Navigation app_prop={this.props.system}></Navigation>
        <Route exact path="/login/:usertype" name="usertype" component={Login} />
        <Route exact path="/ForgotPassword/:usertype" name="usertype" component={ForgotPassword} />
        <Route exact path="/ChangePassword/:usertype/:email/:key" name="usertype" component={ChangePassword} />
        {/* <Route exact path="/ConfirmVerification/:usertype" name="usertype" component={ConfirmVerification} /> */}
        <Route exact path="/" component={Home} />
        <Route exact path="/Dashboard" component={Dashboard} />
        <Route exact path="/editemployee" component={Employeeprofile} />
        <Route exact path="/Jobs" component={Jobs} />
        <Route exact path="/applyjob" component={Applyjob} />
        <Route exact path="/favoritejob" component={favoritejob} />
        <Route exact path="/Logout" component={Logout} />
        <Route exact path="/postjobs" component={Postjob} />
        <Route exact path="/profile" component={Userprofile} />
        <Route exact path="/edituser" component={CandidateProfile} />
        <Route exact path="/recdash" component={Employeedashbord} />
        <Route exact path="/Jobresult" component={Jobdescription} />
        <Route exact path="/Registration/:usertype" name="usertype" component={Registration} />
        <Route exact path="/candidates" component={CandidateList} />
        <Route exact path="/Jobdetails" component={Postjobdescription} />
        <Route exact path="/Editjob" component={Editjob} />
        <Route exact path="/candidate" component={Candidate} />
        <Route exact path="/Employeer-Dashbord" component={EmployerHome} />
        <Route exact path="/FilterJobs" component={FilterJobs} />

        {/* <Route component={NoMatch} /> */}

      </Router>
      <ToastContainer />

    </>
    );
  }

};

const mapStateToProps = (state: AppState) => ({
  system: state.system
});

export default connect(
  mapStateToProps,
  { updateSession }
)(App);

