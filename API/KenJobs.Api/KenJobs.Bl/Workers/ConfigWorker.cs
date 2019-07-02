using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KenJobs.Bo.BusinessObjects;
using KenJobs.Bl.Contracts;
using KenJobs.Dal.Contracts;
using KenJobs.Dal.Workers;
using KenJobs.Dal;

namespace KenJobs.Bl.Workers
{
    public class ConfigWorker : ConfigContract
    {

        #region States
        public IEnumerable<StateBo> GetStates()
        {
            IGenericRepository<State> repository = new GenericRepository<State>();
            IEnumerable<State> statesList = repository.GetAll();

            List<StateBo> stateBoList = new List<StateBo>();
            foreach (State state in statesList)
            {
                StateBo stateBo = new StateBo();
                stateBo.Id = state.Id;
                stateBo.Name = state.Name;
                stateBo.Status = state.Status;
                stateBo.Country.Id = state.Country.Id;
                stateBo.Country.Name = state.Country.Name;
                stateBo.Country_Id = state.Country_Id;
                stateBoList.Add(stateBo);
            }

            return stateBoList;
        }
        public StateBo GetState(int id)
        {
            throw new NotImplementedException();
        }
        public int PostState(StateBo stateBo)
        {
            throw new NotImplementedException();
        }
        public int UpdateState(int id, StateBo stateBo)
        {
            throw new NotImplementedException();
        }
        #endregion States

        #region Country

        public IEnumerable<CountryBo> GetCountrys()
        {
            throw new NotImplementedException();
        }

        public CountryBo GetCountry(int id)
        {
            throw new NotImplementedException();
        }
        public int UpdateCountry(int id, CountryBo countryBo)
        {
            throw new NotImplementedException();
        }
        public int PostCountry(CountryBo countryBo)
        {
            throw new NotImplementedException();
        }

        #endregion Country

        #region Gender
        public IEnumerable<GenderBo> GetGender()
        {
            throw new NotImplementedException();
        }
        #endregion Gender
    }
}
