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


class Employeedashbord extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
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

    render() {
        if (this.state.loggedIn === false) {
            return <Redirect to="/login/employee" />
        }
        return (
            <>
                <div className="container mt-3">
                    <h1>Posted Jobs</h1>
                    <div className="container">
                        <div className="row mb-2">
                            <div className="col-sm-10"></div>
                            <div className="col-sm-2 right">
                                <Link className="btn btn-primary btn-block rounded-0" to="/postjobs">
                                    Post Job
                                </Link>
                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="col-sm-9">
                                <div className="row">
                                    <div className="col-sm-4 border px-4 py-4 shadow-sm">
                                        <div className="">
                                            <h5>System Administrator</h5>
                                            <div className="mt-2">
                                                <span className="mr-sm-2"> <FontAwesomeIcon icon="building" size="xs" />  ADD Technologies (India) Limited</span>
                                                <br /> <span className="mr-sm-2"><FontAwesomeIcon icon="suitcase" size="xs" />  5-10 Years</span>
                                                <br /> <span className="mr-sm-2"><FontAwesomeIcon icon="map-marker-alt" size="xs" />  Hyderabad, Channai, Bengalore</span>
                                                <br />
                                                <div className="row float-sm-right">
                                                    <Link className="btn btn-primary btn-sm rounded-0" to="/candidates">
                                                        View Candidates
                                                         </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 border px-4 py-4 shadow-sm">
                                        <h5>Software developer</h5>
                                        <div className="mt-2">
                                            <span className="mr-sm-2"> <FontAwesomeIcon icon="building" size="xs" />  ADD Technologies (India) Limited</span>
                                            <br />  <span className="mr-sm-2"><FontAwesomeIcon icon="suitcase" size="xs" />  5-10 Years</span>
                                            <br /> <span className="mr-sm-2"><FontAwesomeIcon icon="map-marker-alt" size="xs" />  Hyderabad, Channai, Bengalore</span>
                                            <br />
                                            <div className="row float-sm-right">
                                                <Link className="btn btn-primary btn-sm rounded-0" to="/candidates">
                                                    View Candidates
                                                         </Link> </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 border px-4 py-4 shadow-sm">
                                        <h5>Tester</h5>
                                        <div className="mt-2">
                                            <span className="mr-sm-2"> <FontAwesomeIcon icon="building" size="xs" />  ADD Technologies (India) Limited</span>
                                            <br /> <span className="mr-sm-2"><FontAwesomeIcon icon="suitcase" size="xs" />  5-10 Years</span>
                                            <br /> <span className="mr-sm-2"><FontAwesomeIcon icon="map-marker-alt" size="xs" />  Hyderabad, Channai, Bengalore</span>
                                            <br />
                                            <div className="row float-sm-right">
                                                <Link className="btn btn-primary btn-sm rounded-0" to="/candidates">
                                                    View Candidates
                                                         </Link>  </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 border px-4 py-4 shadow-sm">
                                        <h5>Ui Designer</h5>
                                        <div className="mt-2">
                                            <span className="mr-sm-2"> <FontAwesomeIcon icon="building" size="xs" />  ADD Technologies (India) Limited</span>
                                            <br /> <span className="mr-sm-2"><FontAwesomeIcon icon="suitcase" size="xs" />  5-10 Years</span>
                                            <br /> <span className="mr-sm-2"><FontAwesomeIcon icon="map-marker-alt" size="xs" />  Hyderabad, Channai, Bengalore</span>
                                            <br />
                                            <div className="row float-sm-right">
                                                <Link className="btn btn-primary btn-sm rounded-0" to="/candidates">
                                                    View Candidates
                                                         </Link>   </div></div>
                                    </div>
                                    <div className="col-sm-4 border  px-4 py-4 shadow-sm">
                                        <h5>Developer</h5>
                                        <div className="mt-2">
                                            <span className="mr-sm-2"> <FontAwesomeIcon icon="building" size="xs" />  ADD Technologies (India) Limited</span>
                                            <br /> <span className="mr-sm-2"><FontAwesomeIcon icon="suitcase" size="xs" />  5-10 Years</span>
                                            <br /> <span className="mr-sm-2"><FontAwesomeIcon icon="map-marker-alt" size="xs" />  Hyderabad, Channai, Bengalore</span>
                                            <br />
                                            <div className="row float-sm-right">
                                                <Link className="btn btn-primary btn-sm rounded-0" to="/candidates">
                                                    View Candidates
                                                         </Link>  </div> </div>
                                    </div>
                                    <div className="col-sm-4 border   px-4 py-4 shadow-sm">
                                        <h5>Ui Designer</h5>
                                        <div className="mt-2">
                                            <span className="mr-sm-2"> <FontAwesomeIcon icon="building" size="xs" />  ADD Technologies (India) Limited</span>
                                            <br /> <span className="mr-sm-2"><FontAwesomeIcon icon="suitcase" size="xs" />  5-10 Years</span>
                                            <br /> <span className="mr-sm-2"><FontAwesomeIcon icon="map-marker-alt" size="xs" />  Hyderabad, Channai, Bengalore</span>
                                            <br />
                                            <div className="row float-sm-right">
                                                <Link className="btn btn-primary btn-sm rounded-0" to="/candidates">
                                                    View Candidates
                                                         </Link> </div> </div>
                                    </div>
                                    <div className="col-sm-4 border   px-4 py-4 shadow-sm">
                                        <h5>Java</h5>
                                        <div className="mt-2">
                                            <span className="mr-sm-2"> <FontAwesomeIcon icon="building" size="xs" />  ADD Technologies (India) Limited</span>
                                            <br /><span className="mr-sm-2"><FontAwesomeIcon icon="suitcase" size="xs" />  5-10 Years</span>
                                            <br /><span className="mr-sm-2"><FontAwesomeIcon icon="map-marker-alt" size="xs" />  Hyderabad, Channai, Bengalore</span>
                                            <br />
                                            <div className="row float-sm-right">
                                                <Link className="btn btn-primary btn-sm rounded-0" to="/candidates">
                                                    View Candidates
                                                         </Link> </div> </div>
                                    </div>
                                    <div className="col-sm-4 border    px-4 py-4 shadow-sm">
                                        <h5>HR</h5>
                                        <div className="mt-2">
                                            <span className="mr-sm-2"> <FontAwesomeIcon icon="building" size="xs" />  ADD Technologies (India) Limited</span>
                                            <br /> <span className="mr-sm-2"><FontAwesomeIcon icon="suitcase" size="xs" />  5-10 Years</span>
                                            <br /> <span className="mr-sm-2"><FontAwesomeIcon icon="map-marker-alt" size="xs" />  Hyderabad, Channai, Bengalore</span>
                                            <br />
                                            <div className="row float-sm-right">
                                                <Link className="btn btn-primary btn-sm rounded-0" to="/candidates">
                                                    View Candidates
                                                         </Link>   </div>  </div>
                                    </div>
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
                                    </div>
                                </div>
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