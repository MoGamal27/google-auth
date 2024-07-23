require('dotenv').config();
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../model/user')

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback'

}, async (accessToken, refreshToken, profile, done) => {

    const existingUser = await User.findOne({ googleId: profile.id })

    if(existingUser) {
        return done(null, existingUser)
    }

    const user = await new User({ 
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value
     }).save()

    done(null, user)


}))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user)
    })
})

module.exports = passport

