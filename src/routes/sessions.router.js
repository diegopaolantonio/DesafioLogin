import { Router } from "express";
import passport from "passport";
import {
  postRegister,
  getFailRegister,
  postLogin,
  getFailLogin,
  getCurrent,
  getGithub,
  getGithubCallback,
  getLogout,
} from "../controllers/sessions.controller.js";

const router = Router();

router.post(
  "/register",
  passport.authenticate("register", { failureRegister: "/failRegister" }),
  postRegister
);
router.get("/failRegister", getFailRegister);
router.post(
  "/login",
  passport.authenticate("login", { failureRegister: "/failLogin" }),
  postLogin
);
router.get("/failLogin", getFailLogin);
router.get("/current", getCurrent);
router.get(
  "/github",
  passport.authenticate("githublogin", { scope: ["user:email"] }),
  getGithub
);
router.get(
  "/githubcallback",
  passport.authenticate("githublogin", { failureRedirect: "/login" }),
  getGithubCallback
);
router.get("/logout", getLogout);

export default router;
