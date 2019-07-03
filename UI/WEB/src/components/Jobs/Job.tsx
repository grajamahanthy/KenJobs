import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, Redirect } from 'react-router-dom';



class Job extends React.Component<any, any>{
    constructor(props: any) {

        super(props);
        console.log(props);
        let job = props.jobInfo;
        this.state = {
            jobTitle: job.JobTitle,
            clientId: job.Client_Id,
            city: job.City,
            description: job.Description,
            Salary: job.Salary,
            Qualification: job.Qualification,
            contactPerson: 'admin',
            skills: '',
            experience: '5-6',
            posteddate: job.PostDate,
        }
        this.handleclick = this.handleclick.bind(this);
    }

    handleclick = (e: any) => {
        return <Redirect to="/Jobresult" />;
    }

    render() {
        return (
            <>
                <div className="">
                    <div className="card  border rounded-0 pt-2 mb-2 shadow-sm p-3 ">


                        <h6 className="card-title text-primary" onClick={this.handleclick}>
                            {this.state.jobTitle}
                        </h6>
                        <div className="card-text mb-2">


                            <div className="mt-2">
                                <span className="mr-sm-2"><FontAwesomeIcon icon="building" size="xs" />  {this.state.clientId}</span>
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
                                       {this.state.salary}
                                </span>
                                <span className="mr-sm-2 pull-right">Posted By
                                <FontAwesomeIcon icon="user-tie" size="xs" className="ml-2" /> :
                               {this.state.contactPerson}
                                </span>
                                <span className="mr-sm-2">{this.state.postdate}
                                </span>
                            </div>
                            <div className="row float-sm-right">

                                <button className="btn btn-primary btn-sm rounded-0 mr-2" >Add to Favorites  </button>
                                {/* <button className="btn btn-primary btn-sm  rounded-0 mr-2" >Save Job </button> */}
                                <button className="btn btn-primary btn-sm rounded-0  mr-2" >Apply for Job </button>
                            </div>


                        </div>

                    </div>
                </div>

            </>
        )
    }
}

export default Job