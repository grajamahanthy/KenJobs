using System;
using System.Collections.Generic;

namespace KenJobs.Bo.BusinessObjects
{   
    public partial class AspNetUserBo
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public bool EmailConfirmed { get; set; }
        public string PasswordHash { get; set; }
        public string SecurityStamp { get; set; }
        public string PhoneNumber { get; set; }
        public bool PhoneNumberConfirmed { get; set; }
        public bool TwoFactorEnabled { get; set; }
        public Nullable<System.DateTime> LockoutEndDateUtc { get; set; }
        public bool LockoutEnabled { get; set; }
        public int AccessFailedCount { get; set; }
        public string UserName { get; set; }
    
        public virtual ICollection<AspNetUserClaimBo> AspNetUserClaims { get; set; }
        public virtual ICollection<AspNetUserLoginBo> AspNetUserLogins { get; set; }
        public virtual ICollection<AspNetRoleBo> AspNetRoles { get; set; }
        public virtual ICollection<UserBo> Users { get; set; }
    }
}
