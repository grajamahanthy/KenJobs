import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class CandidateProfile extends React.Component<any, any>{
    constructor(props: any) {
        super(props)
        this.state = {
            FirstName: '',
            LastName: '',
            PhoneNumber: '',
            Email: '',
            skills: '',
            TotalExperiance: '',
            Languages: '',
            Education: [{}],
            experiencedata: {
                companyname: "",
                role: "",
                technology: "",
                startdate: "",
                enddate: ""
            },
            Experience: []
        }
        this.addRow = this.addRow.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.handlechange = this.handlechange.bind(this);
    }
    addRow(e: any) {
        e.preventDefault();
        let index = this.state.Experience.length;
        this.setState({
            Experience: [...this.state.Experience,  this.state.experiencedata ]
        })
    }
    removeRow(e: any, index: number) {
        e.preventDefault();
        let row = this.state.Experience[index];
        console.log(index);
        console.log(row);
        console.log(this.state.Experience);
        // this.state.Experience.splice(index, 1);
        // this.setState({ Experience: this.state.Experience });
    }
    handlechange(e: any, index: number) {
        e.preventDefault();
        let row = this.state.Experience[index];
        //  console.log(row);
        this.state.Experience[index][e.target.name] = e.target.value;
        this.setState({ Experience: this.state.Experience })
    }
    render() {

        return (
            <div className="container mt-3">
                <h1>User Profile</h1>
                <div className="mt-5">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card  border rounded pt-2 mb-2 shadow-sm p-3 ">
                                    <div className="card-text mb-2">

                                        <form >
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
                                                    >

                                                        <option selected >Gender</option>
                                                        <option>Male</option>
                                                        <option>Female</option>
                                                        <option>Transgender</option>

                                                    </select>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="inputEmail4">&nbsp;</label>


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

                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="Email">Designation</label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        id="Email"
                                                        name="email"
                                                        value={this.state.email}
                                                        placeholder="Email"

                                                    />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="inputPassword4">Total Experience</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="inputPassword4"
                                                        name="email"
                                                        value={this.state.phone}
                                                        placeholder="Phone Number"

                                                    />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="Email">Languages</label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        id="Email"
                                                        name="email"
                                                        value={this.state.email}
                                                        placeholder="Email"

                                                    />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="inputPassword4">Skill Set</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="inputPassword4"
                                                        name="email"
                                                        value={this.state.phone}
                                                        placeholder="Phone Number"

                                                    />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-4">
                                                    <label htmlFor="firstName">Country</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="firstName"
                                                        value={this.state.firstName}
                                                        id="firstName"
                                                        placeholder="First Name"
                                                    />
                                                </div>
                                                <div className="form-group col-md-4">
                                                    <label htmlFor="middleName">State</label>
                                                    <input type="text"
                                                        className="form-control"
                                                        name="middleName"
                                                        value={this.state.middleName}
                                                        id="middleName"
                                                        placeholder="Middle Name"
                                                    />
                                                </div>
                                                <div className="form-group col-md-4">
                                                    <label htmlFor="inputCity">City</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="lastName"
                                                        name="lastName"
                                                        value={this.state.lastName}
                                                        placeholder="Last Name"
                                                    />
                                                </div>
                                            </div>
                                            <div className="card-block mb-2">

                                                <div className="row ">
                                                    <div className="col-sm-12">
                                                        <div className="card mt-2">
                                                            <div className="card-header">
                                                                <h4>Experience</h4>
                                                            </div>
                                                            <div className="card-body">

                                                                <table className="table table-bordered table-hover">
                                                                    <thead>
                                                                        <tr className="text-center">
                                                                            <th>Company</th>
                                                                            <th>Role</th>
                                                                            <th>Technology</th>
                                                                            <th>Start Date</th>
                                                                            <th>End Date</th>
                                                                            <th>
                                                                                <div>

                                                                                    <button onClick={this.addRow} className="btn btn-success"> <span className="mr-sm-2"><FontAwesomeIcon icon="plus-square" size="xs" /></span></button>
                                                                                </div>
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>

                                                                        {
                                                                            this.state.Experience.map((experience: any, index: any) => {
                                                                                return (
                                                                                    <tr key={index}>
                                                                                        <td>
                                                                                            <input
                                                                                                type="text"
                                                                                                className="form-control"
                                                                                                id="companyName"
                                                                                                name="companyname"
                                                                                                onChange={(e) => this.handlechange(e, index)}
                                                                                            />
                                                                                        </td>
                                                                                        <td>
                                                                                            <input
                                                                                                type="text"
                                                                                                className="form-control"
                                                                                                id="companyName"
                                                                                                name="role"
                                                                                                onChange={(e) => this.handlechange(e, index)}

                                                                                            />
                                                                                        </td>
                                                                                        <td>
                                                                                            <input
                                                                                                type="text"
                                                                                                className="form-control"
                                                                                                id="companyName"
                                                                                                name="technology"
                                                                                                onChange={(e) => this.handlechange(e, index)}

                                                                                            />
                                                                                        </td>
                                                                                        <td>
                                                                                            <input
                                                                                                type="text"
                                                                                                className="form-control"
                                                                                                id="companyName"
                                                                                                name="startdate"
                                                                                                onChange={(e) => this.handlechange(e, index)}

                                                                                            />
                                                                                        </td>
                                                                                        <td>
                                                                                            <input
                                                                                                type="text"
                                                                                                className="form-control"
                                                                                                id="companyName"
                                                                                                name="enddate"
                                                                                                onChange={(e) => this.handlechange(e, index)}

                                                                                            />
                                                                                        </td>
                                                                                        <td>
                                                                                            <button onClick={(e) => this.removeRow(e, index)} className="btn btn-danger"> <span className="mr-sm-2"><FontAwesomeIcon icon="trash-alt" size="xs" /></span></button>

                                                                                        </td>
                                                                                    </tr>
                                                                                )
                                                                            })
                                                                        }
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12">
                                                        <div className="card mt-2">
                                                            <div className="card-header">
                                                                <h4>Educational Qualification</h4>
                                                            </div>
                                                            <div className="card-body">
                                                                <table className="table table-bordered">
                                                                    <thead>
                                                                        <th>University</th>
                                                                        <th>Qualification</th>
                                                                        <th>Year Of Pass</th>
                                                                        <th>Percentage</th>
                                                                    </thead>
                                                                    <tbody>

                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-primary">Update Profile</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default CandidateProfile;