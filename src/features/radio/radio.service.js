(function(angular){
	angular.module('app.radio')
	.service('radioService',['$http','$q',function($http,$q){
		var self = this;
		self.token = "BQAtq3cTSvjpgcayRy0rZEd3zl_EQYapyIXd2XpyWOGL6BE1qctoKhwP1c7VJlutfJHBKlgJa4s-rJGT41HX0JPali92Ctokel3uihuSkNEG8_pGTsKPUKaauX6SVB63ajlXQoLxOTE";
		self.getSomeArtists = function(query){
			var request = {
				url : 'https://api.spotify.com/v1/search',
				method : 'GET',
				headers : {
					Authorization : "Bearer "+self.token
				},
				params : {
					q : query,
					type : 'artist'
				}
			};
			var prom = $q.defer();
			var onOK = function(response){
				prom.resolve(response);
			};
			var onFail = function(response){
				prom.resolve(response);
			};
			$http(request).then(onOK,onFail);	
			return prom.promise;
		};
	}]);
}(angular));