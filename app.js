const express = require('express');
const app = express()
const port = 3000;
// const connect = require('./routes/index');

// connect();

app.get('/', (req, res) => {
    res.send('hai guys!');
});

app.listen(port, () => {
    console.log(port, 'Server is open with port!');
});
