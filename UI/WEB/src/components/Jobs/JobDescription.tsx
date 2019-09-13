import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Apiservices from "../services/Apiservices";
import   JobModel from "../../Models/JobModel";
import LoaderModal from "../util/LoaderModal";

class Jobdescription extends React.Component<any, any>{
    constructor(props: any) {
        super(props);

        this.state = {
            job: new JobModel(),
            loader:true,
        }
        this.getJobData();
    }
  
    getJobData() {
        const Servicecall = new Apiservices();
        let response = Servicecall.GET_CALL("Job?id=" + this.props.location.state.JobInfo, null, this.success, this.errorHandle)
    }

    success=(data: any) =>{
        this.setState({
            job:data,
            loader:false
        },()=>{console.log(this.state.job);})
    }
    errorHandle=(error: any)=> {

    }

    render() {
        return (
            <>
            {this.state.loader? <LoaderModal></LoaderModal>:""}
                <div className="container mt-5">
                    <div className="card  border rounded-0 pt-2 mb-2 shadow-sm p-3 ">


                        <h4 className="card-title text-primary" >
                            {this.state.job.JobTitle}
                        </h4>
                        <div className="card-text mb-2">


                            <div className="mt-2">
                                <span className="mr-sm-2"><FontAwesomeIcon icon="building" size="xs" />  {this.state.job.ClientName}</span>
                                <span className="mr-sm-2"><FontAwesomeIcon icon="suitcase" size="xs" />  {this.state.job.MinExperience +'-'+this.state.job.MaxExperience+ ' Years'} </span>
                                <span className="mr-sm-2"><FontAwesomeIcon icon="map-marker-alt" size="xs" />  {this.state.job.City}</span>
                            </div>
                            <div className="mt-2">
                                <span className="mr-sm-2"> <FontAwesomeIcon icon="chess-king" size="xs" className="mr-2" />
                                    {this.state.job.Skills}
                                </span>
                            </div>
                            <div className=" row mt-2 ">
                                <span>
                                    <span className="col-sm-2" >
                                        <FontAwesomeIcon icon="newspaper" size="xs"  className="mr-2"/>
                                        {this.state.job.Description}
                                    </span>
                                    <span className="col-sm-10 pull-right text-wrap text-justify">
                                      
                                    </span>
                                </span>
                            </div>

                            <div className="mt-2">
                                <span className="mr-sm-2"><FontAwesomeIcon icon="wallet" size="xs" /> :
                                       {this.state.job.MinSalary+'-'+this.state.job.MaxSalary}
                                </span>
                                <span className="mr-sm-2 pull-right">Posted By
                                <FontAwesomeIcon icon="user-tie" size="xs" className="ml-2" /> :
                               {this.state.job.contactPerson}
                               {"Admin"}
                                </span>
                                <span className="mr-sm-2">
                                {/* {this.state.job.PostDate} */}
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