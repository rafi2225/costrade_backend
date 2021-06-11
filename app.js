const express = require('express');
const app = express();
const path = require('path');
const { log } = console

// View Engine Setup & Tools
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const GlobalRoutes = require('./routes');
app.use('/', GlobalRoutes.root);
app.use('/api', GlobalRoutes.api);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => log(`Listen to ${PORT}`));