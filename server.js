
// Importing Modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


// Define Global Variables
const app = express();
const log = console.log;
const PORT = process.env.PORT || 8080;

// Configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static( 'client/build' ));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
    });
}

app.listen(PORT, () => {
    log(`Server is starting at PORT: ${PORT}`);
});