//this will be for single project view

import React from 'react';

import { useLocation, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_PROJECT } from '../graphql/queries';
import Logo from "../assets/Monied-1 (1).png";
import {FaTwitter, FaFacebookSquare, FaEnvelope} from 'react-icons/fa';

// import { CurrentUserContextProvider } from '../context';

const ProjectView = (props) => {
  const location = useLocation();

  let getId = location.pathname.split('/');

  const { loading, data } = useQuery(QUERY_PROJECT, {
    variables: { id: getId[2] },
  });

  console.log(data);
  // const user = data?.getCurrentUser || {};

  const project = data?.getProjectById || {};
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container'>
      <div className="row justify-content-md-center ">
        <div className="col-md-auto d-flex">
          <div className="card project-view">
            <div className="new-project-form card-body ">
              <h1 className="card-title">{project.projectTitle}</h1>

              <div className="row">
                <div className="col">
                  <img src={Logo} class="rounded float-left user-image" alt="..."></img>
                </div>
                <div class="col">
                  <div className='row project-div'>
                  <p className="card-text">Goal: {project.projectGoal}</p>
                  </div>
                  <div className='row project-div'>
                  <div className="progress">
                  <div
                    className="progress-bar bg-custom w-50"
                    role="progressbar"
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    50%
                  </div>
                </div>
                  </div>
                  <div className='row project-div'>
                  <Link to={`/donate`} state={{ projectTitle: project.projectTitle, projectId: project._id }}>
                <button className="btn btn-light donate-btn">Donate</button>
              </Link>
                  </div>

                </div>

              </div>

              <p className="card-text">{project.organizationName} is the origanizer of this project. 
              <FaTwitter size={35}onClick={() => window.location.href=project.twitterAccount}></FaTwitter>

              <FaFacebookSquare size={35}onClick={() => window.location.href=project.facebookAccount}></FaFacebookSquare>
              
              <FaEnvelope size={35}onClick={() => window.open('mailto:project.email')}></FaEnvelope></p>
             
              <p className="card-text">
                Description: {project.projectDescription}
              </p>
          
              
              {/* {CurrentUserContextProvider.isLoggedIn && } */}
            </div>
            <div>Comments
            </div>
            <div className="row">
              <span className='col-sm'>Name</span> <span className='col-sm'>Comment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProjectView;
