import passport from "passport";
import local from "passport-local";
import userModel from "../dao/models/userModel.js";
import { createHash, isValidPassword } from "../utils.js";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        try {
          const { first_name, last_name, age, email } = req.body;

          let user = await userModel.findOne({ email: username });
          if (user) {
            console.log("User already exists");
            return done(null, false);
          }

          const newUser = {
            first_name,
            last_name,
            age,
            email,
            password: createHash(password),
          };

          let result = await userModel.create(newUser);

          return done(null, result);
        } catch (error) {
          return done("Error when trying to find user:" + error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy({ usernameField: "email" }),
    async (username, password, done) => {
      try {
        if (username === "adminCoder@coder.com") {
          if (password === "adminCod3r123") {
            const user = {fist_name: "", last_name: "", age: 0, email: username, rol: "admin"};
          }
        } else {
          const user = await userModel.findOne({ email: username });

          if (!user) {
            return done(null, false);
          }

          if (!isValidPassword(user, password)) {
            return done(null, false);
          }
          user = {...user, rol: "user"};
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById(id);
    done(null, user);
  });
};

export default initializePassport;