import { Router } from "express";
import { getMessages, addMessage } from "../controllers/messages.controller.js";

const router = Router();

router.get("/", getMessages); // Llamado para obtener los messages
router.post("/", addMessage); // Llamado para agregar un nuevo message

export default router;
