import React, { CSSProperties } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PaginationModel from "../../Models/PaginationModel";
import { GridRequest, GridConfig, Column, Filter, Sorting, Op, FilterUi, ButtonProps } from "../../Models/GridModel";
import Apiservices from "../services/Apiservices";
import Jobfilter from "./JobFilter";
import { Link } from "react-router-dom";
import LoaderModal from "./LoaderModal";
import { existsTypeAnnotation } from "@babel/types";
import exportFromJSON from 'export-from-json';
import ExportData from "./ExportData";
import Notify from "../common/Notify";
const notify = new Notify();

function LoadLeftSearchPanelData(data: any): any {
    let leftPanelData = data.items;
    let Field: any[] = []
    if (leftPanelData.length > 0) {
        let SearChpanel = leftPanelData;

        SearChpanel.map((item: any, key: any) => {
            if (item.questionType == "text") {
                Field.push(
                    <div className="form-group col-sm-12" >
                        <input
                            type="text"
                            name={item.columnPropertyKey}
                            className={"form-control  rounded-0 cls_" + item.columnPropertyKey}
                            id={item.label}
                            placeholder={"Enter " + item.columnPropertyKey}
                            value={item.propValue}
                            onChange={data.handleElementChange}
                        />
                    </div>
                )
            } else if (item.questionType == "select") {

                Field.push()

            } else if (item.questionType == "checkbox") {

                Field.push()

            } else if (item.questionType == "radio") {

                Field.push()

            } else if (item.questionType == "number") {
                Field.push(
                    <div className="form-group col-sm-12" >
                        <input type="number"
                            id={item.label}
                            min='0'
                            max='100'
                            name={item.columnPropertyKey}
                            className="form-control  rounded-0"
                            placeholder={"Enter " + item.columnPropertyKey}
                            value={item.propValue}
                            onChange={data.handleElementChange}
                        />
                    </div>
                )
            }

        })
        Field.push(
            <div className="form-group col-md" >
                <input
                    type="submit"
                    id="search"
                    className="btn btn-primary btn-block rounded-0 "
                    value="Apply"
                />
            </div>
        )

    }
    return (Field);
}
function LoadTopSearchPanelData(data: any): any {

    let TopPanelData = data.config.topSearchPanelUi;
    let Field: any[] = []
    if (TopPanelData.length > 0) {
        let SearChpanel = TopPanelData;

        SearChpanel.map((item: any, key: any) => {
            if (item.questionType == "text") {
                Field.push(
                    <div className="form-group col-md" >
                        <input
                            type="text"
                            name={item.columnPropertyKey}
                            className={"form-control  rounded-0 cls_" + item.columnPropertyKey}
                            id={item.label}
                            placeholder={"Enter " + item.columnPropertyKey}
                            value={item.propValue}
                            onChange={data.handleElementChange}
                        />
                    </div>
                )
            } else if (item.questionType == "select") {

                Field.push()

            } else if (item.questionType == "checkbox") {

                Field.push()

            } else if (item.questionType == "radio") {

                Field.push()

            } else if (item.questionType == "number") {
                Field.push(
                    <div className="form-group col-md" >
                        <input type="number"
                            id={item.label}
                            min='0'
                            max='100'
                            name={item.columnPropertyKey}
                            className="form-control  rounded-0"
                            placeholder={"Enter " + item.columnPropertyKey}
                            value={item.propValue}
                            onChange={data.handleElementChange}
                        />
                    </div>
                )
            }

        })
        Field.push(
            <div className="form-group col-md" >
                <input
                    type="submit"
                    id="search"
                    className="btn btn-primary btn-block rounded-0 "
                    value="Search"
                />
            </div>
        )
    }
    return (Field);
}
const getFilterArray = (data: any): any => {
    let searchpanel = data;
    let filterArray: Filter[] = [];
    searchpanel.map((item: any, key: any) => {
        let filterIdControl: any = document.getElementById(item.label);
        let filterClsControl: any = document.getElementsByClassName("cls_" + item.columnPropertyKey);
        let fltrValueArray: any = null;

        if (item.questionType == "text") {
            let fltr = new Filter();
            let fltrVal = (doesExist(filterIdControl) ? filterIdControl.value : "");

            fltr.ColumnName = item.columnPropertyKey;
            if (fltrVal.length > 0)
                fltr.Value.push(fltrVal);

            if (doesExist(fltr.Value) && fltr.Value.length > 0)
                filterArray.push(fltr);
        }
        else if (item.questionType == "number") {
            let fltrVal = (doesExist(filterIdControl) ? filterIdControl.value : "");

            let fltr = new Filter();
            fltr.ColumnName = item.columnPropertyKey;
            if (fltrVal.length > 0)
                fltr.Value.push(fltrVal);

            if (doesExist(fltr.Value) && fltr.Value.length > 0)
                filterArray.push(fltr);

        }
        else if (item.questionType == "numberrange") {
            let fltr = new Filter();
            let fltrVal = (doesExist(filterIdControl) ? filterIdControl.value : "");

            fltr.ColumnName = item.columnPropertyKey;
            if (fltrVal.length > 0)
                fltr.Value.push(fltrVal);

            if (doesExist(fltr.Value) && fltr.Value.length > 0)
                filterArray.push(fltr);
        }
        else if (item.questionType == "select") {
            let fltr = new Filter();
            for (var i = 0; i < filterClsControl.length; i++) {
                let ctrlSelected: boolean = (doesExist(filterClsControl[i].getAttribute("checked"))
                    || filterClsControl[i].getAttribute("checked") == "checked"
                    || filterClsControl[i].getAttribute("checked") == "true")

                if (ctrlSelected) {
                    fltr.ColumnName = item.columnPropertyKey;
                    fltr.Value.push(filterClsControl[i].getAttribute("value"));

                    if (doesExist(fltr.Value) && fltr.Value.length > 0)
                        filterArray.push(fltr);
                }
            }
        }
    })
    return filterArray;
}
function doesExist(el: any) {
    return (el !== null && el !== undefined)
}
function CallEvent(data: any, btnProps: ButtonProps) {
    let paramArr: any[] = [];
    btnProps.params.forEach((param) => {
        paramArr.push({ key: param, value: data[param] });
    });

    btnProps.buttonEvent(paramArr);
}
function BlockData(data: any): any {
    let columnData = data.config.column;
    let isMultiselect = data.config.isAllowMultiRowSelect;
    let rowData = data.item;
    let event = data.handleCheckChange;
    let checkedItems = data.setCheckeditems;
    let gridBlock: any[] = [];
    // if (isMultiselect)
    //     gridBlock.push(
    //         <div className="custom-control custom-checkbox d-inline ml-3 mb-3">
    //             <input type="checkbox" onChange={(e) => data.isSelectAll(e)} className="custom-control-input cls_selectall" id="customCheck1" />
    //             <label className="custom-control-label" htmlFor="customCheck1"> &nbsp;Select All</label>
    //             <br />
    //         </div>
    //     )
    (rowData != undefined && rowData.length != null && rowData.length > 0)
                            ?
    rowData.map((item: any, key: any) => {
        gridBlock.push(
            <div className="card  border rounded-0 pt-2 mb-2 shadow-sm p-3 ">
                <div className="card-text mb-2">
                    {
                        getColTagsForMobile(columnData, item, event, checkedItems, isMultiselect)
                    }
                </div>
            </div>
        )
    }):
    gridBlock.push(
        <div className="card  border rounded-0 pt-2 mb-2 shadow-sm p-3 ">
            <div className="card-text mb-2">
                No results available. Please search with different criteria using "Modify Search" link.
            </div>
        </div>
    )
    return (gridBlock)
}
function getColTagsForMobile(columnData: Column[], item: any, event: any, checkedItemList: any, isMultiselect: boolean) {
    let colTagsArr: any = [];
    if (isMultiselect) {
        if (checkedItemList.length > 0 && (checkedItemList.indexOf((item.Id).toString()) > -1)) {
            colTagsArr.push(
                <div className="custom-control custom-checkbox d-inline">
                    <input type="checkbox" onChange={(e) => event(e)} checked className="custom-control-input cls_select" id={item.Id} value={item.Id} />
                    <label className="custom-control-label" htmlFor={item.Id}></label>
                </div>
            )
        } else {
            colTagsArr.push(
                <div className="custom-control custom-checkbox d-inline">
                    <input type="checkbox" onChange={(e) => event(e)} className="custom-control-input cls_select" id={item.Id} value={item.Id} />
                    <label className="custom-control-label" htmlFor={item.Id}></label>
                </div>
            )
        }
    }
    columnData.forEach((col: Column) => {
        if (col.columnType == "button") {
            colTagsArr.push(
                <button className="btn btn-primary btn-sm rounded-0 mr-2"
                    onClick={(e) => CallEvent(item, col.buttonProps)} >{col.buttonProps.buttonText}</button>
            );
        } else if (col.columnType == "link") {
            colTagsArr.push(
                <Link className=""
                    to={{
                        pathname: "/" + col.linkUrl,
                        state: { [col.linkParam]: item.Id }
                    }}
                > {item[col.columnPropertyKey]}
                </Link>
            );
        } else {
            colTagsArr.push(
                <div className="mt-2">
                    <span className="mr-sm-2 pull-right">{col.title} </span>
                    {" : " + item[col.columnPropertyKey]}
                </div>
            );
        }
    });
    return colTagsArr;
}

class MobileGrid extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        console.log(props);
        this.state = {
            show: false,
            GridConfig: new GridConfig(),
            GridRequest: new GridRequest(),
            ResponceData: {},
            isLoaded: false,
            loader: false,
            showView: false,
            MobileView: (window.outerWidth <= 768) ? true : false,
            exportMenuShow: false,
            showError:false,
            showModelType: "",
            temp: ""
        }

        this.setShow = this.setShow.bind(this);
        this.exportShow = this.exportShow.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleTopSearchSubmit = this.handleTopSearchSubmit.bind(this);
        this.handleLeftSearchSubmit = this.handleLeftSearchSubmit.bind(this);
        this.sortOrder = this.sortOrder.bind(this);
        this.recordsPerPage = this.recordsPerPage.bind(this);
        this.handleTopPanelElementChange = this.handleTopPanelElementChange.bind(this);
        this.handleLeftPanelElementChange = this.handleLeftPanelElementChange.bind(this);
        this.handleMultipleSelectEvent = this.handleMultipleSelectEvent.bind(this);
        this.resize = this.resize.bind(this)

        window.addEventListener("resize", this.resize);

    }

    SelectedListArray: any[] = [];

    resize() {
        this.setState({
            MobileView: (window.outerWidth <= 768) ? true : false
        }, this.CallBackGridRequest)
    }

    UpdateStateVariables = () => {

        this.setState({
            GridConfig: this.props.gridConfig,
            GridRequest: this.props.gridConfig.gridRequest,
            ResponceData: this.props.gridConfig.responceData,
            isLoaded: true,
            //showView:true
            showError:(this.props.gridConfig.responceData !== undefined && this.props.gridConfig.responceData !== null && this.props.gridConfig.responceData.length > 0) ? false : true,
            showView: (this.props.gridConfig.responceData !== undefined && this.props.gridConfig.responceData !== null && this.props.gridConfig.responceData.length > 0) ? true : false
        });
    }

    CallBackGridRequest() {
        if (!this.state.MobileView) {
            this.props.updateGR(this.state.GridRequest, this.state.MobileView, this.state.ResponceData)
        }
    }

    selectall_change = (e: any) => {

        let isSelectAll: boolean = e.target.checked
        let filterClsControl: any = document.getElementsByClassName("cls_select");
        for (let i = 0; i < filterClsControl.length; ++i) {
            filterClsControl[i].checked = isSelectAll;
            let idxOfItem = this.SelectedListArray.indexOf(filterClsControl[i].id);
            if (isSelectAll) {
                if (idxOfItem < 0)
                    this.SelectedListArray.push(filterClsControl[i].id)
            }
            else {
                if (idxOfItem > -1) {
                    this.SelectedListArray.splice(idxOfItem, 1);
                }
            }
        }
        this.setState({ temp: "" });
    }

    handleCheckBoxchange = (e: any) => {

        let isChecked: boolean = e.target.checked;
        let selectedItemId: number = e.target.id;
        let idxOfItem = this.SelectedListArray.indexOf(selectedItemId);
        if (isChecked) {
            if (idxOfItem < 0)
                this.SelectedListArray.push(selectedItemId)
        }
        else {
            if (idxOfItem > -1) {
                this.SelectedListArray.splice(idxOfItem, 1);
            }
        }

        let selectAllCheckboxCtrl: any = document.getElementsByClassName("cls_selectall")[0];
        selectAllCheckboxCtrl.checked = this.isAllCheckboxesSelected();
        this.setState({ temp: "" });

    }

    isAllCheckboxesSelected = function () {
        let isAllCheckboxesSelectedBool: boolean = true;
        let filterClsControl: any = document.getElementsByClassName("cls_select");
        for (let i = 0; i < filterClsControl.length; ++i) {
            if (!filterClsControl.checked) {
                isAllCheckboxesSelectedBool = false;
                return isAllCheckboxesSelectedBool;
            }
        }
        return isAllCheckboxesSelectedBool;
    }


    exportShow() {
        this.setState({
            exportMenuShow: !this.state.exportMenuShow
        })
    }
    export_data = (e: any, exportType: any) => {

        let exportData = new ExportData()
        const columns = this.state.GridConfig.column;
        const item = this.state.ResponceData;
        let data = { columns, item }

        exportData.Export(data, "JOBS_Data", exportType);


    }
    recordsPerPage = (e: any) => {
        e.preventDefault();
        let GR = this.state.GridRequest;
        GR.Pagination.PageSize = e.target.value
        GR.Pagination.CurrentPage = 1;
        this.setState({
            GridRequest: GR
        }, () => this.requestApi())
    }
    doesExist(el: any) {
        return (el !== null && el !== undefined)
    }

    searchIfCriteriaExistsOnLoad() {
        let doesSearchCriteraExist: boolean = false;
        this.state.GridConfig.topSearchPanelUi.forEach((searchKey: FilterUi) => {
            if (this.doesExist(searchKey.propValue) && searchKey.propValue.length > 0) {
                doesSearchCriteraExist = true;
            }
        });
        doesSearchCriteraExist = this.state.GridConfig.isComingFromHome;


        if (doesSearchCriteraExist)
            this.handleTopSearchSubmit(null);

    }


    componentDidMount() {
        this.setState({
            GridConfig: this.props.gridConfig,
            GridRequest: this.props.gridConfig.gridRequest,
            ResponceData: this.props.gridConfig.responceData,
            isLoaded: true,
            // showError:(this.props.gridConfig.responceData !== undefined && this.props.gridConfig.responceData !== null && this.props.gridConfig.responceData.length > 0) ? false : true,
            showView: (this.props.gridConfig.responceData !== undefined && this.props.gridConfig.responceData !== null && this.props.gridConfig.responceData.length > 0) ? true : false

        }, this.searchIfCriteriaExistsOnLoad);
    }

    // componentWillReceiveProps(nextProps:any) {
    //     console.log(this.props)
    //     console.log(nextProps.gridConfig.gridRequest)
    //     this.setState({
    //         GridConfig: this.props.gridConfig,
    //         GridRequest: this.props.gridConfig.gridRequest,
    //         ResponceData: this.props.gridConfig.responceData,
    //         isLoaded: true,
    //         //showView:true
    //         showView: (this.props.gridConfig.responceData !== undefined && this.props.gridConfig.responceData !== null && this.props.gridConfig.responceData.length > 0) ? true : false
    //     }, this.searchIfCriteriaExistsOnLoad);
    // }

    sortOrder = (e: any, sortColumnName: any, order: any) => {
        e.preventDefault();
        let columns = this.state.GridConfig.column;

        let GR = this.state.GridRequest;
        let sorting = new Sorting();
        sorting.SortColumn = sortColumnName;
        sorting.SortOrder = order == 0 ? 1 : (order == 1 ? 2 : 0);
        this.state.GridRequest.Pagination.CurrentPage = 1;

        GR.Sorting = sorting;
        this.setState({
            GridRequest: GR
        }, () => this.requestApi())
    }

    requestApi() {

        let Servicecall = new Apiservices();
        let responce = null;

        responce = this.state.GridConfig.gridApiData.apiCall(this.state.GridRequest, this.UpdateStateVariables);

        // if (this.state.GridConfig.gridApiData.method == "post")
        //     responce = Servicecall.POST_CALL1(this.state.GridConfig.gridApiData.url, this.state.GridRequest, this.displayData, this.errorHandle)
        // else
        //     responce = Servicecall.POST_CALL1(this.state.GridConfig.gridApiData.url, this.state.GridRequest, this.displayData, this.errorHandle)

    }
    displayData = (data: any) => {
        let totalrecords = data.TotalRecords;
        let GR = this.state.GridRequest;
        let PG = GR.Pagination;
        let totalpages;
        PG.TotalPages = Math.ceil(totalrecords / PG.PageSize);
        GR.Pagination = PG;

        this.setState({
            ResponceData: data.Rows,
            GridRequest: GR,
            showView: true,
            loader: false,
        })
    }

    errorHandle = (error: any) => {

    }

    clearFilter() {
        let column = this.state.GridConfig.leftSearchPanelUi;
        column.map((item: any, key: any) => {
            let filterIdControl: any = document.getElementById(item.label);
            let filterClsControl: any = document.getElementsByClassName("cls_" + item.label);
            if (this.doesExist(filterIdControl)) {
                filterIdControl.value = null;
            }
            if (filterClsControl.length > 0) {
                for (var i = 0; i < filterClsControl.length; i++) {
                    let ctrlSelected: boolean = (this.doesExist(filterClsControl[i].getAttribute("checked"))
                        || filterClsControl[i].getAttribute("checked") == "checked"
                        || filterClsControl[i].getAttribute("checked") == "true")

                    if (ctrlSelected) {
                        filterClsControl[i].checked = false;

                    }
                }
            }

        })

        let gC = this.state.GridConfig;
        let SearchPanelUi = gC.leftSearchPanelUi

        SearchPanelUi.forEach((searchKey: FilterUi) => {
            searchKey.propValue = "";
        });

        gC.leftSearchPanelUi = SearchPanelUi;

        let gridRequest: GridRequest = this.state.GridRequest;
        gridRequest.LeftSearchFilter = [];
        this.setState({
            GridRequest: gridRequest,
            GridConfig: gC,
            show: false
        });
    }

    handleTopSearchSubmit = (e: any) => {
        if (e != null)
            e.preventDefault();

        this.clearFilter();
        let topSearchArray = getFilterArray(this.state.GridConfig.topSearchPanelUi);
        let gridRequest: GridRequest = this.state.GridRequest;
        gridRequest.TopSearchFilter = topSearchArray;
        gridRequest.Pagination.CurrentPage = 1;
        this.setState({
            GridRequest: gridRequest,
            show: false
        }, () => this.requestApi());
    }

    getSearchValues() {
        let filterCriteria: any[] = [];
        this.state.GridRequest.TopSearchFilter.forEach((item: any) => { filterCriteria = filterCriteria.concat(item.Value); });
        this.state.GridRequest.LeftSearchFilter.forEach((item: any) => { filterCriteria = filterCriteria.concat(item.Value); });

        let outfilterCriteria: any[] = [];
        filterCriteria.map((item: any) =>

            outfilterCriteria.push(
                <span className="badge badge-light">
                    {item}
                    {/* <FontAwesomeIcon icon="times" size="sm" className="ml-2"  /> */}
                </span>
            )

        );
        return outfilterCriteria;

    }

    handleLeftSearchSubmit = (e: any) => {
        e.preventDefault();
        let filterArray = getFilterArray(this.state.GridConfig.leftSearchPanelUi);

        let gridRequest: GridRequest = this.state.GridRequest;
        gridRequest.LeftSearchFilter = filterArray;
        gridRequest.Pagination.CurrentPage = 1;
        this.setState({
            GridRequest: gridRequest,
            show: false
        }, () => this.requestApi());
    }
    renderPaginationList = (currentPage: any, totalPages: any) => {
        let li: any[] = [];
        //li.push(<></>);
        // let currentPage = this.state.GridRequest.Pagination.CurrentPage;
        // let totalPages = Math.ceil(this.state.GridRequest.Pagination.TotalPages);
        li.push(<>
            <li key="0" className={"page-item " + (currentPage > 1 ? "" : "disabled")}>
                <a className="page-link" href="#" onClick={(e) => this.handlePageChange(e, 1)}>{"First"}</a>
            </li>
            <li key="1" className={"page-item " + (currentPage > 1 ? "" : "disabled")}>
                <a className="page-link" href="#" onClick={(e) => this.handlePageChange(e, currentPage - 1)}>{"<<"}</a>
            </li>
        </>
        )
        let pageArr: any[] = [];


        if (totalPages <= 9) {
            for (var p = 1; p <= totalPages; p++) {
                pageArr.push(p);
            }
        }
        else {
            if (currentPage == 1 || currentPage == 2 || currentPage == 3) {
                pageArr = [1, 2, 3, 4, 5, "...", totalPages];
            }
            else if (currentPage == totalPages || currentPage == (totalPages - 1) || currentPage == (totalPages - 2)) {
                pageArr = [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
            }
            else {
                pageArr = [1, "...", currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2, "...", totalPages];
            }
        }

        if (!this.state.MobileView) {
            for (let i = 0; i < pageArr.length; i++) {
                if (pageArr[i] == currentPage) {
                    li.push(<><li key={i + 2} className="page-item active"><a className="page-link" href="#">{pageArr[i]}</a></li></>);
                }
                else if (pageArr[i] == "...") {
                    li.push(<><li key={i + 2} className="page-item page-link">{pageArr[i]}</li></>);
                }
                else {
                    li.push(<><li key={i + 2} className="page-item">
                        <a className="page-link" href="#" onClick={(e) => this.handlePageChange(e, pageArr[i])}>{pageArr[i]}</a>
                    </li></>)
                }
            }
        }

        li.push(<>

            <li key={pageArr.length + 2} className={"page-item " + (currentPage < totalPages ? "" : "disabled")}>
                <a className="page-link" href="#" onClick={(e) => this.handlePageChange(e, currentPage + 1)}>{">>"}</a>
            </li>
            <li key={pageArr.length + 3} className={"page-item " + (currentPage < totalPages ? "" : "disabled")}>
                <a className="page-link" href="#" onClick={(e) => this.handlePageChange(e, totalPages)}>{"Last"}</a>
            </li>
        </>
        )
        return (li);

    }

    handleTopPanelElementChange(e: any) {
        e.preventDefault();
        let gC = this.state.GridConfig;
        let SearchPanelUi = gC.topSearchPanelUi

        SearchPanelUi.forEach((searchKey: FilterUi) => {
            if (searchKey.columnPropertyKey === e.target.name)
                searchKey.propValue = e.target.value;
        });

        gC.topSearchPanelUi = SearchPanelUi;
        this.setState({
            GridConfig: gC
        })

    }
    handleLeftPanelElementChange(e: any) {
        e.preventDefault();
        let gC = this.state.GridConfig;
        let SearchPanelUi = gC.leftSearchPanelUi

        SearchPanelUi.forEach((searchKey: FilterUi) => {
            if (searchKey.columnPropertyKey == e.target.name)
                searchKey.propValue = e.target.value;
        });

        gC.leftSearchPanelUi = SearchPanelUi;
        this.setState({
            GridConfig: gC
        })

    }

    GridHeader = () => {
        return (
            <>
                <div className="row">
                    <div className="col-sm-8">
                        <nav aria-label="...">
                            <ul className="pagination float-left">
                                {this.state.GridRequest.Pagination.TotalPages > 0 ?
                                    this.renderPaginationList(this.state.GridRequest.Pagination.CurrentPage, Math.ceil(this.state.GridRequest.Pagination.TotalPages)) : ""}
                            </ul>
                            {/* <span className="float-sm-left  mr-2 ml-2">
                                <select className="form-control" onChange={this.recordsPerPage}>
                                    <option>20</option>
                                    <option>50</option>
                                    <option>100</option>
                                    <option>200</option>
                                </select>
                            </span> */}
                        </nav>
                    </div>
                    <div className="col-sm-4">
                        {
                            !this.state.MobileView ?
                                <>
                                    <span className="float-sm-right  mr-2 ">
                                        {(this.state.GridConfig.isExportable && this.state.GridRequest.Pagination.TotalPages > 0) ?
                                            <span onClick={(e) => this.export_data(e, "xls")} className="btn btn-primary float-sm-right mr-2 float-right">
                                                Excel <FontAwesomeIcon icon="file-excel" size="lg" className="" />
                                            </span> :
                                            ""
                                        }
                                    </span>
                                    <span onClick={() => this.setShow("FilterModel")} className="btn btn-primary float-sm-right mr-2 float-right ">
                                        <FontAwesomeIcon icon="grip-vertical" size="xs" className="ml-2" />
                                        <FontAwesomeIcon icon="filter" size="xs" className="ml-2" />
                                    </span>
                                    <span className="float-sm-right mr-2">
                                        {
                                            (this.state.GridConfig.isAllowMultiRowSelect) ?
                                                this.state.GridConfig.toolBar.map((item: any, key: any) => {
                                                    let paramArr: any[] = [];
                                                    return (
                                                        <button key={key}
                                                            className="btn btn-primary  mr-2"
                                                            onClick={() => this.handleMultipleSelectEvent(item)}>
                                                            {item.buttonText}</button>
                                                    )
                                                }) : ""

                                        }
                                    </span></>
                                : ""
                        }
                    </div>
                </div>

            </>
        )
    }


    TileView = () => {
        if (this.state.isLoaded && this.state.GridConfig.column.length > 0) {
            let Columns = this.state.GridConfig;
            return (
                <>
                    {/* {this.GridHeader()} */}
                    {
                        
                            <>
                                <BlockData
                                    item={this.state.ResponceData}
                                    config={this.state.GridConfig}
                                    setCheckeditems={this.SelectedListArray}
                                    handleCheckChange={this.handleCheckBoxchange}
                                    isSelectAll={this.selectall_change} className="mb-5" />
                            {
                                (this.state.ResponceData != undefined && this.state.ResponceData.length != null && this.state.ResponceData.length > 0)?
                                <div className="fixed-bottom position-fixed w-100 overflow-hidden">
                                        <div className="row">
                                            <div className="col-sm-11"></div>
                                            <div className="col-sm-1">
                                                <span onClick={() => this.setShow("FilterModel")} className="btn btn-primary rounded-circle">
                                                    <FontAwesomeIcon icon="filter" size="xs" className="" />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12  bg-primary ">
                                                {
                                                    (this.state.GridConfig.isAllowMultiRowSelect) ?
                                                        this.state.GridConfig.toolBar.map((item: any, key: any) => {
                                                            let paramArr: any[] = [];
                                                            return (
                                                                <button key={key}
                                                                    className="btn btn-primary"
                                                                    onClick={() => this.handleMultipleSelectEvent(item)}>
                                                                    {item.buttonText}</button>
                                                            )
                                                        }) : ""
                                                }
                                                {
                                                    (this.state.GridConfig.isExportable && this.state.GridRequest.Pagination.TotalPages > 0) ?
                                                        <span onClick={(e) => this.export_data(e, "xls")} className="btn btn-primary">
                                                            <FontAwesomeIcon icon="file-excel" size="lg" className="" /> Export
                                                </span> :
                                                        "jj"
                                                }
                                            </div>
                                        </div>
                                    </div>
                                : ""
                            }
                            </>
                            
                    }
                </>
            )

        }
        // else if( this.state.showError && !this.state.showView) {
        //     return (
        //         <>
        //             <h4> No Result Found, Please Search for Other... </h4>
        //         </>
        //     )
        // }
    }

    handlePageChange = (e: any, index: number) => {
        e.preventDefault();
        let GR = this.state.GridRequest;
        GR.Pagination.CurrentPage = index
        this.setState({
            GridRequest: GR
        })
        this.requestApi();
    }

    handleMultipleSelectEvent = (toolBar: ButtonProps) => {
        let paramArr: any[] = [];
        if (this.SelectedListArray.length > 0) {
            toolBar.buttonEvent(this.SelectedListArray);
        }
        else {
            notify.Error_notify("Please Select Multiple Items.");
        }
    }

    handleGridChange = () => {

    }


    setShow = (ModelName: string) => {
        this.setState({
            show: !this.state.show,
            showModelType: ModelName
        })
    }

    PrepareSearchLayout = (): any => {

        return <></>
    }

    SearchUi = () => {
        return (
            <div className="text-center text-secondary" >
                <div className="col-sm-8 mx-auto  mt-3" >
                    <form onSubmit={this.handleTopSearchSubmit}>
                        <div className="form-row" >
                            {
                                (this.state.isLoaded && this.state.GridConfig.topSearchPanelUi.length > 0) ?
                                    <LoadTopSearchPanelData config={this.state.GridConfig} handleElementChange={this.handleTopPanelElementChange} />
                                    : ""
                            }
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    render() {

        return (<>
            {this.state.loader ? <LoaderModal></LoaderModal> : ''}
            < div>
                {
                    // this.props.gridConfig.responceData !== undefined && this.props.gridConfig.responceData !== null && this.props.gridConfig.responceData.length > 0
                    
                        <>
                            {
                                this.getSearchValues() == null || this.getSearchValues().length == 0 ? "" :
                                    <div className="row px-2 pt-2"><div className="col-lg-12">


                                        <div className="card">
                                            <div className="card-body">
                                                <div className="card-text">
                                                    <div className="row">
                                                        {this.getSearchValues()}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div></div>
                            }
                            <div className="row px-2 pt-2"><div className="col-lg-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="card-text">
                                            <div className="row">


                                                {
                                                    
                                                    (this.state.GridConfig.isAllowMultiRowSelect && this.state.showView) ?
                                                        <>
                                                            <div className="col-6">
                                                                <div className="custom-control custom-checkbox d-inline mb-3">
                                                                    <input type="checkbox" onChange={(e) => this.selectall_change(e)} className="custom-control-input cls_selectall" id="customCheck1" />
                                                                    <label className="custom-control-label" htmlFor="customCheck1"> &nbsp;Select All</label>
                                                                    <br />
                                                                </div>
                                                            </div> 
                                                            <div className="col-6" onClick={() => this.setShow("SearchModel")} >Modify Search
                                                                <span className="text-primary"> <FontAwesomeIcon icon="search" size="sm" /></span>
                                                            </div>
                                                        </>
                                                        : 
                                                        <div className="col-12 text-center" onClick={() => this.setShow("SearchModel")} >Modify Search
                                                            <span className="text-primary"> <FontAwesomeIcon icon="search" size="sm" /></span>
                                                        </div>
                                                }
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </>

                }


                <div className="row px-2 pt-2">
                    < div className=" col-lg-12 " >

                        < div>
                           
                                <div className="row" >
                                    <div className="col-sm-12" >
                                        {
                                            this.TileView()
                                        }
                                    </div>
                                </div>
                              
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                size="lg"
                show={this.state.show}
                className="{styles.loaderCls}"
                onHide={() => this.setShow("")}
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header >
                    <h4 className="text-uppercase mt-20">
                        {
                            (this.state.showModelType == "SearchModel") ?
                                this.state.GridConfig.Title
                                :
                                "Filter"}
                    </h4>
                </Modal.Header>
                <Modal.Body>
                    <Row className="ml-0 mr-0 h-100">
                        <Col className="bg-white h-100 d-table">
                            {

                                (this.state.showModelType == "SearchModel") ?

                                    this.SearchUi()
                                    :
                                    (this.state.showModelType == "FilterModel") ?
                                        < form onSubmit={this.handleLeftSearchSubmit}>
                                            {(this.state.isLoaded && this.state.GridConfig.column.length > 0)
                                                ?
                                                <LoadLeftSearchPanelData items={this.state.GridConfig.leftSearchPanelUi} handleElementChange={this.handleLeftPanelElementChange} />

                                                : ""}
                                        </form> : ""
                            }
                        </Col >
                    </Row >

                </Modal.Body>

            </Modal>




        </>)
    }
}
export default MobileGrid;