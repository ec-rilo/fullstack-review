import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import serverRequest from './request.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
    this.search = this.search.bind(this);
    this.updateRepos = this.updateRepos.bind(this);
  }

  search (term) {
    console.log(`${term} was searched`);
    if (term !== '') {
      serverRequest.postUser(term);
    }
  }

  updateRepos() {
    serverRequest.getTop25((err, data) => {
      if (err) {
        console.error(err);
      } else {
        this.setState({
          repos: data
        });
      }
    });
  }

  componentDidMount() {
    this.updateRepos();
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search} handleRepos={this.updateRepos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));