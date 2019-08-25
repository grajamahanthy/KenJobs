import React from 'react'

function Candidate(props: any) {
    // console.log(props);
    let user = props.location.state.User;
    let profile = props.location.state.User.Profile[0];
    let experience = props.location.state.User.Experience;
    let educationalqualification = props.location.state.User.EducationalQualification;
    let experiencedata = experience.map((item: any, key: any) =>

        <tr>
            <td className="text-capitalize">{item.CompanyName}</td>
            <td className="text-capitalize">{item.Role}</td>
            <td className="text-capitalize">{item.Technology}</td>
            <td>{item.StartDate}</td>
            <td>{item.EndDate}</td>
        </tr>
    );

    let educationdata = educationalqualification.map((item: any, key: any) =>
        <tr>
            <td className="text-capitalize">{item.Institute}</td>
            <td className="text-capitalize">{item.Qualification}</td>
            <td className="text-capitalize">{item.YearOfPass}</td>
            <td className="text-capitalize">{item.Percentage + "%"}</td>
        </tr>
    );
    return (<>
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
                                                            <td><h4 className="text-capitalize">{" " + user.FirstName + " " + user.LastName}</h4></td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>Phone: </strong></td>
                                                            <td>{user.PhoneNumber}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>Email: </strong></td>
                                                            <td>{user.Email}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>Profile: </strong></td>
                                                            <td> Web Developer </td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>Skills: </strong></td>
                                                            <td>  {profile.skills}  </td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>Experience: </strong></td>
                                                            <td>  {profile.TotalExperiance + " Years"}  </td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>Country: </strong></td>
                                                            <td>  India  </td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>Languages: </strong></td>
                                                            <td>  {profile.Languages}  </td>
                                                        </tr>
                                                    </table>


                                                </div>

                                                <div className="col-md-4 col-sm-4 text-center">
                                                    <img className="btn-md" src={require('../../assets/images/DP.png')} style={{height:"200px"}} alt="" />
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
        </>

    </>)
}

export default Candidate;