var folhaLimpaApp = angular.module('folhaLimpaApp', ['countUpModule', 'angular-d3plus', 'smart-table']);

folhaLimpaApp.controller('IndexController', ['$scope', function ($scope) {
    $scope.teste = 'abc';
    $scope.cases = [{ title: 'Pagamentos na Prefeitura de Bayeux', img: 'bayeux', href: 'ugestora.html' },
    { title: 'Pagamentos na Prefeitura de Lucena', img: 'bayeux', href: 'servidor.html' },
    { title: 'Pagamentos na Prefeitura de João Pessoa', img: 'bayeux', href: 'ugestora.html' }]
}]);


folhaLimpaApp.controller('InternalController', ['$scope', '$http', function ($scope, $http) {
    $scope.activeButton = 'chart';

    $scope.setActiveButton = function (buttonName) {
        $scope.activeButton = buttonName;
    }

    $scope.options = {
          useEasing: true,
          useGrouping: true,
          separator: '.',
          decimal: ',',
    };

    $scope.baseData = [];
    $http.get("http://127.0.0.1:5000/servidor/").then(function(response) {
        $scope.$broadcast("DataReady", {elementid: "barchart", data: response.data });
    }, function(response) { console.log("erro") });

    $scope.treemapData = []
    $http.get("http://127.0.0.1:5000/ugestora/").then(function(response) {
        $scope.$broadcast("DataReady", {elementid: "treemapchart", data: response.data });
    }, function(response) { console.log("erro") });

    $scope.rowContent = [];
    $http.get("http://127.0.0.1:5000/ugestora/").then(function(response) {
        $scope.rowContent = response.data;
    }, function(response) { console.log("erro") });


}]);