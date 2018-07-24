var app = angular.module("sign_module", ["myUtils"]);

app.controller("sign_ctrl", function($scope, myUtils) {

	myUtils.update();

	var loginData = localStorage.getItem("loginData");

	if(loginData) {
		loginData = JSON.parse(loginData);
		$scope.nickname = loginData.name;
		$scope.phoneno = Number.parseInt(loginData.phone);
	}

	var re = /^[1][3,4,5,7,8][0-9]{9}$/; //手机号限制
	
	var loginFlag = true;
	$scope.loginbtn = "登录";

	$scope.submit = function() {
		if(!loginFlag) {
			return;
		}

		var nickname = $.trim($scope.nickname); //去除首尾空格
		var phoneno = $.trim($scope.phoneno);

		console.log(nickname + "," + phoneno);

		if(!nickname) {
			layer.msg('用户名不能为空哦', {
				time: 1000 //1秒关闭（如果不配置，默认是3秒）
			});
			return;
		}

		var para = {
			"name": nickname,
			"phone": phoneno
		};
		
		var layerLoading;

		if(phoneno.match(re)) {
			$scope.loginbtn = "登录中...";
			loginFlag = false;
			layerLoading = layer.load(2);
			localStorage.setItem("loginData", JSON.stringify(para));
			myUtils.httppost("login", para).success(function(data) {
				if(data.error){
					layer.msg(data.error.message, {
						time: 1500 //1秒关闭（如果不配置，默认是3秒）
					});
				}else{
					localStorage.setItem("loginData",JSON.stringify(para));
		  			location.href="wait.html";
				}
			}).error(function(error) {
				layer.msg('登录失败，请检查网络', {
					time: 1000 //1秒关闭（如果不配置，默认是3秒）
				});
			}).finally(function() {
				loginFlag = true;
				if(layerLoading) {
					layer.close(layerLoading);
				}
				$scope.loginbtn = "登录";
			});
		} else {
			layer.msg('请输入正确的手机号', {
				time: 1000 //1秒关闭（如果不配置，默认是3秒）
			});
		}
	}

	mui.plusReady(function() {
		mui.back = function() {
			plus.runtime.quit(); //返回键退出程序
		}
	})

});

angular.bootstrap(document, ['sign_module']);