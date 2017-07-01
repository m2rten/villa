'use strict';

angular.module('villaApp', ['ui.router','ngResource'])
.config(function($stateProvider, $urlRouterProvider) {
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
						controller: 'startCtrl'
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
    
        $urlRouterProvider.otherwise('/');
    });
