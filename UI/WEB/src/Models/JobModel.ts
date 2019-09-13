import JobCategoryModel from "./JobCategoryModel";
import JobTypeModel from "./JobTypeModel";
import { any } from "prop-types";

export default class JobModel {

    Id: number = 0;
    Client_Id?: number = 0;
    JobTitle: string = "";
    Description: string = "";
    NoOfVacancies?: number = 0;
    Qualification: string = "";
    State: string = "";
    City: string = "";
    PostDate: Date = new Date();
    Status: number = 0;
    PostingStatus: number = 0;
    JobType_Id: number = 0;
    Category_id: number = 0;
    MinSalary: number = 0;
    MinExperience: number = 0;
    Skills: string = "";
    MaxSalary: number = 0;
    MaxExperience: number = 0;
    User_Id: number = 0;
    Currency: number = 0;
    ClientName: string = "";
    AddressLine: string = "";
    Country: string = "";
    JobCategory: JobCategoryModel = new JobCategoryModel();
    JobType: JobTypeModel = new JobTypeModel();

    // JobFilterFileds(): FilterListModel[] {

    //     let ListModel: FilterListModel[] = [];
    //     var listItems = [
    //         { "textbox": ["JobTitle", "Skills", "ClientName"] },
    //         { "dropdown": ["Country", "State", "City", "Experience", "ExpectedSalary"] },
    //     ]
    //     var listOfTextProperties = ["JobTitle", "Skills", "ClientName"];
    //     var listOfSelectProperties = ["Country", "State", "City", "Experience", "ExpectedSalary"];

    //     listItems.map((item:any,key:any)=>{
    //         // listItems.item.map((item1:any,key1:any)=>{

    //         // })


    //     })
    //     for (var item in listOfTextProperties) {
    //         let Model: FilterListModel = new FilterListModel();

    //         Model.Title = item;
    //         Model.Type = "textbox";
    //         Model.value = "";
    //         ListModel.push(Model);
    //     }


    //     return ListModel;
    // }

}