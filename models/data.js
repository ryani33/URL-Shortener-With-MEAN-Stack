var MongoClient = require('mongodb').MongoClient,
    settings = require('./db.js'),
    rules = require('./rules.js'),
    startup = require('./startup.js');

var fullMongoUrl = settings.mongoConfig.serverUrl + settings.mongoConfig.database;
var exports = module.exports = {};

startup().then(function(data) {
    console.log("After the setup has been complete, we have the following init data:");
    console.log(data);
});

MongoClient.connect(fullMongoUrl)
    .then(function(db) {
        var urlCollection = db.collection("urls");
        var counterCollection = db.collection("counters");
        
        /* user system related funcs */
        exports.createUrl = function(longUrl, type) {
            if (!longUrl) return Promise.reject("You must provide a longUrl");

            return urlCollection.find({ long_url: longUrl }).limit(1).toArray().then(function(listOfUrls) {
                if (listOfUrls.length != 0) {
                    updateTimestamp(listOfUrls[0]._id);
                    return listOfUrls[0];
                } else {
                    return counterCollection.update({ _id: type }, { $inc: { "last_num_id": 1
                                                                            } }).then(function() {
                        return urlCollection.insertOne({ _id: findLastNumID(type),
                                                    long_url: longUrl,
                                                   short_url: generate_short(findLastNumID(type)),
                                                   timestamp: new Date()
                        }).then(function(newDoc) {
                            return exports.findUrlByID(newDoc.insertedId);
                        });
                    });
                }
            });
        };

        exports.findUrlByID = function(id) {
            if (!id) return Promise.reject("You must provide a id");

            return urlCollection.find({ _id: id }).limit(1).toArray().then(function(listOfUrls) {
                if (listOfUrls.length === 0) {
                    throw "Could not find user with ID of " + id;
                }
                return listOfUrls[0];
            });
        };

        exports.findUrlAll = function() {
            return urlCollection.find().toArray().then(function(listOfUrls) {
                return listOfUrls;
            });
        };

        updateTimestamp = function(id) {
            return userCollection.update({ _id: id }, { $set: { timestamp: new Date()
                                                              } }).then(function() {
                return exports.findUrlByID(id);
            });
        };

        findLastNumID = function(type) {
            return counterCollection.find({ _id: type }).limit(1).toArray().then(function(item) {
                return item[0].last_num_id;
            });
        };

        generate_short = function(id) {
            return rules.encode(id);
        };
    });