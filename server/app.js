require('express-async-errors');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

//Routers
const rankRotuer = require('./routes/rank');
const wordRouter = require('./routes/word');

const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.static('./public'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(morgan());

//Routes
app.use('/word', rankRotuer);
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
