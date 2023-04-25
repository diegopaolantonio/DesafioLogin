import { messageModel } from "../models/messageModel.js";

export default class MessageManager {
  constructor() {}

  //Funcion para obtener todos los datos del db
  getMessages = async () => {
    try {
      const messages = await messageModel.find();
      if (!messages) {
        return "Get messages error";
      } else {
        return messages;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Funcion para agregar un mensaje al db
  addMessage = async (message) => {
    try {
      const createdMessage = await messageModel.create(message);
      if (!createdMessage) {
        return "Add messages error";
      } else {
        return createdMessage;
      }
    } catch (error) {
      console.log(error);
    }
  };
}
