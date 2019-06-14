import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Jobdescription extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <>
                <div className="container mt-5">
                    <div className="card  border rounded-0 pt-2 mb-2 shadow-sm p-3 ">


                        <h4 className="card-title text-primary" >
                            System Administrator
                            </h4>
                        <div className="card-text mb-2">


                            <div className="mt-2">
                                <span className="mr-sm-2"> <FontAwesomeIcon icon="building" size="xs" />  ADD Technologies (India) Limited</span>
                                <span className="mr-sm-2"><FontAwesomeIcon icon="suitcase" size="xs" />  5-10 Years</span>
                                <span className="mr-sm-2"><FontAwesomeIcon icon="map-marker-alt" size="xs" />  Hyderabad, Channai, Bengalore</span>
                            </div>
                            <div className="mt-2">
                                <span className="mr-sm-2"> <FontAwesomeIcon icon="chess-king" size="xs" className="mr-2" />
                                    LAN, Troubleshooting, System Administration, system admin...
                                </span>
                            </div>
                            <div className=" row mt-2 ">
                                <span>
                                    <span className="col-sm-2" >
                                        <FontAwesomeIcon icon="newspaper" size="xs" />
                                    </span>
                                    <span className="col-sm-10 pull-right text-wrap text-justify">
                                        Should have excellent knowledge in Trouble shooting of all desktops/laptops, LAN configuration, operating system &amp; software installation,Should have excellent knowledge in Trouble shooting of all desktops/laptops, LAN configuration, operating system &amp; software installation,
                                </span>
                                </span>
                            </div>

                            <div className="mt-2">
                                <span className="mr-sm-2"><FontAwesomeIcon icon="wallet" size="xs" /> :
                                        50,000 - 70,000
                            </span>
                                <span className="mr-sm-2 pull-right">Posted By
                                <FontAwesomeIcon icon="user-tie" size="xs" className="ml-2" /> :
                                                          Vamsi Krishna(Chari)
                                </span>
                                <span className="mr-sm-2">1 day ago
                            </span>
                            </div>
                            <div className="row float-sm-right">

                                <button className="btn btn-primary btn-sm rounded-0 mr-2" >Add to Favorite  </button>
                                <button className="btn btn-primary btn-sm  rounded-0 mr-2" >Save  </button>
                                <button className="btn btn-primary btn-sm rounded-0  mr-2" >Apply  </button>
                            </div>


                        </div>

                    </div>
                </div>


            </>
        )
    }
}
export default Jobdescription