import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Apiservices from '../services/Apiservices';
import LoaderModal from '../util/LoaderModal';
import UserProfileModel from '../../Models/User';
import ExperienceModel from '../../Models/Experience';
import EducationalQualificationModel from '../../Models/Education';
import UserAttachmentModel from '../../Models/UserAttachment';
import AttachmentModel from '../../Models/Attachment';
import { ToastContainer, toast } from 'react-toastify';
import Notify from '../../components/common/Notify';
import { AppState } from '../../store';
import { updateSession } from "../../store/auth/actions";
import { connect } from 'react-redux';


const notify = new Notify();
class CandidateProfile extends React.Component<any, any>{
    constructor(props: any) {
        super(props)
        this.state = {
            UserProfile: new UserProfileModel(),
            UserProfileAttachment: new UserAttachmentModel(),
            UserResumeAttachment: new UserAttachmentModel(),
            loader: false,
            file: '',
            imagePreviewUrl: '',
            resume: '',
        }

        this.addExperienceRow = this.addExperienceRow.bind(this);
        this.removeExperienceRow = this.removeExperienceRow.bind(this);
        this.addEducationRow = this.addEducationRow.bind(this);
        this.removeEducationRow = this.removeEducationRow.bind(this);
        this.handleExperiencechange = this.handleExperiencechange.bind(this);
        this.handleEducationchange = this.handleEducationchange.bind(this);
        this.SubmitHandle = this.SubmitHandle.bind(this);
    }


    SubmitHandle = (e: any) => {
        e.preventDefault();
        var form = document.forms[0];
        if (form.checkValidity() === false) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return false;
        }
        else {
            form.classList.add('was-validated');

            let candidate = this.state.UserProfile;
            let Servicecall = new Apiservices();
            this.setState({ loader: true })
            let responce = Servicecall.POST_SECURE_CALL1('Candidate/UpdateCandidate', candidate, this.success, this.errorHandle)
        }

    }

    success = (data: any) => {
        this.loadCandidateData();
        this.loadCandidateProfilePicture();
        this.loadCandidateResume();

        this.setState({
            loader: false,
        })

        notify.Success_notify("Profile Updated Succesfully")
    }
    successProfile = (data: any) => {
        this.loadCandidateProfilePicture();
        this.props.updateSession({
            profileimg: this.state.UserProfileAttachment.Attachment.Base64Text,
        });
        this.setState({
            loader: false,
        })
        notify.Success_notify("Profile Picture Uploaded Succesfully")
    }

    successResume = (data: any) => {
        this.loadCandidateResume();
        this.setState({
            loader: false,
        })
        notify.Success_notify("Resume Uploaded Succesfully")
    }

    onChange = (e: any) => {
        e.preventDefault();
        let up: any = this.state.UserProfile;
        up[e.target.name] = e.target.value;
        this.setState({ UserProfile: up })
    }

    onChangeProfile = (e: any) => {
        e.preventDefault();
        let up: any = this.state.UserProfile;
        up.Profile[0][e.target.name] = e.target.value;
        this.setState({ UserProfile: up })
    }

    displayData = (data: any) => {
        // console.log(data);
        this.setState({
            UserProfile: data,
            UserProfileAttachment: data.UserAttachment,
            loader: false
        })
    }

    componentDidMount() {
        this.setState({
            loader: true
        })
        this.loadCandidateData();
        this.loadCandidateProfilePicture();
    }

    loadCandidateData = () => {
        const Servicecall = new Apiservices();
        let responce = Servicecall.GET_SECURE_CALL('Candidate/Get', null, this.displayData, this.errorHandle)
    }
    loadCandidateProfilePicture = () => {
        const Servicecall = new Apiservices();
        // let res1 = Servicecall.GET_SECURE_CALL('Attachment?attachmentTypeId=1', null, this.displayProfilePicture, this.errorHandle)
        let res2 = Servicecall.GET_SECURE_CALL('Attachment?attachmentTypeId=2', null, this.displayResume, this.errorHandle)

    }
    loadCandidateResume = () => {
        // const Servicecall = new Apiservices();
        // let responce = Servicecall.GET_SECURE_CALL('Attachment?attachmentTypeId=2', null, this.displayResume, this.errorHandle)
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
    PostResumeAttachment = () => {
        this.setState({
            loader: true,
        })
        let body = new URLSearchParams();
        let user = this.state.UserResumeAttachment;
        const Servicecall = new Apiservices();
        let responce = Servicecall.POST_SECURE_CALL1('Attachment/PostAttachment', user, this.successResume, this.errorHandle)

    }

    // displayProfilePicture = (data: any) => {
    //     // this.setState({
    //     //     UserProfileAttachment: data
    //     // })
    // }

    displayResume = (data: any) => {
        this.setState({
            UserResumeAttachment: data
        })
    }

    errorHandle() {

    }

    addExperienceRow(e: any) {
        e.preventDefault();
        let up: UserProfileModel = this.state.UserProfile;
        up.Experience.push(new ExperienceModel);
        this.setState({
            UserProfile: up
        })
    }

    removeExperienceRow(e: any, index: number) {
        e.preventDefault();
        let up: UserProfileModel = this.state.UserProfile;
        up.Experience[index].UiStatus = 'D';
        this.setState({
            UserProfile: up
        })
    }

    addEducationRow(e: any) {
        e.preventDefault();
        let up: UserProfileModel = this.state.UserProfile;
        up.EducationalQualification.push(new EducationalQualificationModel);
        this.setState({
            UserProfile: up
        })

    }

    removeEducationRow(e: any, index: number) {
        e.preventDefault();
        let up: UserProfileModel = this.state.UserProfile;
        up.EducationalQualification[index].UiStatus = 'D';
        this.setState({
            UserProfile: up
        })
    }

    handleExperiencechange(e: any, index: number) {
        e.preventDefault();
        let up: any = this.state.UserProfile;
        up.Experience[index][e.target.name] = e.target.value;
        this.setState({ UserProfile: up })
    }

    handleEducationchange(e: any, index: number) {
        e.preventDefault();
        let up: any = this.state.UserProfile;
        up.EducationalQualification[index][e.target.name] = e.target.value;
        this.setState({ UserProfile: up })
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

    _handleFileChangeChange(e: any) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {

            let u = this.state.UserResumeAttachment;
            let a = new AttachmentModel();
            a.Base64Text = ((reader.result == null ? '' : reader.result)).toString();
            a.FileExtension = file.name;
            a.Id = u.Attachment.Id;
            u.Attachment = a;
            u.AttachmentType_Id = 2;

            this.setState({
                file: file,
                UserResumeAttachment: u
            }, () => this.PostResumeAttachment());

        }
        reader.readAsDataURL(file)


    }

    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (this.state.UserProfileAttachment && this.state.UserProfileAttachment.Attachment &&
            this.state.UserProfileAttachment.Attachment.Base64Text && this.state.UserProfileAttachment.Attachment.Base64Text != "null") {
            $imagePreview = (<img src={this.state.UserProfileAttachment.Attachment.Base64Text} className="rounded-circle img-fluid mt-2" style={{ height: "200px" }} alt='' />);
        } else {
            $imagePreview = (<img src={require('../../assets/images/DP.png')} className="rounded-circle img-fluid mt-2" width="100%" style={{ height: "200px" }} alt='' />);
        }



        return (
            <>

                {this.state.loader ?
                    <LoaderModal></LoaderModal>
                    : ''}
                <div className="container mt-3">
                    <h1>User Profile</h1>
                    <div className="mt-5">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card  border rounded mt-2 mb-2 shadow-sm p-3 ">
                                        <div className="card-text row mx-2 my-2">
                                            <div className="col-sm-6 text-center">
                                                {/* <img src={require('../../assets/images/DP.png')} width="100%" height="200" alt='' /> */}
                                                {$imagePreview}
                                                <br />
                                                <div className="upload-btn-wrapper my-2">
                                                    <input type="file" className="btn  btn-lg btn-block rounded-0" onChange={(e) => this._handleImageChange(e)} />
                                                    <button className="btn btn-primary">
                                                        Upload Profile Image
                                                    </button>
                                                </div>
                                                {/* <button className="btn btn-primary">
                                                    Remove
                                                </button> */}
                                            </div>
                                            <div className="col-sm-6 text-center">
                                                <FontAwesomeIcon icon="upload" size="10x" className="mt-5 text-primary" />
                                                <br />
                                                <div className="upload-btn-wrapper my-2">
                                                    <input type="file" className="btn  btn-lg btn-block rounded-0" onChange={(e) => this._handleFileChangeChange(e)} />
                                                    <button className="btn btn-primary">
                                                        Upload Resume
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card  border rounded pt-2 mb-2 shadow-sm p-3 ">
                                        <div className="card-text mb-2">

                                            <form onSubmit={this.SubmitHandle} className="needs-validation" noValidate>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <label htmlFor="firstName">First Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="FirstName"
                                                            value={this.state.UserProfile.FirstName}
                                                            id="firstName"
                                                            placeholder="First Name"
                                                            onChange={this.onChange}
                                                            required
                                                        />
                                                    </div>

                                                    <div className="form-group col-md-6">
                                                        <label htmlFor="inputCity">Last Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="lastName"
                                                            name="LastName"
                                                            value={this.state.UserProfile.LastName}
                                                            placeholder="Last Name"
                                                            required
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
                                                            name="Email"
                                                            value={this.state.UserProfile.Email}
                                                            placeholder="Email"
                                                            required
                                                            onChange={this.onChange}


                                                        />
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label htmlFor="inputPassword4">Phone Number</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="inputPassword4"
                                                            name="PhoneNumber"
                                                            value={this.state.UserProfile.PhoneNumber}
                                                            placeholder="Phone Number"
                                                            required
                                                            onChange={this.onChange}


                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-row">

                                                    <div className="form-group col-md-6">
                                                        <label htmlFor="inputEmail4">Gender</label>
                                                        <select id="inputState"
                                                            className="form-control"
                                                            value={this.state.UserProfile.Gender_Id}
                                                            name="Gender_Id"
                                                            required
                                                            onChange={this.onChange}
                                                        >
                                                            <option value="" >Gender</option>
                                                            <option value="1" >Male</option>
                                                            <option value="2">Female</option>
                                                            <option value="3">Transgender</option>

                                                        </select>
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label htmlFor="Email">Prefered Location</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="preferredLocation"
                                                            name="PreferredLocation"
                                                            value={this.state.UserProfile.Profile[0].PreferredLocation}
                                                            placeholder="Prefered Location"
                                                            required
                                                            onChange={this.onChangeProfile}


                                                        />
                                                    </div>

                                                </div>

                                                <div className="form-row">

                                                    {/* <div className="form-group col-md-6">
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
                                                </div> */}

                                                    <div className="form-group col-md-6">
                                                        <label htmlFor="txtExperience">Total Experience</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="txtExperience"
                                                            name="TotalExperiance"
                                                            value={this.state.UserProfile.Profile[0].TotalExperiance}
                                                            placeholder="Total Experiance"
                                                            required
                                                            onChange={this.onChangeProfile}

                                                        />
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label htmlFor="languages">Languages</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="languages"
                                                            name="Languages"
                                                            value={this.state.UserProfile.Profile[0].Languages}
                                                            placeholder="Languages"
                                                            required
                                                            onChange={this.onChangeProfile}


                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-row">

                                                    <div className="form-group col-md-6">
                                                        <label htmlFor="inputPassword4">Skill Set</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="inputPassword4"
                                                            name="skills"
                                                            value={this.state.UserProfile.Profile[0].skills}
                                                            placeholder="Skills"
                                                            required
                                                            onChange={this.onChangeProfile}

                                                        />
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label htmlFor="Email">Heigher Qualification</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="HeighestQualification"
                                                            name="HeighestQualification"
                                                            value={this.state.UserProfile.Profile[0].HeighestQualification}
                                                            placeholder="Heighest Qualification"
                                                            required
                                                            onChange={this.onChangeProfile}

                                                        />
                                                    </div>
                                                </div>

                                                {/* <div className="form-row">
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
                                          */}
                                                <div className="card-block mb-2">

                                                    <div className="row ">
                                                        <div className="col-sm-12">
                                                            <div className="card mt-2">
                                                                <div className="card-header">
                                                                    <h4>Experience</h4>
                                                                </div>
                                                                <div className="card-body">
                                                                    {/* <div>
                                                                        <div className="display-table">
                                                                            <div className="row">
                                                                                <div className="col">Company</div>
                                                                                <div className="col">Role</div>
                                                                                <div className="col">Technology</div>
                                                                                <div className="col">Start Date</div>
                                                                                <div className="col">End Date</div>
                                                                                <div className="col">Company</div>
                                                                                <div className="col">
                                                                                    <button onClick={this.addExperienceRow} className="btn btn-success"> <span className="mr-sm-2"><FontAwesomeIcon icon="plus-square" size="xs" /></span></button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="display-table">
                                                                            {
                                                                                this.state.UserProfile.Experience.map((experience: any, index: number) => {
                                                                                    if (experience.UiStatus != 'D') {
                                                                                        return (
                                                                                            <div key={index.toString()}>

                                                                                                <div>
                                                                                                    <input
                                                                                                        type="text"
                                                                                                        className="form-control"
                                                                                                        id="CompanyName"
                                                                                                        name="CompanyName"
                                                                                                        value={experience.CompanyName}
                                                                                                        required
                                                                                                        onChange={(e) => this.handleExperiencechange(e, index)}
                                                                                                    />
                                                                                                </div>
                                                                                                <div>
                                                                                                    <input
                                                                                                        type="text"
                                                                                                        className="form-control"
                                                                                                        id="Role"
                                                                                                        name="Role"
                                                                                                        value={experience.Role}
                                                                                                        required

                                                                                                        onChange={(e) => this.handleExperiencechange(e, index)}

                                                                                                    />
                                                                                                </div>
                                                                                                <div>
                                                                                                    <input
                                                                                                        type="text"
                                                                                                        className="form-control"
                                                                                                        id="Technology"
                                                                                                        name="Technology"
                                                                                                        value={experience.Technology}
                                                                                                        required

                                                                                                        onChange={(e) => this.handleExperiencechange(e, index)}

                                                                                                    />
                                                                                                </div>
                                                                                                <div>
                                                                                                    <input
                                                                                                        type="text"
                                                                                                        className="form-control"
                                                                                                        id="StartDate"
                                                                                                        name="StartDate"
                                                                                                        value={experience.StartDate}
                                                                                                        required

                                                                                                        onChange={(e) => this.handleExperiencechange(e, index)}

                                                                                                    />
                                                                                                </div>
                                                                                                <div>
                                                                                                    <input
                                                                                                        type="text"
                                                                                                        className="form-control"
                                                                                                        id="EndDate"
                                                                                                        name="EndDate"
                                                                                                        value={experience.EndDate}
                                                                                                        required

                                                                                                        onChange={(e) => this.handleExperiencechange(e, index)}

                                                                                                    />
                                                                                                </div>
                                                                                                <div>
                                                                                                    <button onClick={(e) => this.removeExperienceRow(e, index)} className="btn btn-danger"> <span className="mr-sm-2"><FontAwesomeIcon icon="trash-alt" size="xs" /></span></button>

                                                                                                </div>
                                                                                            </div>
                                                                                        )
                                                                                    }

                                                                                })

                                                                            }
                                                                        </div>
                                                                    </div> */}

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
                                                                                        <button onClick={this.addExperienceRow} className="btn btn-success"> <span className="mr-sm-2"><FontAwesomeIcon icon="plus-square" size="xs" /></span></button>
                                                                                    </div>
                                                                                </th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>

                                                                            {
                                                                                this.state.UserProfile.Experience.map((experience: any, index: number) => {
                                                                                    if (experience.UiStatus != 'D') {
                                                                                        return (
                                                                                            <tr key={index.toString()}>
                                                                                                <td>
                                                                                                    <input
                                                                                                        type="text"
                                                                                                        className="form-control"
                                                                                                        id="CompanyName"
                                                                                                        name="CompanyName"
                                                                                                        value={experience.CompanyName}
                                                                                                        required
                                                                                                        onChange={(e) => this.handleExperiencechange(e, index)}
                                                                                                    />
                                                                                                </td>
                                                                                                <td>
                                                                                                    <input
                                                                                                        type="text"
                                                                                                        className="form-control"
                                                                                                        id="Role"
                                                                                                        name="Role"
                                                                                                        value={experience.Role}
                                                                                                        required

                                                                                                        onChange={(e) => this.handleExperiencechange(e, index)}

                                                                                                    />
                                                                                                </td>
                                                                                                <td>
                                                                                                    <input
                                                                                                        type="text"
                                                                                                        className="form-control"
                                                                                                        id="Technology"
                                                                                                        name="Technology"
                                                                                                        value={experience.Technology}
                                                                                                        required

                                                                                                        onChange={(e) => this.handleExperiencechange(e, index)}

                                                                                                    />
                                                                                                </td>
                                                                                                <td>
                                                                                                    <input
                                                                                                        type="text"
                                                                                                        className="form-control"
                                                                                                        id="StartDate"
                                                                                                        name="StartDate"
                                                                                                        value={experience.StartDate}
                                                                                                        required

                                                                                                        onChange={(e) => this.handleExperiencechange(e, index)}

                                                                                                    />
                                                                                                </td>
                                                                                                <td>
                                                                                                    <input
                                                                                                        type="text"
                                                                                                        className="form-control"
                                                                                                        id="EndDate"
                                                                                                        name="EndDate"
                                                                                                        value={experience.EndDate}
                                                                                                        required

                                                                                                        onChange={(e) => this.handleExperiencechange(e, index)}

                                                                                                    />
                                                                                                </td>
                                                                                                <td>
                                                                                                    <button onClick={(e) => this.removeExperienceRow(e, index)} className="btn btn-danger"> <span className="mr-sm-2"><FontAwesomeIcon icon="trash-alt" size="xs" /></span></button>

                                                                                                </td>
                                                                                            </tr>
                                                                                        )
                                                                                    }

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
                                                                            <th>
                                                                                <div>
                                                                                    <button onClick={this.addEducationRow} className="btn btn-success"> <span className="mr-sm-2"><FontAwesomeIcon icon="plus-square" size="xs" /></span></button>
                                                                                </div>
                                                                            </th>
                                                                        </thead>
                                                                        <tbody>
                                                                            {
                                                                                this.state.UserProfile.EducationalQualification.map((education: any, index: number) => {
                                                                                    if (education.UiStatus != 'D') {
                                                                                        return (
                                                                                            <tr key={index.toString()}>
                                                                                                <td>
                                                                                                    <input
                                                                                                        type="text"
                                                                                                        className="form-control"
                                                                                                        id="university"
                                                                                                        name="Institute"
                                                                                                        value={education.Institute}
                                                                                                        required

                                                                                                        onChange={(e) => this.handleEducationchange(e, index)}
                                                                                                    />
                                                                                                </td>
                                                                                                <td>
                                                                                                    <input
                                                                                                        type="text"
                                                                                                        className="form-control"
                                                                                                        id="role"
                                                                                                        name="Qualification"
                                                                                                        value={education.Qualification}
                                                                                                        required

                                                                                                        onChange={(e) => this.handleEducationchange(e, index)}

                                                                                                    />
                                                                                                </td>
                                                                                                <td>
                                                                                                    <input
                                                                                                        type="text"
                                                                                                        className="form-control"
                                                                                                        id="yearOfPass"
                                                                                                        name="YearOfPass"
                                                                                                        value={education.YearOfPass}
                                                                                                        required

                                                                                                        onChange={(e) => this.handleEducationchange(e, index)}

                                                                                                    />
                                                                                                </td>
                                                                                                <td>
                                                                                                    <input
                                                                                                        type="text"
                                                                                                        className="form-control"
                                                                                                        id="percentage"
                                                                                                        name="Percentage"
                                                                                                        value={education.Percentage}
                                                                                                        required

                                                                                                        onChange={(e) => this.handleEducationchange(e, index)}

                                                                                                    />
                                                                                                </td>

                                                                                                <td>
                                                                                                    <button onClick={(e) => this.removeEducationRow(e, index)} className="btn btn-danger"> <span className="mr-sm-2"><FontAwesomeIcon icon="trash-alt" size="xs" /></span></button>

                                                                                                </td>
                                                                                            </tr>
                                                                                        )
                                                                                    }
                                                                                })
                                                                            }
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
            </>
        )
    }
}


const mapStateToProps = (state: AppState) => ({
    system: state.system
});

export default connect(
    mapStateToProps,
    { updateSession }
)(CandidateProfile)