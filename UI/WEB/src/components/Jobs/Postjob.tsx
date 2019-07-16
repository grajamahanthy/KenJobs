import React from 'react';
import { Redirect } from 'react-router';
//services
import Apiservices from '../services/Apiservices';

class Postjob extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            Client_Id: '',
            clientName: '',
            jobTitle: '',
            keySkills: '',
            jobDescription: '',
            jobType: '',
            jobCategory: '',
            minExperience: '',
            maxExperience: '',
            minSalary: '',
            maxSalary: '',
            currency: '',
            qualification: '',
            noOfVacancies: '',
            country: '',
            State: '',
            city: '',
            status: '0',
            PostingStatus: '',
            jobCategoryList: [],
            jobTypeList: [],
            currencyList: [
                { "Id": 1, "code": "USA", "value": "US Dollar", "status": 1, "Symbol": "$" },
                { "Id": 2, "code": "IND", "value": "Indian Rupee", "status": 1, "Symbol": "₹" },
                { "Id": 3, "code": "EUR", "value": "Euro", "status": 1, "Symbol": "€" },
            ],
            redirect: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeValue = this.changeValue.bind(this);
    }


    handleSubmit = (e: any) => {
        e.preventDefault();

        var form = document.forms[0];
        if (form.checkValidity() === false) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return false;
        }
        else {

            form.classList.add('was-validated');

            this.success();
            let Jobs = this.state;
            let body = new URLSearchParams();
            body.set('Client_Id', '');
            body.set('ClientName', Jobs.clientName);
            body.set('JobTitle', Jobs.jobTitle);
            body.set('Description', Jobs.jobDescription);
            body.set('NoOfVacancies', Jobs.noOfVacancies);
            body.set('Qualification', Jobs.qualification);
            body.set('Country', Jobs.country);
            body.set('State', Jobs.State);
            body.set('City', Jobs.city);
            body.set('JobType_Id', Jobs.jobType);
            body.set('Category_id', Jobs.jobCategory);
            body.set('MinSalary', Jobs.minSalary);
            body.set('MaxSalary', Jobs.maxSalary);
            body.set('MinExperience', Jobs.minExperience);
            body.set('MaxExperience', Jobs.maxExperience);
            body.set('Skills', Jobs.keySkills);
            body.set('PostingStatus', '1');
            body.set('Status', Jobs.status);
            body.set('User_Id', '1');
            body.set('Currency', Jobs.currency);
            body.set('Country', Jobs.country);

            let Servicecall = new Apiservices;
            let Header = new Headers({ "Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded" });

            let responce = Servicecall.GET_CALL('JobSearch', body, Header, this.success)

            // fetch("http://localhost:50768/api/JobSearch", {
            //     method: "POST",
            //     headers: {
            //         "Accept": "application/json",
            //         "Content-Type": "application/x-www-form-urlencoded"
            //     },
            //     body: body,
            // }).then(response => {
            //     this.success();

            //     // response.json().then((data) => {
            //     // });
            // })
            //     .catch(error => console.log(error))

        }
    }
    success = () => {

        this.setState({
            redirect: true
        })


    }
    changeValue = (e: any) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    componentDidMount() {
        fetch("http://localhost:50768/api/JobCategory", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: null,
        }).then(response => {
            console.log(response)
            response.json().then((data) => {

                this.setState({
                    jobCategoryList: data
                })
            });
        })
            .catch(error => console.log(error))

        fetch("http://localhost:50768/api/JobType", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: null,
        }).then(response => {
            response.json().then((data) => {
                this.setState({
                    jobTypeList: data
                })
            });
        })
            .catch(error => console.log(error))


    }


    render() {
        if (this.state.redirect) {
            return <Redirect to={"/recdash"} />;
        }
        let categorylist;
        let jobtypelist;
        let currencylistitems;
        if (this.state.jobCategoryList.length > 0) {
            categorylist = this.state.jobCategoryList.map((item: any, key: any) =>
                <option key={item.Id} value={item.Id}> {item.Category}</option>
            )
        }
        if (this.state.jobTypeList.length > 0) {
            jobtypelist = this.state.jobTypeList.map((item: any, key: any) =>
                <option key={item.Id} value={item.Id}> {item.Name}</option>
            )
        }
        if (this.state.currencyList.length > 0) {
            currencylistitems = this.state.currencyList.map((item: any, key: any) =>
                <option key={item.Id} value={item.Id}> {item.value}</option>
            )
        }
        return (
            <>
                <div className="container mt-3">
                    <h1>Post New Job</h1>

                    <div className="col-lg-12 mt-3">
                        <div className="card  border rounded pt-2 mb-2 shadow-sm p-3 ">
                            <div className="card-text mb-2">
                                <form onSubmit={this.handleSubmit} className="needs-validation" noValidate>
                                    <div className="form-group">
                                        <div className="form-group">
                                            <label htmlFor="inputAddress">Job Title</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="jobTitle"
                                                placeholder="Enter Job Title"
                                                name="jobTitle"
                                                value={this.state.jobTitle}
                                                onChange={this.changeValue}
                                                required
                                            />
                                            <div className="invalid-feedback text-left">
                                                Please Enter Job Title.
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="custom-control custom-switch">
                                                <input type="checkbox" name="status" value={(this.state.status == 0) ? '1' : '0'} defaultChecked={this.state.status} onChange={this.changeValue} className="custom-control-input" id="switch1" />
                                                <label className="custom-control-label" htmlFor="switch1">{(this.state.status == 0) ? 'In Active' : 'Active'}</label>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="inputAddress">Client Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="jobTitle"
                                                placeholder="Enter Client Name"
                                                name="clientName"
                                                value={this.state.clientName}
                                                onChange={this.changeValue}
                                                required
                                            />
                                            <div className="invalid-feedback text-left">
                                                Please Enter Client Name.
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="inputAddress">Key Skills</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="jobTitle"
                                                placeholder="Required technologies"
                                                name="keySkills"
                                                value={this.state.keySkills}
                                                onChange={this.changeValue}
                                                required
                                            />
                                            <div className="invalid-feedback text-left">
                                                Please Enter Key Skills
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="inputAddress">Job Description</label>
                                            <textarea className="form-control"
                                                name="jobDescription"
                                                value={this.state.jobDescription}
                                                onChange={this.changeValue}
                                                required
                                            ></textarea>
                                            <div className="invalid-feedback text-left">
                                                Please Select Job Description.
                                                </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="inputZip">Job Type</label>
                                                <select className="form-control" id="jobtype" name="jobType" onChange={this.changeValue}
                                                    value={this.state.jobType} required>
                                                    <option value="">Select Job Type</option>
                                                    {jobtypelist}
                                                </select>
                                                <div className="invalid-feedback text-left">
                                                    Please Select Job Type.
                                                </div>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="btnsubmit">Job Category</label>
                                                <select className="form-control" id="jobcat" name="jobCategory" onChange={this.changeValue}
                                                    value={this.state.jobCategory} required >
                                                    <option value="">Select Job Category</option>
                                                    {categorylist}
                                                </select>
                                                <div className="invalid-feedback text-left">
                                                    Please Select Job Category.
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group col-md-5">
                                                <label htmlFor="inputState">Experiance</label>
                                                <div className="input-group">
                                                    <input
                                                        type="number"
                                                        min="0" max="20"
                                                        placeholder="Enter 0-20"
                                                        className="form-control"
                                                        name="minExperience"
                                                        value={this.state.minExperience}
                                                        onChange={this.changeValue}
                                                        required />
                                                    <input
                                                        type="number"
                                                        min="0" max="50"
                                                        placeholder="Enter 0-50"
                                                        className="form-control"
                                                        name="maxExperience"
                                                        value={this.state.maxExperience}
                                                        onChange={this.changeValue}
                                                        required />
                                                    <div className="invalid-feedback text-left">
                                                        Please Enter Experience.
                                                </div>
                                                </div>
                                            </div>
                                            <div className="form-group col-md-5">
                                                <label htmlFor="inputState">Salary</label>
                                                <div className="input-group">
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        placeholder="Ex 50,000"
                                                        className="form-control"
                                                        name="minSalary"
                                                        value={this.state.minSalary}
                                                        onChange={this.changeValue}
                                                        required />
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        placeholder="Ex 70,000"
                                                        className="form-control"
                                                        name="maxSalary"
                                                        value={this.state.maxSalary}
                                                        onChange={this.changeValue}
                                                        required />
                                                    <div className="invalid-feedback text-left">
                                                        Please Enter salary.
                                                </div>
                                                </div>
                                            </div>
                                            <div className="form-group col-md-2">
                                                <label htmlFor="inputState">Currency</label>
                                                <div className="input-group">
                                                    <select className="form-control" name="currency" onChange={this.changeValue}
                                                        value={this.state.currency} required >
                                                        <option value="">Currency</option>
                                                        {currencylistitems}
                                                    </select>
                                                    <div className="invalid-feedback text-left">
                                                        Please Enter salary.
                                                </div>
                                                </div>
                                            </div>
                                        </div>



                                        <div className="form-row">

                                            <div className="form-group col-md-6">
                                                <label htmlFor="inputZip">Qualification</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Qualification"
                                                    id="inputZip"
                                                    autoComplete="off"
                                                    name="qualification"
                                                    value={this.state.qualification}
                                                    onChange={this.changeValue}
                                                    required />
                                                <div className="invalid-feedback text-left">
                                                    Please Enter Qualification.
                                                </div>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="btnsubmit">No Of Vacancies</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="No Of Vacancies"
                                                    id="inputZip"
                                                    autoComplete="off"
                                                    name="noOfVacancies"
                                                    value={this.state.noOfVacancies}
                                                    onChange={this.changeValue}
                                                    required />
                                                <div className="invalid-feedback text-left">
                                                    Please Enter No Of Vacancies.
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-row">

                                            <div className="form-group col-md-4">
                                                <label htmlFor="inputZip">City</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="inputZip"
                                                    placeholder="Location"
                                                    autoComplete="off"
                                                    name="city"
                                                    value={this.state.city}
                                                    onChange={this.changeValue}
                                                    required />
                                                <div className="invalid-feedback text-left">
                                                    Please Enter City.
                                                </div>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="inputZip">State</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="inputZip"
                                                    placeholder="State"
                                                    autoComplete="off"
                                                    name="State"
                                                    value={this.state.State}
                                                    onChange={this.changeValue}
                                                    required />
                                                <div className="invalid-feedback text-left">
                                                    Please Enter State.
                                                </div>
                                            </div>

                                            <div className="form-group col-md-4">
                                                <label htmlFor="inputZip">Country</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="inputZip"
                                                    placeholder="Country"
                                                    autoComplete="off"
                                                    name="country"
                                                    value={this.state.country}
                                                    onChange={this.changeValue}
                                                    required />
                                                <div className="invalid-feedback text-left">
                                                    Please Enter Country.
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary mt-4" id="btnsubmit">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default Postjob 