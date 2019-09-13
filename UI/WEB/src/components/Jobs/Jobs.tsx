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
import Notify from '../common/Notify';
import JobSearchModel from '../../Models/JobSearchModel';
const notify = new Notify();



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
            jobSearchModel: new JobSearchModel(),
            showLogin: false,
            loader: false
        }

        this.findTheJobs = this.findTheJobs.bind(this);
        this.applyjob = this.applyjob.bind(this);
        this.onLoginModalHide = this.onLoginModalHide.bind(this);
        this.onAfterLogin = this.onAfterLogin.bind(this);
        this.onPageChange = this.onPageChange.bind(this);

    }



    onSubmit = (e: any) => {
        e.preventDefault();
        this.findTheJobs(this.state);
    }

    changevalue = (e: any) => {
        let JSM: any = this.state.jobSearchModel;
        JSM[e.target.name] = e.target.value;
        this.setState({ jobSearchModel: JSM })
    }
    onPageChange = (e: any, index: number) => {
        e.preventDefault();
        let JSM: any = this.state.jobSearchModel;
        let P = JSM.paginationdata;
        P.CurrentPage = index;
        JSM.paginationdata = P;

        this.setState({ jobSearchModel: JSM }, () => { this.findTheJobs(this.state); })

    }
    componentWillMount() {
        let keyword = '';
        let location = '';
        if (this.props.location.state != undefined) {
            let keyword = this.props.location.state.keyword;
            let location = this.props.location.state.location;
            let sexperience = this.props.location.state.experience;
            let JSM: any = this.state.jobSearchModel;
            JSM.Keyword = keyword;
            JSM.Location = location;
            JSM.Experience = sexperience;
            this.setState({
                jobSearchModel: JSM
            }, () => this.findTheJobs(this.state))

        } else {

        }
    }

    displayData = (data: any) => {
        let JSM: any = this.state.jobSearchModel;
        JSM.paginationdata = data.paginationModel;
        this.setState({
            loader: false,
            jobdata: data.ListItems,
            jobSearchModel: JSM
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

        let Searchmodel = this.state.jobSearchModel;
        let Servicecall = new Apiservices();
        if (this.state.loggedIn) {
            let responce = Servicecall.POST_SECURE_CALL1('JobSearch/GetJobsByUserParms', Searchmodel, this.displayData, this.errorHandle)
        } else {
            let responce = Servicecall.POST_CALL1('JobSearch/GetJobsByParms', Searchmodel, this.displayData, this.errorHandle)
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
        // console.log(this.state.loggedIn);
        if (this.state.loggedIn) {
            const Servicecall = new Apiservices();
            let body = new URLSearchParams();
            body.set('Job_Id', jobid);
            //body.set('Client_Id', '1');
            //Get jobs bu user id, User id is assigned by server 
            let responce = Servicecall.POST_SECURE_CALL('ApplyJob/apply', body, this.successAppliedJob, this.errorHandle)

        } else {
            this.setState({
                showLogin: true,
            })
        }

    }
    successAppliedJob = (data: any) => {
        switch (data) {
            case 1:
                notify.Success_notify("Job is Applied Succesfully.");
                break;
            case 2:
                notify.Info_Notify("You Have Already Applied This Job.");
                break;
            case 0:
                notify.Error_notify("Something went wrong.");
                break;
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
        switch (data) {
            case 1: notify.Success_notify("Job Is Added In Favorites Succesfully "); break;
            case 2: notify.Info_Notify("Job Is Already Added In Favoritejobs"); break;
            case 0: notify.Error_notify("Something Went Wrong."); break;
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
        let li: any[] = [];


        const renderPaginationList = () => {
            let currentPage = this.state.jobSearchModel.paginationdata.CurrentPage;
            let totalPages = this.state.jobSearchModel.paginationdata.TotalPages;

            li.push(
                <li className={"page-item " + (currentPage > 1 ? "" : "disabled")}>
                    <a className="page-link" href="#" onClick={(e) => this.onPageChange(e, currentPage - 1)}>{"Previous"}</a>
                </li>
            )
            for (let i = 1; i <= this.state.jobSearchModel.paginationdata.TotalPages; i++) {

                if (this.state.jobSearchModel.paginationdata.CurrentPage == i) {
                    li.push(<li key={i} className="page-item active"><a className="page-link" href="#">{i}</a></li>);
                } else {
                    li.push(<li key={i} className="page-item">
                        <a className="page-link" href="#" onClick={(e) => this.onPageChange(e, i)}>{i}</a>
                    </li>)
                }
            }
            li.push(
                <li className={"page-item " + (currentPage < totalPages ? "" : "disabled")}>
                    <a className="page-link" href="#" onClick={(e) => this.onPageChange(e, currentPage + 1)}>{"Next"}</a>
                </li>
            )


            return (li);
        };


        let prepare_jobs;

        prepare_jobs = "";
        if (this.state.jobdata != null && this.state.jobdata != undefined && this.state.jobdata.length > 0) {
            prepare_jobs = <> {this.state.jobdata.map((item: any, key: any) =>
                <Job jobInfo={item} key={key} applyjob={this.applyjob} addFavorite={this.addFavorite}></Job>
            )}
                <div className="container">
                    <ul className="pagination">
                        {renderPaginationList()}
                    </ul>
                </div>
            </>
        }
        else {
            prepare_jobs = <h4>Oops... No Result Found</h4>
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
                                                name="Keyword"
                                                value={this.state.jobSearchModel.Keyword}
                                                onChange={this.changevalue}
                                            />
                                        </div>
                                        <div className="form-group col-md-4">
                                            <input
                                                type="text"
                                                id="tptloc"
                                                placeholder="Enter Location"
                                                className="form-control   rounded-0 "
                                                name="Location"
                                                value={this.state.jobSearchModel.Location}
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
                                                name="Experience"
                                                value={this.state.jobSearchModel.Experience}
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