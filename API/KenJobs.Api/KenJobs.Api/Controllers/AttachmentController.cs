using KenJobs.Api.Models;
using KenJobs.Bl.Contracts;
using KenJobs.Bl.Workers;
using KenJobs.Bo.BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace KenJobs.Api.Controllers
{
    public class AttachmentController : BaseController
    {
        // GET: api/Attachment
        [Authorize]
        public IHttpActionResult Get(int attachmentTypeId)
        {
            UserAttachmentContract UserAttachment = new UserAttachmentWorker();
            KenJobsSession s = GetKenJobsSession();
            UserAttachmentBo userattachmentbo = UserAttachment.GetUserAttachment(s.User.Id, attachmentTypeId);
            UserAttachmentModel userAttachmentModel = new UserAttachmentModel();
            userAttachmentModel.Id = userattachmentbo.Id;
            userAttachmentModel.User_Id = userattachmentbo.User_Id;
            userAttachmentModel.Attachment_Id = userattachmentbo.Attachment_Id;
            userAttachmentModel.AttachmentType_Id = userattachmentbo.AttachmentType_Id;
            userAttachmentModel.Name = userattachmentbo.Name;

            if (userattachmentbo.Attachment != null)
            {
                userAttachmentModel.Attachment = new AttachmentModel()
                {
                    Id = userattachmentbo.Attachment.Id,
                    Base64Text = userattachmentbo.Attachment.Base64Text,
                    FileExtension = userattachmentbo.Attachment.FileExtension
                };
            }
            else
            {
                userAttachmentModel.Attachment = new AttachmentModel();
            }
            return Ok(userAttachmentModel);
        }



        // GET: api/Attachment/5
        [Authorize]
        [HttpGet]
        [Route("api/Attachment/GetAttachmentByUserId")]
        public IHttpActionResult GetAttachmentByUserId(int User_Id,int attachmentTypeId)
        {
            UserAttachmentContract UserAttachment = new UserAttachmentWorker();
            KenJobsSession s = GetKenJobsSession();
            UserAttachmentBo userattachmentbo = UserAttachment.GetUserAttachment(User_Id, attachmentTypeId);
            UserAttachmentModel userAttachmentModel = new UserAttachmentModel();
            userAttachmentModel.Id = userattachmentbo.Id;
            userAttachmentModel.User_Id = userattachmentbo.User_Id;
            userAttachmentModel.Attachment_Id = userattachmentbo.Attachment_Id;
            userAttachmentModel.AttachmentType_Id = userattachmentbo.AttachmentType_Id;
            userAttachmentModel.Name = userattachmentbo.Name;

            if (userattachmentbo.Attachment != null)
            {
                userAttachmentModel.Attachment = new AttachmentModel()
                {
                    Id = userattachmentbo.Attachment.Id,
                    Base64Text = userattachmentbo.Attachment.Base64Text,
                    FileExtension = userattachmentbo.Attachment.FileExtension
                };
            }
            else
            {
                userAttachmentModel.Attachment = new AttachmentModel();
            }

            return Ok(userAttachmentModel);
        }

        // POST: api/Attachment
        [Authorize]
        [HttpPost]
        [Route("api/Attachment/PostAttachment")]
        public IHttpActionResult PostAttachment(UserAttachmentModel userAttachmentModel)
        {
            int attachment_id=0;
            KenJobsSession s = GetKenJobsSession();
            AttachmentBo attachmentBo = new AttachmentBo();
            AttachmentModel attachmentModel = userAttachmentModel.Attachment;
            attachmentBo.Id = attachmentModel.Id;
            attachmentBo.FileExtension = attachmentModel.FileExtension;
            attachmentBo.Base64Text = attachmentModel.Base64Text;

            AttachmentContract attachmentcontract = new AttachmentWorker();

            if (userAttachmentModel.Attachment.Id != 0)
            {
                 attachmentcontract.UpdateAttachmentBo(attachmentBo.Id,attachmentBo);

            }
            else
            {
                 attachment_id = attachmentcontract.PostAttachmentBo(attachmentBo);

            }


            UserAttachmentBo userattachmentBo = new UserAttachmentBo();

            userattachmentBo.Id = userAttachmentModel.Id;
            userattachmentBo.User_Id = s.User.Id;
            userattachmentBo.Attachment_Id = (userAttachmentModel.Attachment.Id==0)? attachment_id: userAttachmentModel.Attachment.Id;
            userattachmentBo.AttachmentType_Id = userAttachmentModel.AttachmentType_Id;
            userattachmentBo.Name = userAttachmentModel.Name;
                UserAttachmentContract UserAttachment = new UserAttachmentWorker();

            if (userattachmentBo.Id != 0)
            {
                UserAttachment.UpdateUserAttachment(userattachmentBo.Id, userattachmentBo);
            }
            else
            {
                UserAttachment.PostUserAttachment(userattachmentBo);
            }
            return Ok(1);
        }

        // PUT: api/Attachment/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Attachment/5
        public void Delete(int id)
        {
        }
    }
}
