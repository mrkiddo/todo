describe('Services', function(){

	var http;

	beforeEach(module('starter.services'));

	beforeEach(inject(function($http){
		http = $http.$new();
		$factory('todoService', {
			$http: http
		});
	}));

});