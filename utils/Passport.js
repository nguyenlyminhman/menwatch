const Strategy = require('passport-local').Strategy;
const PassportFb = require('passport-facebook').Strategy;
const Customer = require('../model/Customer');
const { hash, compare } = require('bcrypt');

module.exports = function (passport) {
  // Configure Passport authenticated session persistence.
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser((user, done) => {
    done(null, user.email);
  });

  passport.deserializeUser(function (email, done) {
    const customer = new Customer(undefined, undefined, email, undefined, undefined, undefined);
    customer.getCustomerInfoByEmail()
      .then(result => {
        return done(null, result.rows[0]);
      }),
      err => { done(err, null); }
  });

  passport.use(new Strategy({
    usernameField: 'email',
    passwordField: 'password'
  },
    (email, password, done) => {
      const customer = new Customer(undefined, undefined, email, password, undefined, undefined);
      customer.getCustomerInfoByEmail()
        .then(result => {
          if (!result.rowCount) {
            return done(null, false, { message: email + ' is not in use.' });
          }
          compare(password, result.rows[0].password)
            .then(isValid => {
              if (!isValid) {
                return done(null, false, { message: 'Wrong password.' });
              } else {
                return done(null, result.rows[0]);
              }
            })
        })
        .catch(err => { return done(err); });
    }
  ));

  passport.use(new PassportFb(
    {
      clientID: "160773434573246",
      clientSecret: "dc3a6430c7804e6f57d4dbcd274d3c67",
      callbackURL:"https://menwatch.herokuapp.com/auth/fb/cb",
      profileFields: ['email']
    },
    (accessToken, refreshToken, profile, done)=>{
      console.log(profile)
    }
  ));
};
