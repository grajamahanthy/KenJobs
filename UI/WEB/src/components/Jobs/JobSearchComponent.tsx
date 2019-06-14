import React from 'react'

class JobSearch extends React.Component<any>{
    constructor(props: any) {
        super(props);


        this.onSubmit = this.onSubmit.bind(this);

    }


    onSubmit = (e: any) => {
        e.preventDefault();

    }
    render() {
        return (
            <>
                <div className="col-sm-8 mx-auto  mt-5">
                    <form onClick={this.onSubmit}>
                        <div className="form-row">
                            <div className="form-group col-md-5">
                                <input type="text" id="tptcat" placeholder="Enter Keyword" className="form-control  rounded-0  " />
                            </div>
                            <div className="form-group col-md-5">
                                <input type="text" id="tptloc" placeholder="Enter Location" className="form-control   rounded-0 " />
                            </div>
                            <div className="form-group col-md-2">
                                <input type="submit" id="search" className="btn btn-primary btn-block rounded-0 " value="Search" />
                            </div>
                        </div>
                    </form>
                </div>
            </>
        )
    }
}

export default JobSearch;