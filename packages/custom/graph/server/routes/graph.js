(function () {
  'use strict';
  var api = require('../controllers/graph');

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
  };
})();
