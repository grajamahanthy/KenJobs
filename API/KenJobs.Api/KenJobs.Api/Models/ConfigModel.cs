using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KenJobs.Api.Models
{
    public class ConfigModel
    {
    }

    public partial class StateModel
    {
        public int Id { get; set; }
        public int Country_Id { get; set; }
        public string Name { get; set; }
        public short Status { get; set; }
        public CountryModel Country { get; set; }
    }

    public class CountryModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public short Status { get; set; }
        public ICollection<StateModel> States { get; set; }
    }
}