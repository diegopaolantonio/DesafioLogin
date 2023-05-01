import passport from "passport";
import local from "passport-local";
import { userModel } from "../dao/models/userModel.js";
import { createHash, isValidPassword } from "../utils.js";
import { ObjectId } from "mongodb";
import GitHubStrategy from "passport-github2";
import config from "../config.js";

const LocalStrategy = local.Strategy;

const { clientID, clientSecret, callbackUrl } = config;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        try {
          const { first_name, last_name, age, email, rol } = req.body;

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
            rol,
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
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          let user = {
            fist_name: "",
            last_name: "",
            age: 0,
            email: "",
            rol: "",
          };
          if (username === "adminCoder@coder.com") {
            if (password === "adminCod3r123") {
              user = {
                _id: new ObjectId(),
                first_name: "adminCoder@coder.com",
                last_name: "",
                age: 0,
                email: username,
                rol: "admin",
              };
            }
          } else {
            user = await userModel.findOne({ email: username });
            if (!user) {
              return done(null, false);
            }

            if (!isValidPassword(user, password)) {
              return done(null, false);
            }
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "githublogin",
    new GitHubStrategy(
      {
        clientID,
        clientSecret,
        callbackUrl,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await userModel.findOne({ email: profile._json.email });
          if (!user) {
            let newUser = {
              first_name: profile._json.name,
              last_name: "",
              age: 0,
              email: profile._json.email,
              password: "",
              rol: "user",
            };

            let result = await userModel.create(newUser);

            return done(null, result);
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
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
