﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KenJobs.Bo.BusinessObjects;

namespace KenJobs.Bl.Contracts
{
    interface ClientContract
    {
        IEnumerable<ClientBo> GetClients();
        ClientBo GetClient(int id);
        int PostClient(ClientBo clientBo);
        int UpdateClient(int id, ClientBo clientBo);
    }
}
