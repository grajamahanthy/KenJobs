import React from 'react';

class Userprofile extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            Id: '',
            firstName: '',
            middleName: '',
            lastName: '',
            email: '',
            phone: '',
            gender: '',
            profilePicture: '',
            profile: [],
            experience: [],
            educationalqualification: []

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

    componentWillMount() {
        let body = new URLSearchParams();
        body.set('id', '43613fd3-1074-46f3-96c2-b448b709bbd6');

        fetch("http://localhost:50768/api/User/GetUser?id=43613fd3-1074-46f3-96c2-b448b709bbd6", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            console.log(response);
            response.json().then((data) => {
                this.displaydata(data);

            });
        })
            .catch(error => console.log("error" + error))
    }

    displaydata = (response: any) => {

        this.setState({
            firstName: response.FirstName,
            lastName: response.LastName,
            email: response.Email,
            phone: response.PhoneNumber,
            gender: response.Gender_Id,
            profilePicture: response.ProfilePhoto,
            profile: response.Profile[0],
            experience: response.Experience,
            educationalqualification: response.EducationalQualification

        })
        console.log(this.state);

    }


    displayError = (data: any) => {
        console.log(data);
    }
    render() {
        let experiencedata = this.state.experience.map((item: any, key: any) =>

            <tr>
                <td className="text-capitalize">{item.CompanyName}</td>
                <td className="text-capitalize">{item.Role}</td>
                <td className="text-capitalize">{item.Technology}</td>
                <td>{item.StartDate}</td>
                <td>{item.EndDate}</td>
            </tr>
        );

        let educationdata = this.state.educationalqualification.map((item: any, key: any) =>
            <tr>
                <td className="text-capitalize">{item.Institute}</td>
                <td className="text-capitalize">{item.Qualification}</td>
                <td className="text-capitalize">{item.YearOfPass}</td>
                <td className="text-capitalize">{item.Percentage + "%"}</td>
            </tr>

        )
        return (
            <>
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
                                                                <td><h4 className="text-capitalize">{" " + this.state.firstName + " " + this.state.lastName}</h4></td>
                                                            </tr>
                                                            <tr>
                                                                <td><strong>Phone: </strong></td>
                                                                <td>{this.state.phone}</td>
                                                            </tr>
                                                            <tr>
                                                                <td><strong>Email: </strong></td>
                                                                <td>{this.state.email}</td>
                                                            </tr>
                                                            <tr>
                                                                <td><strong>Profile: </strong></td>
                                                                <td> Web Developer </td>
                                                            </tr>
                                                            <tr>
                                                                <td><strong>Skills: </strong></td>
                                                                <td>  {this.state.profile.skills}  </td>
                                                            </tr>
                                                            <tr>
                                                                <td><strong>Experience: </strong></td>
                                                                <td>  {this.state.profile.TotalExperiance + " Years"}  </td>
                                                            </tr>
                                                            <tr>
                                                                <td><strong>Country: </strong></td>
                                                                <td>  India  </td>
                                                            </tr>
                                                            <tr>
                                                                <td><strong>Languages: </strong></td>
                                                                <td>  {this.state.profile.Languages}  </td>
                                                            </tr>
                                                        </table>


                                                    </div>

                                                    <div className="col-md-4 col-sm-4 text-center">
                                                        <img className="btn-md" src={require('../../assets/images/profile.png')} width="200" height="200" alt="" />
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
                                                                        {experiencedata}
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
                                                                        {educationdata}
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
            </>

        )
    }
}
export default Userprofile