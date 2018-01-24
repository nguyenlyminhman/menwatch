const Strategy = require('passport-local').Strategy;
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
            return done(null, false, { messages: email + ' is not in use.'});
          }
          compare(password, result.rows[0].password)
            .then(isValid => {
              if (!isValid) {
                return done(null, false);
              } else {
                return done(null, result.rows[0]);
              }
            })
        })
        .catch(err => { return done(err); });
    }
  ));
};
