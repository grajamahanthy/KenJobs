import React from 'react';
import Apiservices from './services/Apiservices';
import { Link } from 'react-router-dom';
import LoaderModal from './util/LoaderModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class EmployerHome extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            userName: '',
            location: '',
            skillSet: '',
            noticePeriod: '',
            minExperience: '',
            maxExperience: '',
            candidateData: [],
            showContent: false,
            ishaveJobs:false,
            loader:false,
        }
    }

    handleSubmit = (e: any) => {
        e.preventDefault();
        this.setState({
            loader:true
        })
        const serachData = this.state;
        let body = new URLSearchParams();
        body.set('UserName', serachData.userName);
        body.set('Location', serachData.location);
        body.set('SkillSet', serachData.skillSet);
        body.set('NoticePeriod', serachData.noticePeriod);
        body.set('MinExperience', serachData.minExperience);
        body.set('MaxExperience', serachData.maxExperience);
        const Servicecall = new Apiservices();
        let responce = Servicecall.POST_SECURE_CALL('Candidate/GetCandidates', body, this.success,this.errorHandle)
    }

    success = (data: any) => {
        console.log(data);
        this.setState({
            loader:false,
            ishaveJobs: data.length > 0 ? true : false,
            candidateData: data,
            showContent: true,
        })
    }

    errorHandle=(error:any)=>{
        console.log();
      }
    changeValue = (e: any) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    render() {
console.log(this.state.candidateData);
        let candidateList;
        if (this.state.ishaveJobs && this.state.showContent) {
            candidateList = this.state.candidateData.map((item: any, key: any) =>
            <div className="col-sm-12 border px-4 py-2 shadow-sm" >
                <h3 className="text-primary">{item.FirstName+' '+item.LastName}</h3>
            <div className="">
                <span className="mr-sm-2"> <FontAwesomeIcon icon="envelope" size="xs" /> : {item.Email}</span>
                <span className="mr-sm-2"> <FontAwesomeIcon icon="mobile-alt" size="xs" /> : {item.PhoneNumber}</span>
                <span className="mr-sm-2"> <FontAwesomeIcon icon="map-marker-alt" size="xs" /> : {item.Profile[0].PreferredLocation}</span>
                <br/>
                <span className="mr-sm-2"><FontAwesomeIcon icon="suitcase" size="xs" /> : Experience - {item.Profile[0].TotalExperiance+" Years"}</span>
                <span className="mr-sm-2"><FontAwesomeIcon icon="university" size="xs" /> : {item.Profile[0].HeighestQualification}</span>
               <br/>
                <span className="mr-sm-2"><FontAwesomeIcon icon="laptop-code" size="xs" /> : {item.Profile[0].skills}</span>
                <span className="mr-sm-2"><FontAwesomeIcon icon="wallet" size="xs" /> : {item.Profile[0].CurrentSalary}</span>
            </div>
            <div className="row float-sm-right">
                {/* <Link className="btn btn-primary btn-sm rounded-0" to='/candidates' >
                    View Candidates
                </Link> */}
                 {/* <Link className="btn btn-primary btn-sm rounded-0"
                                    to={{
                                        pathname: "/candidate",
                                        state: { User: item }
                                    }}
                                > View Candidate</Link> */}
                <button className="btn btn-primary btn-sm rounded-0"> View Candidate</button>
                 {/* <Link className="btn btn-primary btn-sm rounded-0 align-self-end"
                to={{
                    pathname: "/candidates",
                    state: { JobId: "item.Id" }
                }}

            >View Candidates</Link>  */}
            
            </div>
        </div>
            )
        } else if (!this.state.ishaveJobs && this.state.showContent) {
            candidateList =
                <div className="col-sm-12 mx-auto px-4 py-4 ">
                    <div className="row">
                        <h4>No result Found </h4>
                    </div></div>
        } 
        return (
            <>
            {this.state.loader?<LoaderModal></LoaderModal>:<></>}
                <div className="col-lg-12 mt-3">
                    <div className="text-center">
                        <p className="text-uppercase">
                            1000+ Candidates Registred Last Week
                        </p>
                        <h2 className="text-uppercase mt-4 mb-5">
                            Easiest way to find Candidates
                        </h2>
                        <div className="col-sm-8 mx-auto  mt-3">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <input
                                            type="text"
                                            id="tptcat"
                                            placeholder="User Name"
                                            className="form-control  rounded-0  "
                                            name="userName"
                                            value={this.state.userName}
                                            onChange={this.changeValue}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <input
                                            type="text"
                                            id="tptloc"
                                            placeholder="Location"
                                            className="form-control   rounded-0 "
                                            name="location"
                                            value={this.state.location}
                                            onChange={this.changeValue}

                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <input
                                            type="text"
                                            id="tptloc"
                                            placeholder="Skill Set"
                                            className="form-control   rounded-0 "
                                            name="skillSet"
                                            onChange={this.changeValue}
                                            value={this.state.skillSet}
                                        />
                                    </div> <div className="form-group col-md-6">
                                        <input
                                            type="text"
                                            id="tptloc"
                                            placeholder="Notice Period"
                                            className="form-control   rounded-0 "
                                            name="noticePeriod"
                                            value={this.state.noticePeriod}
                                            onChange={this.changeValue}

                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <div className="input-group">
                                            <input
                                                type="number"
                                                min="0"
                                                placeholder="Min Experience"
                                                className="form-control"
                                                name="minExperience"
                                                value={this.state.minExperience}
                                                onChange={this.changeValue}

                                            />
                                            <input
                                                type="number"
                                                min="0"
                                                placeholder="Man Experience"
                                                className="form-control"
                                                name="maxExperience"
                                                value={this.state.maxExperience}
                                                onChange={this.changeValue}

                                            />
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <input
                                            type="submit"
                                            id="search"
                                            className="btn btn-primary btn-block rounded-0 "
                                            value="Search"
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-8 mx-auto  mt-3">
                        <div className="row">
                          {candidateList}
                        </div>
                    </div>
                </div>


            </>
        )
    }
}

export default EmployerHome;