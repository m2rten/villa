'use strict';

angular.module('villaApp')
.service('productService', function() {
  var productList = [];

  var addProduct = function(newObj) {
	  productList = [];
      productList.push(newObj);
  };

  var getProducts = function(){
      return productList;
  };

  return {
    addProduct: addProduct,
    getProducts: getProducts
  };

})

.controller('ModalController',['$scope', '$location', '$http', 'productService', 'close', function($scope, $location, $http, productService, close) {
  console.log("Modal Controller takes off");
  $scope.products = productService.getProducts();
  console.log ($scope.products);
 $scope.pank_id = $scope.products[0];
 $http.get('/api/v1/liikmed')
	.success(function(data) {
	$scope.liikmed = data;
	})
	.error(function(error) {
		
	});
 $scope.cancel = function(result) {
	
 	close(result, 500); // close, but give 500ms for bootstrap to animate
 };
 $scope.save = function(result) {
			 console.log("Starting to save");
		console.log($scope.formData);
		 $scope.formData["pank_id"] = $scope.pank_id;
		 
			  $http.put('/api/v1/muudasaaja',  $scope.formData)
			  .success(function(data) {
					$scope.formData = {};
					console.log("Success");
					$scope.successMakse ="Makse on lisatud" ;
				})
				.error(function(error) {
					console.log('Error: ' + error);
				});
			close(result, 500); // close, but give 500ms for bootstrap to animate
 };
  }])

.controller('pangaliikumisedCtrl', ['$scope', '$http', 'ModalService','productService', function($scope, $http, $ModalService, productService) {
		console.log($scope.items);
		
		$scope.callToAddToProductList = function(currObj){
		console.log("Addingstuff");
        productService.addProduct(currObj);
    };
	
	    $scope.show = function(summa) {
		$scope.callToAddToProductList(summa);
        $ModalService.showModal({
            templateUrl: 'modal.html',
            controller: "ModalController",
			  inputs: {
                title: "Add New Alert",
            }
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
              console.log("Closed the modal");
			  $http.get('/api/v1/pangaliikumised/')
	.success(function(data) {
	$scope.pangaliikumised = data;
	})
	.error(function(error) {
		
	});
			  $scope.apply;
            });
        });
		console.log("end of show");
    }
    
	console.log("pangaliikumised controller");
$http.get('/api/v1/pangaliikumised/')
	.success(function(data) {
	$scope.pangaliikumised = data;
	})
	.error(function(error) {
		
	});



}])
