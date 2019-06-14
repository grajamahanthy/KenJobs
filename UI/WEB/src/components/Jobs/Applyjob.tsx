import React from 'react';
import { Pagination } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Applyjob extends React.Component<any, any>{
    constructor(props: any) {
        super(props);



    }
    render() {

        return (
            <>

                <div className="container mt-3">
                    <h1>Applyed Jobs List</h1>
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

                        {/* 
                        <div className="row">
                            <div className="col border  my-1 p-3">
                                <div className="row">
                                    <div className="col-md-8">
                                        <h4 className="text-primary">Jacqueline Fernandez</h4>
                                        <h6 >Title : Senior Developer</h6>
                                        <h6 >Email : Jacqueline@gmail.com </h6>
                                        <h6 >Phone : +91 99988 12255</h6>
                                        <h6>Key Skills : .Net Core, Web API, Angular, React,sql server, html, java script, jquery, angular js </h6>
                                        <div className="float-sm-right">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        */}

                        <div className="row"> 
                            <div className="card  border rounded-0 pt-2 mb-2 shadow-sm p-3 ">


                                <h6 className="card-title text-primary" >
                                    System Administrator
                                </h6>
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

                                        
                                    </div>


                                </div>

                            </div>
                        </div>
                        <div className="row">
                            <div className="card  border rounded-0 pt-2 mb-2 shadow-sm p-3 ">


                                <h6 className="card-title text-primary" >
                                    System Administrator
                                </h6>
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

                                        
                                    </div>


                                </div>

                            </div>
                        </div>
                        <div className="row">
                            <div className="card  border rounded-0 pt-2 mb-2 shadow-sm p-3 ">


                                <h6 className="card-title text-primary" >
                                    System Administrator
                                </h6>
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

                                        
                                    </div>


                                </div>

                            </div>
                        </div>
                        <div className="row">
                            <div className="card  border rounded-0 pt-2 mb-2 shadow-sm p-3 ">


                                <h6 className="card-title text-primary" >
                                    System Administrator
                                </h6>
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

                                        
                                    </div>


                                </div>

                            </div>
                        </div>
                        <div className="row">
                            <div className="card  border rounded-0 pt-2 mb-2 shadow-sm p-3 ">


                                <h6 className="card-title text-primary" >
                                    System Administrator
                                </h6>
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

                                        
                                    </div>


                                </div>

                            </div>
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
            </>
        )
    }
}

export default Applyjob;