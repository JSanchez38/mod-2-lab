const express = require('express')

const app = express()

//faltan cosas
require('./configs/hbs.config')
require('./configs/db.config')

app.set('view engine', 'hbs')
app.set('views', `${__dirname}/views`)

app.use(express.urlencoded());

const routes = require('./configs/routes.config');
app.use('/', routes);

app.listen(3000, () => console.info('Application running at port 3000'));