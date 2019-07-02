using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KenJobs.Bo.BusinessObjects;

namespace KenJobs.Bl.Contracts
{
    public interface ConfigContract
    {
        #region State

                IEnumerable<StateBo> GetStates();
                StateBo GetState(int id);
                int PostState(StateBo stateBo);
                int UpdateState(int id, StateBo stateBo);

        #endregion State

        #region State

                IEnumerable<CountryBo> GetCountrys();
                CountryBo GetCountry(int id);
                int PostCountry(CountryBo countryBo);
                int UpdateCountry(int id, CountryBo countryBo);

        #endregion State

        #region State

                IEnumerable<GenderBo> GetGender();

        #endregion State

    }
}
