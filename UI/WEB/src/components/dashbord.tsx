import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class Dashboard extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {

        }
    }


    render() {
        return (<>
            <div className="container mt-5">
                <div className="card-deck text-light">
                    <div className="card bg-primary rounded-0" >

                        <div className="card-body">
                            <div className="row">
                                <span className="col-sm-4">
                                    <FontAwesomeIcon icon="file-alt" size="5x" />
                                </span>
                                <span className="col-sm-8">
                                    Some text inside the first card
                            </span>
                            </div>
                        </div>


                    </div>
                    <div className="card bg-primary rounded-0">
                        <div className="card-body">
                            <div className="row">
                                <span className="col-sm-4">
                                    <FontAwesomeIcon icon="user" size="5x" />
                                </span>
                                <span className="col-sm-8">
                                    Some text inside the first card
                            </span>
                            </div>
                        </div>


                    </div>
                    <div className="card bg-primary rounded-0">

                        <div className="card-body">
                            <div className="row">
                                <span className="col-sm-4">
                                    <FontAwesomeIcon icon="building" size="5x" />
                                </span>
                                <span className="col-sm-8">
                                    Some text inside the first card
                            </span>
                            </div>
                        </div>


                    </div>
                    {/* <div className="card bg-danger rounded-0">
                        <div className="card-body">
                            <div className="row">
                                <span className="col-sm-4">
                                    <FontAwesomeIcon icon="file-alt" size="5x" />
                                </span>
                                <span className="col-sm-8">
                                    Some text inside the first card
                            </span>
                            </div>
                        </div>


                    </div> */}
                </div>
            </div>

        </>)
    }


}
export default Dashboard;