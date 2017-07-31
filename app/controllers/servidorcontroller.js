folhaLimpaApp.controller('ServidorController',
    ['$scope', '$http', '$routeParams', '$window', 'APIURL',
    function ($scope, $http, $routeParams, $window, APIURL) {
        
    $scope.servidorId = $routeParams.servidorId;
    $scope.mesInicio = $routeParams.mesInicio;
    $scope.mesFim = $routeParams.mesFim;
    $scope.anoInicio = $routeParams.anoInicio;
    $scope.anoFim = $routeParams.anoFim;    

    var months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
    $scope.mesInicioText = months[$scope.mesInicio-1];
    $scope.mesFimText = months[$scope.mesFim-1];

    var PAGAMENTOS_URL = `${APIURL}pagamentos/servidor/${$scope.servidorId}?mes_inicio=${$scope.mesInicio}&ano_inicio=${$scope.anoInicio}&mes_fim=${$scope.mesFim}&ano_fim=${$scope.anoFim}`;
    var PAGAMENTOS_INFO_URL = `${APIURL}pagamentos_info/servidor/${$scope.servidorId}?mes_inicio=${$scope.mesInicio}&ano_inicio=${$scope.anoInicio}&mes_fim=${$scope.mesFim}&ano_fim=${$scope.anoFim}`;
    var PAGAMENTOS_CSV_URL = `${APIURL}pagamentos_csv/servidor/${$scope.servidorId}?mes_inicio=${$scope.mesInicio}&ano_inicio=${$scope.anoInicio}&mes_fim=${$scope.mesFim}&ano_fim=${$scope.anoFim}&page_size=500`;
    
    $scope.activeButton = 'chart';

    $scope.setActiveButton = function (buttonName) {
        $scope.activeButton = buttonName;
    }

    $scope.downloadCSV = function() {
        $window.location.href = PAGAMENTOS_CSV_URL;
    };

    // carrega informações sobre os pagamentos de um servidor
    var loadInfo = function() {
        $http.get(APIURL+"servidores/" + $scope.servidorId).then(function(response) {
            var data = response.data;
            $scope.servidorName = data.nome;

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
            responseData = response.data.results;
            $scope.chartData = [];

            responseData.forEach(function(element, index) {
                var dateElements = element.data_pagamento.split("-");
                var dateToShow = dateElements[1] + "/" + dateElements[0];
                var date = new Date(dateElements[0], dateElements[1]-1);

                $scope.chartData.push({"pagamento": parseFloat(element.valor), "id": index, "data": date, "text": dateToShow})
            });

            $scope.$broadcast("DataReady", {elementid: "barchart", data: $scope.chartData });

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

                $scope.rowContent.push({nomeUnidade: element.nome_unidade, 
                            idUnidade: element.id_unidade_gestora,
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

