
//Grid Config Models
export class GridConfig {
    column: Column[] = [];
    topSearchPanelUi: FilterUi[] = [];
    leftSearchPanelUi: FilterUi[] = [];
    gridApiData: ApiConfig = new ApiConfig();
    rowIdentityPropertyForManipulations: string = "";
    isEditable: boolean = false;
    isDeleteable: boolean = false;
    isExportable: boolean = false;
}

export class Column {
    title: string = "";
    columnPropertyKey: string = "";
    sortable: boolean = false;
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

export class ApiConfig{
    url: string = "";
    method: string = "";
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
    ColumnName:string="";
    Value:any[]=[];
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
export enum Op
{
    Equals,
    GreaterThan,
    LessThan,
    GreaterThanOrEqual,
    LessThanOrEqual,
    Contains,
    StartsWith,
    EndsWith
}


