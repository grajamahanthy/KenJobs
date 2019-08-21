using KenJobs.Bo.BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KenJobs.Bl.Contracts
{
  public  interface UserAttachmentContract
    {
        IEnumerable<UserAttachmentBo> GetUserAttachments();
        UserAttachmentBo GetUserAttachment(int User_id, int attachmentTypeId);
        IEnumerable<UserAttachmentBo> GetUserAttachmentByUserId(int User_id);
         UserAttachmentBo GetUserAttachmentById(int id);
        int PostUserAttachment(UserAttachmentBo userAttachmentBo);
        int UpdateUserAttachment(int id,UserAttachmentBo userAttachmentBo);
        int DeleteUserAttachment(int id);
    }
}
