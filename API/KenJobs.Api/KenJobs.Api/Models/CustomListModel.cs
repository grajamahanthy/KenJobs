using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KenJobs.Api.Models
{
    public class CustomListModel<T>
	{
        public List<T> ListItems = null;
        public PaginationModel paginationModel { get; set; }
	}
}