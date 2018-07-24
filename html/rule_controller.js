

var app = angular.module("rule_module",["myUtils"]);

app.controller( "rule_ctrl" , function( $scope , myUtils ) {
  mui.plusReady(function(){
  		
        mui.back = function() {
	       location.href="wait.html";
        }   
    });
});

angular.bootstrap(document,['rule_module']);