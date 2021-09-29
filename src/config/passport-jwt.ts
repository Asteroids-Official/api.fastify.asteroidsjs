import * as mongoose from 'mongoose'
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt'

const User = mongoose.model('User')

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  algorithms: ['RS256'],
  secretOrKey: process.env.JWT_SECRET,
}

const strategy = new Strategy(options, (payload, done) => {
  User.findOne({ _id: payload.sub })
    .then((user) => {
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    })
    .catch((error) => done(error, null))
})
