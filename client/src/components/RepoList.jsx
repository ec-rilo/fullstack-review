import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <ul>
      {props.repos.map((repo, index) => {
        return (
          <li key={index}>
            <div>
              <p>INDEX: {index + 1}</p>
              <p>USER: {repo.user}</p>
              <p>REPO: <a href={repo.html_url} target='_blank'>{repo.repo_name}</a></p>
            </div>
          </li>
        );
      })}
    </ul>
  </div>
)

export default RepoList;