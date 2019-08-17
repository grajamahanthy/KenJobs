import ProfileModel from "./Profile";
import ExperienceModel from "./Experience";
import EducationalQualificationModel from "./Education";

export default class UserProfileModel
{
    constructor(){
        this.Profile.push(new ProfileModel());
        this.Experience.push(new ExperienceModel());
        this.EducationalQualification.push(new EducationalQualificationModel());
    }

    Id: number = 0;
    Email: string = '';
    Password: string = '';
    ConfirmPassword: string = '';
    PhoneNumber: string = '';
    Title: string = '';
    FirstName: string = '';
    MiddleName: string = '';
    LastName: string = '';
    ProfilePhoto: string = '';
    Gender_Id: number = 0;
    Status: number = 0;
    AspNetUser_Id: string = '';
    Profile: ProfileModel[] = [];
    Experience: ExperienceModel[] = [];
    EducationalQualification: EducationalQualificationModel[] = [];
}