import passport from "passport";
import local from "passport-local";
import jwt from "passport-jwt";
import { userModel } from "../dao/models/userModel.js";
import { cartModel } from "../dao/models/cartModel.js"
import { createHash, isValidPassword } from "../utils.js";
import { ObjectId } from "mongodb";
import GitHubStrategy from "passport-github2";
import config from "../config.js";

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwtCookie"];
  }
  return token;
};

const { adminEmail, adminPassword, clientID, jwtSecret, callbackUrl } = config;

const jwtOptions = {
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
};

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

          const userCart = await cartModel.create({});

          const newUser = {
            first_name,
            last_name,
            age,
            email,
            password: createHash(password),
            cart: userCart._id,
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
    "jwt",
    new JWTStrategy(jwtOptions, async (jwt_payload, done) => {
      try {
        return done(null, jwt_payload);
      } catch (error) {
        return done(error);
      }
    })
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
        jwtSecret,
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
