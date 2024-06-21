const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Organization {
    id: ID!
    name: String!
    users: [User!]!
    tasks: [Task!]!
  }

  type User {
    id: ID!
    username: String!
    password: String!
    role: String!
    organization: Organization!
  }

  type Task {
    id: ID!
    title: String!
    description: String!
    status: String!
    dueDate: String
    user: User!
    organization: Organization!
  }

  input OrganizationInput {
    name: String!
  }

  input CreateUserInput {
    username: String!
    password: String!
    role: String!
    organizationId: ID!
  }

  input UpdateUserInput {
    username: String
    password: String
    role: String
    organizationId: ID
  }

  input CreateTaskInput {
    title: String!
    description: String!
    status: String!
    dueDate: String
    userId: ID!
    organizationId: ID!
  }
  input UpdateTaskInput {
    title: String
    description: String
    status: String
    dueDate: String
    userId: ID
    organizationId: ID
  }

  type Query {
    getOrganization(id: ID!): Organization
    getAllOrganizations: [Organization!]!

    getUser(id: ID!): User
    getAllUsers: [User!]!

    getTask(id: ID!): Task
    getAllTasks: [Task!]!
  }

  type Mutation {
    createOrganization(input: OrganizationInput!): Organization
    updateOrganization(id: ID!, input: OrganizationInput!): Organization
    deleteOrganization(id: ID!): Organization

    createUser(input: CreateUserInput!): User
    updateUser(id: ID!, input: UpdateUserInput!): User
    deleteUser(id: ID!): User

    createTask(input: CreateTaskInput!): Task
    updateTask(id: ID!, input: UpdateTaskInput!): Task
    deleteTask(id: ID!): Task

    login(username: String!, password: String!): AuthPayload
  }

  type AuthPayload {
    token: String!
    user: User!
  }
`;

module.exports = typeDefs;
