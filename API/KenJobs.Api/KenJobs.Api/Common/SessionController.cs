using KenJobs.Api.Controllers;
using KenJobs.Bl.Contracts;
using KenJobs.Bl.Workers;
using KenJobs.Bo.BusinessObjects;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace KenJobs.Api.Common
{
    public class SessionController: ApiController
    {
        private IDataPersistance<KenJobsSession> _kenJobsSessionStorage;
        private KenJobsSessionContractor _kenJobsSessionService;

        public SessionController()
            : this(new SessionDataPersistance<KenJobsSession>(), new KenJobsSessionWorker())
        {

        }
        //THIS IS TO AVOID WIRING DI

        public SessionController(IDataPersistance<KenJobsSession> sessionStorage, KenJobsSessionContractor service)
        {
            _kenJobsSessionStorage = sessionStorage;
            _kenJobsSessionService = service;
        }

        [NonAction]
        public KenJobsSession GetKenJobsSession()
        {
            KenJobsSession s = _kenJobsSessionStorage.ObjectValue;
            if (s == null)
            {
                string AspnetUserId = User.Identity.GetUserId();
                s = _kenJobsSessionService.Get(AspnetUserId);
                _kenJobsSessionStorage.ObjectValue = s;
            }
            return s;
        }
    }
}