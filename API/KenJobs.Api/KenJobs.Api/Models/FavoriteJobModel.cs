using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KenJobs.Api.Models
{
    public class FavoriteJobModel
    {
        public int Id { get; set; }
        public int User_Id { get; set; }
        public int Job_Id { get; set; }
        public System.DateTime AppliedDate { get; set; }
    }
}