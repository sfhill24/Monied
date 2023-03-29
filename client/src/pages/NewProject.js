//Create A New Project
//<card>
//Project Title - Input
//Project Category - Dropdown
//Project Description - Input
//Project Goal - Input
//Submit button
//</card>
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PROJECT } from '../graphql/mutations';
import { QUERY_CURRENT_USER } from '../graphql/queries';
import { useNavigate } from 'react-router-dom';
const NewProject = () => {
  const [projectTitle, setProjectTitle] = useState('');
  const [characterCount, setCharacterCount] = useState('');
  const [projectCategory, setProjectCategory] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectGoal, setProjectGoal] = useState();
  const [organizationName, setOrganizationName] = useState('');
  const [twitterAccount, setTwitterAccount] = useState('');
  const [facebookAccount, setFacebookAccount] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [addProject, { error }] = useMutation(ADD_PROJECT);
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // console.log(projectGoal, typeof projectGoal);
    // May need to add a handle change section that can parseInt.
    //Having parseInt in form is causing some background issues. But it works.
    // var parsedGoal = parseInt(projectGoal);
    // console.log(parsedGoal, typeof parsedGoal);
    try {
      await addProject({
        variables: {
          projectTitle,
          projectDescription,
          projectCategory,
          projectGoal,
          organizationName,
          twitterAccount,
          facebookAccount,
          email
        },
      });
      // clear form value
      setProjectTitle('');
      setProjectDescription('');
      setProjectGoal(0);
      setOrganizationName('');
      setCharacterCount(0);
      setTwitterAccount('');
      setFacebookAccount('');
      setEmail('');
      navigate('/my-projects');
      window.location.reload();
    } catch (e) {
      console.error(e);
    }

    //await uploadProjectImage({})
  };
  return (
    <div>
      <h3 className="section-title">What will be your new project?</h3>
      <form
        className="monied-form new-project-form"
        onSubmit={handleFormSubmit}
      >
        <div className="form-floating mb-3">
          <input
            className="form-control"
            required
            name="projectTitle"
            type="text"
            placeholder="title"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
          />
          <label className="form-label" htmlFor="projectTitle">
            Title
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            required
            name="organizationName"
            type="text"
            placeholder="Organization"
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
          />
          <label className="form-label" htmlFor="organizationName">
            Organization
          </label>
        </div>
        <select
          className="form-select form-select-lg mb-3"
          value={projectCategory}
          onChange={(e) => setProjectCategory(e.target.value)}
        >
          <option value="">Select a Category</option>
          <option value="Education">Education</option>
          <option value="Community Outreach">Community Outreach</option>
          <option value="Health Care">Health Care</option>
          <option value="Religious">Religious</option>
          <option value="Family Services">Family Services</option>
          <option value="Other">Other</option>
        </select>
        <div className="form-floating mb-3">
          <textarea
            className="form-control"
            required
            name="projectDescription"
            type="text"
            placeholder="Description"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
          <label className="form-label" htmlFor="projectDescription">
            Description
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            required
            name="projectGoal"
            type="number"
            placeholder="ProjectGoal"
            value={projectGoal}
            onChange={(e) => setProjectGoal(parseInt(e.target.value))}
          />
          <label className="form-label" htmlFor="projectGoal">
            $ Project Goal
          </label>
        </div>

        <div className="form-floating mb-3">
          <input
            className="form-control"
            required
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="form-label" htmlFor="email">
           Add Email 
          </label>
        </div>

        <div className="form-floating mb-3">
          <textarea
            className="form-control"
            required
            name="twitterAccount"
            type="text"
            placeholder="Twitter"
            value={twitterAccount}
            onChange={(e) => setTwitterAccount(e.target.value)}
          />
          <label className="form-label" htmlFor="twitterAccount">
            Add Twitter Account
          </label>
        </div>

        <div className="form-floating mb-3">
          <input
            className="form-control"
            required
            name="facebookAccount"
            type="text"
            placeholder="Facebook"
            value={facebookAccount}
            onChange={(e) => setFacebookAccount(e.target.value)}
          />
          <label className="form-label" htmlFor="facebookAccount">
           Add Facebook Account
          </label>
        </div>

        <button
          className="project-submit-btn btn btn-light btn-outline-success"
          type="submit"
        >
          Submit
        </button>
        {error && <div>Something went wrong!</div>}
      </form>
    </div>
  );
};
export default NewProject;
