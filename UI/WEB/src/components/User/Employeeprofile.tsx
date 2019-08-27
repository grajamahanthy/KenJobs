import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Apiservices from "../services/Apiservices";
import LoaderModal from "../util/LoaderModal";
import Notify from "../common/Notify";
import UserAttachmentModel from "../../Models/UserAttachment";
import AttachmentModel from "../../Models/Attachment";
const notify = new Notify();

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
            notify.Success_notify("Profile Updated Succesfully");
        }
    }
    onChange = (e: any) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };


    componentDidMount() {
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
            UserProfileAttachment: data.UserAttachment,
        })
        this.setState({
            loader: false
        })
    }
    PostProfileAttachment = () => {
        this.setState({
            loader: true,
        })
        let body = new URLSearchParams();
        let user = this.state.UserProfileAttachment;
        const Servicecall = new Apiservices();
        let responce = Servicecall.POST_SECURE_CALL1('Attachment/PostAttachment', user, this.successProfile, this.errorHandle)

    }
    successProfile = (data: any) => {
        this.setState({
            loader: false,
        })
        notify.Success_notify("Profile Picture Uploaded Succesfully")
    }
  
    _handleImageChange(e: any) {
        e.preventDefault();
        let imgreader = new FileReader();
        let file = e.target.files[0];
        imgreader.onloadend = () => {

            let u = this.state.UserProfileAttachment;
            let a = new AttachmentModel();
            a.Base64Text = ((imgreader.result == null ? '' : imgreader.result)).toString();
            a.FileExtension = file.name;
            a.Id = u.Attachment.Id;
            u.Attachment = a;
            u.AttachmentType_Id = 1;

            this.setState({
                UserProfileAttachment: u
            }, () => this.PostProfileAttachment());

        }
        imgreader.readAsDataURL(file)
    }

    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (this.state.UserProfileAttachment && this.state.UserProfileAttachment.Attachment &&
            this.state.UserProfileAttachment.Attachment.Base64Text && this.state.UserProfileAttachment.Attachment.Base64Text != "null") {
            $imagePreview = (<img src={this.state.UserProfileAttachment.Attachment.Base64Text} className="rounded-circle img-fluid  mt-2" width="100%" style={{ height: "200px" }} alt='' />);
        } else {
            $imagePreview = (<img src={require('../../assets/images/DP.png')} className="rounded-circle img-fluid mt-2" style={{ height: "200px" }} alt='' />);
        }
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
                                                    <div className="col-sm-6">
                                                        <div className="col-sm-7 mx-auto">
                                                            <div className="text-center">
                                                                {$imagePreview}
                                                                <br />
                                                                <div className="upload-btn-wrapper my-2">
                                                                    <input type="file" className="btn  btn-lg btn-block rounded-0" onChange={(e) => this._handleImageChange(e)} />
                                                                    <button className="btn btn-primary">
                                                                        Upload Profile Image
                                                                </button>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">

                                                        <div className="form-group col-md">
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
                                                        <div className="form-group col-md">
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
                                                        <div className="form-group col-md">
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
                                                        <div className="form-group col-md">
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

                                                        <div className="form-group col-md">
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
                                                        <div className="form-group col-md">
                                                            <button type="submit" className="btn btn-primary">Update Profile</button>
                                                        </div>
                                                    </div>
                                                </div>
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