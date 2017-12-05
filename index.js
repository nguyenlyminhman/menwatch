const express = require('express');
const app = express();
const customer = require('./controller/customerRouter')

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use('admin', express.static('public/admin'));
app.use('/', customer);

app.listen(process.env.PORT || 8088, () => console.log('Server is running !!!'));
