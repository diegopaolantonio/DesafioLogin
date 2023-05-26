import { userRepository } from "../repositories/user.repository.js";

class UserService {
  constructor() {
    this.userRepository = userRepository;
  }

  getUserByEmail = async (email) => {
    try {
      const user = await this.userRepository.getUserByEmail(email);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };

  getUserById = async (id) => {
    try {
      const user = await this.userRepository.getUserById(id);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };

  createUser = async (newUser) => {
    try {
      const user = await userRepository.createUser(newUser);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };
}

export const userService = new UserService();
