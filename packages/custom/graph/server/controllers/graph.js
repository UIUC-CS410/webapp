var data = require('./result.js');
var mongoose = require('mongoose');
var fs = require('fs');
var PaperModel = mongoose.model('Paper');

module.exports = {
  getResult: function(req, res) {
    res.status(200).json(data);
  },
  loadPaperData: function(req, res) {
    console.log(process.cwd())
    fs.readFile('./packages/custom/graph/server/data/papers.txt', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      var papers=JSON.parse(data);
      console.log(papers.length)
      for (var prop in papers) {
        // skip loop if the property is from prototype
        if(!papers.hasOwnProperty(prop)) continue;
        var newItem = new PaperModel({
          name: papers[prop],
          id: parseInt(prop)
        });
        newItem.save(function(err, item) {
          if (err) {
            console.log("Error adding new paper: " + err.message);
          }
        });
      }
      res.json(201)
      //console.log(authors.length);
    });
  },
  loadDefinitionData: function(fileName, modelName, cb) {
    fs.readFile('./packages/custom/graph/server/data/'+fileName, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      var terms=JSON.parse(data);
      var model = mongoose.model(modelName)

      for (var prop in terms) {
        // skip loop if the property is from prototype
        if(!terms.hasOwnProperty(prop)) continue;
        var newItem = new model({
          name: terms[prop],
          id: parseInt(prop)
        });
        newItem.save(function(err, item) {
          if (err) {
            console.log("Error adding new data: " + err.message);
          }
        });
      }
      cb();
    });
  },
  loadIndexData: function(fileName, modelName, cb) {
    fs.readFile('./packages/custom/graph/server/data/'+fileName, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      var array=JSON.parse(data);
      var model = mongoose.model(modelName)
      console.log(array.length)
      for(var i=1; i<=array.length; i++){
        var id=array[i-1];
        var newItem = new model({
          index: i,
          id: parseInt(id)
        });
        newItem.save(function(err, item) {
          if (err) {
            console.log("Error adding new data: " + err.message);
          }
        });
      }

      cb();
    });
  }
};