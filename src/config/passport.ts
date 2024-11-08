import passport from "passport";
import {
  Profile,
  Strategy,
  StrategyOptions,
  VerifyCallback,
} from "passport-google-oauth20";
import User, { IUser } from "../models/User";

const config = {
  CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
};

const AUTH_OPTIONS: StrategyOptions = {
  clientID: config.CLIENT_ID as string,
  clientSecret: config.CLIENT_SECRET as string,
  callbackURL: config.CALLBACK_URL as string,
};

async function verifyCallback(
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: VerifyCallback
) {
  console.log("Google data", profile);
  let user = await User.findOne({ googleId: profile.id });

  if (!user) {
    user = await User.create({
      googleId: profile.id,
      name: profile.displayName,
      email: profile.emails ? profile.emails[0].value : "",
      profilePicture: profile.photos ? profile.photos[0].value : "",
    });
  }

  done(null, user);
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

passport.serializeUser((user, done) => done(null, (user as IUser).googleId));

passport.deserializeUser(async (id: string, done) => {
  const user = await User.findOne({ googleId: id });
  done(null, user);
});

export default passport;
