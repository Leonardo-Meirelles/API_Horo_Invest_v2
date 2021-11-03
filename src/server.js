require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
require('./database/index');

const routes = require('./routers/indexRoutes');

app.use(cors());

app.use(express.json());

routes(app);

const port = process.env.PORT || 5000;
app.listen(port);