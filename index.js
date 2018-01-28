const express = require('express');
const passport = require('passport');
const parser = require('body-parser').urlencoded({ extended: true });
const session = require('express-session');
const cookiePaser = require('cookie-parser');



const flash = require('express-flash');


const customer = require('./router/customerRouter')
const app = express();


app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use('admin', express.static('public/admin'));

app.use(cookiePaser());
app.use(parser);
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});
app.use(flash());

app.use('/', customer);

// app.use(require('./controller/showErrorPage'));
app.listen(process.env.PORT || 3000, () => console.log('Server is running at port 3000.'));
