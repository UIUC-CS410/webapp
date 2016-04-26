(function () {
  'use strict';
  var api = require('../controllers/graph');
  var mongoose = require('mongoose');

  /* jshint -W098 */
  // The Package is past automatically as first parameter
  module.exports = function (Graph, app, auth, database) {

    app.get('/api/graph/result', api.getResult);

    app.get('/api/graph/example/auth', auth.requiresLogin, function (req, res, next) {
      res.send('Only authenticated users can access this');
    });

    app.get('/api/graph/example/admin', auth.requiresAdmin, function (req, res, next) {
      res.send('Only users with Admin role can access this');
    });

    app.get('/api/graph/example/render', function (req, res, next) {
      Graph.render('index', {
        package: 'graph'
      }, function (err, html) {
        //Rendering a view from the Package server/views
        res.send(html);
      });
    });

    app.use(require('skipper')());

    app.post('/api/graph/uploads', function (req, res, next) {
      console.log(req.file('file'))
      req.file('file').upload({
        adapter: require('skipper-gridfs'),
        uri: 'mongodb://localhost:27017/mean-dev.fs'
        //dirname:'/Users/xin/Documents/Develop/GraphSearchEngine/webapp/uploads'
      }, function (err, uploadedFiles) {
        if (err) {
          console.log(err)
          return res.status(500).send(err);
        }
        console.log(uploadedFiles)
        return res.status(200).send({
          message: uploadedFiles.length + ' file(s) uploaded successfully!',
          files: uploadedFiles
        });
      });
    });

    app.get('/api/graph/download',function(req,res,next){
      var blobAdapter = require('skipper-gridfs')({
        uri: 'mongodb://localhost:27017/mean-dev.fs'
      });

      //var fd = req.params.fd; // value of fd comes here from get request
      var fd='394b0125-96a8-4a8d-a995-96ca5cb79c0a.txt';
      blobAdapter.read(fd, function(error , file) {
        console.log(file)
        if(error) {
          res.json(error);
        } else {
          res.contentType('text/plain');
          res.send(new Buffer(file));
        }
      });
    });

    app.post('/api/graph/definition/author',function(req,res,next){
      api.loadDefinitionData('authors.json', 'Author', function(){
        res.json(201);
      });
    });

    app.post('/api/graph/definition/paper',function(req,res,next){
      api.loadPaperData(req,res);
    })

    app.post('/api/graph/definition/term',function(req,res,next){
      api.loadDefinitionData('terms.json', 'Term', function(){
        res.json(201);
      });
    })

    app.post('/api/graph/definition/venue',function(req,res,next){
      api.loadDefinitionData('venues.json', 'Venue', function(){
        res.json(201);
      });
    })

    app.post('/api/graph/index/author',function(req,res,next){
      api.loadIndexData('authorIndex.json', 'AuthorIndex', function(){
        res.json(201);
      });
    })

    app.post('/api/graph/index/paper',function(req,res,next){
      api.loadIndexData('paperIndex.json', 'PaperIndex', function(){
        res.json(201);
      });
    })

    app.post('/api/graph/index/term',function(req,res,next){
      api.loadIndexData('termIndex.json', 'TermIndex', function(){
        res.json(201);
      });
    })

    app.post('/api/graph/index/venue',function(req,res,next){
      api.loadIndexData('venueIndex.json', 'VenueIndex', function(){
        res.json(201);
      });
    })

    //var multer  = require('multer');
    //var upload = multer({ dest: './uploads' })
    //app.post('/api/graph/uploads', upload.single('file'), function (req, res, next) {
    //  console.log(req.file);
    //  res.sendStatus(200);
    //});

  };
})();
