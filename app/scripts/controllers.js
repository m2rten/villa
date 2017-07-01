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
.controller('panksisseCtrl', ['$scope', '$http', '$Upload', function($scope, $http, Upload) {
	console.log("pangaliikumised controller");

$scope.addDataFromFile = function(){
 console.log("AddDataFromFile");
$http.post('/api/v1/sisestapank/')
	.success(function(data) {
	$scope.pangaliikumised = data;
	})
	.error(function(error) {
		
	});
}
}])

.controller('sulamakseCtrl', ['$scope', '$http', function($scope, $http) {

console.log($scope.formData);
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
$scope.lisaBulk = function(){
	console.log($scope.bulkData);
 $http.post('/api/v1/loo_nouded',  $scope.bulkData)
        .success(function(data) {
            $scope.bulkData = {};
			console.log("Success");
			$scope.nouded = data;
            $scope.successNouded ="Järgnevad nõuded on lisatud" ;
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });
}
	
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


.controller('saajadCtrl', ['$scope', '$http', function($scope, $http) {
   

    $http.get('/api/v1/saajad')
        .success(function(data) {
            $scope.saajad = data;
            console.log(data);
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });
  
}])




.controller('playerCtrl', ['$scope', '$http', '$state', '$stateParams', function($scope, $http, $state, $stateParams) {
    // Get all top headings


	   	console.log($stateParams);
	$scope.selectedPlayer=$stateParams.player_id;




 
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
		    $http.get('/api/v1/liikmed')
        .success(function(data) {
            $scope.liikmed = data;
           						for (var i = 0; i < $scope.liikmed.length; i++){
		console.log($scope.liikmed[i]);
		if ($scope.liikmed[i]["id"]==$scope.selectedPlayer)
		{
			$scope.eesnimi  = $scope.liikmed[i]["firstname"];
			$scope.perenimi  = $scope.liikmed[i]["lastname"];
		}
		
	}
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
	if ($scope.selectedPlayer) {$scope.getInfo()}
	else{
		    $http.get('/api/v1/liikmed')
        .success(function(data) {
            $scope.liikmed = data;
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });		
		
	}
}])
.controller('sulalCtrl', ['$scope', '$http', function($scope, $http) {
$http.get('/api/v1/liikmed')
	.success(function(data) {
	$scope.liikmed = data;
	})
	.error(function(error) {
		
	});
	
	console.log($scope.formData);
	
$scope.addSulaL = function(){
	
	console.log($scope.formData)
  if (typeof($scope.formData)=='undefined' || typeof ($scope.formData.summa) == 'undefined' ||  typeof ($scope.formData.selgitus) == 'undefined' ||$scope.formData.summa.split(".")[1] && $scope.formData.summa.split(".")[1].length>2||typeof($scope.formData.kpv) =='undefined' || (isNaN($scope.formData.summa))||(typeof ($scope.formData.saaja) =='undefined' && typeof($scope.formData.partner)=='undefined'))
  {console.log("empty");
	$scope.successLaekumine = undefined;
  $scope.errorMessage="Kõik väljad peavad olema täidetd";
  return;}
 $http.post('/api/v1/sulalaekumine',  $scope.formData)
        .success(function(data) {
            $scope.formData = {};
			console.log("Success")
            $scope.successLaekumine ="Laekumine on lisatud" ;
			$scope.errorMessage = undefined
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