//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace KenJobs.Dal
{
    using System;
    using System.Collections.Generic;
    
    public partial class AppliedJob
    {
        public int Id { get; set; }
        public int User_Id { get; set; }
        public int Client_Id { get; set; }
        public int Job_Id { get; set; }
        public System.DateTime AppliedDate { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTime CreateOn { get; set; }
        public string UpdatedBy { get; set; }
        public System.DateTime UpdatedOn { get; set; }
    
        public virtual Client Client { get; set; }
        public virtual Job Job { get; set; }
        public virtual User User { get; set; }
    }
}