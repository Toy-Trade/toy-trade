const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
app.use(express.static(path.join(__dirname, './toytrade/dist/toytrade')));

app.use(express.static("public"));

app.get('/', (req, res) => {
  res.send();
});

app.listen(port, () => {
  console.log('Listening on *:3000');
});