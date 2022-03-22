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

module.exports.save = save;
module.exports.Repo = Repo;