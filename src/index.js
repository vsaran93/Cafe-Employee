const express = require('express');
const app = express();
const port = process.env.PORT || 3008;
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/api/v1', routes);

app.listen(port, () => {
    console.log(`app is running on ${port}`);
});
