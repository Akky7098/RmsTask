 const mongoose = require("mongoose");

   mongoose.connect('mongodb+srv://namansinvns:dmxQ4NRNymFfWbhc@cluster0.9bo5aus.mongodb.net/',
   { useNewUrlParser: true, useUnifiedTopology: true }
   ).then(()=>{
       console.log('database connected')
   }).catch((err)=>{
        console.log(err)
   }
   )

   module.exports = mongoose;
   //mongodb+srv://namansinvns:<password>@ticketbookingcluster.onjs7bt.mongodb.net/
   /*
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

  input UserInput {
    username: String!
    password: String!
    role: String!
    organizationId: ID!
  }

  input TaskInput {
    title: String!
    description: String!
    status: String!
    dueDate: String
    userId: ID!
    organizationId: ID!
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

    createUser(input: UserInput!): User
    updateUser(id: ID!, input: UserInput!): User
    deleteUser(id: ID!): User

    createTask(input: TaskInput!): Task
    updateTask(id: ID!, input: TaskInput!): Task
    deleteTask(id: ID!): Task

    login(username: String!, password: String!): AuthPayload
  }
  type AuthPayload {
    token: String!
    user: User!
  }
`;

module.exports = typeDefs;
*/