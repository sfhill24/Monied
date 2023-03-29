const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Upload
  
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    isAuthenticated: Boolean
    projects: [Project]
    donations: [Donation]
    favorites: [Project]
  }

  type Project {
    _id: ID
    projectTitle: String
    organizationName: String
    projectCategory: String
    projectDescription: String
    projectGoal: Int
    twitterAccount: String
    facebookAccount: String
    email: String
    donations: [Donation]
  }

  type Donation {
    _id: ID
    donatorName: String
    donationAmount: Int
    isAnonymous: Boolean
    commentBody: String
    createdBy: String
    createdByID: ID
    project: [Project]
  }

  type Auth {
    token: ID
    user: User
  }

  type Image {
    url: String
  }


  type Query {
    getCurrentUser: User
    getAllProjects: [Project]
    getProjectById(_id: ID!): Project
    getProjectByCategory(projectCategory: String!): [Project]
    getDonationById(userId: ID!, projectId: ID!): [Donation]
    getProjectByOrganization(organizationName: String!): [Project]
  }

  type Mutation {
    createUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth

    updateUser(firstName: String!, lastName: String!, email: String!): User

    deleteUser: User

    login(email: String!, password: String!): Auth

    createProject(
      projectTitle: String!
      organizationName: String!
      projectCategory: String!
      projectDescription: String!
      projectGoal: Int!
      twitterAccount: String
      facebookAccount: String
      email: String
    ): Project

    createDonation(
      donatorName: String
      donationAmount: Int
      isAnonymous: Boolean
      commentBody: String
      createdByID: ID
      projectId: ID
    ): Donation

    updateProject(
      _id: ID
      projectTitle: String
      projectCategory: String
      projectDescription: String
      twitterAccount: String
      facebookAccount: String
      email: String
    ): Project

    favoriteProject(projectId: ID): User

    uploadImage(file: Upload!): Image!
  }
`;

module.exports = typeDefs;
