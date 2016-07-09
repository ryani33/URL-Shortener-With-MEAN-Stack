var exports = module.exports = {};
var os = require("os");

exports.mongoConfig = {
    serverUrl: "mongodb://localhost:27017/",
    database: "url"        
};

exports.webhost = "http://" + os.hostname();
