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
    class ClientWorker : ClientContract
    {
        public ClientBo GetClient(int id)
        {
            IGenericRepository<Client> repository = new GenericRepository<Client>();
            object objid = id;
            Client client = repository.GetById(objid);
            ClientBo clientBo = new ClientBo();

            clientBo.Id = client.Id;
            clientBo.Name = client.Name;
            clientBo.Phone = client.Phone;
            clientBo.Email = client.Email;
            clientBo.ContactPerson = client.ContactPerson;
            clientBo.Website = client.Website;
            clientBo.Status = client.Status;
            clientBo.Address = client.Address;
            clientBo.Logo = client.Logo;
            return clientBo;
        }

        public IEnumerable<ClientBo> GetClients()
        {
            IGenericRepository<Client> repository = new GenericRepository<Client>();
            IEnumerable<Client> clientList = repository.GetAll();
            List<ClientBo> clientBoList = new List<ClientBo>();

            foreach (Client client in clientList)
            {
                ClientBo clientBo = new ClientBo();
                clientBo.Id = client.Id;
                clientBo.Name = client.Name;
                clientBo.Phone = client.Phone;
                clientBo.Email = client.Email;
                clientBo.ContactPerson = client.ContactPerson;
                clientBo.Website = client.Website;
                clientBo.Status = client.Status;
                clientBo.Address = client.Address;
                clientBo.Logo = client.Logo;
                clientBoList.Add(clientBo);
            }

            return clientBoList;
        }

        public int PostClient(ClientBo clientBo)
        {
            IGenericRepository<Client> repository = new GenericRepository<Client>();
            Client client = new Client();

            client.Id = clientBo.Id;
            client.Name = clientBo.Name;
            client.Phone = clientBo.Phone;
            client.Email = clientBo.Email;
            client.ContactPerson = clientBo.ContactPerson;
            client.Website = clientBo.Website;
            client.Status = clientBo.Status;
            client.Address = clientBo.Address;
            client.Logo = clientBo.Logo;
            repository.Insert(client);
            repository.Save();
            return 1;
        }

        public int UpdateClient(int id, ClientBo clientBo)
        {
            IGenericRepository<Client> repository = new GenericRepository<Client>();
            Client client = new Client();

            client.Id = clientBo.Id;
            client.Name = clientBo.Name;
            client.Phone = clientBo.Phone;
            client.Email = clientBo.Email;
            client.ContactPerson = clientBo.ContactPerson;
            client.Website = clientBo.Website;
            client.Status = clientBo.Status;
            client.Address = clientBo.Address;
            client.Logo = clientBo.Logo;
            repository.Update(client);
            repository.Save();
            return 1;
        }
    }
}
