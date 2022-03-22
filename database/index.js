const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let repoSchema = mongoose.Schema({
  id: Number,
  repo_name: String,
  forks_count: Number,
  user_id: Number,
  user: String
});

let Repo = mongoose.model('Repo', repoSchema);

// only saves repo to db if it is not in there.
let save = (repo) => {
  repo = new Repo({
    id: repo.id,
    repo_name: repo.name,
    forks_count: repo.forks_count,
    user_id: repo.user_id,
    user: repo.user
  });

  Promise.resolve(Repo.find({ id: `${repo.id}`}))
  .then((response) => {
    if (response.length === 0) {
      Promise.resolve(repo.save())
      .catch((err) => {
        console.error(err);
      });
    }
  })
  .catch((err) => {
    console.error(err);
  });
}

let getTop25 = (callback) => {
  Promise.resolve(Repo.find())
  .then((response) => {
    const top25 = [ response[0] ];

    for (let i = 0; i < response.length; i++) {

      for (let j = 0; j < top25.length; j++) {
        if (top25[j].forks_count <= response[i].forks_count && top25.length === 25) {
          top25.shift();
          top25.splice(j, 0, response[i]);
          break;
        } else if (top25[j].forks_count <= response[i].forks_count) {
          top25.splice(j, 0, response[i]);
          break;
        } else if (top25.length < 25 && j === response.length - 1) {
          top25.push(reponse[i]);
          break;
        }
      }
    }

    callback(top25);
  })
  .catch((err) => {
    console.error(err);
  })
}

module.exports.save = save;
module.exports.Repo = Repo;
module.exports.getTop25 = getTop25;