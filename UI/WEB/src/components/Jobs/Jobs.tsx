import React from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import { AppState } from "../../store/index";

// import { IsessionState } from "../../store/auth/types";
import { updateSession } from "../../store/auth/actions";
import { connect } from 'react-redux';
import JobSearch from './JobSearchComponent';
import Job from './Job';
import Jobfilter from '../util/JobFilter';

class Jobs extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        const token = this.props.system.token
        let loggedIn = this.props.system.loggedIn

        // console.log('token ' + token);
        // console.log(loggedIn)

        if (token == null) {
            loggedIn = false;
        }
        this.state = {
            loggedIn
        }
    }
    render() {
        if (this.state.loggedIn === false) {
            return <Redirect to="/login/jobseeker" />
        }
        return (
            <>
                <div className="container mt-3">
                    <h1>
                        Search Job
                </h1>
                    <div className="col-lg-12 ">
                        <div className="text-center text-secondary">
                            <JobSearch></JobSearch>
                        </div>
                        <div className="mt-4">
                            <div className="row">
                                <div className="col-sm-3 border shadow pt-2">
                                    <Jobfilter></Jobfilter>
                                </div>
                                <div className="col-sm-7">
                                    <Job></Job>
                                    <Job></Job>
                                    <Job></Job>
                                    <Job></Job>
                                </div>
                                <div className="col-sm-2 border shadow pt-2">
                                    <h5><u>Quick Links</u></h5>
                                    <div className="text-center">
                                        <Link className="btn btn-primary btn-block rounded-0" to="/applyjob">
                                            Applied Jobs
                    </Link>
                                        <Link className="btn btn-primary btn-block rounded-0" to="/Logout">
                                            My favorites
                    </Link>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}
const mapStateToProps = (state: AppState) => ({
    system: state.system
});

export default connect(
    mapStateToProps,
    { updateSession }
)(Jobs)