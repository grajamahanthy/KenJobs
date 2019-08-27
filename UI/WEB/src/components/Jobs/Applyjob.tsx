import React from 'react';
import { connect } from "react-redux";
import { Pagination } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Apiservices from '../services/Apiservices';
import { AppState } from '../../store';
import { updateSession } from "../../store/auth/actions";
import LoaderModal from '../util/LoaderModal';


class Applyjob extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        let loggedIn = this.props.system.loggedIn
        this.state = {
            loader: false,
            loggedIn,
            jobdata: []

        }
    }
    componentDidMount() {
        const Servicecall = new Apiservices();
        this.setState({
            loader: true
        })
        let response = Servicecall.GET_SECURE_CALL("ApplyJob/GetJobsByUserid", null, this.success, this.errorHandle)
    }

    success = (data: any) => {
        // console.log(data);
        this.setState({
            jobdata: data, loader: false
        })
    }

    errorHandle = () => {
        this.setState({
            loader: false
        })
    }

    render() {
        if (this.state.loggedIn === false) {
            return <Redirect to="/Login/jobseeker" />
        }
        let prepare_jobs;
        if (this.state.jobdata != null && this.state.jobdata != undefined && this.state.jobdata.length > 0) {
            prepare_jobs = this.state.jobdata.map((item: any, key: any) =>
                <div className="col-sm-12" key={key}>
                    <div className="card  border rounded-0 pt-2 mb-2 shadow-sm p-3 ">
                        <h6 className="card-title text-primary" >
                            {item.JobTitle}
                        </h6>
                        <div className="card-text mb-2">
                            <div className="mt-2">
                                <span className="mr-sm-2"> <FontAwesomeIcon icon="building" size="xs" />  {item.ClientName}</span>
                                <span className="mr-sm-2"><FontAwesomeIcon icon="suitcase" size="xs" />  {item.MinExperience + '-' + item.MaxExperience + ' Years'}</span>
                                <span className="mr-sm-2"><FontAwesomeIcon icon="map-marker-alt" size="xs" /> {item.City + ', ' + item.State + ',' + item.Country} </span>
                            </div>
                            <div className="mt-2">
                                <span className="mr-sm-2"> <FontAwesomeIcon icon="chess-king" size="xs" className="mr-2" />
                                    {item.Skills}
                                </span>
                            </div>
                            <div className=" row mt-2 ">
                                <span>
                                    <span className="col-sm-2" >
                                        <FontAwesomeIcon icon="newspaper" size="xs" className="mr-2" />
                                        {item.Description}
                                    </span>
                                    <span className="col-sm-10 pull-right text-wrap">

                                    </span>
                                </span>
                            </div>

                            <div className="mt-2">
                                <span className="mr-sm-2"><FontAwesomeIcon icon="wallet" size="xs" /> :
                                        50,000 - 70,000{item.MinSalary + ' - ' + item.MaxSalary}
                                </span>
                                <span className="mr-sm-2 pull-right">Posted By
                        <FontAwesomeIcon icon="user-tie" size="xs" className="ml-2" /> :
                                                                                      {"Admin"}
                                </span>
                                {/* <span className="mr-sm-2">1 day ago
                                </span> */}
                            </div>
                            <div className="row float-sm-right">


                            </div>


                        </div>

                    </div>
                </div>

            )
        } else {
            prepare_jobs = "No Jobs Found";
        }

        return (
            <>
                {this.state.loader ? <LoaderModal></LoaderModal> : ''}
                <div className="container mt-3">
                    <h1>Applyed Jobs List</h1>
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

                        {prepare_jobs}

                        {/* 
                        <div className="mt-2">
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
)(Applyjob);