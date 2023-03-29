//This will be for multi project view

import React from 'react';
import { useParams, Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_CURRENT_USER } from '../graphql/queries';
import { MdOutlineComment } from 'react-icons/md';
import Logo from '../assets/Monied-1 (1).png';
// import { CurrentUserContextProvider } from '../context';

const MyProjects = (props) => {
  const { id: projectId } = useParams();

  const { loading, data } = useQuery(QUERY_CURRENT_USER);

  if (loading) {
    return <div>Loading...</div>;
  }

  const user = data?.getCurrentUser || {};

  const projects = data?.getCurrentUser.projects || {}; //may need to change to array

  const MAX_LENGTH = 60;


  return (
    <div className="">
      <h1>My Projects</h1>
      <p>
        <Link
          to="/NewProject"
          style={{ color: '#547844', fontSize: 'larger', fontWeight: 'bold' }}
        >
          ← Create a New Project
        </Link>
      </p>
      <div className="row justify-content-md-center">
        {projects &&
          projects.map((project) => {
            //Truncate description length
            let trimmedDescription = project.projectDescription;

            if (trimmedDescription.length > MAX_LENGTH) {
              trimmedDescription =
                project.projectDescription.slice(0, MAX_LENGTH) + '...';
            }

            const comments = project.donations.filter(
              (donation) => donation.commentBody != null && donation.commentBody != ""
            );

            const donationValues = project.donations.map(
              (donation) => donation.donationAmount
            );
            console.log(donationValues);

            //const comments = projects.map((project) => project.donations?.commentBody);

            const totalDonations = donationValues.reduce(
              (accumulator, currentValue) => {
                return accumulator + currentValue;
              },
              0
            );

            //logic for progress bar %
            const goalPercent = Math.round((totalDonations / project.projectGoal) * 100);
            const barWidth = goalPercent + '%';

            return (
              <div className="col-md-auto d-flex" key={project._id}>
                <div className="project-card card">
                  <div className="new-project-form card-body">
                    <div className="container">
                      <div className="row" id="card-icon">
                        <div className="col-sm">
                          {/* Add link to ProjectsByOrg, need to take link that is clicked and prop into projectsbyorg*/}
                          <Link
                            className="org-name org-name-style hover"
                            to={`/ProjectsByOrg/${project.organizationName}`}
                          >
                            {project.organizationName}
                          </Link>
                        </div>
                        <div className="col-sm">
                          <MdOutlineComment size={35}></MdOutlineComment>
                          <span>{comments.length}</span>
                        </div>
                      </div>
                    </div>
                    <div className="row .card-row">
                      <div className="col-md">
                        <img
                          src={Logo}
                          className="rounded float-left user-image-card"
                          alt="..."
                        ></img>
                      </div>
                      <div className="col-md">
                        <Link
                          className="project-link"
                          to={`/project/${project._id}`}
                        >
                          <h3 className="card-title">{project.projectTitle}</h3>
                        </Link>
                        <p className="card-text">{trimmedDescription}</p>
                        <p className="card-text goal-card-text">
                          ${totalDonations} raised of ${project.projectGoal}{' '}
                          goal
                        </p>
                        <div className="progress">
                          <div
                            className="progress-bar bg-custom"
                            role="progressbar"
                            style={{ width: barWidth }}
                            aria-valuenow={goalPercent}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            {goalPercent}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MyProjects;
