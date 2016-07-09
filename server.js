var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var rules = require('./models/rules.js');
var url = require('./models/data.js');
var config = require('./models/db.js');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/all', function(req, res){
    url.findUrlAll().then(function(doc){
        res.json(doc);
    });
});

app.post('/api/shorten', function(req, res){
    var short_hostname = config.webhost + ":" + listener.address().port;
    url.createUrl(req.body.longurl, req.body.type, short_hostname).then(function(url) {
        res.sendFile(path.join(__dirname, 'views/index.html'));
    }, function(error) {
        res.sendFile(path.join(__dirname, 'views/index.html'));
    });
});

app.get('/:encoded_id', function(req, res){
    var str = req.params.encoded_id;
    var id = rules.decode(str);

    url.findUrlByID(id).then(function(doc){
        if (doc) {
            res.redirect(doc.long_url);
        } else {
            res.redirect(config.webhost + ":" + listener.address().port);
        }
    });
});

// We can now navigate to localhost:3000
var listener = app.listen(3000, function() {
    console.log('Your server is now listening on port 3000! Navigate to http://localhost:3000 to access it');
});
