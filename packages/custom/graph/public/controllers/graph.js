(function () {
  'use strict';

  /* jshint -W098 */
  angular
    .module('mean.graph')
      .controller('GraphController', GraphController)
      .controller('VisController', VisController)
  .controller('ProjectController', ProjectController);

  GraphController.$inject = ['$scope', 'Global', 'Graph'];
  VisController.$inject = ['$scope','$http'];
  ProjectController.$inject = ['$scope','$http','FileUploader'];

  function GraphController($scope, Global, Graph) {
    $scope.global = Global;
    $scope.package = {
      name: 'graph'
    };
  }

  function ProjectController($scope, $http, FileUploader) {
    var uploader = $scope.uploader = new FileUploader({
      url: '/api/graph/uploads'
    });

    // FILTERS

    uploader.filters.push({
      name: 'customFilter',
      fn: function(item /*{File|FileLikeObject}*/, options) {
        return this.queue.length < 10;
      }
    });

    // CALLBACKS

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
      console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
      console.info('onAfterAddingFile', fileItem);
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
      console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
      console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
      console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
      console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
      console.info('onSuccessItem', fileItem, response, status, headers);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
      console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
      console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
      console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function() {
      console.info('onCompleteAll');
    };

    console.info('uploader', uploader);

  }

  function VisController($scope,$http) {
    console.log('hi')
    $http.get('api/graph/result')
        .success(function (data) {
          redrawAll(data.data.edges, data.data.nodes)

        }).error(function(data, status, headers, config) {

        });

    function redrawAll(edges,nodes) {
      var network;
      var allNodes;
      var highlightActive = false;
      var nodesDataset = new vis.DataSet(nodes);
      var edgesDataset = new vis.DataSet(edges);

      var container = document.getElementById('mynetwork');
      var options = {
        nodes: {
          shape: 'dot',
          scaling: {
            min: 10,
            max: 30,
            label: {
              min: 8,
              max: 30,
              drawThreshold: 12,
              maxVisible: 20
            }
          },
          font: {
            size: 12,
            face: 'Tahoma'
          }
        },
        edges: {
          width: 0.15,
          color: {inherit: 'from'},
          smooth: {
            type: 'continuous'
          }
        },
        physics: false,
        interaction: {
          tooltipDelay: 200,
          hideEdgesOnDrag: true
        }
      };
      var data = {nodes:nodesDataset, edges:edgesDataset}
      network = new vis.Network(container, data, options);
      // get a JSON object
      allNodes = nodesDataset.get({returnType:"Object"});
    }
  }
})();