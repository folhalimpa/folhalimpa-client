folhaLimpaApp.controller('AnalyzeFormController',
    ['$scope', '$http', '$location', '$window', 'APIURL',
    function ($scope, $http, $location, $window, APIURL) {

    // load unidades gestoras
    $http.get(APIURL + "unidadesgestoras/?page_size=635").then(function(response) {
        $scope.names = response.data.results.map(function(element) {
            var nome = element.nome;
            if (element.nome.length > 50) {
                return nome.slice(0, 50-3) + "...";
            }

            return {nome: nome, id: element.id}; 
        });

    });

    // run new analysis
    $scope.analyzeInitial = function() {
        if ($scope.model) {
            var id = $scope.model.id;
        }

        if ($scope.analysisType === "pagamentos" && id) {
            $location.path(`unidade/${id}/7/2016/7/2017`);
        } else if ($scope.analysisType === "cargos") {
            $window.location.href = "/acumulo/acumulador.html";
        }

    };

    $scope.analyze = function() {
        if ($scope.model) {
            var id = $scope.model.id;
        }

        if ($scope.dt) {
            var mesInicio = $scope.dt.getMonth() + 1;
            var anoInicio = $scope.dt.getFullYear();
        }

        if ($scope.dt2) {
            var mesFim = $scope.dt2.getMonth() + 1;
            var anoFim = $scope.dt2.getFullYear();
        }

        if (id && mesInicio && mesFim && anoInicio && anoFim) {
            $location.path(`unidade/${id}/${mesInicio}/${anoInicio}/${mesFim}/${anoFim}`);
        }          
    };

    $scope.analyzeServidor = function() {
        var id = $scope.$parent.servidorId;

        if ($scope.dt) {
            var mesInicio = $scope.dt.getMonth() + 1;
            var anoInicio = $scope.dt.getFullYear();
        }

        if ($scope.dt2) {
            var mesFim = $scope.dt2.getMonth() + 1;
            var anoFim = $scope.dt2.getFullYear();
        }

        if (id && mesInicio && mesFim && anoInicio && anoFim) {
            $location.path(`servidor/${id}/${mesInicio}/${anoInicio}/${mesFim}/${anoFim}`);
        }          
    };

    // datepicker configuration
    $scope.datePopups = {
        opened1: false,
        opened2: false
    };

    $scope.openDatePopup1 = function() {
        $scope.datePopups.opened1 = true;
    };

    $scope.openDatePopup2 = function() {
        $scope.datePopups.opened2 = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(),
        minDate: new Date(2005, 1, 1),
        startingDay: 1,
        datepickerMode: "month",
        minMode: "month"
    };

    $scope.format = 'MMMM-yyyy';    

}]);
