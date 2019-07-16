import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Jobdescription extends React.Component<any, any>{
    constructor(props: any) {
        super(props);

        this.state = props.location.state.JobInfo
    }
    render() {
        return (
            <>
                <div className="container mt-5">
                    <div className="card  border rounded-0 pt-2 mb-2 shadow-sm p-3 ">


                        <h4 className="card-title text-primary" >
                            {this.state.jobTitle}
                        </h4>
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
export default Jobdescription