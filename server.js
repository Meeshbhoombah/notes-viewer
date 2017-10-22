/**
 * server.js
 */

const express       = require('express'),
      mongoose      = require('mongoose'),
      exphb         = require('express-handlebars'),
      path          = require('path'),
      bodyParser    = require('body-parser');

const app           = express();

// connection to database
const connection = 'mongodb://127.0.0.1/feedback';
mongoose.connect(connection, {
    useMongoClient: true
})

// configure app
app.set('port', 3000);
app.set('views', __dirname + '/views');
app.engine('handlebars', exphb({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// routes
app.get('/' function(req, res) {
    
});

// server start on 'port'
app.listen(app.get('port'), function () {
    console.log("Listening on port " + app.get('port'));
}); 

