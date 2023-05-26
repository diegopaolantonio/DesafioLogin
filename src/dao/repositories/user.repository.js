import { userModel } from "../models/user.model.js";

class UserRepository {
  constructor() {
    this.userModel = userModel;
  }

  // Funcion para obtener un user especifico por email
  getUserByEmail = async (email) => {
    try {
      const user = await this.userModel.findOne(email);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };

  // Funcion para obtener un user especifico por el id
  getUserById = async (id) => {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        return "Id not found";
      } else {
        return user;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  // Funcion para agregar un user al db
  createUser = async (newUser) => {
    try {
      const createdUser = await this.userModel.create(newUser);
      if (!createdUser) {
        return "Add user error";
      } else {
        return createdUser;
      }
    } catch (error) {
      throw new Error(error);
    }
  };
}

export const userRepository = new UserRepository();
