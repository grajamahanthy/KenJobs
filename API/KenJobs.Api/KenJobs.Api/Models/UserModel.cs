using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace KenJobs.Api.Models
{
    public class UserModel
    {
        public int Id { get; set; }
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        [Required]
        [DataType(DataType.PhoneNumber)]
        [Display(Name = "Phone Number")]
        public string PhoneNumber { get; set; }


        public string Title { get; set; }

        [Required]
        public string FirstName { get; set; }


        public string MiddleName { get; set; }

        [Required]
        public string LastName { get; set; }

        public string ProfilePhoto { get; set; }

        public int Gender_Id { get; set; }


        public short Status { get; set; }

        public string CreatedBy { get; set; }

        public Nullable<System.DateTime> CreateOn { get; set; }

        public string UpdatedBy { get; set; }

        public Nullable<System.DateTime> UpdatedOn { get; set; }

        public string AspNetUser_Id { get; set; }

        public string UserRoleId { get; set; }

      
    }
}