import passport  from 'passport';
const GoogleStrategy = require('passport-google-oauth20').Strategy;
import queryuser from '../database/usersquery';
// manage auth
const dotenv = require('dotenv');
// Update with your config settings.
dotenv.config();
// serialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
});
// deserialize user
passport.deserializeUser((id, done) => {
    queryuser
    .findById(id)
    .then(user => {
        done(null, user);
    })
    .catch(err => {
      done(err);
    });
});
// Passport Strategies
passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    }, (accessToken, refreshToken, profile, done) => {
        
        // passport callback function
        const userinfo = {
            names: `${profile.name.familyName} ${profile.name.givenName}`,
            googleId: profile.id
        }
        // check user existance
        queryuser
        .findGoogleUser(userinfo)
        .then((user) => {
            if(user){
               done(null,user);
            }else{
                // User not found, start creating him..
                queryuser
                .createGoogleUser(userinfo)
                .then((newUser) => {
                    if(newUser){
                        //console.log(`No user to register ${user.id}`);
                        done(null,newUser);
                    }                    
                })
            }
        });
    })
);