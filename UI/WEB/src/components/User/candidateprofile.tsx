import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Apiservices from '../services/Apiservices';
import LoaderModal from '../util/LoaderModal';
import UserProfileModel from '../../Models/User';
import ExperienceModel from '../../Models/Experience';
import EducationalQualificationModel from '../../Models/Education';

class CandidateProfile extends React.Component<any, any>{
    constructor(props: any) {
        super(props)
        this.state = {
            UserProfile: new UserProfileModel(),
            loader: false,
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
        console.log(this.state);
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

        this.setState({
            loader: false,
        })
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
        this.setState({
            UserProfile: data,
            loader: false
        })
    }
    componentDidMount() {
        this.setState({
            loader: true
        })
        this.loadCandidateData();
    }

    loadCandidateData = () => {
        const Servicecall = new Apiservices();
        let responce = Servicecall.GET_SECURE_CALL('Candidate/Get', null, this.displayData, this.errorHandle)
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

    render() {

       
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
export default CandidateProfile;