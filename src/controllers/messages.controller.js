import { messageService } from "../dao/services/messages.service.js";

export async function getMessages(req, res) {
  try {
    const messages = await messageService.getMessages();
    if (!messages) {
      return res
        .status(400)
        .send({ status: "error", error: "Get collection error" });
    } else {
      return res.send({ messages });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function addMessage(req, res) {
  try {
    const message = req.body;
    const messages = await messageService.addMessage(message);
    if (!messages) {
      return res
        .status(400)
        .send({ status: "error", error: "Add message error" });
    } else {
      return res.send({ messages });
    }
  } catch (error) {
    console.log(error);
  }
}
