var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var os = require("os");
var morgan = require('morgan');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('static'));
app.use(morgan('combined'));

var port = process.env.PORT || 8080;
var message = process.env.MESSAGE || "presented by GlueOps";

app.get('/', function (req, res) {
  res.render('home', {
    message: message,
    hostName: os.hostname()
  });
});

app.listen(port, function () {
  console.log("Listening on: http://%s:%s", os.hostname(), port);
});


const DATABASE_USERNAME = process.env.DATABASE_USERNAME
const DATABASE_NAME = process.env.DATABASE_NAME
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD
const DATABASE_HOST = process.env.DATABASE_HOST
const DATABASE_PORT = process.env.DATABASE_PORT


const { Client } = require('pg')
process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});

const client = new Client({
  user: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  database: DATABASE_NAME,
  ssl: true
})



client.connect()



app.get('/database', async (request, response) => {
  client.query('SELECT * FROM pg_catalog.pg_tables', (error, result) => {
    if (error) throw error;

    response.send(result.rows[0]);
  });
});

app.get('/time', async (request, response) => {
  client.query('SELECT NOW()', (error, result) => {
    if (error) throw error;

    response.send(result.rows[0]);
  });
});
