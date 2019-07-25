import React from "react"

class Employeeprofile extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            firstName: '',
            middleName: '',
            lastName: '',
            email: '',
            phone: '',
            gender: '',
            profilePicture: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onSubmit = (e: any) => {
        e.preventDefault();

    }

    onChange = (e: any) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    render() {
        return (
            <>

                <div className="col-lg-12 ">
                    <div className="text-center text-secondary">
                    </div>
                    <div className="mt-0">
                        <h4 className="card-title text-primary">Employee Profile</h4>
                        <div className="col-lg-12">
                            <div className="card  border rounded pt-2 mb-2 shadow-sm p-3 ">
                                <div className="card-text mb-2">

                                    <form onClick={this.onSubmit}>
                                        <div className="form-row">
                                            <div className="form-group col-md-4">
                                                <label htmlFor="firstName">First Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="firstName"
                                                    value={this.state.firstName}
                                                    id="firstName"
                                                    placeholder="First Name"
                                                    onChange={this.onChange}
                                                />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="middleName">Middle Name</label>
                                                <input type="text"
                                                    className="form-control"
                                                    name="middleName"
                                                    value={this.state.middleName}
                                                    id="middleName"
                                                    placeholder="Middle Name"
                                                    onChange={this.onChange}
                                                />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="inputCity">Last Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="lastName"
                                                    name="lastName"
                                                    value={this.state.lastName}
                                                    placeholder="Last Name"
                                                    onChange={this.onChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="Email">Email</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="Email"
                                                    name="email"
                                                    value={this.state.email}
                                                    placeholder="Email"
                                                    onChange={this.onChange}
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="inputPassword4">Phone Number</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="inputPassword4"
                                                    name="email"
                                                    value={this.state.phone}
                                                    placeholder="Phone Number"
                                                    onChange={this.onChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row">

                                            <div className="form-group col-md-6">
                                                <label htmlFor="inputEmail4">Gender</label>
                                                <select id="inputState"
                                                    className="form-control"
                                                    value={this.state.gender}
                                                    name="gender"
                                                    onChange={this.onChange}>

                                                    <option selected >Gender</option>
                                                    <option>Male</option>
                                                    <option>Female</option>
                                                    <option>Transgender</option>

                                                </select>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="inputEmail4">&nbsp;</label>

                                                {/* <label htmlFor="inputPassword4">Profile Picture</label>
                                                <img className="form-control" src={this.state.profilePicture} ></img>
                                                <input type="file" name="myFile" /> */}
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">Upload</span>
                                                    </div>
                                                    <div className="custom-file">
                                                        <input type="file" className="custom-file-input" id="inputGroupFile01" />
                                                        <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <button type="submit" className="btn btn-primary">Sign in</button>
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
export default Employeeprofile;