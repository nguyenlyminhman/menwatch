const express = require('express');
const app = express();
const parser = require('body-parser').urlencoded({extended:true})
const customer = require('./router/customerRouter')

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(parser);
app.use(express.static('public'));
app.use('admin', express.static('public/admin'));
app.use('/', customer);

app.listen(process.env.PORT || 8088, () => console.log('Server is running !!!'));
