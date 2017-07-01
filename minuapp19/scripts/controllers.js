'use strict';

angular.module('villaApp')
.controller('sulaliikumisedCtrl', ['$scope', '$http', function($scope, $http) {
	console.log("sulaliikumised controller");
$http.get('/api/v1/sulaliikumised/')
	.success(function(data) {
	$scope.sulaliikumised = data;
	})
	.error(function(error) {
		
	});
}])

.controller('sulamakseCtrl', ['$scope', '$http', function($scope, $http) {

$scope.addSulaMakse = function(){
 $http.post('/api/v1/sulamakse',  $scope.formData)
        .success(function(data) {
            $scope.formData = {};
			console.log("Success");
            $scope.successMakse ="Makse on lisatud" ;
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });
};
}])
.directive("datepicker", function () {
  return {
    restrict: "A",
    require: "ngModel",
    link: function (scope, elem, attrs, ngModelCtrl) {
      var updateModel = function (dateText) {
        scope.$apply(function () {
          ngModelCtrl.$setViewValue(dateText);
        });
      };
      var options = {
        dateFormat: "yy/mm/dd",
        onSelect: function (dateText) {
          updateModel(dateText);
            console.log(dateText)
            
        }
      };
      elem.datepicker(options);
    }
  }
})
.controller('sisseCtrl', ['$scope', '$http', function($scope, $http) {
$http.get('/api/v1/liikmed')
	.success(function(data) {
	$scope.liikmed = data;
	})
	.error(function(error) {
		
	});
	
$scope.addNoue = function(){

 $http.post('/api/v1/noue',  $scope.formData)
        .success(function() {
            $scope.formData = {};
			console.log("Success")
            $scope.successNoue ="Nõue on lisatud" ;
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });
}
}])

.controller('startCtrl', ['$scope', '$http', function($scope, $http) {
$http.get('/api/v1/liikmed')
	.success(function(data) {
	$scope.liikmed = data;
	})
	.error(function(error) {
		console.log("Error getting liikmed");
	});
}])

.controller('saldoCtrl', ['$scope', '$http', function($scope, $http) {
   

    $http.get('/api/v1/saldo')
        .success(function(data) {
            $scope.saldo = data;
            console.log(data);
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });

$scope.deleteNoue = function (selectedNoue)
{console.log("selectedNoue: "+selectedNoue)
    $http.delete('/api/v1/nouded/' + selectedNoue)
        .success(function(data) {
		$scope.getInfo();
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
		$scope.apply;}
  
}])

.controller('playerCtrl', ['$scope', '$http', function($scope, $http) {
    // Get all top headings
    $http.get('/api/v1/liikmed')
        .success(function(data) {
            $scope.liikmed = data;
            console.log(data);
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });
 
$scope.deleteNoue = function (selectedNoue){

    $http.delete('/api/v1/nouded/' + selectedNoue)
        .success(function(data) {
		$scope.getInfo();
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
		$scope.apply;}

	$scope.getInfo =  function(){  $http.get('/api/v1/nouded/'+$scope.selectedPlayer)
        .success(function(data) {
            $scope.nouded = data;
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });
		$http.get('/api/v1/pank/'+$scope.selectedPlayer)
        .success(function(data) {
            $scope.pank = data;
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });

	$http.get('/api/v1/panksumma/'+$scope.selectedPlayer)
        .success(function(data) {
            $scope.panksumma = data;
			$scope.panksummaint = parseInt($scope.panksumma[0]["summa"], 10); 

        })
        .error(function(error) {
            console.log('Error: ' + error);
        });
	
	$http.get('/api/v1/noudedsumma/'+$scope.selectedPlayer)
        .success(function(data) {
            $scope.noudedsumma = data;
			$scope.noudedsummaint = parseInt($scope.noudedsumma[0]["summa"], 10); 
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });

if ($scope.panksumma)
{$scope.kokku = $scope.panksumma[0]["summa"] - $scope.noudedsumma[0]["summa"] }
	}
}])
.controller('sulalCtrl', ['$scope', '$http', function($scope, $http) {
$http.get('/api/v1/liikmed')
	.success(function(data) {
	$scope.liikmed = data;
	})
	.error(function(error) {
		
	});
	
$scope.addSulaL = function(){
 $http.post('/api/v1/sulalaekumine',  $scope.formData)
        .success(function(data) {
            $scope.formData = {};
			console.log("Success")
            $scope.successLaekumine ="Laekumine on lisatud" ;
		$scope.enteredLaekumine = data[0];
			console.log('$scope.enteredLaekumine: ' + $scope.enteredLaekumine);
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });
};
}])

.controller('kokkuCtrl', ['$scope', '$http', function($scope, $http) {
$http.get('/api/v1/ette')
	.success(function(data) {
	$scope.ettemaksud = parseFloat(data[0]['ette']);
	})
	.error(function(error) {
		
	});

$http.get('/api/v1/makskpv')
	.success(function(data) {
	$scope.makskpv = data[0]['max'];
	})
	.error(function(error) {
		
	});
	
$http.get('/api/v1/lvolad')
	.success(function(data) {
	$scope.lvolad = parseFloat(data[0]['lvolad']);
	console.log(data[0]['lvolad']);
	})
	.error(function(error) {
		
	});
	
$http.get('/api/v1/pangas')
	.success(function(data) {
	$scope.pangas = parseFloat(data[0]['pangas']);
	})
	.error(function(error) {
		
	});
	
$http.get('/api/v1/sula')
	.success(function(data) {
	$scope.sula =parseFloat(data[0]['sula']);
	})
	.error(function(error) {
		
	});
	
}])