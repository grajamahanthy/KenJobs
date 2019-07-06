using KenJobs.Bl.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KenJobs.Bo.BusinessObjects;
using KenJobs.Dal.Contracts;
using KenJobs.Dal;
using KenJobs.Dal.Workers;

namespace KenJobs.Bl.Workers
{
    class UserClientWorker : UserClientContract
    {
        public User_Organization_ClientBo GetUserClient(int id)
        {
            IGenericRepository<User_Organization_Client> repository = new GenericRepository<User_Organization_Client>();
            object objid = id;
            User_Organization_Client userClient = repository.GetById(objid);
            User_Organization_ClientBo userclientBo = new User_Organization_ClientBo();
            userclientBo.Id = userClient.Id;
            userclientBo.User_Id = userClient.User_Id;
            userclientBo.Client_Id = userClient.Client_Id;

            return userclientBo;
        }

        public IEnumerable<User_Organization_ClientBo> GetUserClients()
        {
            IGenericRepository<User_Organization_Client> repository = new GenericRepository<User_Organization_Client>();
            IEnumerable<User_Organization_Client> userClientList = repository.GetAll();
            List<User_Organization_ClientBo> userClientBoList = new List<User_Organization_ClientBo>();

            foreach (User_Organization_Client userClient in userClientList)
            {
                User_Organization_ClientBo userClientBo = new User_Organization_ClientBo();
                userClientBo.Id = userClient.Id;
                userClientBo.User_Id = userClient.User_Id;
                userClientBo.Client_Id = userClient.Client_Id;

                userClientBoList.Add(userClientBo);
            }
            return userClientBoList;

        }

        public int PostUserClient(User_Organization_ClientBo userClientBo)
        {
            IGenericRepository<User_Organization_Client> repository = new GenericRepository<User_Organization_Client>();

            User_Organization_Client userClient = new User_Organization_Client();
            userClient.Id = userClientBo.Id;
            userClient.User_Id = userClientBo.User_Id;
            userClient.Client_Id = userClientBo.Client_Id;
            repository.Insert(userClient);
            repository.Save();

            return 1;
        }

        public int UpdateUserClient(int id, User_Organization_ClientBo userClientBo)
        {
            IGenericRepository<User_Organization_Client> repository = new GenericRepository<User_Organization_Client>();

            User_Organization_Client userClient = new User_Organization_Client();
            userClient.Id = userClientBo.Id;
            userClient.User_Id = userClientBo.User_Id;
            userClient.Client_Id = userClientBo.Client_Id;
            repository.Update(userClient);
            repository.Save();

            return 1;
        }
    }
}
