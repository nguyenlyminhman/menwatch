const express = require('express');
const router = express.Router();

const favicon = require('serve-favicon')
const passport = require('passport');
const parser = require('body-parser').urlencoded({ extended: true });
const session = require('express-session');
const cookiePaser = require('cookie-parser');


const path = require('path')
const flash = require('express-flash');


const customer = require('./router/customerRouter');
const admin = require('./router/adminRouter');
const api = require('./router/apiRouter');

const app = express();


app.set('view engine', 'ejs');
app.set('views', ['./views', './views/admin']);
app.use(express.static('public'));
app.use(favicon(path.join(__dirname, 'public', 'images','menwatch.ico')));


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
app.use('/api/', api);
app.use('/admin/', admin);
app.use('/', customer);


router.use(require('./controller/getErrorPage'));

app.listen(process.env.PORT || 3000, () => console.log('Server is running at port 3000.'));
