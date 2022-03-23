const axios = require('axios');

const formatRepo = (repo) => {

  return {
    id: repo.id,
    name: repo.name,
    forks_count: repo.forks,
    url: repo.html_url,
    user_id: repo.owner.id,
    user: repo.owner.login
  }
}

let getReposByUsername = (username, callback) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  const query = `https://api.github.com/users/${username}/repos`;

  axios.get(query)
  .then((data) => {
    const repoArr = [];
    data.data.forEach((repo) => {
      repoArr.push(formatRepo(repo));
    });
    callback(repoArr);
  })
  .catch((err) => {
    console.error(`(database/helpers/githubApiHelper.js): GET failed - ${err}`);
  });

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: 'FILL ME IN',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${process.env.TOKEN}`
    }
  };
}

module.exports.getReposByUsername = getReposByUsername;