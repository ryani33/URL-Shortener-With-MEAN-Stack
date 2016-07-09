var express = require('express');
var app = express();
var path = require('path');
var rules = require('./models/rules.js');
var url = require('./models/data.js');
var config = require('./models/db.js');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/api/shorten', function(req, res){
    if (!request.body.type) {
        var type = 0;
    } else {
        var type = request.body.type;
    }
    url.createUrl(request.body.longurl, type).then(function(url) {
        console.log(url);
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
            //res.redirect(config.webhost);
        }
});

console.log(id);

});

// We can now navigate to localhost:3000
app.listen(3000, function() {
    console.log('Your server is now listening on port 3000! Navigate to http://localhost:3000 to access it');
});
