const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback');

app = express();

app.use(history({
    disableDotRule: true,
    htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
}));

app.use(express.static(path.join(__dirname, '/dist')));

const port = process.env.PORT || 8080;
app.listen(port);
