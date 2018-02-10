const Strategy = require('passport-local').Strategy;
const PassportFb = require('passport-facebook').Strategy;
const Staff = require('../model/Staff');
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
        const staff = new Staff(undefined, undefined, email, undefined, undefined, undefined, undefined);
        staff.checkExistStaff()
            .then(result => {
                return done(null, result.rows[0]);
            }),
            err => { done(err, null); }
    });

    passport.use('local.admin', new Strategy({
        usernameField: 'email',
        passwordField: 'password'
    },
        (email, password, done) => {
            const staff = new Staff(undefined, undefined, email, password, undefined, undefined, undefined);
            staff.checkExistStaff()
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
};
