var MongoClient = require('mongodb').MongoClient,
    settings = require('./db.js');

var fullMongoUrl = settings.mongoConfig.serverUrl + settings.mongoConfig.database;

function runSetup() {
    return MongoClient.connect(fullMongoUrl)
        .then(function(db) {
            db.createCollection("urls");
            return db.createCollection("counters");
        }).then(function(counterCollection) {

            return counterCollection.count().then(function(theCount) {
                // the result of find() is a cursor to MongoDB, and we can call toArray() on it
                if (theCount > 0) {
                    return counterCollection.find.toArray();
                }

                return counterCollection.insertOne({ _id: 0, last_num_id: 0 }).then(function(newDoc) {
                    return newDoc;
                }).then(function() {
                    return counterCollection.insertOne({ _id: 5, last_num_id: 12117361 });
                }).then(function() {
                    return counterCollection.insertOne({ _id: 7, last_num_id: 42180533641 });
                }).then(function() {
                    return counterCollection.find().toArray();
                });
            });
        });
}

// By exporting a function, we can run 
var exports = module.exports = runSetup;