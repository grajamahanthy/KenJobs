import React from 'react'
import UserProfileModel from '../../Models/User';
import Apiservices from '../services/Apiservices';
import UserAttachmentModel from '../../Models/UserAttachment';
import LoaderModal from '../util/LoaderModal';


class Candidate extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            UserProfile: new UserProfileModel(),
            profileImage: "",
            UserProfileAttachment: new UserAttachmentModel(),
            loader: true,
        }
        this.LoadUserData();
    }

    LoadUserData() {

        let Servicecall = new Apiservices();
        let responce = Servicecall.GET_SECURE_CALL('Candidate/GetCandidateById?UserId=' + this.props.location.state.UserId, null, this.displayData, this.errorHandle)

    }

    componentDidMount() {

    }
    displayData = (data: any) => {
        this.setState({
            UserProfile: data,
            UserProfileAttachment: data.UserAttachment,
            loader: false
        })
    }
    errorHandle = () => {
        this.setState({
            loader: false
        })
    }

    render() {
        let DisplayPicture;
        DisplayPicture = ((this.state.UserProfileAttachment.Attachment != null && this.state.UserProfileAttachment.Attachment != "") && this.state.UserProfileAttachment.Attachment.Base64Text != "" && this.state.UserProfileAttachment.Attachment.Base64Text != null) ?
            <img src={this.state.UserProfileAttachment.Attachment.Base64Text} className="rounded-circle img-fluid mt-2" style={{ height: "200px" }} alt='' />
            :
            <img className="rounded-circle img-fluid mt-2" src={require('../../assets/images/DP.png')} style={{ height: "200px" }} alt="" />


        let experiencedata = this.state.UserProfile.Experience.map((item: any, key: any) =>

            <tr>
                <td className="text-capitalize">{item.CompanyName}</td>
                <td className="text-capitalize">{item.Role}</td>
                <td className="text-capitalize">{item.Technology}</td>
                <td>{item.StartDate}</td>
                <td>{item.EndDate}</td>
            </tr>
        );

        let educationdata = this.state.UserProfile.EducationalQualification.map((item: any, key: any) =>
            <tr>
                <td className="text-capitalize">{item.Institute}</td>
                <td className="text-capitalize">{item.Qualification}</td>
                <td className="text-capitalize">{item.YearOfPass}</td>
                <td className="text-capitalize">{item.Percentage + "%"}</td>
            </tr>
        );
        return (
            <>
                {this.state.loader ?
                    <LoaderModal></LoaderModal>
                    : ''}

                <div className="card  mx-2 h-100 d-block minhight-100">
                    <div className="card-body">
                        <div className="container mt-3">
                            <h1>User Profile</h1>
                            <div className="mt-5">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="card card-inverse" >
                                                <div className="card-body">
                                                    <div className="card-block">
                                                        <div className="row">
                                                            <div className="col-md-8 col-sm-8">
                                                                <table>
                                                                    <tr>
                                                                        <td><h4 className="card-title">Name: </h4></td>
                                                                        <td><h4 className="text-capitalize">{" " + this.state.UserProfile.FirstName + " " + this.state.UserProfile.LastName}</h4></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><strong>Phone: </strong></td>
                                                                        <td>{this.state.UserProfile.PhoneNumber}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><strong>Email: </strong></td>
                                                                        <td>{this.state.UserProfile.Email}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><strong>Profile: </strong></td>
                                                                        <td> Web Developer </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><strong>Skills: </strong></td>
                                                                        <td>  {this.state.UserProfile.Profile[0].skills}  </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><strong>Experience: </strong></td>
                                                                        <td>  {this.state.UserProfile.Profile[0].TotalExperiance + " Years"}  </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><strong>Country: </strong></td>
                                                                        <td>  India  </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><strong>Languages: </strong></td>
                                                                        <td>  {this.state.UserProfile.Profile[0].Languages}  </td>
                                                                    </tr>
                                                                </table>
                                                            </div>

                                                            <div className="col-md-4 col-sm-4 text-center">
                                                                {
                                                                    DisplayPicture
                                                                }
                                                            </div>

                                                        </div>
                                                        <div className="row ">
                                                            <div className="col-sm-12">
                                                                <div className="card mt-2">
                                                                    <div className="card-header">
                                                                        <h4>Experience</h4>
                                                                    </div>
                                                                    <div className="card-body">

                                                                        <table className="table table-bordered table-hover">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Company</th>
                                                                                    <th>Role</th>
                                                                                    <th>Technology</th>
                                                                                    <th>Start Date</th>
                                                                                    <th>End Date</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {experiencedata.length > 0 ? experiencedata : (<tr className="text-center"><td colSpan={5}>No Data Found</td></tr>)}
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
                                                                                {educationdata.length > 0 ? educationdata : (<tr className="text-center"><td colSpan={4}>No Data Found</td></tr>)}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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
export default Candidate