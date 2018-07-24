

var app = angular.module("replaceme_module",["myUtils"]);

app.controller( "replaceme_ctrl" , function( $scope , myUtils ) {
	
    $scope.hello = "hello,angular from bootstrap";
    myUtils.httppost();
    
});

angular.bootstrap(document,['replaceme_module']);