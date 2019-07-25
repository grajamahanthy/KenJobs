import React from "react";
import JobSearch from './Jobs/JobSearchComponent';
import { Redirect } from "react-router";
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
      loggedIn,
      keyword: '',
      location: '',
      redirect: false
    }

  }
  onSubmit = (e: any) => {
    e.preventDefault();
    this.setState({
      redirect: true
    })

  }

  changevalue = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value
    });

  }
  render() {

    const { keyword, location, redirect } = this.state;

    if (redirect)
      return (<Redirect to={{
        pathname: '/Jobs',
        state: { keyword: keyword, location: location }
      }} />)
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
            <div className="col-sm-8 mx-auto  mt-3">
              <form onSubmit={this.onSubmit}>
                <div className="form-row">
                  <div className="form-group col-md-5">
                    <input
                      type="text"
                      id="tptcat"
                      placeholder="Enter Keyword"
                      className="form-control  rounded-0  "
                      name="keyword"
                      value={this.state.keyword}
                      onChange={this.changevalue}
                    />
                  </div>
                  <div className="form-group col-md-5">
                    <input
                      type="text"
                      id="tptloc"
                      placeholder="Enter Location"
                      className="form-control   rounded-0 "
                      name="location"
                      value={this.state.location}
                      onChange={this.changevalue}
                    />
                  </div>
                  <div className="form-group col-md-2">
                    <input
                      type="submit"
                      id="search"
                      className="btn btn-primary btn-block rounded-0 "
                      value="Search"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* <Link to="/Logout">LogOut</Link> */}
      </>
    );
  }
}

export default Home;
