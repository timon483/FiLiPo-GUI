const base_url = 'http://localhost:7070/';



export const environment = {
  production: false,
  configURL : base_url + 'config',
  databaseURL: base_url + 'databases',
  secretURL: base_url + 'secret',
  eventURL: base_url + 'events/*/'
};
