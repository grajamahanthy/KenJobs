using KenJobs.Bl.Contracts;
using KenJobs.Bo.BusinessObjects;
using KenJobs.Dal;
using KenJobs.Dal.Contracts;
using KenJobs.Dal.Workers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KenJobs.Bl.Workers
{
    public class UserAttachmentWorker : UserAttachmentContract
    {
        public int DeleteUserAttachment(int id)
        {
            throw new NotImplementedException();
        }

        public UserAttachmentBo GetUserAttachment(int User_id, int attachmentTypeId)
        {
            ICustomRepository<UserAttachmentBo> repository = new CustomRepository<UserAttachmentBo>();
            UserAttachment userAttachment = repository.GetUserAttachment(User_id, attachmentTypeId);

            UserAttachmentBo userAttachmentBo = new UserAttachmentBo();
            if (userAttachment != null)
            {
                userAttachmentBo.Id = userAttachment.Id;
                userAttachmentBo.User_Id = userAttachment.User_Id;
                userAttachmentBo.Attachment_Id = userAttachment.Attachment_Id;
                userAttachmentBo.AttachmentType_Id = userAttachment.AttachmentType_Id;
                userAttachmentBo.Name = userAttachment.Name;
                userAttachmentBo.Attachment = new AttachmentBo() { Id = userAttachment.Attachment_Id, Base64Text = userAttachment.Attachment.Base64Text, FileExtension = userAttachment.Attachment.FileExtension };

                return userAttachmentBo;
            }
            else
            {
                return new UserAttachmentBo();
            }
        }

        public UserAttachmentBo GetUserAttachmentById(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<UserAttachmentBo> GetUserAttachmentByUserId(int User_id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<UserAttachmentBo> GetUserAttachments()
        {
            throw new NotImplementedException();
        }

        public int PostUserAttachment(UserAttachmentBo userAttachmentBo)
        {
            IGenericRepository<UserAttachment> repository = new GenericRepository<UserAttachment>();
            UserAttachment userAttachment = new UserAttachment();

            userAttachment.Id = userAttachmentBo.Id;
            userAttachment.User_Id = userAttachmentBo.User_Id;
            userAttachment.Attachment_Id = userAttachmentBo.Attachment_Id;
            userAttachment.AttachmentType_Id = userAttachmentBo.AttachmentType_Id;
            userAttachment.Name = userAttachmentBo.Name;
            userAttachment.CreatedBy = "admin";
            userAttachment.CreatedOn = DateTime.UtcNow;
            userAttachment.UpdatedBy = "admin";
            userAttachment.UpdatedOn = DateTime.UtcNow;
          
            repository.Insert(userAttachment);
            repository.Save();
            return 1;
        }

        public int UpdateUserAttachment(int id, UserAttachmentBo userAttachmentBo)
        {
            IGenericRepository<UserAttachment> repository = new GenericRepository<UserAttachment>();
            UserAttachment userAttachment = repository.GetById(id);

           // userAttachment.Id = userAttachmentBo.Id;
            userAttachment.User_Id = userAttachmentBo.User_Id;
            userAttachment.Attachment_Id = userAttachmentBo.Attachment_Id;
            userAttachment.AttachmentType_Id = userAttachmentBo.AttachmentType_Id;
            userAttachment.Name = userAttachmentBo.Name;
           
           
            repository.Update(userAttachment);
            repository.Save();

            return 1;
        }
    }
}
