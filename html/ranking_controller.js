

var app = angular.module("ranking_module",["myUtils"]);

app.controller( "ranking_ctrl" , function( $scope , myUtils ) {
	

    $scope.rankDatas =[] ;
	$scope.currentIndex = 0;

	var layerLoading = layer.load(2);
	myUtils.httppost("getRank",{}).success(function (data) {
		data = data.result;
		if(data&&data.length){
			$scope.rankDatas = data;
			$scope.currentIndex = data.length-1
			$scope.currentRank = data[$scope.currentIndex];	// 默认显示最后一场
		}
	}).finally(function () {
		layer.close(layerLoading)
	})
	
   $scope.next = function () {
   		if($scope.currentIndex<$scope.rankDatas.length-1){
   			$scope.currentIndex++;
   			$scope.currentRank = $scope.rankDatas[$scope.currentIndex];
   		}
   }
   
   $scope.preview = function () {
   		if($scope.currentIndex>0){
   			$scope.currentIndex--;
   			$scope.currentRank = $scope.rankDatas[$scope.currentIndex];
   		}
   }
   
   $scope.back = function() {
       location.href="wait.html";
    } 
    
    
    mui.plusReady(function () {
		mui.back=function(){
			 location.href = "wait.html";
		}
     }) 
   
});

angular.bootstrap(document,['ranking_module']);