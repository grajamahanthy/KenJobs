import React from "react";
import { Pagination } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Apiservices from "../services/Apiservices";
const Servicecall = new Apiservices();

class CandidateList extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            JobId: props.location.state.JobId,
            haveCandidate: false,
            showContent: false,
            Candidatedata: []
        }
    }

    componentWillMount() {

        let url = 'Job/GetJobseekersByJobId/' + this.state.JobId;
        let responce = Servicecall.GET_SECURE_CALL(url, null, this.displayData,this.errorHandle)
    }
    errorHandle=(error:any)=>{

    }
    displayData = (data: any) => {
        this.setState({
            haveCandidate: data.length > 0 ? true : false,
            Candidatedata: data,
            showContent: true
        })
    }
    render() {
        let Candidatelist;
        let Pagenation;
        if (this.state.haveCandidate && this.state.showContent) {
            Candidatelist = this.state.Candidatedata.map((item: any, key: any) =>

                <div className="col-md-6 border  my-1 p-3">
                    <div className="row">
                        <div className="col-md-4 ">
                            <img className="btn-md border" src={require('../../assets/images/profile.png')} width="150" height="150" alt="" />
                        </div>
                        <div className="col-md-8">

                            <h4 className="text-primary">
                                <Link className=""
                                    to={{
                                        pathname: "/candidate",
                                        state: { User: item }
                                    }}
                                >{item.Title + ' ' + item.FirstName + ' ' + item.LastName}</Link>
                            </h4>

                            <h6 >Title : Senior Developer</h6>
                            <h6 >Email : {item.Email} </h6>
                            <h6 >Phone : {item.PhoneNumber}</h6>
                            <h6>Key Skills : {} </h6>
                            <div className="float-sm-right">

                                <button className="btn btn-primary btn-sm rounded-0">Download Resume</button>
                            </div>
                        </div>
                    </div>
                </div>

            )
            Pagenation = <Pagination>
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

        } else if (this.state.showContent) {
            Candidatelist =
                <div className="col-md-6   my-1 p-3">
                    <div className="row">
                        <h4>!Oops... No Data Found.</h4>
                    </div></div>
        } else if (!this.state.showContent) {
            Candidatelist =
                <div className="col-md-6   my-1 p-3">
                    <div className="row">
                        <h4>Loading.....!</h4>
                    </div></div>
        }
        return (
            <>
                <div className="container mt-3">
                    <h1>Candidate List</h1>
                    <div className="container mt-2">
                        <div className=" row mb-2">
                            <div className="col">

                            </div>
                            <div className="col">

                                <input
                                    type="text"
                                    className="form-control rounded-0"
                                    placeholder="Search Candidate"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2" />

                            </div>

                        </div>


                        <div className="row">
                            {Candidatelist}
                        </div>
                        {/* <div className="mt-2">
                            {Pagenation}
                        </div> */}
                    </div>
                </div>
            </>
        )
    }
}
export default CandidateList