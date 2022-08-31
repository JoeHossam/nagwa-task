const app = require('./app');
const port = 3001;
const start = async () => {
    try {
        app.listen(port, console.log(`Listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};

start();
