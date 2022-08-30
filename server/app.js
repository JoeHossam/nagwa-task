// Main Packages
require('express-async-errors');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.static('./public'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(morgan());

// Routers
const rankRotuer = require('./routes/rank');
const wordRouter = require('./routes/word');

//Routes
app.use('/word', wordRouter);
app.use('/rank', rankRotuer);

//handling not found links
app.use((req, res) => res.status(404).json({ msg: 'path does not exist' }));

const port = 3001;
const start = async () => {
    try {
        app.listen(port, console.log(`Listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};

start();
