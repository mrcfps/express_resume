const express = require('express');
const path = require('path');

const hostname = 'localhost';
const port = 3000;

const app = express();

app.set('views', 'views');
app.set('view engine', 'hbs');

function loggingMiddleware(req, res, next) {
  const time = new Date();
  console.log(`[${time.toLocaleString()}] ${req.method} ${req.url}`);
  next();
}

app.use(loggingMiddleware);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/contact', (req, res) => {
  res.render('contact');
})

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
