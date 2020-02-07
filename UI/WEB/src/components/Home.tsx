import React from "react";
import JobSearch from './Jobs/JobSearchComponent';
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { AppState } from "../store";
import { Isearchsession } from '../store/search/types'
import { updateSession } from "../store/auth/actions";
import { UpdateSearchSession } from "../store/search/actions";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { Link, Redirect } from "react-router-dom";

class Home extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    const token = props.system.token;
    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    console.log(props.displayType != undefined)
    this.state = {
      loggedIn,
      keyword: '',
      location: '',
      experience: '',
      redirect: false
    }

  }
  onSubmit = (e: any) => {
    // console.log("clicked On submit")
    // e.preventDefault();
    // this.setState({
    //   redirect: true
    // })
    this.props.UpdateSearchSession({
      keyword: this.state.keyword,
      location: this.state.location,
      experience: this.state.experience,
      islandingPage: false,
    })
    // console.log("clicked On submit props completed")

  }

  changevalue = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value
    });

  }
  render() {

    const { keyword, location, experience, redirect } = this.state;

    // if (redirect)
    //   return (<Redirect to={{
    //     pathname: '/filterjobs',
    //     state: { keyword: keyword, location: location, experience: experience }
    //   }} />)

    return (
      <>
        {/* <h1>Home Component</h1> */}
        <header className="mt-0">
          <div className="search-banner text-white form-arka-plan " id="search-banner">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="card acik-renk-form">
                    <div className="card-body">
                      {this.props.search.islandingPage
                        ?
                        <div className="text-center mb-5" style={{marginTop:"200px"}}>
                          <h1 className="text-white">
                            <b> Right job for the Right candidate</b>
                          </h1>
                          <h4 className="text-white">We find a passion for people and not job</h4>
                        </div>
                        :
                        <p>Currently 37,599 jobs in Hyderabad</p>
                      }
                      <div className="row">
                        <form className="col-sm-12" onSubmit={this.onSubmit}>

                          <div className="form-row align-items-center">
                            <div className="col-sm-4">
                              <label className="sr-only" htmlFor="inlineFormInput">Job Title</label>
                              <div className="input-group mb-3">
                                <input type="text"
                                  id="tptcat"
                                  placeholder="Your right job"
                                  className="form-control "
                                  name="keyword"
                                  value={this.state.keyword}
                                  onChange={this.changevalue}
                                  aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                <div className="input-group-append">
                                  <span className="input-group-text bg-white" id="basic-addon2">
                                    <FontAwesomeIcon icon="search" className="text-secondary" />
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-4">
                              <label className="sr-only" htmlFor="inlineFormInputGroup">Location</label>
                              <div className="input-group mb-3">
                                <input
                                  type="text"
                                  id="tptloc"
                                  placeholder="Location"
                                  className="form-control"
                                  name="location"
                                  value={this.state.location}
                                  onChange={this.changevalue}
                                  aria-label="Recipient's username" aria-describedby="basic-addon2"
                                />
                                <div className="input-group-append">
                                  <span className="input-group-text bg-white" id="basic-addon2">
                                    <FontAwesomeIcon icon="map-marker-alt" className="text-secondary" />
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-2">
                              <label className="sr-only" htmlFor="inlineFormInputGroup">Username</label>
                              <div className="input-group mb-3">
                                <input
                                  type="number"
                                  id="tptexp"
                                  min='0'
                                  max='100'
                                  placeholder="Experirnce"
                                  className="form-control"
                                  name="experience"
                                  value={this.state.experience}
                                  onChange={this.changevalue}
                                />
                              </div>
                            </div>
                            <div className="col-sm-2 mb-2">
                              {/* <Link onClick={this.onSubmit} className="btn btn-warning mb-2 text-white" to="/filterjobs">
                                <b> Search</b>
                              </Link>  */}
                              <Link onClick={this.onSubmit} className="btn btn-warning mb-2 text-white" to="/Searchresult">
                                <b> Search</b>
                              </Link>
                              {/* <input
                                type="submit"
                                id="search"
                                className="btn btn-warning mb-2"
                                value="Search"
                              /> */}
                            </div>
                          </div>
                        </form>
                      </div>
                      {this.props.search.islandingPage
                        ? "" :
                        <p>Advanced Search</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  system: state.system,
  search: state.search

});

export default connect(
  mapStateToProps,
  { updateSession, UpdateSearchSession }
)(Home);
