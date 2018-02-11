const Strategy = require('passport-local').Strategy;
const PassportFb = require('passport-facebook').Strategy;
const Customer = require('../model/Customer');
const Staff = require('../model/Staff');
const { hash, compare } = require('bcrypt');

module.exports = function (passport) {
  // Configure Passport authenticated session persistence.
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  let rs = "";
  passport.serializeUser((user, done) => {
    done(null, user.email);
  });

  passport.deserializeUser(function (email, done) {
    if (rs === "local_staff") {
      const staff = new Staff(undefined, undefined, email, undefined, undefined, undefined, undefined);
      staff.checkExistStaff()
        .then(result => {
          return done(null, result.rows[0]);
        }),
        err => { done(err, null); }
    } else {

      const customer = new Customer(undefined, undefined, email, undefined, undefined, undefined, undefined);
      customer.checkExistEmail()
        .then(result => {
          return done(null, result.rows[0]);
        }),
        err => { done(err, null); }
    }
  });

  // chninh sua trong day fDCSog83n
  passport.use('local_staff', new Strategy({
    usernameField: 'email',
    passwordField: 'password'
  },
    (email, password, done) => {
      const sta = new Staff(undefined, undefined, email, password, undefined, undefined, undefined);
      sta.checkExistStaff()
        .then(result => {
          if (!result.rowCount) {
            return done(null, false, { message: email + ' is not in use.' });
          }
          compare(password, result.rows[0].password)
            .then(isValid => {
              if (!isValid) {
                return done(null, false, { message: 'Wrong password.' });
              } else {
                rs = "local_staff";
                return done(null, result.rows[0]);
              }
            })
        })
        .catch(err => { return done(err); });
    }
  ));
  //local stagg


  passport.use('local_customer', new Strategy({
    usernameField: 'email',
    passwordField: 'password'
  },
    (email, password, done) => {
      const customer = new Customer(undefined, undefined, email, password, undefined, undefined);
      customer.checkExistEmail()
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
      callbackURL: "http://localhost:3000/auth/fb/cb",
      profileFields: ['email', 'first_name', 'last_name']
    },
    (accessToken, refreshToken, profile, done) => {

      const customer = new Customer(undefined, undefined, profile._json.email, undefined, undefined, undefined);
      customer.checkExistEmail()
        .then(result => {
          if (result.rowCount) {
            return done(null, result.rows[0]);
          }
          const _customer = new Customer(profile._json.first_name, profile._json.last_name, profile._json.email, undefined, undefined, undefined);
          _customer.insertNewCustomer().then(_result => {
            customer.getCustomerInfoByEmail().then(customer_ => {
              return done(null, customer_.rows[0]);
            })
          })
        })
    }
  ));
};
