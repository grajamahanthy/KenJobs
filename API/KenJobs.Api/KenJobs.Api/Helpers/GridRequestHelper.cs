using KenJobs.Api.Models;
using KenJobs.Bo.BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KenJobs.Api.Helpers
{
    public class GridRequestHelper
    {
        public GridRequestBo ToGridRequestBo(GridRequest gridrequest)
        {
            GridRequestBo gridRequestBo = new GridRequestBo();

            gridRequestBo.Pagination = this.ToPaginationBo(gridrequest.Pagination);
            gridRequestBo.Sorting = this.ToSortingBo(gridrequest.Sorting);
            gridRequestBo.TopSearchFilter = this.ToFilterBoListBo(gridrequest.TopSearchFilter);
            gridRequestBo.LeftSearchFilter = this.ToFilterBoListBo(gridrequest.LeftSearchFilter);

            return gridRequestBo;
        }
        public SortingBo ToSortingBo(Sorting sorting)
        {
            SortingBo sortingBo = new SortingBo();
            sortingBo.SortColumn = sorting.SortColumn;
            sortingBo.SortOrder = sorting.SortOrder;
            return sortingBo;
        }

        public PaginationBo ToPaginationBo(Pagination pagination)
        {
            PaginationBo paginationBo = new PaginationBo();
            paginationBo.CurrentPage = pagination.CurrentPage;
            paginationBo.PageSize = pagination.PageSize;
            paginationBo.TotalPages = pagination.TotalPages;
            paginationBo.TotalRecords = pagination.TotalRecords;
            return paginationBo;
        }


        public List<FilterBo> ToFilterBoListBo(List<Filter> FilterList)
        {
            List<FilterBo> FilterBoListBo = new List<FilterBo>();

            foreach (Filter filter in FilterList)
            {
                FilterBo filterBo = new FilterBo();
                filterBo.ColumnName = filter.ColumnName;
                filterBo.Value = filter.Value;
                FilterBoListBo.Add(filterBo);
            }
            return FilterBoListBo;
        }

    }
}