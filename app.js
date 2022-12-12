const express = require('express');
const cors = require('cors')
const app = express()
app.use(cors())
const port = 3000;
// const connect = require('./routes/index');

// connect();

app.get('/', (req, res) => {
    res.send('hai guys!');
});
app.get('/test', (req, res) => {
    res.send('hai test!');
});

app.listen(port, () => {
    console.log(port, 'Server is open with port!');
});
