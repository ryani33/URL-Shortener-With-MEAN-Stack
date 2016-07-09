var app = angular.module("shortener", []);

app.controller('listController', ['$scope', 'listall', function($scope, listall) { 
    listall.success(function(data) { 
        $scope.list = data; 
    });
}]);

app.factory('listall', ['$http', function($http) { 
    return $http.get('/all') 
        .success(function(data) {
            return data; 
        }) 
        .error(function(err) { 
            return err; 
        }); 
}]);

app.controller('postController', function($scope, $http) {
    $scope.submitForm = function() {
    $http({
        method  : 'POST',
        url     : '/api/shorten',
        data    : $.param({
                    longurl: $scope.longurl,
                    type: $scope.type
                }),
        headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
    }).success(function(data) {
            if (data.errors) {
                $scope.errorLongUrl = data.errors.longUrl;
            } else {
                window.location.reload();
            }
        });
    };
});