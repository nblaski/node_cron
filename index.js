require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const bodyParser = require('body-parser');
const port = 3010;
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(express.static('public'));
app.use('/static', express.static(path.join(__dirname, 'public')));

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const connectionParams={
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
mongoose.connect(process.env.DATABASE_URL,connectionParams)
  .then( () => {
      console.log('Connected to the database!')
  })
  .catch( (err) => {
      console.error(`Error connecting to the database. n${err}`);
  })

app.use('/', require('./routes/index.js'));
   
app.listen(port, () => console.log(`node-cron app listening on port ${port}!`));