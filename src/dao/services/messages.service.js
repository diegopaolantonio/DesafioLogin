import { messageRepository } from "../repositories/message.repository.js";

class MessageService {
  constructor() {
    this.messageRepository = messageRepository;
  }

  //Funcion para obtener todos los datos del db
  getMessages = async () => {
    try {
      const messages = await this.messageRepository.getMessages();
      if(!messages) {
        return { error: "Messages collection error" }
      }
      return messages;
    } catch (error) {
      throw new Error(error);
    }
  };

  // Funcion para agregar un mensaje al db
  addMessage = async (message) => {
    try {
      const createdMessage = await this.messageRepository.createMessage(message);
      if(!createdMessage) {
        return { error: "Add message error" }
      }
      return createdMessage;
    } catch (error) {
      throw new Error(error);
    }
  };
}

export const messageService = new MessageService();
