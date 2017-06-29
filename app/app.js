var folhaLimpaApp = angular.module('folhaLimpaApp', []);

folhaLimpaApp.controller('IndexController', ['$scope', function($scope) {
    $scope.teste = 'abc';
    $scope.cases = [{title: 'Pagamentos na Prefeitura de Bayeux', img: 'bayeux'}, 
                    {title: 'Pagamentos na Prefeitura de Lucena', img: 'bayeux'},
                    {title: 'Pagamentos na Prefeitura de João Pessoa', img: 'bayeux'}]
}]);


folhaLimpaApp.controller('InternalController', ['$scope', function($scope) {
    $scope.activeButton = 'chart';

    $scope.setActiveButton = function(buttonName) {
        $scope.activeButton = buttonName;
    }
}]);