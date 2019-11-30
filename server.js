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
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/contact', (req, res) => {
  res.render('contact');
})

app.get('/broken', (req, res) => {
  throw new Error('Broken!');
});

app.use('*', (req, res) => {
  res.status(404).render('404', { url: req.originalUrl });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500');
});

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
