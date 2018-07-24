

var app = angular.module("ranking_module",["myUtils"]);

app.controller( "ranking_ctrl" , function( $scope , myUtils ) {
	

    var aRankDatas =[] ;
	var roundNames = ["第一场","第二场" ,"第三场","总排行"];
	var max = 0;  //一共存了几场的排名
	var nowDataIndex = 0;
	
	myUtils.httppost("Summary",{}).success(function (data) {
		data = data.result;
		if(data){
			
			for (var i = 0; i < data.length; i++) {
				aRankDatas.push(data[i].summary);
				max = aRankDatas.length-1;  //一共存了几场的排名
				nowDataIndex = max;  // 默认显示最后一场的排名
				$scope.roundName = roundNames[nowDataIndex];
				$scope.aRankDatas = aRankDatas[nowDataIndex];  // 默认显示最后一场的排名
				console.log($scope.aRankDatas)
			}
		}
	})
	
//	aRankDatas = [[{nickname:"hx",phoneno:"13176863291",answercount:"5",coin:"150"}],[{nickname:"hxasd",phoneno:"98765432111",answercount:"20",coin:"230"}]]
	
   $scope.next = function () {
   		if(nowDataIndex >= max){
   			return
   		}else{
   			nowDataIndex++;
   			$scope.aRankDatas = aRankDatas[nowDataIndex]; 
   			$scope.roundName = roundNames[nowDataIndex];
   		}
   }
   
   $scope.preview = function () {
   		if(nowDataIndex <= 0){
   			return
   		}else{
   			nowDataIndex--;
   			$scope.aRankDatas = aRankDatas[nowDataIndex]; 
   			$scope.roundName = roundNames[nowDataIndex];
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