const axios = require('axios');

const serverRequest = {
  postUser: (username) => {
    axios.post('/repos', {
      username
    })
    .then((response) => {
      console.log('(src/request.js): Successfully posted!', response);
    })
    .catch((err) => {
      console.error('(src/request.js) - Error made in posting username: ', err);
    });
  }
}

export default serverRequest;