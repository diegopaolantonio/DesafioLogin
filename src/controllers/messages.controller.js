import { messageService } from "../dao/services/messages.service.js";
import { responder } from "../traits/Responder.js";

export async function getMessages(req, res) {
  try {
    const messages = await messageService.getMessages();
    if (messages && messages.error) {
      return responder.errorResponse(res, products.error, 400);
    } else {
      return responder.successResponse(res, messages);
    }
  } catch (error) {
    return responder.errorResponse(res, error.message)
  }
}

export async function addMessage(req, res) {
  try {
    const message = req.body;
    const messages = await messageService.addMessage(message);
    if (messages && messages.error) {
      return responder.errorResponse(res, products.error, 400);
    } else {
      return responder.successResponse(res, messages);
    }
  } catch (error) {
    return responder.errorResponse(res, error.message)
  }
}
