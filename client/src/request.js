const axios = require('axios');

const serverRequest = {
  postUser: (username, callback) => {
    axios.post('/repos', {
      username
    })
    .then((response) => {
      callback(null);
    })
    .catch((err) => {
      callback(err);
    });
  },

  getTop25: (title, callback) => {
    axios.get('/repos', {
      params: {
        username: title
      }
    })
    .then((response) => {
      callback(null, response.data);
    })
    .catch((err) => {
      callback(err);
    });
  }
}

export default serverRequest;