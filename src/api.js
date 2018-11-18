const API_ROOT = `${process.env.REACT_APP_CLOUD_URL}`;

/**
 * Calls cloud server with proper options and formats response
 * @param  {String}  path     Endpoint to hit (e.g. '/device')
 * @param  {String}  method   HTTP verb (e.g. 'GET')
 * @param  {Object}  body     JSON request body
 * @return {Promise(Object)}  Response containing 'status' and 'body'
 */
const apiFetch = (path, method = 'GET', body = null) => {

  const options = {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  // Add POST/PUT body, if given
  if (body) {
    options.body = JSON.stringify(body);
  }

  // Add token as header, if in storage
  const token = localStorage.getItem('token');
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  // Call the API
  return fetch(`${API_ROOT}${path}`, options).then(response => {
    return response.json().then(json => {
      
      // Wrap response json body with status code
      const status_json = {
        status: response.status,
        body: json
      };

      // Reject promise if bad response
      return response.ok ? status_json : Promise.reject(status_json);
    });
  });
};

//===================================================================
// Request Helpers
//

const requests = {
  del: path =>
    apiFetch(path, 'DELETE'),
  get: path =>
    apiFetch(path, 'GET'),
  put: (path, body) =>
    apiFetch(path, 'PUT', body),
  post: (path, body) =>
    apiFetch(path, 'POST', body)
};

const User = {
  current: () => 
    requests.get('/user'), 
  register: (username, email, password) =>
    requests.post('/user/register', { user: { username, email, password }}),
  login: (email, password) =>
    requests.post('/user/login', { user: { email, password }}),
  locations: (limit, startTime, endTime) => {
    let endpont = '/user/locations';
    if (limit || startTime || endTime) {
      // pagination requested
      let args = [];
      if (limit) args.push('limit=' + limit);
      if (startTime) args.push('start=' + startTime);
      if (endTime) args.push('end=' + endTime);
      endpont += '?' + args.join('&');
    }
    return requests.get(endpont);
  }
};

const Device = {
  register: () =>
    requests.post('/device/register'),
  all: () =>
    requests.get('/device'),
  get: (id) =>
    requests.get('/device/' + id),
  update: (id, changes) =>
    requests.put('/device/' + id, { device: changes }),
  delete: (id) =>
    requests.delete('/device/' + id),
  locations: (id, limit, startTime, endTime) => {
    let endpont = '/device/' + id + '/locations';
    if (limit || startTime || endTime) {
      // pagination requested
      let args = [];
      if (limit) args.push('limit=' + limit);
      if (startTime) args.push('start=' + new Date(startTime).toISOString());
      if (endTime) args.push('end=' + new Date(endTime).toISOString());
      endpont += '?' + args.join('&');
    }
    return requests.get(endpont);
  }
};

export default {
  User, Device
};
