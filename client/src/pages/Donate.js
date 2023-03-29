//Donate to a project
//<card>
// Project Title
//Donation amount - Input
//Anonymous button
//leave a comment - Input
//submit button
//</card>

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import { ADD_DONATION } from '../graphql/mutations';
import {
  QUERY_CURRENT_USER,
  QUERY_PROJECT,
  QUERY_PROJECT_CATEGORY,
} from '../graphql/queries';

const Donation = (props) => {
  const [formState, setFormState] = useState({
    donatorName: '',
    donationAmount: '',
    isAnonymous: false,
    commentBody: '',
  });

  const navigate = useNavigate();

  const location = useLocation();
  const { projectTitle, projectId, userId } = location.state || {};

  const [addDonation, { error }] = useMutation(ADD_DONATION);

  const handleIsAnonymousChanged = () => {
    let newIsAnonymousValue = !formState.isAnonymous;
    
    if (newIsAnonymousValue === true) {
      setFormState({
        ...formState,
        isAnonymous: newIsAnonymousValue,
        donatorName: "Anonymous"
      });
    } else {
      setFormState({
        ...formState,
        isAnonymous: newIsAnonymousValue,
        donatorName: ""
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addDonation({
        variables: {
          donatorName: formState.donatorName,
          donationAmount: parseInt(formState.donationAmount),
          commentBody: formState.commentBody,
          isAnonymous: formState.isAnonymous,
          createdByID: userId,
          projectId: projectId,
        },
      });

       navigate(`/project/${projectId}`);
       window.location.reload();

    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h2 className="section-title">{projectTitle}</h2>
      <form
        className="monied-form new-project-form"
        onSubmit={handleFormSubmit}
      >
        <div className="form-floating mb-3">
          <input
            className="form-control"
            name="donatorName"
            placeholder="Name"
            value={formState.donatorName}
            onChange={handleChange}
            disabled={formState.isAnonymous}
          />
          <label className="form-label" htmlFor="donatorName">
            Name
          </label>
        </div>
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            name="isAnonymous"
            checked={formState.isAnonymous}
            onChange={handleIsAnonymousChanged}
          />
          <label className="form-check-label" htmlFor="isAnonymous">
            Anonymous Donation
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            name="donationAmount"
            placeholder="Donation Amount"
            value={formState.donationAmount}
            onChange={handleChange}
          />
          <label className="form-label" htmlFor="donationAmount">
            Donation Amount
          </label>
        </div>
        <div className="form-floating mb-3">
          <textarea
            className="form-control"
            rows="4"
            name="commentBody"
            placeholder="Comment"
            value={formState.commentBody}
            onChange={handleChange}
          />
          <label className="form-label" htmlFor="commentBody">
            Comment
          </label>
        </div>
        <button
          className="project-submit-btn btn btn-light btn-outline-success"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Donation;
