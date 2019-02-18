
const dotenv = require('dotenv');
// Update with your config settings.
dotenv.config();

import passport from 'passport';
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
import User from './../controllers/user';

passport.use(
   new GoogleStrategy({
   clientID: process.env.GOOGLE_CLIENT_ID,
   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
   callbackURL: process.env.GOOGLE_REDIRECT
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ userid: profile.id }, { name: profile.displayName,userid: profile.id }, function (err, user) {
         return done(err, user);
       });
  }
));

module.exports = passport;