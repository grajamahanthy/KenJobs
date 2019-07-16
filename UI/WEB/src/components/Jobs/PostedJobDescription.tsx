import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function Postjobdescription(props: any) {
    console.log(props.location.state);
    let job = props.location.state.JobData;
    return (
        <>
            <div className="container mt-5">
                <div className="card  border rounded-0 pt-2 mb-2 shadow-sm p-3 ">


                    <h4 className="card-title text-primary" >
                        {job.JobTitle}
                    </h4>
                    <div className="card-text mb-2">


                        <div className="mt-2">
                            <span className="mr-sm-2"><FontAwesomeIcon icon="building" size="xs" />  {job.ClientName}</span>
                            <span className="mr-sm-2"><FontAwesomeIcon icon="suitcase" size="xs" />  {job.MinExperience + '-' + job.MaxExperience + ' Years'} </span>
                            <span className="mr-sm-2"><FontAwesomeIcon icon="map-marker-alt" size="xs" />  {job.City + ' > ' + job.State + ' > ' + job.Country}</span>
                        </div>
                        <div className="mt-2">
                            <span className="mr-sm-2"> <FontAwesomeIcon icon="chess-king" size="xs" className="mr-2" />
                                {job.Skills}
                            </span>
                        </div>
                        <div className="mt-2">
                            <span className="mr-sm-2"><FontAwesomeIcon icon="globe" size="xs" />  {job.JobType.JobType1}</span>
                            <span className="mr-sm-2"><FontAwesomeIcon icon="network-wired" size="xs" />  {job.JobCategory.Category}</span>
                        </div>
                        <div className=" row mt-2 ">
                            <span>
                                <span className="col-sm-2" >
                                    <FontAwesomeIcon icon="newspaper" size="xs" />
                                </span>
                                <span className="col-sm-10 pull-right text-wrap text-justify">
                                    {job.Description}
                                </span>
                            </span>
                        </div>

                        <div className="mt-2">
                            <span className="mr-sm-2"><FontAwesomeIcon icon="wallet" size="xs" /> :
                                   {"Salary " + job.MinSalary + '-' + job.MaxSalary}
                            </span>
                            <span className="mr-sm-2 pull-right">Posted By
                            <FontAwesomeIcon icon="user-tie" size="xs" className="ml-2" /> :
                           {/* {job.contactPerson + " Admin"} */}
                                {" Admin"}
                            </span>
                            <span className="mr-sm-2">{job.postdate}
                            </span>
                        </div>
                        <div className="row float-sm-right">

                            <Link className="btn btn-primary btn-sm rounded-0 mr-2"
                                to={{
                                    pathname: "/Editjob",
                                    state: { Job: job }
                                }}
                            >Edit Job</Link>
                            {/* <button className="btn btn-primary btn-sm  rounded-0 mr-2" >Save Job </button> */}
                        </div>

                    </div>

                </div>
            </div>


        </>
    )
}

export default Postjobdescription;