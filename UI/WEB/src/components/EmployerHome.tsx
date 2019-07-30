import React from 'react';

class EmployerHome extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            userName: '',
            location: '',
            skillSet: '',
            noticePeriod: '',
            minExperience: '',
            maxExperience: ''
        }
    }

    handleSubmit = (e: any) => {
        e.preventDefault();
    }

    changeValue = (e: any) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    render() {
        return (
            <>
                <div className="col-lg-12 mt-3">
                    <div className="text-center">
                        <p className="text-uppercase">
                            1000+ Candidates Registred Last Week
            </p>
                        <h2 className="text-uppercase mt-4 mb-5">
                            Easiest way to find Candidates
            </h2>
                        <div className="col-sm-8 mx-auto  mt-3">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <input
                                            type="text"
                                            id="tptcat"
                                            placeholder="User Name"
                                            className="form-control  rounded-0  "
                                            name="userName"
                                            value={this.state.userName}
                                            onChange={this.changeValue}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <input
                                            type="text"
                                            id="tptloc"
                                            placeholder="Location"
                                            className="form-control   rounded-0 "
                                            name="location"
                                            value={this.state.location}
                                            onChange={this.changeValue}

                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <input
                                            type="text"
                                            id="tptloc"
                                            placeholder="Skill Set"
                                            className="form-control   rounded-0 "
                                            name="skillSet"
                                            onChange={this.changeValue}
                                            value={this.state.skillSet}
                                        />
                                    </div> <div className="form-group col-md-6">
                                        <input
                                            type="text"
                                            id="tptloc"
                                            placeholder="Notice Period"
                                            className="form-control   rounded-0 "
                                            name="noticePeriod"
                                            value={this.state.noticePeriod}
                                            onChange={this.changeValue}

                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <div className="input-group">
                                            <input
                                                type="number"
                                                min="0"
                                                placeholder="Min Experience"
                                                className="form-control"
                                                name="minExperience"
                                                value={this.state.minExperience}
                                                onChange={this.changeValue}

                                            />
                                            <input
                                                type="number"
                                                min="0"
                                                placeholder="Man Experience"
                                                className="form-control"
                                                name="manExperience"
                                                value={this.state.manExperience}
                                                onChange={this.changeValue}

                                            />
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <input
                                            type="submit"
                                            id="search"
                                            className="btn btn-primary btn-block rounded-0 "
                                            value="Search"
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>



            </>
        )
    }
}

export default EmployerHome;