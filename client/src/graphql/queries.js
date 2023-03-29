/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const QUERY_CURRENT_USER = gql`
  query currentUser {
    getCurrentUser {
      _id
      email
      firstName
      lastName
      projects {
        _id
        projectTitle
        organizationName
        projectCategory
        projectDescription
        projectGoal
        donations {
          _id
          donationAmount
          isAnonymous
          commentBody
          createdBy
        }
      }
      favorites {
        _id
        projectTitle
        organizationName
        projectCategory
        projectDescription
        projectGoal
        donations {
          _id
          donationAmount
          isAnonymous
          commentBody
          createdBy
        }
      }
    }
  }
`;

export const QUERY_PROJECT = gql`
  query project($id: ID!) {
    getProjectById(_id: $id) {
      _id
      projectTitle
      organizationName
      projectCategory
      projectDescription
      projectGoal
      twitterAccount
      facebookAccount
      email
      donations {
        _id
        donatorName
        donationAmount
        isAnonymous
        commentBody
        createdBy
        createdByID
      }
    }
  }
`;

// export const QUERY_PROJECTS = gql`
//   query projects {
//     getAllProjects {
//       _id
//       projectTitle
//       organizationName
//       projectCategory
//       projectDescription
//       projectGoal
//       donations {
//         _id
//         donatorName
//         donationAmount
//         isAnonymous
//         commentBody
//         createdBy
//       }
//     }
//   }
// `;

export const QUERY_PROJECT_CATEGORY = gql`
  query projects($projectCategory: String!) {
    getProjectByCategory(projectCategory: $projectCategory) {
      _id
      projectTitle
      organizationName
      projectCategory
      projectDescription
      projectGoal
      donations {
        _id
        donationAmount
        isAnonymous
        commentBody
        createdBy
      }
    }
  }
`;

export const QUERY_PROJECT_ORGANIZATION = gql`
  query projects($organizationName: String!) {
    getProjectByOrganization(organizationName: $organizationName) {
      _id
      projectTitle
      organizationName
      projectCategory
      projectDescription
      projectGoal
      donations {
        _id
        donationAmount
        isAnonymous
        commentBody
        createdBy
      }
    }
  }
`;

export const QUERY_DONATIONS = gql`
  query donations($projectId: ID!) {
    getDonationById(_id: $id) {
      _id
      donationAmount
      isAnonymous
      commentBody
      createdBy
      project {
        _id
        projectTitle
        organizationName
        projectCategory
        projectDescription
        projectGoal
      }
    }
  }
`;
