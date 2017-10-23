/**
 *
 * server.js
 * import dependencies
 * handles routing and models
 *
 */

const express       = require('express'),
      mongoose      = require('mongoose'),
      exphb         = require('express-handlebars'),
      path          = require('path'),
      bodyParser    = require('body-parser');

const app           = express();

// connection to database
const connection = process.env.MONGODB_URI || 'mongodb://127.0.0.1/strainsTesting';
mongoose.connect(connection, {
    useMongoClient: true
})

var Review =  require('./models/review');

// configure app
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('handlebars', exphb({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.get('/', function(req, res) {
    Review.find(function(err, reviews) {
        if (err) {
            console.log(err);
        } else {
            res.render('home', { review: reviews });
        }
    });
});

app.post('/', function(req, res) {
    console.log(req.body);

    var review = new Review({
        title: req.body.title,
        text: req.body.text,
    });

    review.save(function(err, post) {
        if (err) {
            console.log(err)
            return res.redirect('/review/new');
        } else {
            res.redirect('/');
        }
    });
});

app.get('/review/new', function(req, res) {
    res.render('new-review', {});
});

app.post('/review/edit', function(req, res) {
    console.log(req.body.id);

    Review.findById(req.body.id, function(err, review) {
        res.render('edit-review', {title: review.title, text: review.text, idToUpdate: req.body.id});
    });
});

app.post('/review/update', function(req, res) {
    Review.findById(req.body.id, function(err, review) {
        Review.findOne({ _id: req.body.id }, function (err, review) {
            console.log(review);

            review.text = req.body.text;
            review.title = req.body.title;
            review.save();

            console.log(review);
        });

        console.log(review);
    });

    res.load('/');
});

app.post('/review/delete', function(req, res) {
    Review.findByIdAndRemove(req.body.id, function(err) {
        res.redirect('/');
    });
});

// server start on 'port'
app.listen(process.env.PORT || 3000, function () {
    console.log("Listening on port " + app.get('port'));
});
