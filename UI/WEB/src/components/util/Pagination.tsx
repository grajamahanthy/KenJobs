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

    let TopPanelData = data.items;
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

function ListTableHeader(data: any): any {
    let columns = data.columns;
    let sorting = data.sorting;
    let th: any[] = [];

    columns.map((item: any, key: any) => {
        if (item.sortable) {
            if (sorting.SortColumn != "" && sorting.SortColumn == item.columnPropertyKey) {
                th.push(<th onClick={(e) => data.sortChange(e, item.columnPropertyKey, sorting.SortOrder)}>{item.title}
                    <FontAwesomeIcon icon={_SortClass(sorting.SortOrder)} size="xs" className="float-right" /></th>)
            }
            else {
                th.push(<th onClick={(e) => data.sortChange(e, item.columnPropertyKey, 0)}>
                    {item.title}
                    <FontAwesomeIcon icon={_SortClass(0)} size="xs" className="float-right" /></th>)
            }
        }
        else {
            th.push(<th>{item.title}
            </th>)

        }
    })
    return (th)
}

function ListTabledata(data: any): any {
    let columnData = data.columns;
    let rowData = data.item;
    let event = data.Clickevent;
    let gridRowList: any[] = [];


    rowData.map((item: any, key: any) => {
        gridRowList.push(<tr>
            {
                getColTagsForDesktop(columnData, item)
            }
        </tr>)
    })
    return (gridRowList)
}

function getColTagsForDesktop(columnData: Column[], item: any) {
    let colTagsArr: any = [];
    columnData.forEach((col: Column) => {
        if (col.columnType == "button") {
            colTagsArr.push(<td>
                <button className="btn btn-primary btn-sm rounded-0 mr-2"
                    onClick={(e)=>CallEvent(item, col.buttonProps)} >{col.buttonProps.buttonText}</button>

                {item[col.columnPropertyKey]}
            </td>);
        } else {
            colTagsArr.push(<td>{item[col.columnPropertyKey]}</td>);

        }
    });
    return colTagsArr;
}

function CallEvent(data: any, btnProps: ButtonProps) {
    let paramArr: any[] = [];
    btnProps.params.forEach((param) => {
        paramArr.push({ key: param, value: data[param] });
    });

    btnProps.buttonEvent(paramArr);
}

function BlockData(data: any): any {
    let columnData = data.columns;
    let rowData = data.item;
    let gridBlock: any[] = [];

    rowData.map((item: any, key: any) => {
        gridBlock.push(
            <div className="card  border rounded-0 pt-2 mb-2 shadow-sm p-3 ">
                <div className="card-text mb-2">
                    {
                        getColTagsForMobile(columnData, item)
                    }
                </div>
            </div>
        )
    })
    return (gridBlock)
}
function getColTagsForMobile(columnData: Column[], item: any) {
    let colTagsArr: any = [];
    columnData.forEach((col: Column) => {
        colTagsArr.push(
            <div className="mt-2">
                <span className="mr-sm-2 pull-right">{col.title} </span>
                {" : " + item[col.columnPropertyKey]}
            </div>
        );
    });
    return colTagsArr;
}

function _SortClass(data: any): any {
    switch (data) {
        case 0: return ("sort");
        case 1: return ("sort-up");
        case 2: return ("sort-down");
        default: return ("")
    }
}

class Pagination extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            show: false,
            GridConfig: new GridConfig(),
            GridRequest: new GridRequest(),
            ResponceData: {},
            isLoaded: false,
            loader: false,
            showView: false,
            MobileView: false,
        }

        this.setShow = this.setShow.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleTopSearchSubmit = this.handleTopSearchSubmit.bind(this);
        this.handleLeftSearchSubmit = this.handleLeftSearchSubmit.bind(this);
        this.sortOrder = this.sortOrder.bind(this);
        this.recordsPerPage = this.recordsPerPage.bind(this);
        this.handleTopPanelElementChange = this.handleTopPanelElementChange.bind(this);
        this.handleLeftPanelElementChange = this.handleLeftPanelElementChange.bind(this);
    }

    resize() {
        this.setState({
            MobileView: (window.innerWidth <= 420) ? true : false
        })
        // this.setState({ hideNav: window.innerWidth <= 760 });
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

        if (doesSearchCriteraExist)
            this.handleTopSearchSubmit(null);

    }

    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
        this.setState({
            GridConfig: this.props.gridConfig,
            isLoaded: true
        }, this.searchIfCriteriaExistsOnLoad);


    }
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

        this.setState({
            loader: true
        })
        let Servicecall = new Apiservices();
        let responce = null;

            if (this.state.GridConfig.gridApiData.method == "post")
            responce = Servicecall.POST_CALL1(this.state.GridConfig.gridApiData.url, this.state.GridRequest, this.displayData, this.errorHandle)
        else
            responce = Servicecall.POST_CALL1(this.state.GridConfig.gridApiData.url, this.state.GridRequest, this.displayData, this.errorHandle)

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
        let filterArray = getFilterArray(this.state.GridConfig.topSearchPanelUi);
        let gridRequest: GridRequest = this.state.GridRequest;
        gridRequest.TopSearchFilter = filterArray;
        gridRequest.Pagination.CurrentPage = 1;
        this.setState({
            GridRequest: gridRequest,
            show: false
        }, () => this.requestApi());
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
            // pageArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
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
            if (searchKey.columnPropertyKey == e.target.name)
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


    ListData = () => {
        if (this.state.isLoaded && this.state.GridConfig.column.length > 0) {
            let Columns = this.state.GridConfig.column;
            return (
                <div className="table-responsive-lg">
                    <table className="table  table-hover">
                        <thead>
                            <tr>
                                <ListTableHeader columns={this.state.GridConfig.column} sorting={this.state.GridRequest.Sorting} sortChange={this.sortOrder} />
                            </tr>
                        </thead>
                        {
                            (this.state.ResponceData != undefined && this.state.ResponceData.length != null && this.state.ResponceData.length > 0)
                                ?
                                <ListTabledata item={this.state.ResponceData} columns={Columns} />
                                : ""
                        }
                    </table>
                </div>
            )
        }
    }

    BlockView = () => {
        if (this.state.isLoaded && this.state.GridConfig.column.length > 0) {
            let Columns = this.state.GridConfig.column;
            return (
                <>
                    {
                        (this.state.ResponceData != undefined && this.state.ResponceData.length != null && this.state.ResponceData.length > 0)
                            ?
                            <BlockData item={this.state.ResponceData} columns={Columns} />
                            :
                            ""
                    }
                </>
            )

        }
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

    handleGridChange = () => {

    }


    setShow = () => {
        this.setState({
            show: !this.state.show
        })
    }

    PrepareSearchLayout = (): any => {

        return <></>
    }


    render() {

        return (<>
            {this.state.loader ? <LoaderModal></LoaderModal> : ''}
            < div className=" mt-3 mx-5" >
                <h1>
                    Search Job
                         </h1>
                < div className=" col-lg-12 " >
                    <div className="text-center text-secondary" >
                        {/* <JobSearch GetValues={this.findTheJobs} ></JobSearch> */}
                        < div className="col-sm-8 mx-auto  mt-3" >
                            <form onSubmit={this.handleTopSearchSubmit}>
                                <div className="form-row" >
                                    {
                                        (this.state.isLoaded && this.state.GridConfig.topSearchPanelUi.length > 0) ?
                                            <LoadTopSearchPanelData items={this.state.GridConfig.topSearchPanelUi} handleElementChange={this.handleTopPanelElementChange} />
                                            : ""
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                    < div className="mt-4" >
                        {this.state.showView ?
                            <div className="row" >
                                {/* {!this.state.MobileView ?
                                    <div className="col-sm-2 border shadow pt-2" >
                                        <h4 className="text-center"><u>Filters</u></h4>
                                        <div>
                                            <div id="accordion">
                                                <form onSubmit={this.handleLeftSearchSubmit}>
                                                    <div className="form-row" >
                                                        {(this.state.isLoaded && this.state.GridConfig.leftSearchPanelUi.length > 0)
                                                            ?
                                                            <LoadLeftSearchPanelData items={this.state.GridConfig.leftSearchPanelUi} handleElementChange={this.handleLeftPanelElementChange} />
                                                            : ""}
                                                    </div>
                                                </form>
                                            </div>
                                        </div>

                                    </div> : ""
                                } */}
                                <div className="col-sm-12" >
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <nav aria-label="...">
                                                <ul className="pagination float-left">

                                                    {this.state.GridRequest.Pagination.TotalPages > 0 ?
                                                        this.renderPaginationList(this.state.GridRequest.Pagination.CurrentPage, Math.ceil(this.state.GridRequest.Pagination.TotalPages)) : ""}

                                                </ul>
                                                <span className="float-sm-left  mr-2 ml-2">
                                                    <select className="form-control" onChange={this.recordsPerPage}>
                                                        <option>20</option>
                                                        <option>50</option>
                                                        <option>100</option>
                                                        <option>200</option>
                                                        {/* <option>50</option>
                                                        <option>100</option>
                                                        <option>200</option> */}
                                                    </select>
                                                </span>
                                            </nav>
                                            </div>
                                            <div className="col-sm-4">
                                            {
                                                // this.state.MobileView ?
                                                <span onClick={this.setShow} className="btn btn-primary float-sm-right mr-2 float-right">
                                                    <FontAwesomeIcon icon="grip-vertical" size="xs" className="ml-2" />
                                                    <FontAwesomeIcon icon="filter" size="xs" className="ml-2" />
                                                </span>
                                                        
                                                    // : ""
                                            }
                                        </div>
                                    </div>
                                    {
                                        this.state.MobileView ?
                                            this.BlockView()
                                            :
                                            this.ListData()

                                    }

                                </div>
                            </div>
                            : ""}
                    </div>
                </div>
            </div >

            <Modal
                size="lg"
                show={this.state.show}
                className="{styles.loaderCls}"
                onHide={this.setShow}
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header >
                    <h4 className="text-uppercase mt-20">  Filter</h4>
                </Modal.Header>
                <Modal.Body>
                    <Row className="ml-0 mr-0 h-100">
                        <Col className="bg-white h-100 d-table">

                            <form onSubmit={this.handleLeftSearchSubmit}>
                                {(this.state.isLoaded && this.state.GridConfig.column.length > 0)
                                    ?
                                    <LoadLeftSearchPanelData items={this.state.GridConfig.leftSearchPanelUi} handleElementChange={this.handleLeftPanelElementChange} />

                                    : ""}
                            </form>
                        </Col >
                    </Row >

                </Modal.Body>

            </Modal>




        </>)
    }
}
export default Pagination;