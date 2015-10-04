describe('Controllers', function(){

	var scope;
	var todoCtrl;
	var createService;

	beforeEach(angular.mock.module('starter.controllers'));

	beforeEach(angular.mock.inject(function($rootScope, $controller){
		scope = $rootScope.$new();
		todoCtrl = $controller('TodoCtrl', {
			$scope: scope,
			'currentAuth': {password:{email: "pp@gmail.com"}}
		});
	}));

});