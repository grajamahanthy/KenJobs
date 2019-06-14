import React from 'react';

class Postjob extends React.Component {
    constructor(props: any) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit() {
    }
    render() {
        return (
            <>
                <div className="col-lg-12 ">
                    <div className="text-center text-secondary">
                    </div>
                    <div className="mt-0">
                        <h4 className="card-title text-primary">Post New Job</h4>
                        <div className="col-lg-12">
                            <div className="card  border rounded pt-2 mb-2 shadow-sm p-3 ">
                                <div className="card-text mb-2">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <div className="form-group">
                                                <label htmlFor="inputAddress">Job Title</label>
                                                <input type="text" className="form-control" id="jobTitle" placeholder="Enter Job Title" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="inputAddress">Keyskills (Multi select list box)</label>
                                                <input type="text" className="form-control" id="jobTitle" placeholder="Required technologies" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="inputAddress">Job Description</label>
                                                <textarea className="form-control"></textarea>
                                            </div>

                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="inputState">Experiance</label>
                                                    <div className="input-group">
                                                        <input type="number" min="0" max="30" placeholder="Enter 0-30" className="form-control" />
                                                        <input type="number" min="0" max="50" placeholder="Enter 0-50" className="form-control" />
                                                    </div>
                                                </div>

                                                <div className="form-group col-md-6">
                                                    <label htmlFor="inputZip">Location</label>
                                                    <input type="text" className="form-control" id="inputZip" autoComplete="off" />
                                                </div>
                                            </div>


                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="inputState">Salary</label>
                                                    <div className="input-group">
                                                        <input type="number" min="0" className="form-control" />
                                                        <input type="number" min="0" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="btnsubmit">&nbsp;</label>

                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-primary mt-4" id="btnsubmit">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default Postjob 