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
import { GridRequest, GridConfig, Op } from '../../Models/GridModel';
import DesktopGrid from '../util/DesktopGrid';
import MobileGrid from '../util/MobileGrid';
const notify = new Notify();


class FilterJobs extends React.Component<any, any, any>{
    constructor(props: any) {
        super(props);
        const token = this.props.system.token
        let loggedIn = this.props.system.loggedIn

        loggedIn = (token != null && token != "");

        this.state = {
            loggedIn,
            requestType: '',
            jobId: '',
            jobdata: {},
            multipleJobArray: [],
            gridConfig: new GridConfig(),
            jobSearchModel: new JobSearchModel(),
            showLogin: false,
            loader: false,
            isLoaded: false,
            IsMobileView: (window.outerWidth <= 768) ? true : false, //(window.outerWidth <= 768) ? true : false,
        }

        this.findTheJobs = this.findTheJobs.bind(this);
        this.applyjob = this.applyjob.bind(this);
        this.onLoginModalHide = this.onLoginModalHide.bind(this);
        this.onAfterLogin = this.onAfterLogin.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.applyForMultipleJobs = this.applyForMultipleJobs.bind(this);
        this.handleSwitchDisplay = this.handleSwitchDisplay.bind(this);
        //this.FillGridConfig();
        this.resize = this.resize.bind(this);
        window.addEventListener("resize", this.resize);
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
        }
    }

    componentDidMount() {
        this.FillGridConfig();
        this.setState({ isLoaded: true });
    }

    resize() {
    }

    handleSwitchDisplay = (gridRequest: GridRequest, ismobile: boolean, Response: any) => {
        let GC = this.state.gridConfig;
        GC.gridRequest = gridRequest
        GC.responceData = Response
        this.setState({
            gridConfig: GC,
            IsMobileView: ismobile
        })
    }

    FillGridConfig() {
        let gridConfigData = {
            Title: "Search Job",
            topSearchPanelUi: [
                {
                    columnPropertyKey: "Keyword",
                    questionType: "text",
                    label: "SKeyword",
                    propValue: ""
                },
                {
                    columnPropertyKey: "City",
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
                    columnType: "link",
                    linkUrl: "Jobresult",
                    linkParam: "JobInfo"
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
            gridApiData: {
                url: "JobSearch/GetJobsGrid", method: "post", apiCall: this.getJobs,
            },
            rowIdentityPropertyForManipulations: "",
            isEditable: false,
            isDeleteable: false,
            isExportable: true,
            isAllowMultiRowSelect: true,
            toolBar: [
                {
                    buttonText: "Apply",
                    buttonEvent: this.applyForMultipleJobs,
                    params: []
                }, {
                    buttonText: "Add To Favirotes",
                    buttonEvent: this.addToFaviroteMultipleJobs,
                    params: []
                }
            ],
            gridRequest: new GridRequest(),
            isComingFromHome: false,

        };

        this.setState({
            gridConfig: gridConfigData
        }, () => this.setSearchCriteria())
    }



    onSubmit = (e: any) => {
        e.preventDefault();
        this.findTheJobs(this.state);
    }

    getJobs = (gridRequest: GridRequest, childEvent: any) => {
        let responce = null;
        let Servicecall = new Apiservices();
        let GC = this.state.gridConfig;
        GC.gridRequest = gridRequest
        this.setState({
            loader: true,
            gridConfig: GC,
        })
        let successCallback = (data: any) => {
            this.displaySuccessData(data);
            childEvent();
        };
        responce = Servicecall.POST_CALL1(this.state.gridConfig.gridApiData.url, gridRequest, successCallback, this.errorHandle)
    }


    displaySuccessData = (data: any) => {
        let totalrecords = data.TotalRecords;
        let GC = this.state.gridConfig;
        GC.responceData = data.Rows
        let GR = this.state.gridConfig.gridRequest;
        let PG = GR.Pagination;
        let totalpages;
        PG.TotalPages = Math.ceil(totalrecords / PG.PageSize);
        GR.Pagination = PG;
        GC.gridRequest = GR

        this.setState({
            gridConfig: GC,
            isLoaded: true,
            loader: false,
        })
    }



    applyForMultipleJobs = (jobidList: any) => {

        this.setState({
            multipleJobArray: jobidList,
            requestType: 'applyMultipleJobs'
        })
        if (this.state.loggedIn) {
            const Servicecall = new Apiservices();
            let responce = Servicecall.POST_SECURE_CALL1('ApplyJob/applyMultipleJobs', jobidList, this.successAppliedJob, this.errorHandle)
        } else {
            this.setState({
                showLogin: true,
            })
        }

    }
    addToFaviroteMultipleJobs = (jobidList: any) => {
        this.setState({
            multipleJobArray: jobidList,
            requestType: 'addMultipleFaviroteJobs'
        })
        if (this.state.loggedIn) {
            const Servicecall = new Apiservices();

            let responce = Servicecall.POST_SECURE_CALL1('FavoriteJob/addToFavoriteMultipleJobs', jobidList, this.successFavoritejob, this.errorHandle)

        } else {
            this.setState({
                showLogin: true,
            })
        }
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


    setSearchCriteria() {
        if (this.props.location.state != undefined) {
            let keyword = this.props.location.state.keyword;
            let location = this.props.location.state.location;
            let experience = this.props.location.state.experience;
            let gD: GridConfig = this.state.gridConfig;
            gD.topSearchPanelUi.forEach(searchKey => {
                if (searchKey.columnPropertyKey == "Keyword")
                    searchKey.propValue = keyword;
                else if (searchKey.columnPropertyKey == "Location")
                    searchKey.propValue = location;
                else if (searchKey.columnPropertyKey == "Experience")
                    searchKey.propValue = experience;
            });
            gD.isComingFromHome = true;
            this.setState({
                gridConfig: gD,
            })
        }

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
        // console.log(paramsArr);
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
            requestType: 'applyjob'
        })
        if (this.state.loggedIn) {
            const Servicecall = new Apiservices();
            let body = new URLSearchParams();
            body.set('Job_Id', jobid);
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
        this.setState({
            jobId: jobid,
            requestType: 'favoritejob'
        })
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
        if (this.state.requestType === 'applyjob') {
            this.applyjob([{ key: "Id", value: this.state.jobId }]);
        }
        else if (this.state.requestType === 'favoritejob') {
            this.addFavorite([{ key: "Id", value: this.state.jobId }]);
        } else if (this.state.requestType === 'applyMultipleJobs') {
            this.applyForMultipleJobs(this.state.multipleJobArray);
        } else if (this.state.requestType === 'addMultipleFaviroteJobs') {
            this.addToFaviroteMultipleJobs(this.state.multipleJobArray);
        }
    }
    applyFilter = () => {

    }

    ViewConstructor() {

        console.log(this.state.gridConfig.gridRequest);
        return (
            <>
                {(!this.state.IsMobileView) ?
                    <DesktopGrid gridConfig={this.state.gridConfig} updateGR={this.handleSwitchDisplay}></DesktopGrid>

                    : <MobileGrid gridConfig={this.state.gridConfig} updateGR={this.handleSwitchDisplay}></MobileGrid>
                }
            </>
        )
    }

    render() {
        return (
            <>
                {this.state.showLogin ? <LoginModal onLoginModalHide={this.onLoginModalHide} onAfterLogin={this.onAfterLogin} > </LoginModal> : <></ >}
                {this.state.loader ? <LoaderModal></LoaderModal> : ''}

                {this.state.isLoaded ?
                    this.ViewConstructor()
                    : <LoaderModal></LoaderModal>}
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