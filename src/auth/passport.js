import passport from "passport";
import local from "passport-local";
import { userService } from "../dao/services/users.service.js";
import { cartService } from "../dao/services/carts.service.js";
import { createHash, isValidPassword } from "../utils.js";
import { ObjectId } from "mongodb";
import GitHubStrategy from "passport-github2";
import config from "../config.js";

const LocalStrategy = local.Strategy;

const { adminEmail, adminPassword, clientID, clientSecret, callbackUrl } =
  config;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        try {
          const { first_name, last_name, age, email, rol } = req.body;

          let user = await userService.getUserByEmail({ email: username });
          if (user) {
            console.log("User already exists");
            return done(null, false);
          }

          const userCart = await cartService.createCart();

          const newUser = {
            first_name,
            last_name,
            age,
            email,
            password: createHash(password),
            cart: userCart._id,
            rol,
          };

          let result = await userService.createUser(newUser);

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
          if (username === adminEmail) {
            if (password === adminPassword) {
              user = {
                _id: new ObjectId(),
                first_name: adminEmail,
                last_name: "",
                age: 0,
                email: username,
                rol: "admin",
              };
            }
          } else {
            user = await userService.getUserByEmail({ email: username });
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
          let user = await userService.getUserByEmail({
            email: profile._json.email,
          });
          if (!user) {
            let newUser = {
              first_name: profile._json.name,
              last_name: "",
              age: 0,
              email: profile._json.email,
              password: "",
              rol: "user",
            };

            let result = await userService.createUser(newUser);

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
    let user = await userService.getUserById(id);
    done(null, user);
  });
};

export default initializePassport;
