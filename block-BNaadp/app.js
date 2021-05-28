let express = require('express');
let cookieParse = require('cookie-parser');

let app = express();

app.use(cookieParse());

app.get('/', (req, res) => {
  res.cookie('name', 'Ayush');
  let kuKey = req.cookies;
  res.send(kuKey);
});

app.listen(3000, () => {
  console.log('Server is running');
});
