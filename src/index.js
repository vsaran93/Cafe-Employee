const express = require('express');
const app = express();
const port = process.env.PORT;

const routes = require('./routes');

app.use('/app/v1', routes);

app.listen(port, () => {
    console.log(`app is running on ${port}`);
});
