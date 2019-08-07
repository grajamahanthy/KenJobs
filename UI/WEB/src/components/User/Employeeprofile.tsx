import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Apiservices from "../services/Apiservices";
import LoaderModal from "../util/LoaderModal";

class Employeeprofile extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            gender: '',
            profilepic: '',
            loader: false
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onSubmit = (e: any) => {
        e.preventDefault();
        this.setState({
            loader: true
        })

        const employer = this.state;
        let body = new URLSearchParams();
        // body.set('Client_Id', '');
        body.set('Id', employer.id);
        body.set('FirstName', employer.firstName);
        body.set('LastName', employer.lastName);  
        body.set('PhoneNumber', employer.phone);
        body.set('Email', employer.email);
        body.set('ProfilePhoto', employer.profilepic);
        body.set('Gender_Id', employer.gender);
        const Servicecall = new Apiservices();
        let responce = Servicecall.POST_SECURE_CALL('Employer/updateEmployer', body, this.success, this.errorHandle)
    }


    success = (data: any) => {
        if (data == 1) {
            this.setState({
                loader: false
            })
            console.log("successfully updated");
        }
    }
    onChange = (e: any) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };


    componentWillMount() {
        this.setState({
            loader: true
        })

        const Servicecall = new Apiservices();
        let responce = Servicecall.GET_SECURE_CALL('Employer/GetEmployerById', null, this.displayData, this.errorHandle)
    }

    errorHandle = (error: any) => {

    }
    displayData = (data: any) => {

        this.setState({
            id: data.Id,
            firstName: data.FirstName,
            lastName: data.LastName,
            email: data.Email,
            phone: data.PhoneNumber,
            gender: data.Gender_Id,
            profilepic: data.ProfilePhoto,
            createdBy: data.CreatedBy,
            createdOn: data.CreatedOn,
            updatedBy: data.UpdatedBy,
            updatedOn: data.UpdatedOn,
        })
        this.setState({
             loader: false
         })
    }

    render() {
        console.log(this.state)
        return (
            <>
             {this.state.loader ?
          <LoaderModal></LoaderModal>
        : ''}
                <div className="container mt-3">
                    <h1>Employer Profile</h1>
                    <div className="mt-5">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card  border rounded pt-2 mb-2 shadow-sm p-3 ">
                                        <div className="card-text mb-2">

                                            <form onSubmit={this.onSubmit}>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
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

                                                    <div className="form-group col-md-6">
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
                                                            readOnly
                                                        />
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label htmlFor="inputPassword4">Phone Number</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="inputPassword4"
                                                            name="phone"
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
                                                            onChange={this.onChange}
                                                        >
                                                            <option value="" >Gender</option>
                                                            <option value="1" >Male</option>
                                                            <option value="2">Female</option>
                                                            <option value="3">Transgender</option>

                                                        </select>
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

            </>
        )
    }
}
export default Employeeprofile;