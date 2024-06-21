
const bcrypt = require('bcryptjs');
const { AuthenticationError } = require('apollo-server-express');
const { generateToken } = require('./utils/jwt');
const Organization = require('./models/Organization');
const User = require('./models/User');
const Task = require('./models/Tasks');

const resolvers = {
  Query: {
    getOrganization: async (_, { id },context) => {
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Access denied. You must be an admin to perform this operation.');
      }
      return await Organization.findById(id);
    },
    getAllOrganizations: async (_,__,context) => {
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Access denied. You must be an admin to perform this operation.');
      }
      return await Organization.find();
    },
    getUser: async (_, { id },context) => {
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Access denied. You must be an admin to perform this operation.');
      }
      return await User.findById(id);
    },
    getAllUsers: async (_,__,context) => {
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Access denied. You must be an admin to perform this operation.');
      }
      return await User.find();
    },
    getTask: async (_, { id },context) => {
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Access denied. You must be an admin to perform this operation.');
      }
      return await Task.findById(id);
    },
    getAllTasks: async (_,__,context) => {
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Access denied. You must be an admin to perform this operation.');
      }
      return await Task.find();
    },
  },
  Mutation: {
    createOrganization: async (_, { input },context) => {
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Access denied. You must be an admin to perform this operation.');
      }
      const org = new Organization(input);
      return await org.save();
    },
    updateOrganization: async (_, { id, input },context) => {
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Access denied. You must be an admin to perform this operation.');
      }
      return await Organization.findByIdAndUpdate(id, input, { new: true });
    },
    deleteOrganization: async (_, { id },context) => {
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Access denied. You must be an admin to perform this operation.');
      }
      return await Organization.findByIdAndDelete(id);
    },
    createUser: async (_, { input },context) => {
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Access denied. You must be an admin to perform this operation.');
      }
      input.password = bcrypt.hashSync(input.password, 10);
      const user = new User(input);
      return await user.save();
    },
    updateUser: async (_, { id, input },context) => {
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Access denied. You must be an admin to perform this operation.');
      }
      if (input.password) {
        input.password = bcrypt.hashSync(input.password, 10);
      }
      return await User.findByIdAndUpdate(id, input, { new: true });
    },
    deleteUser: async (_, { id },context) => {
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Access denied. You must be an admin to perform this operation.');
      }
      return await User.findByIdAndDelete(id);
    },
    createTask: async (_, { input },context) => {
      if (context.user.role === 'user' && input.userId !== context.user.id) {
        throw new Error('Access denied');
      }
      if (context.user.role === 'manager' && input.organizationId !== context.user.organizationId) {
        throw new Error('Access denied');
      }
      input.dueDate = new Date(input.dueDate).getTime()
      const task = new Task(input);
      return await task.save();
    },
    updateTask: async (_, { id, input },context) => {
      const task = await Task.findById(id);
      if (!task) throw new Error('Task not found');
      if (context.user.role === 'user' && task.userId.toString() !== context.user.id) {
        throw new Error('Access denied');
      }
      if (context.user.role === 'manager' && task.organizationId.toString() !== context.user.organizationId) {
        throw new Error('Access denied');
      }
      input.dueDate = new Date(input.dueDate).getTime()
      return await Task.findByIdAndUpdate(id, input, { new: true });
    },
    deleteTask: async (_, { id },context) => {
      const task = await Task.findById(id);
      if (!task) throw new Error('Task not found');
      if (context.user.role === 'user' && task.userId.toString() !== context.user.id) {
        throw new Error('Access denied');
      }
      if (context.user.role === 'manager' && task.organizationId.toString() !== context.user.organizationId) {
        throw new Error('Access denied');
      }
      return await Task.findByIdAndDelete(id);
    },
    login: async (_,{ username, password }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new AuthenticationError('Invalid username');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new AuthenticationError('Invalid paasword');
      }
      const token = generateToken(user);
      return { token, user };
    },
  },
  Organization: {
    users: async (org) => {
      return await User.find({ organizationId: org.id });
    },
    tasks: async (org) => {
      return await Task.find({ organizationId: org.id });
    },
  },
  User: {
    organization: async (user) => {
      return await Organization.findById(user.organizationId);
    },
  },
  Task: {
    user: async (task) => {
      return await User.findById(task.userId);
    },
    organization: async (task) => {
      return await Organization.findById(task.organizationId);
    },
  },
};

module.exports = resolvers;