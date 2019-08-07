import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { updateSession } from "../../store/auth/actions";
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { AppState } from '../../store';
import Apiservices from '../services/Apiservices';



class Job extends React.Component<any, any>{
    constructor(props: any) {

        super(props);
        let job = props.jobInfo;
        const token = this.props.system.token
        let loggedIn = this.props.system.loggedIn

        // console.log(job);
        this.state = {
            loggedIn,
            jobId: job.Id,
            jobTitle: job.JobTitle,
            clientname: job.ClientName,
            city: job.City,
            description: job.Description,
            minsalary: job.MinSalary,
            maxsalary: job.MaxSalary,
            Qualification: job.Qualification,
            contactPerson: 'admin',
            skills: job.Skills,
            experience: job.MinExperience + '-' + job.MaxExperience,
            posteddate: job.PostDate,
            redirect: false
        }
        this.addtofavorites = this.addtofavorites.bind(this);
        this.applyjob = this.applyjob.bind(this);
    }


    addtofavorites = (e: any) => {
        if (this.state.loggedIn) {

        } else {
            this.setState({
                redirect: true
            })
        }
    }
    applyjob = (e: any) => {
        if (this.state.loggedIn) {

            const Servicecall = new Apiservices();

            //Get jobs bu user id, User id is assigned by server 
            let responce = Servicecall.GET_CALL('ApplyJob/Get', null, this.success,this.errorHandle)

        } else {
            this.setState({
                redirect: true
            })
        }
    }
    errorHandle=(error:any)=>{

    }
    success = () => {

    }


    render() {
        if (!this.state.loggedIn && this.state.redirect) {
            return <Redirect to="/login/jobseeker" />
        }
        return (
            <>
                <div className="">
                    <div className="card  border rounded-0 pt-2 mb-2 shadow-sm p-3 ">


                        <h6 className="card-title text-primary" >
                            <Link className=""
                                to={{
                                    pathname: "/Jobresult",
                                    state: { JobInfo: this.state }
                                }}
                            > {this.state.jobTitle}</Link>

                        </h6>
                        <div className="card-text mb-2">


                            <div className="mt-2">
                                <span className="mr-sm-2"><FontAwesomeIcon icon="building" size="xs" />  {this.state.clientname}</span>
                                <span className="mr-sm-2"><FontAwesomeIcon icon="suitcase" size="xs" />  {this.state.experience + ' Years'} </span>
                                <span className="mr-sm-2"><FontAwesomeIcon icon="map-marker-alt" size="xs" />  {this.state.city}</span>
                            </div>
                            <div className="mt-2">
                                <span className="mr-sm-2"> <FontAwesomeIcon icon="chess-king" size="xs" className="mr-2" />
                                    {this.state.skills}
                                </span>
                            </div>
                            <div className=" row mt-2 ">
                                <span>
                                    <span className="col-sm-2" >
                                        <FontAwesomeIcon icon="newspaper" size="xs" />
                                    </span>
                                    <span className="col-sm-10 pull-right text-wrap text-justify">
                                        {this.state.description}
                                    </span>
                                </span>
                            </div>

                            <div className="mt-2">
                                <span className="mr-sm-2"><FontAwesomeIcon icon="wallet" size="xs" /> :
                                     Salary -  {this.state.minsalary + '-' + this.state.maxsalary}
                                </span>
                                <span className="mr-sm-2 pull-right">Posted By
                                <FontAwesomeIcon icon="user-tie" size="xs" className="ml-2" /> :
                               {this.state.contactPerson}
                                </span>
                                <span className="mr-sm-2">{this.state.postdate}
                                </span>
                            </div>
                            <div className="row float-sm-right">

                                <button className="btn btn-primary btn-sm rounded-0 mr-2" onClick={this.addtofavorites} >Add to Favorites  </button>
                                {/* <button className="btn btn-primary btn-sm  rounded-0 mr-2" >Save Job </button> */}
                                <button className="btn btn-primary btn-sm rounded-0  mr-2" onClick={this.applyjob} >Apply for Job </button>
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
)(Job)