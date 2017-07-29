folhaLimpaApp.controller('UnidadeController',
    ['$scope', '$http', '$routeParams', '$location', '$window', 'APIURL',
    function ($scope, $http, $routeParams, $location, $window, APIURL) {

    var unidadeId = $routeParams.unidadeId;
    $scope.mesInicio = $routeParams.mesInicio;
    $scope.mesFim = $routeParams.mesFim;
    $scope.anoInicio = $routeParams.anoInicio;
    $scope.anoFim = $routeParams.anoFim;

    var months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
    $scope.mesInicioText = months[$scope.mesInicio-1];
    $scope.mesFimText = months[$scope.mesFim-1];

    var PAGAMENTOS_URL = `${APIURL}pagamentos/unidade/${unidadeId}?mes_inicio=${$scope.mesInicio}&ano_inicio=${$scope.anoInicio}&mes_fim=${$scope.mesFim}&ano_fim=${$scope.anoFim}`;
    var PAGAMENTOS_INFO_URL = `${APIURL}pagamentos_info/unidade/${unidadeId}?mes_inicio=${$scope.mesInicio}&ano_inicio=${$scope.anoInicio}&mes_fim=${$scope.mesFim}&ano_fim=${$scope.anoFim}`;
    var PAGAMENTOS_CSV_URL = `${APIURL}pagamentos_csv/unidade/${unidadeId}?mes_inicio=${$scope.mesInicio}&ano_inicio=${$scope.anoInicio}&mes_fim=${$scope.mesFim}&ano_fim=${$scope.anoFim}&page_size=500`;

    $scope.activeButton = 'chart';

    $scope.setActiveButton = function (buttonName) {
        $scope.activeButton = buttonName;
    };

    $scope.downloadCSV = function() {
        $window.location.href = PAGAMENTOS_CSV_URL;
    };

    // carrega informações sobre os pagamentos de uma unidade gestora
    var loadInfo = function() {
        $http.get(APIURL + "unidadesgestoras/" + unidadeId).then(function(response) {
            var data = response.data;

            $scope.unidadeName = data.nome;

        }, function(response) { console.log("erro") });

        $http.get(PAGAMENTOS_INFO_URL).then(function(response) {
            var data = response.data;

            $scope.totalPago = data.total;
            $scope.media = data.average;
            $scope.totalPagamentos = data.quantity;

        }, function(response) { console.log("erro") });
    };

    // carrega informações para o gráfico
    var loadChartData = function() {
        $http.get(PAGAMENTOS_URL).then(function(response) {
            responseData = response.data.results.slice(0, 20);
            
            $scope.chartData = [];

            responseData.forEach(function(element, index) {
                $scope.chartData.push({"pagamento": parseFloat(element.valor), "id": index, "text": element.nome_servidor})
            });

            $scope.$broadcast("DataReady", {elementid: "treemapchart", data: $scope.chartData });

        }, function(response) { console.log("erro") });
    };


    // carrega informações para tabela
    var loadTableData = function() {
        $scope.tableLoading = true;

        $http.get(PAGAMENTOS_URL+ "&page_size=500").then(function(response) {
            $scope.rowContent = [];
            var responseData = response.data.results;

            responseData.forEach(function(element) {
                var dataElements = element.data_pagamento.split("-");
                var dataToShow = dataElements[1] + "/" + dataElements[0];

                $scope.rowContent.push({name: element.nome_servidor,
                            idServidor: element.id_servidor,
                            cargo: element.cargo,
                            data: dataToShow,
                            pagamento: parseInt(element.valor, 10)});
            });

            $scope.tableLoading = false;
        });
    }

    loadInfo();
    loadChartData();
    loadTableData();
}]);

