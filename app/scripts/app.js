'use strict';

angular.module('villaApp', ['ui.router','ngResource',  'angularModalService', 'ngMaterial', 'ngRoute'])
.config(function($stateProvider, $urlRouterProvider, $locationProvider, $routeProvider) {
	    $routeProvider.
        when('/player', {
            templateUrl: 'views/player.html',
            controller: 'playerCtrl'
        })
        $stateProvider        
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                    },
                    'content@': {
                        templateUrl : 'views/saldo.html',
						controller: 'liikmedCtrl'
                    }
                },
            })

			                    .state('app.sulaliikumised', {
                url:'/sulaliikumised.html',
                views: {
                    'content@': {
                        templateUrl : 'views/sulaliikumised.html',
                        controller: 'sulaliikumisedCtrl'
                    }
                },
            })
			                    .state('app.saajad', {
                url:'/saajad.html',
                views: {
                    'content@': {
                        templateUrl : 'views/saajad.html',
                        controller: 'saajadCtrl'
                    }
                },
            })
			                    .state('app.pangaliikumised', {
                url:'/pangaliikumised.html',
                views: {
                    'content@': {
                        templateUrl : 'views/pangaliikumised.html',
                        controller: 'pangaliikumisedCtrl'
                    }
                },
            })
			                    .state('app.saldo', {
                url:'/saldo.html',
                views: {
                    'content@': {
                        templateUrl : 'views/saldo.html',
                        controller: 'saldoCtrl'
                    }
                },
            })
			                    .state('app.sulamakse', {
                url:'/sulamakse.html',
                views: {
                    'content@': {
                        templateUrl : 'views/sulamakse.html',
                        controller: 'sulamakseCtrl'
                    }
                },
            })
			                    .state('app.player', {
                url:'/player.html',
                views: {
                    'content@': {
                        templateUrl : 'views/player.html',
                        controller: 'playerCtrl'
                    }
                },
				  params: {
					player_id: null,
					}
            })
			
			.state('app.sisestamine', {
                url:'/sisestamine.html',
                views: {
                    'content@': {
                        templateUrl : 'views/sisestamine.html',
                        controller: 'sisseCtrl'
                    }
                },
            })
			.state('app.kokku', {
                url:'/kokku.html',
                views: {
                    'content@': {
                        templateUrl : 'views/kokku.html',
                        controller: 'kokkuCtrl'
                    }
                },
            })
			.state('app.sulalaekumine', {
                url:'/sulalaekumine.html',
                views: {
                    'content@': {
                        templateUrl : 'views/sulalaekumine.html',
                        controller: 'sulalCtrl'
                    }
                },
            })
			.state('app.sisestapank', {
                url:'/sisestapank.html',
                views: {
                    'content@': {
                        templateUrl : 'views/sisestapank.html',
                        controller: 'panksisseCtrl'
                    }
                },
            })
    
        $urlRouterProvider.otherwise('/');
    })
