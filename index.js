const express = require('express');
const parser = require('body-parser').urlencoded({extended:true})

const session = require('express-session');
const cookiePaser = require('cookie-parser');
const customer = require('./router/customerRouter')
const app = express();


app.set('view engine', 'ejs');
app.set('views', './views');

app.use(parser);
app.use(express.static('public'));
app.use('admin', express.static('public/admin'));
app.use('/', customer);

app.listen(process.env.PORT || 8088, () => console.log('Server is running !!!'));
