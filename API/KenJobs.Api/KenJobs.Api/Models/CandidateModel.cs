using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KenJobs.Api.Models
{
    public class CandidateModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string ProfilePhoto { get; set; }
        public int Gender_Id { get; set; }
        public short Status { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public System.DateTime UpdatedOn { get; set; }
        public string AspNetUser_Id { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public Nullable<short> IsIndividual { get; set; }
        public string EmailActivationCode { get; set; }
        public string ResetPasswordCode { get; set; }
        public int Id1 { get; set; }
        public int User_Id { get; set; }
        public string Resume { get; set; }
        public string skills { get; set; }
        public short TotalExperiance { get; set; }
        public string HeighestQualification { get; set; }
        public string PreferredLocation { get; set; }
        public int CurrentSalary { get; set; }
        public int ExpectedSalary { get; set; }
        public string Languages { get; set; }
        public string CreatedBy1 { get; set; }
        public System.DateTime CreatedOn1 { get; set; }
        public string UpdatedBy1 { get; set; }
        public System.DateTime UpdatedOn1 { get; set; }
    }
}