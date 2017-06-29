var folhaLimpaApp = angular.module('folhaLimpaApp', ['countUpModule']);

folhaLimpaApp.controller('IndexController', ['$scope', function ($scope) {
    $scope.teste = 'abc';
    $scope.cases = [{ title: 'Pagamentos na Prefeitura de Bayeux', img: 'bayeux', href: 'ugestora.html' },
    { title: 'Pagamentos na Prefeitura de Lucena', img: 'bayeux', href: 'servidor.html' },
    { title: 'Pagamentos na Prefeitura de João Pessoa', img: 'bayeux', href: 'ugestora.html' }]
}]);


folhaLimpaApp.controller('InternalController', ['$scope', function ($scope) {
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
}]);