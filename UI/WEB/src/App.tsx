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
import { UpdateSearchSession } from "./store/search/actions";
//Font ICONS Importing
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab, faFacebook } from '@fortawesome/free-brands-svg-icons'
import {
  faSuitcase, faMapMarkerAlt, faBuilding, faChessKing, faNewspaper, faWallet, faUserTie, faTransgender,
  faGlobe, faNetworkWired, faTrashAlt, faPlusSquare, faFileAlt, faUser, faEnvelope, faMobileAlt, faUniversity,
  faLaptopCode, faUpload, faDownload, faFilter, faGripVertical, faSort, faSortUp, faSortDown, faFileExcel, faSearch, faTimes
} from '@fortawesome/free-solid-svg-icons'
import { ToastContainer } from "react-toastify";
import Apiservices from "./components/services/Apiservices";
import FilterJobs from "./components/Jobs/FilterJobs";
import LandingForm from "./components/Landingpage";
import JobResult from "./components/Jobs/JobResult";

library.add(faSuitcase, faMapMarkerAlt, faBuilding, faChessKing, faNewspaper, faWallet, faUserTie, faTransgender,
  faGlobe, faNetworkWired, faTrashAlt, faPlusSquare, faFileAlt, faUser, faEnvelope, faMobileAlt, faUniversity, faLaptopCode,
  faUpload, faDownload, faFilter, faGripVertical, faSort, faSortUp, faSortDown, faFileExcel, faSearch, faTimes)

/*Creating Context*/

export const SearchContext = React.createContext<any>({})

const initialState = { isLandingPage: true, styleClass: "" }
const reducer = (state: any, action: any) => {
  switch (action) {
    case 'SearchPage': return {
      isLandingPage: false,
      styleClass: "Search-header "
    }
    case 'LandingPage': return {
      isLandingPage: true,
      styleClass: "Landing-header"
    }
    default: return state
  }
}



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

  render() {
    return (<>
      <SearchContext.Provider value={""}>
        <div className="h-100 theme-1">
          <Router>
            < Navigation app_prop={this.props.system}></Navigation>
            <div className={"row"} id="root-container">
              <div className="col-sm-12">
                <Route exact path="/login/:usertype" name="usertype" component={Login} />
                <Route exact path="/ForgotPassword/:usertype" name="usertype" component={ForgotPassword} />
                <Route exact path="/Registration/:usertype" name="usertype" component={Registration} />
                <Route exact path="/ChangePassword/:usertype/:email/:key" name="usertype" component={ChangePassword} />
                {/* <Route exact path="/ConfirmVerification/:usertype" name="usertype" component={ConfirmVerification} /> */}
                {/* <Route exact path="/" component={Home} /> */}
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
                <Route exact path="/candidates" component={CandidateList} />
                <Route exact path="/Jobdetails" component={Postjobdescription} />
                <Route exact path="/Editjob" component={Editjob} />
                <Route exact path="/candidate" component={Candidate} />
                <Route exact path="/Employeer-Dashbord" component={EmployerHome} />
                <Route exact path="/FilterJobs" component={FilterJobs} />
                <Route exact path="/Searchresult" component={JobResult} />
                <Route exact path="/" component={LandingForm} />

                {/* <Route component={NoMatch} /> */}

              </div>
              </div>
              {/* Footer */}
              {/* {this.props.system.appProps.showNav ? <div className="row">
                <div className="col-sm-12">
                <footer className="bg-primary text-white">
                  <div className="container">
                    <div className="">
                      <p>Kenjobs © 2020</p>
                    </div>

                  </div>
                </footer>
              </div></div> : ''} */}

            



          </Router>

          <ToastContainer />
        </div>

      </SearchContext.Provider>

    </>
    );
  }

};

const mapStateToProps = (state: AppState) => ({
  system: state.system,
  search: state.search

});

export default connect(
  mapStateToProps,
  { updateSession, UpdateSearchSession }
)(App);

