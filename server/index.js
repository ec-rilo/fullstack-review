const db = require('../database/index');
const gh = require('../helpers/github.js');
const express = require('express');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));  // what's this for?
app.use(express.json());

app.post('/repos', function (req, res) {
  gh.getReposByUsername(req.body.username, (response) => {
    response.forEach((repo) => {
      db.save(repo);
    });
    res.send('Successfully Posted!');
  });
});

app.get('/repos', function (req, res) {
  console.log(req.query);
  db.getTop25(req.query.username, (top25) => {
    res.send(top25);
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

