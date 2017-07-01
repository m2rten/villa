'use strict';

angular.module('villaApp')
. filter('bystatuses', function() {
    return function(rows,statuses) {
		var out = [];
	if (!(rows)) {return};
	for (var i = 0; i < rows.length; i++) {
	if (statuses[rows[i]["status"]]){out.push(rows[i]);}
	}
      return out;
    }
})


.controller('liikmedCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.getSaldo = function(){
		console.log("Getting salod");
    $http.get('/api/v1/saldo')
        .success(function(data) {
            $scope.saldo = data;
			console.log("Getting saldo success");
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });
	}
	
	$scope.getSaldo();
	console.log("liikmed controller");
		$scope.changeLiige ={};
   $scope.edit = function(liige){
		console.log(liige);
		$scope.changeLiige.firstname = liige.firstname;
		$scope.changeLiige.lastname = liige.lastname;
		$scope.changeLiige.status = liige.status;
		$scope.changeLiige.type = liige.type;
		$scope.changeLiige.maksja = liige.maksja 
		console.log($scope.changeLiige);
   }
   $scope.updateLiige = function ()
   {	
	   console.log($scope.changeLiige);
 $http.put('/api/v1/liikmed',  $scope.changeLiige)
        .success(function(data) {
            $scope.changeLiige = {};
			console.log("Success");
			$scope.updateErrorMessage = undefined
            $scope.updateSuccess ="Liige on muudetud" ;
			$scope.saldo = undefined;
			$scope.getSaldo();
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });
		
	}  
		
		 $scope.orderByMe = function(x) {
			 console.log("I shoould order by: "+x);
    $scope.OrderBy = x;
  }
	$scope.test="Kõik töötab";
	$scope.lisaLiige=function(){
		console.log($scope.formData);
		if (typeof ($scope.formData)=='undefined' || typeof($scope.formData.lastname)=='undefined'|| typeof($scope.formData.firstname)=='undefined'|| typeof($scope.formData.liikme_status)=='undefined'|| typeof($scope.formData.type)=='undefined' )
		
	{		
			$scope.errorMessage = "Kõik väljad peavad olema täidetud";
			console.log("viga")
			$scope.successLisamine = undefined;
			return;
			}

		$scope.firstname =$scope.formData.firstname;
		$scope.lastname =$scope.formData.lastname;
		$scope.type =$scope.formData.type;
		$scope.status =$scope.formData.liikme_status;
		$scope.errorMessage = undefined;

 $http.post('/api/v1/liikmed',  $scope.formData)
        .success(function(data) {
            $scope.formData = {};
			console.log("Success");
			$scope.errorMessage = undefined
            $scope.successLisamine ="Liige on lisatud" ;
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });
		
	}
	$http.get('/api/v1/types')
	.success(function(data) {
	$scope.types = data;
	})
	.error(function(error) {
		
	});
		$http.get('/api/v1/statuses')
	.success(function(data) {
	$scope.statuses = data;
	})
	.error(function(error) {
		
	});
}])