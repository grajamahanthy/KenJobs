
//Grid Config Models
export class GridConfig {
    Title: string = "";
    column: Column[] = [];
    topSearchPanelUi: FilterUi[] = [];
    leftSearchPanelUi: FilterUi[] = [];
    gridApiData: ApiConfig = new ApiConfig();
    rowIdentityPropertyForManipulations: string = "";
    isEditable: boolean = false;
    isDeleteable: boolean = false;
    isExportable: boolean = false;
    isAllowMultiRowSelect: boolean = false;
    toolBar: ButtonProps[] = [];
    gridRequest: GridRequest = new GridRequest();
    responceData:any[]=[];
    isComingFromHome:boolean=false;
}

export class Column {
    title: string = "";
    columnPropertyKey: string = "";
    sortable: boolean = false;
    columnType: string = "text";
    linkUrl: string = "";
    linkParam: string = "";
    buttonProps: ButtonProps = new ButtonProps();
}

export class FilterUi {
    label: string = "";
    columnPropertyKey: string = "";
    propValue: any = null;
    questionType: string = "";
    options: Option[] = [];
    optionApi: ApiConfig = new ApiConfig();
}

export class Option {
    value: string = "";
    text: string = "";
}

export class ApiConfig {
    url: string = "";
    method: string = "";
    apiCall:any="";
}

export class ButtonProps {
    buttonText: string = "";
    buttonEvent: any = "";
    params: string[] = [];
}

//Grid Request/Response Models
export class GridRequest {
    Pagination: Pagination = new Pagination();
    Sorting: Sorting = new Sorting();
    TopSearchFilter: Filter[] = [];
    LeftSearchFilter: Filter[] = [];
}

export class GridResponse {
    Rows: any[] = [];
    TotalRecords: number = 0;
}

export class Filter {
    ColumnName: string = "";
    Value: any[] = [];
}

export class Sorting {
    SortColumn: string = "";
    SortOrder: number = 0;
}

export class Pagination {
    PageSize: number = 20;
    CurrentPage: number = 1;
    TotalPages: number = 0;
    TotalRecords: number = 0;
}



export enum Op {
    Equals,
    GreaterThan,
    LessThan,
    GreaterThanOrEqual,
    LessThanOrEqual,
    Contains,
    StartsWith,
    EndsWith
}


