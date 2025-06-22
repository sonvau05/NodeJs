const express = require('express');
const { initMySQL } = require('./src/config/db');
const routes = require('./src/routes');
const app = express();
app.use(express.json());
app.use('/api', routes);
const PORT = process.env.PORT || 3000;
initMySQL().then(() => app.listen(PORT, () => console.log(`Port ${PORT}`)));