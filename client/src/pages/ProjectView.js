import React from 'react';

import { useLocation, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_PROJECT, QUERY_CURRENT_USER } from '../graphql/queries';
import Logo from '../assets/Monied-1 (1).png';
import {
  FaTwitter,
  FaFacebookSquare,
  FaEnvelope,
  FaRegUserCircle,
} from 'react-icons/fa';

// import { CurrentUserContextProvider } from '../context';

const ProjectView = (props) => {
  const location = useLocation();

  let getId = location.pathname.split('/');

  const getUser = useQuery(QUERY_CURRENT_USER);
  const userId = getUser.data?.getCurrentUser._id || {};

  const { loading, data } = useQuery(QUERY_PROJECT, {
    variables: { id: getId[2] },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const project = data?.getProjectById || {};

  const anonymous = data?.getProjectById.donations.commentBody

  const comments = data?.getProjectById.donations.map((donation) => {
    if (donation.commentBody != null && donation.commentBody != "") {
      return (
        <div>
          <div className="col-sm comment-name">
            <FaRegUserCircle className="user-icon"></FaRegUserCircle>
            {donation.donatorName}
          </div>
          <div className="col-sm comment-quote">"{donation.commentBody}"</div>
        </div>
      );
    }
  });

  const donationValues = data?.getProjectById.donations.map(
    (donation) => donation.donationAmount
  );

  const totalDonations = donationValues.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  //logic for progress bar %
  const goalPercent = Math.round((totalDonations / project.projectGoal) * 100);
  const barWidth = goalPercent + '%';

  return (
    <div className="container page-style">
      <div className="row justify-content-md-center ">
        <div className="col-md-auto d-flex">
          <div className="card project-view">
            <div className="new-project-form card-body ">
              <h1 className="card-title">{project.projectTitle}</h1>
              <div className="row">
                <div className="col-md-auto">
                  <img
                    src={Logo}
                    className="rounded float-left user-image"
                    alt="..."
                  ></img>
                </div>
                <div className="col-md-auto main-goal-div rounded">
                  <div className="row project-div">
                    <p className="goal-text">
                      ${totalDonations} raised of ${project.projectGoal} goal
                    </p>
                  </div>
                  <div className="" id="goal-div">
                    <div className="progress" id="progress-styling">
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
                  <div className="row project-div" id="donate-btn-div">
                    <Link
                      className="col"
                      to={`/donate`}
                      state={{
                        projectTitle: project.projectTitle,
                        projectId: project._id,
                        userId: userId,
                      }}
                    >
                      <button className="btn btn-light" id="donate-btn">
                        Donate
                      </button>
                    </Link>
                    <span className="col">
                      <button className="btn btn-light" id="share-btn">
                        Share
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              <hr id="border"></hr>
              <div>
                <p className="organizer-text">
                  {project.organizationName} is the organizer of this project.
                  <FaTwitter
                    className="social-icon"
                    size={35}
                    color={'#1DA1F2'}
                    onClick={() =>
                      (window.location.href = project.twitterAccount)
                    }
                  ></FaTwitter>
                  <FaFacebookSquare
                    className="social-icon"
                    size={35}
                    color={'#3B5998'}
                    onClick={() =>
                      (window.location.href = project.facebookAccount)
                    }
                  ></FaFacebookSquare>
                  <FaEnvelope
                    className="social-icon"
                    size={35}
                    color={'grey'}
                    onClick={() => window.open('mailto:project.email')}
                  ></FaEnvelope>
                </p>
              </div>
              <div>
                <hr id="border"></hr>
                <p className="description-text">{project.projectDescription}</p>
              </div>
              {/* {CurrentUserContextProvider.isLoggedIn && } */}

              <hr id="border"></hr>
              <div className="comment-header  ">Comments</div>
              <div className="note-styling ">
                Please donate to leave a comment.
              </div>
              <hr id="border"></hr>
              <div className="row">{comments}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProjectView;
