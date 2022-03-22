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
      serverRequest.postUser(term, () => {
        this.updateRepos(term);
      });
    }
  }

  updateRepos(title) {
    console.log('TITLE: ', title);

    serverRequest.getTop25(title, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log('DATA: ', data);
        this.setState({
          repos: data
        });
      }
    });
  }

  componentDidMount() {
    this.updateRepos('ec-rilo');
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));