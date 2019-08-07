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
//services
import Apiservices from '../services/Apiservices';

class Jobs extends React.Component<any, any>{
    constructor(props: any) {
        super(props);

        const token = this.props.system.token
        let loggedIn = this.props.system.loggedIn

        if (token == null) {
            loggedIn = false;
        }
        this.state = {
            loggedIn,
            jobdata: '',
            keyword: '',
            location: ''
        }

        this.findTheJobs = this.findTheJobs.bind(this);
    }

    onSubmit = (e: any) => {
        e.preventDefault();
        this.findTheJobs(this.state);
    }

    changevalue = (e: any) => {
        this.setState({
            [e.target.name]: e.target.value
        });

    }
    componentWillMount() {
        let keyword = '';
        let location = '';
        if (this.props.location.state != undefined) {
            let keyword = this.props.location.state.keyword;
            let location = this.props.location.state.location;
            this.setState({
                keyword: keyword,
                location: location
            })
            this.findTheJobs(this.state);
        } else {

        }
    }

    findTheJobs = (value: any) => {
        let body = new URLSearchParams();
        let Servicecall = new Apiservices();
        let responce = Servicecall.GET_CALL('JobSearch/Get', null, this.displayData,this.errorHandle)

    }
    errorHandle=()=>{

    }

    displayData = (data: any) => {

        this.setState({
            jobdata: data
        })
    }

    render() {
        // if (this.state.loggedIn === false) {
        //     return <Redirect to="/login/jobseeker" />
        // }
        let prepare_jobs = "";
        if (this.state.jobdata != undefined && this.state.jobdata.length > 0) {
            prepare_jobs = this.state.jobdata.map((item: any, key: any) =>
                <Job key={key} jobInfo={item}></Job>
            )

        }


        return (
            <>
                <div className="container mt-3">
                    <h1>
                        Search Job
                    </h1>
                    <div className="col-lg-12 ">
                        <div className="text-center text-secondary">
                            {/* <JobSearch GetValues={this.findTheJobs} ></JobSearch> */}
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
                        <div className="mt-4">
                            <div className="row">
                                <div className="col-sm-3 border shadow pt-2">
                                    <Jobfilter></Jobfilter>
                                </div>
                                <div className="col-sm-7">
                                    {prepare_jobs}
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