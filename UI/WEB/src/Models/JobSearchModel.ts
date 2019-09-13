import PaginationModel from "./PaginationModel";
import { GridRequest } from "./GridModel";

export default class JobSearchModel {
    Keyword: string = "";
    Location: string = "";
    Experience?: number = 0;
    //paginationdata: PaginationModel=new PaginationModel();
    JobSearchRequest: GridRequest = new GridRequest();    
}