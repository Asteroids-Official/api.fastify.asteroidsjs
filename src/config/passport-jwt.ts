import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt'
import * as mongoose from 'mongoose'

const User = mongoose.model('User');

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  algorithms: ['RS256'],
  secretOrKey: process.env.PUB_KEY,
};

const strategy = new Strategy(options, (payload, done) => {
  User.findOne({ _id: payload.sub }).then((user) => {
    if(user) {
      return done(null, user);
    }else {
      return done(null, false);
    }
  }).catch(error => done(error, null));
});
