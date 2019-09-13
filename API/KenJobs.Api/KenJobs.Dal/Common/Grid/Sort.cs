using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace KenJobs.Dal.Common.Grid
{
    public class Sort<T>
    {
        public Func<IEnumerable<T>, IOrderedEnumerable<T>> sortFunc = null;
        public Sort(string SortColumnName, bool IsAssendingOrder)
        {
            Type personType = typeof(T);
            PropertyInfo pinfo = personType.GetProperty(SortColumnName);
            ParameterExpression paramExpr = Expression.Parameter(typeof(T), "instance");
            MemberExpression memberExpr = Expression.Property(paramExpr, pinfo);
            Func<T, object> orderByFunc = null;
            if (memberExpr.Type.Name == "Double")
            {
                Expression conversion = Expression.Convert(memberExpr, typeof(object));
                orderByFunc = Expression.Lambda<Func<T, object>>(conversion, paramExpr).Compile();
            }
            else
            {
                orderByFunc = Expression.Lambda<Func<T, object>>(memberExpr, paramExpr).Compile();
            }
            

                        

            if (IsAssendingOrder)
                this.sortFunc = (source => source.OrderBy(orderByFunc));
            else
                this.sortFunc = (source => source.OrderByDescending(orderByFunc));
            
        }      
    }
}
