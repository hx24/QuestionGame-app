
var app = angular.module("answer_module",["myUtils"]);

app.controller( "answer_ctrl" , function( $scope , myUtils ,$interval,$timeout) {
	
	mui.plusReady(function () {
		plus.device.vibrate( 200 );
		mui.back=function(){   //禁用安卓物理返回键

		}
	}) 
	
    
   var question = JSON.parse(localStorage.getItem("currentQuestion"));
   var personid = JSON.parse(localStorage.getItem("personid"));
   var answerSecond = 0;  //回答问题的用时
   var answer = 4;  // 回答的序号，4 未答  0,1，2，3 已选答案
   var clickFlag;
   
   if(question.isanswer){  
   		clickFlag = true;
   }
  
   $scope.second = question.startsecond;
   $scope.questionindex = question.questionindex;
   $scope.question = question.question;
   $scope.options = question.answers;
  
  $scope.select = function (index) {
//	clickFlag = true
  	if(clickFlag){  
  		$scope.selectOption = index;
  		answer = index;  
  		clickFlag = false;	 //已选择后，不可修改
 
  		if($scope.second == "结束"){
  			answerSecond = 10;
  		}else{
  			answerSecond = question.startsecond - $scope.second;  //记录回答用时
  		}
  		
  	}
  }
  
  
  var timer=$interval(function(){
     $scope.second--;
     
     mui.plusReady(function () {
    	 	if($scope.second == 3||$scope.second == 2||$scope.second == 1){
			plus.device.vibrate( 200 );
     	}
     }) 
     
     if($scope.second == 0){
     	 $interval.cancel(timer);  
     	 clickFlag = false;  //倒计时结束，不可再选择
     	 $scope.second = "结束";
     	 $("#second").css("font-size","25px");

     	 if (question.isanswer) {
     	 	fn_submitAnswer();
     	 }else{
     	 	fn_getResult();
     	 }
     	 
     }
	},1000);   //倒计时
	
	
	 $scope.$on('$destroy',function(){    //在页面销毁时关闭定时器
   		$interval.cancel(timer);  
	})
	 
	 
	 
	var fn_submitAnswer = function () {
		var paraAnswer = {
			roundId : question.roundId,   //场次ID
			questionId : question.questionid,    // 题目ID
			questionIndex: question.questionindex-1,
//			answersecond : answerSecond,  //回答用时
			answer : answer   //结果    告诉服务，4为未作答
		}
		
		console.log("开始提交答案"+question.questionindex);
		console.log(JSON.stringify(paraAnswer));
		
		myUtils.httppost("commitAnswer",paraAnswer).success(function (data) {
			data = data.result;
			if(data.success == "OK"){
//				fn_getResult();
			}else{
				console.log('由于某些错误，回答失败，您已出局')
				layer.msg('由于某些错误，回答失败，您已出局', {
				  time: 2000 
				}); 
			}
		}).error(function (error) {
			console.log('网络错误，您已出局');
			layer.msg('网络错误，答案提交失败，您已出局', {
			  time: 2000 
			}); 
		})
	
	}
	
	var getResultTimes = 0;
	
	var fn_getResult = function () {
		var paraResult = {
			personid : personid,  //用户ID
			roundid : question.roundId,   //场次ID
			unitid : question.questionid    // 题目ID
		}
		myUtils.httppost("getResult",paraResult).success(function (data) {
			data = data.result;
			
			if(angular.equals({},data)){  //没有请求到结果
				setTimeout(function () {
					fn_getResult();
				},500);
			}else{
				console.log("请求到result");
				console.log(data);
				
				$scope.correctOption = data.correct;
				   
				if($scope.correctOption != $scope.selectOption){
					//用户选择了错误答案
					$scope.erroOptione = $scope.selectOption;
				}
				
				$scope.optionCounts = [ data.option1count, data.option2count, data.option3count];
				$scope.result_second = 10;
				
				 var timer=$interval(function(){
			     $scope.result_second--;
			     
			     if( $scope.result_second == 0){
			     	 $interval.cancel(timer);  
			     	location.href = "rest.html";
			     }
				},1000);   //倒计时
			}
				
		}).error(function () {
			
			getResultTimes++;
			if(getResultTimes%10 == 0){
				layer.msg('获取统计结果失败,正在尝试重新获取', {
					time: 1000 //1秒关闭（如果不配置，默认是3秒）
				});
			}
			setTimeout(function () {
				fn_getResult();
			},500);
		})
	}
  
    
});

angular.bootstrap(document,['answer_module']);