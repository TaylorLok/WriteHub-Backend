const express = require('express');


const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!, Welcome to Write Hub Blog. I have just added Nodemon for autoload of the file');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

