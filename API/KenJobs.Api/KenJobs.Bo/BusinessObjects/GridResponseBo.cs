﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KenJobs.Bo.BusinessObjects
{
   public class GridResponseBo<T>
    {
        public List<T> Rows = null;
        public int TotalRecords { get; set; }
    }
}