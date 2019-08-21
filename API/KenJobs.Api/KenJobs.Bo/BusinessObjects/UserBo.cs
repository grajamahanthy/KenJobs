using System;
using System.Collections.Generic;

namespace KenJobs.Bo.BusinessObjects
{   
    public partial class UserBo: BusinessBase
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string ProfilePhoto { get; set; }
        public int Gender_Id { get; set; }
        public short Status { get; set; }
        public string AspNetUser_Id { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string ResetPasswordCode { get; set; }
        public string EmailActivationCode { get; set; }        
        public Nullable<short> IsIndividual { get; set; }
        public List<ProfileBo> Profile { get; set; }
        public List<ExperienceBo> Experience { get; set; }
        public List<EducationalQualificationBo> EducationalQualification { get; set; }

        public List<UserAttachmentBo> UserAttachment { get; set; }

        public virtual ICollection<AppliedJobBo> AppliedJobs { get; set; }
        public virtual AspNetUserBo AspNetUser { get; set; }
        public virtual ICollection<EducationalQualificationBo> EducationalQualifications { get; set; }
        public virtual ICollection<ExperienceBo> Experiences { get; set; }
        public virtual GenderBo Gender { get; set; }
        public virtual ICollection<ProfileBo> Profiles { get; set; }
        public virtual ICollection<User_Organization_ClientBo> User_Client { get; set; }
        public virtual ICollection<UserAttachmentBo> UserAttachments { get; set; }

    }
}