/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation registerUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        firstName
        lastName
        email
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $firstName: String!
    $lastName: String!
    $email: String!
  ) {
    updateUser(firstName: $firstName, lastName: $lastName, email: $email) {
      firstName
      lastName
      email
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser {
    deleteUser {
      firstName
      lastName
      email
    }
  }
`;

export const ADD_PROJECT = gql`
  mutation createProject(
    $projectTitle: String!
    $organizationName: String!
    $projectCategory: String!
    $projectDescription: String!
    $projectGoal: Int!
    $twitterAccount: String
    $facebookAccount: String
    $email: String
  ) {
    createProject(
      projectTitle: $projectTitle
      organizationName: $organizationName
      projectCategory: $projectCategory
      projectDescription: $projectDescription
      projectGoal: $projectGoal
      twitterAccount: $twitterAccount
      facebookAccount: $facebookAccount
      email: $email
    ) {
      projectTitle
      organizationName
      projectCategory
      projectDescription
      projectGoal
      twitterAccount
      facebookAccount
      email
    }
  }
`;

//TODO: Add mutation for Update Project, include Donations to it
export const ADD_DONATION = gql`
  mutation createDonation(
    $donatorName: String
    $donationAmount: Int!
    $isAnonymous: Boolean!
    $commentBody: String
    $createdByID: ID
    $projectId: ID!
  ) {
    createDonation(
      donatorName: $donatorName
      donationAmount: $donationAmount
      isAnonymous: $isAnonymous
      commentBody: $commentBody
      createdByID: $createdByID
      projectId: $projectId
    ) {
      donatorName
      donationAmount
      isAnonymous
      commentBody
      createdByID
      _id
    }
  }
`;

export const ADD_FAVORITE = gql`
  mutation ($projectId: ID) {
    favoriteProject(projectId: $projectId) {
      favorites {
        _id
      }
    }
  }
`;
