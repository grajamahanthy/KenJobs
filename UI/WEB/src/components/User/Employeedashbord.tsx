import React from 'react';
import Job from '../Jobs/Job';
import { Redirect } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { AppState } from "../../store/index";

// import { IsessionState } from "../../store/auth/types";
import { updateSession } from "../../store/auth/actions";
import { connect } from 'react-redux';
import Apiservices from '../services/Apiservices';
import LoaderModal from '../util/LoaderModal';


class Employeedashbord extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        
        this.state = {
            ishaveJobs: false,
            showContent: false,
            jobsData: []
        }
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

    componentWillMount() {
        if (this.state.loggedIn) {
            const Servicecall = new Apiservices();

            let body = new URLSearchParams();
            body.set('UserId', '1');

            //Get jobs bu user id, User id is assigned by server 
            let responce = Servicecall.GET_SECURE_CALL('Job/GetJobsByUserId', null, this.displayData,this.errorHandle)
        }
    }
    errorHandle=(error:any)=>{

    }
    displayData = (data: any) => {

        this.setState({
            ishaveJobs: data.length > 0 ? true : false,
            jobsData: data,
            showContent: true
        })
    }


    render() {
        if (this.state.loggedIn === false) {
            return <Redirect to="/Login/employer" />
        }



        let jobslist;
        if (this.state.ishaveJobs && this.state.showContent) {
            jobslist = this.state.jobsData.map((item: any, key: any) =>
                <div className="col-sm-4 border px-4 py-4 shadow-sm" key={key}>
                    <div className="">
                        <Link className=""
                            to={{
                                pathname: "/Jobdetails",
                                state: { JobData: item }
                            }}
                        ><h5>{item.JobTitle}</h5></Link>


                        <div className="mt-2">
                            <span className="mr-sm-2"> <FontAwesomeIcon icon="building" size="xs" /> {item.ClientName}</span>
                            <br /> <span className="mr-sm-2"><FontAwesomeIcon icon="suitcase" size="xs" />{'  ' + item.MinExperience + '-' + item.MaxExperience + ' Years'}</span>
                            <br /> <span className="mr-sm-2"><FontAwesomeIcon icon="map-marker-alt" size="xs" />  {item.City}</span>
                            <br />
                            <div className="row float-sm-right">
                                {/* <Link className="btn btn-primary btn-sm rounded-0" to='/candidates' >
                                    View Candidates
                                </Link> */}
                                <Link className="btn btn-primary btn-sm rounded-0 align-self-end"
                                    to={{
                                        pathname: "/candidates",
                                        state: { JobId: item.Id }
                                    }}
                                >View Candidates</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else if (this.state.showContent) {
            jobslist =
                <div className="col-sm-12  px-4 py-4 ">
                    <div className="row">
                        <h4>!Oops... No Data Found.</h4>
                    </div></div>
        } else if (!this.state.showContent) {
            jobslist =
            <LoaderModal></LoaderModal>
        }


        return (
            <>
                <div className="container mt-3">
                    <h1>Posted Jobs</h1>
                    <div className="container">
                        <div className="row mb-2">
                            <div className="col-sm-10"></div>
                            <div className="col-sm-2 right">
                                <Link className="btn btn-primary btn-block rounded-0" to="/postjobs" >
                                    Post Job
                                </Link>
                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="col-sm-9">
                                <div className="row">
                                    {jobslist}
                                </div>
                                {/* <div className="mt-2">
                                    <Pagination>
                                        <Pagination.First />
                                        <Pagination.Prev />
                                        <Pagination.Item>{1}</Pagination.Item>
                                        <Pagination.Ellipsis />

                                        <Pagination.Item>{10}</Pagination.Item>
                                        <Pagination.Item>{11}</Pagination.Item>
                                        <Pagination.Item active>{12}</Pagination.Item>
                                        <Pagination.Item>{13}</Pagination.Item>
                                        <Pagination.Item disabled>{14}</Pagination.Item>

                                        <Pagination.Ellipsis />
                                        <Pagination.Item>{20}</Pagination.Item>
                                        <Pagination.Next />
                                        <Pagination.Last />
                                    </Pagination>
                                </div> */}
                            </div>
                            <div className="col-sm-3 border mx-auto  bg-light">
                                <div className="mt-2">
                                    <h3 className="text-center">Quick Links</h3>
                                    <ul>
                                        <li>Opened Jobs</li>
                                        <li>Closed Jobs</li>
                                    </ul>
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
)(Employeedashbord)