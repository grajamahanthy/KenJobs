﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KenJobs.Api.Common
{
    public interface IDataPersistance<T>
    {
        T ObjectValue { get; set; }
    }

    public class SessionDataPersistance<T> : IDataPersistance<T>
      where T : class
    {
        private static string key = typeof(T).FullName.ToString();

        public T ObjectValue
        {
            get
            {
                return HttpContext.Current.Session[key] as T;
            }
            set
            {
                HttpContext.Current.Session[key] = value;
            }
        }
    }
}