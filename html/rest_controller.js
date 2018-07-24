
var app = angular.module("rest_module",["myUtils"]);

app.controller( "rest_ctrl" , function( $scope , myUtils ,$timeout) {
	
	var question = localStorage.getItem("currentQuestion");

	if (!question) {
		question = {questionindex:0}
	}else{
		question = JSON.parse(question);
	}
	
//  var question = JSON.parse(localStorage.getItem("currentQuestion"));
    
    var roundData = JSON.parse(localStorage.getItem("roundData"));
   
   $scope.round_index = roundData.roundindex;
   
   $scope.question_index = question.questionindex+1;
   
   var para = { personid: localStorage.getItem("personid") };
	myUtils.getQuestion(para);  //请求题目
  
     mui.plusReady(function () {
			mui.back=function(){

			}
		
     }) 
});

angular.bootstrap(document,['rest_module']);