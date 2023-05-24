import { messageRepository } from "../repositories/message.repository.js";

class MessageService {
  constructor() {
    this.messageRepository = messageRepository;
  }

  //Funcion para obtener todos los datos del db
  getMessages = async () => {
    try {
      const messages = await this.messageRepository.getMessages();
      return messages;
    } catch (error) {
      console.log(error);
    }
  };

  // Funcion para agregar un mensaje al db
  addMessage = async (message) => {
    try {
      const createdMessage = await this.messageRepository.createMessage(message);
      return createdMessage;
    } catch (error) {
      console.log(error);
    }
  };
}

export const messageService = new MessageService();
