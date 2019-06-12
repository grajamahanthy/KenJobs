using KenJobs.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using KenJobs.Bo;
using KenJobs.Bl.Contracts;
using KenJobs.Bl.Workers;
using KenJobs.Bo.BusinessObjects;

namespace KenJobs.Api.Controllers
{
    public class ConfigController : ApiController
    {
        // GET api/<controller>
        [HttpGet]
        public IEnumerable<StateModel> GetStates()
        {
            ConfigContract configWrkr = new ConfigWorker();
            IEnumerable<StateBo> statesBoList = configWrkr.GetStates();

            List<StateModel> stateModelList = new List<StateModel>();
            foreach( StateBo stateBo in statesBoList)
            {
                StateModel state = new StateModel();
                state.Id = stateBo.Id;
                state.Name = stateBo.Name;
                state.Status = stateBo.Status;
                state.Country.Id = stateBo.Country.Id;
                state.Country.Name = stateBo.Country.Name;
                state.Country_Id = stateBo.Country_Id;
                stateModelList.Add(state);
            }

            return stateModelList;
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}