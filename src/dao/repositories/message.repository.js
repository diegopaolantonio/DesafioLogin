import { messageModel } from "../models/message.model.js";

class MessageRepository {
  constructor() {
    this.messageModel = messageModel;
  }

  //Funcion para obtener todos los datos del db
  getMessages = async () => {
    try {
      const messages = await this.messageModel.find();
      if (!messages) {
        return "Get messages error";
      } else {
        return messages;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  // Funcion para agregar un mensaje al db
  createMessage = async (message) => {
    try {
      const createdMessage = await this.messageModel.create(message);
      if (!createdMessage) {
        return "Add messages error";
      } else {
        return createdMessage;
      }
    } catch (error) {
      throw new Error(error);
    }
  };
}

export const messageRepository = new MessageRepository();
