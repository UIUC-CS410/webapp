(function () {
  'use strict';

  /* jshint -W098 */
  angular
    .module('mean.graph')
      .controller('GraphController', GraphController)
      .controller('VisController', VisController);

  GraphController.$inject = ['$scope', 'Global', 'Graph'];
  VisController.$inject = ['$scope','$http'];

  function GraphController($scope, Global, Graph) {
    $scope.global = Global;
    $scope.package = {
      name: 'graph'
    };

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