import React from "react";
import JobSearch from './Jobs/JobSearchComponent';
// import { Link, Redirect } from "react-router-dom";

class Home extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    const token = localStorage.getItem("token");

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      loggedIn
    }

  }
  render() {

    return (
      <>
        {/* <h1>Home Component</h1> */}

        <div className="col-lg-12 mt-3">
          <div className="text-center">
            <p className="text-uppercase">
              1500+ Jobs posted last week
              </p>
            <h2 className="text-uppercase mt-4 mb-5">
              Easiest way to find your dream job
              </h2>
            <JobSearch></JobSearch>
          </div>
        </div>

        {/* <Link to="/Logout">LogOut</Link> */}
      </>
    );
  }
}

export default Home;
