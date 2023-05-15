import { userModel } from "../models/userModel.js"

export default class UserManager {
  constructor() {}

  getUser = async (filter) => {
    try {
      const user = await userModel.findOne(filter);
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  register = async (user) => {
    try {
      const registeredUser = await userModel.create(user);
      return registeredUser;
    } catch (error) {
      console.log(error);
    }
  };
}