import AttachmentTypeModel from "./AttachmentType";
import AttachmentModel from "./Attachment";
import UserProfileModel from "./User";

export default class UserAttachmentModel {
Id:number=0;
  User_Id :number=0;
  Attachment_Id:number=0;
  AttachmentType_Id :number=0;
  Name :string="";
  Attachment:AttachmentModel=new AttachmentModel();
  AttachmentType:AttachmentTypeModel=new AttachmentTypeModel();
  User:UserProfileModel=new UserProfileModel();
}