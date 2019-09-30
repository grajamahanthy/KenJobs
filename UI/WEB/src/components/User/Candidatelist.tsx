import React from "react";
import { Pagination } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Apiservices from "../services/Apiservices";
import LoaderModal from "../util/LoaderModal";
import { Item } from "react-bootstrap/lib/Carousel";
const Servicecall = new Apiservices();

class CandidateList extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            JobId: props.location.state.JobId,
            haveCandidate: false,
            showContent: false,
            loader: false,
            Candidatedata: []
        }
        this.downloadResume = this.downloadResume.bind(this);
    }

    componentWillMount() {
        this.setState({
            loader: true
        })
        let url = 'Job/GetJobseekersByJobId/' + this.state.JobId;
        let responce = Servicecall.GET_SECURE_CALL(url, null, this.displayData, this.errorHandle)
    }
    errorHandle = (error: any) => {
        this.setState({
            loader: false
        })
    }
    displayData = (data: any) => {
        this.setState({
            haveCandidate: data.length > 0 ? true : false,
            Candidatedata: data,
            showContent: true,
            loader: false,
        })
    }

    downloadResume = (userId: number) => {
        const Servicecall = new Apiservices();
        let res1 = Servicecall.GET_SECURE_CALL('Attachment/GetAttachmentByUserId?User_Id=' + userId + '&&attachmentTypeId=2', null, this.success, this.errorHandle)

    }
    success = (data: any) => {
        window.location.href = data.Attachment.Base64Text;
    }

    render() {
        let Candidatelist;
        let imageData = <img src={require('../../assets/images/DP.png')} className="btn-md border rounded-circle" style={{ height: "160px" }} />;
        let Pagenation;
        if (this.state.haveCandidate && this.state.showContent) {
            Candidatelist = this.state.Candidatedata.map((item: any, key: any) =>

                <div className="col-md-6 border  my-1 p-3">
                    <div className="row">
                        <div className="col-md-4 ">

                            {
                                item.UserAttachments.map((attachment: any, index: any) => {
                                    if (attachment.Attachment != null) {
                                        imageData =
                                            <img src={attachment.Attachment.Base64Text} className="btn-md border rounded-circle" width="100%" style={{ height: "160px" }} />
                                    }
                                })
                            }
                            <div className="text-center">
                                {imageData}
                            </div>
                        </div>
                        <div className="col-md-8 ">

                            <h4 className="text-primary">
                                <Link className=""
                                    to={{
                                        pathname: "/candidate",
                                        state: { UserId: item.Id }
                                    }}
                                >{item.Title + ' ' + item.FirstName + ' ' + item.LastName}</Link>
                            </h4>

                            <h6 >Title : Senior Developer</h6>
                            <h6 >Email : {item.Email} </h6>
                            <h6 >Phone : {item.PhoneNumber}</h6>
                            <h6>Key Skills : {} </h6>
                            <div className="float-sm-right">

                                <button className="btn btn-primary btn-sm rounded-0" onClick={() => this.downloadResume(item.Id)}>Download Resume</button>
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
            Candidatelist = <LoaderModal></LoaderModal>
        }
        return (
            <>
                <div className="card  mx-2 h-100 d-block minhight-100">
                    <div className="card-body">

                        <div className="mt-3">
                            <h1>Candidate List</h1>
                            <div className="container mt-2">
                                <div className=" row mb-2">
                                    <div className="col">

                                    </div>
                                    <div className="col">

                                        {/* <input
                                    type="text"
                                    className="form-control rounded-0"
                                    placeholder="Search Candidate"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2" /> */}

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
                    </div>
                </div>
            </>
        )
    }
}
export default CandidateList