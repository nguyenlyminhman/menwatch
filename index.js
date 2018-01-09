const express = require('express');
const passport = require('passport');
const parser = require('body-parser').urlencoded({extended: true});
const session = require('express-session');
const cookiePaser = require('cookie-parser');
const flash = require('express-flash');


const customer = require('./router/customerRouter')
const app = express();


app.set('view engine', 'ejs');
app.set('views', './views');
<<<<<<< HEAD
app.use(express.static('public'));
app.use('admin', express.static('public/admin'));

app.use(cookiePaser());
app.use(parser);
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(flash());
=======


app.use(express.static('public'));
app.use('admin', express.static('public/admin'));

app.use(cookiePaser);
app.use(parser);
app.use(session({ secret: 'my_secret_key', resave: false, saveUninitialized: false }));
>>>>>>> 44d4d3f70206e22d1ffec0f086451b132c456cbd
app.use(passport.initialize());
app.use(passport.session());

// app.use('/', customer);
app.get('/',(req, res)=> res.send('okman'))
app.listen(process.env.PORT || 3000, () => console.log('Server is running at port 8088 !!!'));
