
export default class PaginationModel {
    constructor() {
        this.PageSize = 3;
        this.CurrentPage = 1;
    }
    SortColumnName: string = "";
    SortOrder: string = "asc";
    PageSize: number = 0;
    CurrentPage: number = 0;
    TotalPages: number = 0;
    TotalRecords: number = 0;
}