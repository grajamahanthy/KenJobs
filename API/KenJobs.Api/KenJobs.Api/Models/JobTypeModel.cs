using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KenJobs.Api.Models
{
    public class JobTypeModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public short Status { get; set; }
    }
}