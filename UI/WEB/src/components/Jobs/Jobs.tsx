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
import LoaderModal from '../util/LoaderModal';
import LoginModal from '../util/LoginModal';

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
            reqType: '',
            jobId: '',
            jobdata: {},
            keyword: '',
            location: '',
            experience: '',
            showLogin: false,
            loader: false
        }

        this.findTheJobs = this.findTheJobs.bind(this);
        this.applyjob = this.applyjob.bind(this);
        this.onLoginModalHide = this.onLoginModalHide.bind(this);
        this.onAfterLogin = this.onAfterLogin.bind(this);
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
            let sexperience = this.props.location.state.experience;
            this.setState({
                keyword: keyword,
                location: location,
                experience: sexperience
            }, () => this.findTheJobs(this.state))

        } else {

        }
    }

    displayData = (data: any) => {

        this.setState({
            loader: false,
            jobdata: data
        })

    }

    findTheJobs = (value: any) => {
        this.setState({
            jobdata: null,
            loader: true
        })
        let body = new URLSearchParams();
        body.set('Keyword', this.state.keyword);
        body.set('Location', this.state.location);
        body.set('Experience', this.state.experience);

        let Servicecall = new Apiservices();
        if (this.state.loggedIn) {
            let responce = Servicecall.POST_SECURE_CALL('JobSearch/GetJobsByUserParms', body, this.displayData, this.errorHandle)
        } else {
            let responce = Servicecall.POST_CALL('JobSearch/GetJobsByParms', body, this.displayData, this.errorHandle)
        }

    }
    errorHandle = () => {
        this.setState({
            loader: false,
        })
    }

    applyjob(jobid: any) {
        this.setState({
            jobId: jobid,
            reqType: 'applyjob'
        })
        console.log(this.state.loggedIn);
        if (this.state.loggedIn) {
            const Servicecall = new Apiservices();
            let body = new URLSearchParams();
            body.set('Job_Id', jobid);
            body.set('Client_Id', '1');
            //Get jobs bu user id, User id is assigned by server 
            let responce = Servicecall.POST_SECURE_CALL('ApplyJob/apply', body, this.success, this.errorHandle)

        } else {
            this.setState({
                showLogin: true,
            })
        }

    }
    success = (data: any) => {
        console.log(data);
        switch (data) {
            case data = 1: alert("success"); break;
            case data = 2: alert("Already applied this Job"); break;
            case data = 0: alert("Failed"); break;
            default: break;
        }
        this.setState({
            showLogin: false,
        })
    }

    addFavorite = (jobid: any) => {
        this.setState({
            jobId: jobid,
            reqType: 'favoritejob'
        })
        if (this.state.loggedIn) {
            const Servicecall = new Apiservices();
            let body = new URLSearchParams();
            body.set('Job_Id', jobid);

            //Get jobs bu user id, User id is assigned by server 
            let responce = Servicecall.POST_SECURE_CALL('FavoriteJob/addToFavorite', body, this.successFavoritejob, this.errorHandle)

        } else {
            this.setState({
                showLogin: true,
            })
        }

    }
    successFavoritejob = (data: any) => {
        console.log(data);
        switch (data) {
            case data = 1: alert("success"); break;
            case data = 2: alert("Already added to Favoritejobs"); break;
            case data = 0: alert("Failed"); break;
            default: break;
        }
        this.setState({
            showLogin: false,
        })
    }
    onLoginModalHide() {
        this.setState({
            showLogin: false
        })
    }

    onAfterLogin() {
        this.setState({ loggedIn: true })
        if (this.state.reqType === 'applyjob') {
            this.applyjob(this.state.jobId);
        }
        else if (this.state.reqType === 'favoritejob') {
            this.addFavorite(this.state.jobId);
        }

    }


    render() {
        let prepare_jobs;
        prepare_jobs = "";
        if (this.state.jobdata != null && this.state.jobdata != undefined && this.state.jobdata.length > 0) {
            prepare_jobs = this.state.jobdata.map((item: any, key: any) =>
                <Job jobInfo={item} applyjob={this.applyjob} addFavorite={this.addFavorite}></Job>
            )
        }
        else {
            prepare_jobs =<h4>Oops... No Result Found</h4> 
        }

        return (
            <>
                {this.state.showLogin ? <LoginModal onLoginModalHide={this.onLoginModalHide} onAfterLogin={this.onAfterLogin}></LoginModal> : <></>}
                {this.state.loader ? <LoaderModal></LoaderModal> : ''}
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
                                        <div className="form-group col-md-4">
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
                                        <div className="form-group col-md-4">
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
                                                type="number"
                                                id="tptexp"
                                                min='0'
                                                max='100'
                                                placeholder="Enter experirnce"
                                                className="form-control   rounded-0 "
                                                name="experience"
                                                value={this.state.experience}
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
                                        <Link className="btn btn-primary btn-block rounded-0" to="/favoritejob">
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