import React from 'react'

class JobSearch extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            keyword: "",
            location: ""
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.changevalue = this.changevalue.bind(this);
    }


    onSubmit = (e: any) => {
        e.preventDefault();
        this.props.GetValues(this.state);
    }

    changevalue = (e: any) => {
        this.setState({
            [e.target.name]: e.target.value
        });

    }

    render() {
        return (
            <>
                <div className="col-sm-8 mx-auto  mt-3">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-row">
                            <div className="form-group col-md-5">
                                <input
                                    type="text"
                                    id="tptcat"
                                    placeholder="Enter Keyword"
                                    className="form-control  rounded-0  "
                                    name="keyword"
                                    value={this.state.keyword}
                                    onChange={this.changevalue}
                                />
                            </div>
                            <div className="form-group col-md-5">
                                <input
                                    type="text"
                                    id="tptloc"
                                    placeholder="Enter Location"
                                    className="form-control   rounded-0 "
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.changevalue}
                                />
                            </div>
                            <div className="form-group col-md-2">
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
            </>
        )
    }
}

export default JobSearch;