import React, { Fragment, useEffect, useContext } from 'react';
import Circular from '../layout/Circular';
import Repos from '../repos/Repos';
import { Link } from 'react-router-dom';
import GithubContext from '../../context/github/githubContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faTimes,
  faUserFriends,
  faStar,
  faBook,
  faCode,
} from '@fortawesome/free-solid-svg-icons';

const User = ({ match }) => {
  const githubContext = useContext(GithubContext);
  const { getUser, loading, user, repos, getUserRepos } = githubContext;

  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, []);

  const {
    name,
    company,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user;

  if (loading) return <Circular />;

  return (
    <Fragment>
      <Link to='/' className='btn btn-primary'>
        Back to Search
      </Link>
      Hireable: {''}
      {hireable ? (
        <FontAwesomeIcon icon={faCheck} className='text-success' />
      ) : (
        <FontAwesomeIcon icon={faTimes} className='text-danger' />
      )}
      <div className='py-1'>
        <div className='card grid-2'>
          <div className='all-center'>
            <img src={avatar_url} className='user-imgLG round-img' alt='' />
            <h1 className='text-highlight'>{name}</h1>
            <p>
              <span className='text-secondary'>Location: </span>
              {location}
            </p>
          </div>
          <div>
            {bio && (
              <Fragment>
                <h3>Bio</h3>
                <p>{bio}</p>
              </Fragment>
            )}
            <a href={html_url} className='btn btn-dark my-1'>
              Visit Official Github Profile
            </a>
            <ul>
              <li>
                {login && (
                  <Fragment className='text-bold'>
                    <span className='text-bold text-secondary'>
                      User Name:{'  '}
                    </span>
                    <span>{login}</span>
                  </Fragment>
                )}
              </li>
              <li>
                {company && (
                  <Fragment className='text-bold'>
                    <span className='text-bold text-secondary'>
                      Company:{'  '}
                    </span>
                    <span>{company}</span>
                  </Fragment>
                )}
              </li>
              <li>
                {blog && (
                  <Fragment className='text-bold'>
                    <span className='text-bold text-secondary'>
                      Website:{'  '}
                    </span>
                    <span>{blog}</span>
                  </Fragment>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className='py-1'>
          <div className='card text-center'>
            <div className='badge badge-dark'>
              Followers: {followers} <FontAwesomeIcon icon={faUserFriends} />
            </div>
            <div className='badge badge-dark'>
              Following: {following} <FontAwesomeIcon icon={faStar} />
            </div>
            <div className='badge badge-dark'>
              Public Repos: {public_repos} <FontAwesomeIcon icon={faBook} />
            </div>
            <div className='badge badge-dark'>
              Public Gists: {public_gists} <FontAwesomeIcon icon={faCode} />
            </div>
          </div>
        </div>
        Last Public Repositories
        <Repos repos={repos} />
      </div>
    </Fragment>
  );
};

export default User;
