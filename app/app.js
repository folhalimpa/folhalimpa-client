var folhaLimpaApp = angular.module('folhaLimpaApp',
    ['ngRoute', 'countUpModule', 'angular-d3plus', 'smart-table', 'ng-bootstrap-select', 'ui.bootstrap']);

folhaLimpaApp.config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'app/pages/initial.html',
                controller: 'InitialController'
            }).
            when('/unidade/:unidadeId/:mesInicio/:anoInicio/:mesFim/:anoFim', {
                templateUrl: 'app/pages/unidade.html',
                controller: 'UnidadeController'
            }).
            when('/servidor/:servidorId/:mesInicio/:anoInicio/:mesFim/:anoFim', {
                templateUrl: 'app/pages/servidor.html',
                controller: 'ServidorController'
            }).
            when('/faq/', {
                templateUrl: 'app/pages/faq.html',
            }).
            otherwise({ redirectTo: '/' });

        $locationProvider.html5Mode(true);
    }
]);

