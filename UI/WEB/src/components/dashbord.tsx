import React from 'react';
class Dashboard extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {

        }
    }


    render() {
        return (<>
            <div className="container">
                <div className="card-deck text-light">
                    <div className="card bg-primary">
                        <div className="card-body text-center">
                            <p className="card-text">Some text inside the first card</p>
                        </div>
                    </div>
                    <div className="card bg-warning">
                        <div className="card-body text-center">
                            <p className="card-text">Some text inside the second card</p>
                        </div>
                    </div>
                    <div className="card bg-success">
                        <div className="card-body text-center">
                            <p className="card-text">Some text inside the third card</p>
                        </div>
                    </div>
                    <div className="card bg-danger">
                        <div className="card-body text-center">
                            <p className="card-text">Some text inside the fourth card</p>
                        </div>
                    </div>
                </div>
            </div>

        </>)
    }


}
export default Dashboard;