const express = require('express');
const cors = require('cors')
const app = express()
const {about} = require('./router')
const port = 3000;

app.use(cors())
app.use(express.json());
// const connect = require('./models/index');

// connect();

app.get('/', (req, res) => {
    res.send('hai guys!');
});

app.use("/", [about]);

app.listen(port, () => {
    console.log(port, 'Server is open with port!');
});
