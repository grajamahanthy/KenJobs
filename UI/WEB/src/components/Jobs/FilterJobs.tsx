import React from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import { AppState } from "../../store/index";
import { updateSession } from "../../store/auth/actions";
import { connect } from 'react-redux';
import JobSearch from './JobSearchComponent';
import Job from './Job';
import Jobfilter from '../util/JobFilter';
//services
import Apiservices from '../services/Apiservices';
import LoaderModal from '../util/LoaderModal';
import LoginModal from '../util/LoginModal';
import Notify from '../common/Notify';
import JobSearchModel from '../../Models/JobSearchModel';
import Pagination from '../util/Pagination';
import { GridRequest, GridConfig, Op } from '../../Models/GridModel';
const notify = new Notify();


class FilterJobs extends React.Component<any, any, any>{
    constructor(props: any) {
        super(props);
        const token = this.props.system.token
        let loggedIn = this.props.system.loggedIn
        if (token == null) {
            loggedIn = false;
        }

        this.state = {
            loggedIn,
            reqType: '',
            jobId: '',
            jobdata: {},
            gridConfig: new GridConfig(),
            jobSearchModel: new JobSearchModel(),
            showLogin: false,
            loader: false,
            isLoaded: false,
        }

        this.findTheJobs = this.findTheJobs.bind(this);
        this.applyjob = this.applyjob.bind(this);
        this.onLoginModalHide = this.onLoginModalHide.bind(this);
        this.onAfterLogin = this.onAfterLogin.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        //this.FillGridConfig();
    }

    FillGridConfig() {
        let gridConfigData = {
            topSearchPanelUi: [
                {
                    columnPropertyKey: "Keyword",
                    questionType: "text",
                    label: "SKeyword",
                    propValue: ""
                },
                {
                    columnPropertyKey: "Location",
                    questionType: "text",
                    label: "SLocation",
                    propValue: ""

                },
                {
                    columnPropertyKey: "Experience",
                    questionType: "number",
                    label: "SExperience",
                    propValue: ""

                }
            ],
            leftSearchPanelUi: [
                {
                    columnPropertyKey: "ClientName",
                    questionType: "text",
                    label: "Company",
                    propValue: ""
                },
                {
                    columnPropertyKey: "City",
                    questionType: "text",
                    label: "Location",
                    propValue: ""
                }, {
                    columnPropertyKey: "Experience",
                    questionType: "number",
                    label: "Experience",
                    propValue: ""
                }
            ],
            column: [
                {
                    title: "Title",
                    columnPropertyKey: "JobTitle",
                    sortable: true,
                },
                {
                    title: "Company",
                    columnPropertyKey: "ClientName",
                    sortable: true,

                },
                {
                    title: "Min Experience",
                    columnPropertyKey: "MinExperience",//Just a placeholder to get element value, while creating Filter object.
                    sortable: true,

                },
                {
                    title: "Max Experience",
                    columnPropertyKey: "MaxExperience",
                    sortable: true,
                },
                {
                    title: "Location",
                    columnPropertyKey: "City",
                    sortable: true,
                }
                ,
                {
                    title: "",
                    columnPropertyKey: "Action",
                    sortable: false,
                    columnType: "button",
                    buttonProps: {
                        buttonText: "Apply",
                        buttonEvent: this.applyjob,
                        params: ["Id"],
                    }
                },
                {
                    title: "",
                    columnPropertyKey: "Action",
                    sortable: false,
                    columnType: "button",
                    buttonProps: {
                        buttonText: "Add To Favirotes",
                        buttonEvent: this.addFavorite,
                        params: ["Id"],
                    }
                }
            ],
            gridApiData: { url: "JobSearch/GetJobsGrid", method: "post" },
            rowIdentityPropertyForManipulations: "",
            isEditable: false,
            isDeleteable: false,
            isExportable: false
        };

        this.setState({
            gridConfig: gridConfigData
        }, () => this.setSearchCriteria())
    }

    onSubmit = (e: any) => {
        e.preventDefault();
        this.findTheJobs(this.state);
    }

    changevalue = (e: any) => {
        let JSM: any = this.state.jobSearchModel;
        JSM[e.target.name] = e.target.value;
        this.setState({ jobSearchModel: JSM })
    }
    onPageChange = (e: any, data: any) => {
        e.preventDefault();
        let JSM: any = this.state.jobSearchModel;
        JSM.JobSearchRequest = data;

        this.setState({ jobSearchModel: JSM }, () => { this.findTheJobs(this.state); })

    }
    componentWillMount() {
        let keyword = '';
        let location = '';
        if (this.props.location.state != undefined) {
            let keyword = this.props.location.state.keyword;
            let location = this.props.location.state.location;
            let sexperience = this.props.location.state.experience;
            let JSM: any = this.state.jobSearchModel;
            JSM.Keyword = keyword;
            JSM.Location = location;
            JSM.Experience = sexperience;
            this.setState({
                jobSearchModel: JSM
            })

        } else {

        }
    }

    setSearchCriteria() {
        if (this.props.location.state != undefined) {
            let keyword = this.props.location.state.keyword;
            let location = this.props.location.state.location;
            let sexperience = this.props.location.state.experience;
            let gD: GridConfig = this.state.gridConfig;
            gD.topSearchPanelUi.forEach(searchKey => {
                if (searchKey.columnPropertyKey == "Keyword")
                    searchKey.propValue = keyword;
                else if (searchKey.columnPropertyKey == "Location")
                    searchKey.propValue = location;
                else if (searchKey.columnPropertyKey == "Experience")
                    searchKey.propValue = sexperience;
            });
            this.setState({
                gridConfig: gD,
            })
        }

    }


    componentDidMount() {

        this.FillGridConfig();


        this.setState(
            {
                isLoaded: true
            }
        )
    }

    displayData = (data: any) => {
        let JSM: any = this.state.jobSearchModel;
        let GrdRequest = JSM.JobSearchRequest;
        GrdRequest.Pagination.TotalRecords = data.TotalRecords
        JSM.JobSearchRequest = GrdRequest;
        this.setState({
            loader: false,
            jobdata: data.Rows,
            jobSearchModel: JSM
        })

    }

    findTheJobs = (value: any) => {
        this.setState({
            jobdata: null,
            loader: true
        })
        let body = new URLSearchParams();
        body.set('Keyword', this.state.keyword);
        body.set('Location', this.state.location);
        body.set('Experience', this.state.experience);

        let Searchmodel = this.state.jobSearchModel;
        let Servicecall = new Apiservices();
        // if (this.state.loggedIn) {
        //     let responce = Servicecall.POST_SECURE_CALL1('JobSearch/GetJobsByUserParms', Searchmodel, this.displayData, this.errorHandle)
        // } else {
        //     let responce = Servicecall.POST_CALL1('JobSearch/GetJobsByParms', Searchmodel, this.displayData, this.errorHandle)
        // }

    }
    errorHandle = () => {
        this.setState({
            loader: false,
        })
    }


    applyjob(paramsArr: any[]) {

        let jobid: string = "";
        paramsArr.forEach(
            x => {
                if (x.key == "Id") {
                    jobid = x.value;
                }
            }
        );

        this.setState({
            jobId: jobid,
            reqType: 'applyjob'
        })
        // console.log(this.state.loggedIn);
        if (this.state.loggedIn) {
            const Servicecall = new Apiservices();
            let body = new URLSearchParams();
            body.set('Job_Id', jobid);
            //body.set('Client_Id', '1');
            //Get jobs bu user id, User id is assigned by server 
            let responce = Servicecall.POST_SECURE_CALL('ApplyJob/apply', body, this.successAppliedJob, this.errorHandle)

        } else {
            this.setState({
                showLogin: true,
            })
        }

    }
    successAppliedJob = (data: any) => {
        switch (data) {
            case 1:
                notify.Success_notify("Job is Applied Succesfully.");
                break;
            case 2:
                notify.Info_Notify("You Have Already Applied This Job.");
                break;
            case 0:
                notify.Error_notify("Something went wrong.");
                break;
            default: break;
        }
        this.setState({
            showLogin: false,
        })
    }

    addFavorite = (paramsArr: any[]) => {
        let jobid: string = "";
        paramsArr.forEach(
            x => {
                if (x.key == "Id") {
                    jobid = x.value;
                }
            }
        );
        if (this.state.loggedIn) {
            const Servicecall = new Apiservices();
            let body = new URLSearchParams();
            body.set('Job_Id', jobid);

            //Get jobs bu user id, User id is assigned by server 
            let responce = Servicecall.POST_SECURE_CALL('FavoriteJob/addToFavorite', body, this.successFavoritejob, this.errorHandle)

        } else {
            this.setState({
                showLogin: true,
            })
        }

    }
    successFavoritejob = (data: any) => {
        switch (data) {
            case 1: notify.Success_notify("Job Is Added In Favorites Succesfully "); break;
            case 2: notify.Info_Notify("Job Is Already Added In Favoritejobs"); break;
            case 0: notify.Error_notify("Something Went Wrong."); break;
            default: break;
        }
        this.setState({
            showLogin: false,
        })
    }
    onLoginModalHide() {
        this.setState({
            showLogin: false
        })
    }

    onAfterLogin() {
        this.setState({ loggedIn: true })
        if (this.state.reqType === 'applyjob') {
            this.applyjob([{ key: "Id", value: this.state.jobId }]);
        }
        else if (this.state.reqType === 'favoritejob') {
            this.addFavorite([{ key: "Id", value: this.state.jobId }]);
        }

    }
    applyFilter = () => {

    }
    render() {
        return (
            <>
                {this.state.showLogin ? <LoginModal onLoginModalHide={this.onLoginModalHide} onAfterLogin={this.onAfterLogin} > </LoginModal> : <></ >}
                {this.state.loader ? <LoaderModal></LoaderModal> : ''}
                {this.state.isLoaded ? <Pagination gridConfig={this.state.gridConfig}></Pagination> : <LoaderModal></LoaderModal>}
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
)(FilterJobs)