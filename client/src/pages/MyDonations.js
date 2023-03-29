import React from 'react';
import { useParams, Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import {
  QUERY_CURRENT_USER,
  QUERY_DONATIONS,
  QUERY_PROJECT,
} from '../graphql/queries';

//generate all user donations
const MyDonations = () => {
  const { amount: donationAmount } = useParams();

  const { loading, data } = useQuery(QUERY_CURRENT_USER);

  const user = data?.getCurrentUser || {};

  // const userDonate = data?.getDonationById || {};

  const done = useQuery(QUERY_PROJECT);

  const donionRings = done?.getProjectById || {};

  console.log(donionRings);

  const userProjects = data?.getCurrentUser.projects || {};

  const donation = data?.getCurrentUser.donationAmount || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  //const currentUserDonation = useQuery(QUERY_DONATIONS);

  //console.log(userProjects);

  return (
    <div className="dashboard">
      <h1>My Donations</h1>
      <div>Total Donations: {donation.donationAmount}</div>
    </div>
  );
};

export default MyDonations;
