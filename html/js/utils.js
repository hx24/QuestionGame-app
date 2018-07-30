/**
 *工具类
 *
 **/

$(function() {
	FastClick.attach(document.body);
});

angular.module('myUtils', [])
	//简洁post
	.factory('myUtils', function($http) {
		var factory = {};
		factory.httppost = function(method, parameters) {
			var myUrl = "http://192.168.1.137/user/" + method;
			return $http.post(myUrl, parameters, {
				withCredentials: true
			});
		}
		factory.getQuestion = function(param) {
			(function getQuestion(param) {
				factory.httppost("getQuestion", param).success(function(data) {
					data = data.result;

					if(angular.equals({}, data)) { //  result 是空对象
						setTimeout(function() {
							getQuestion(); // 没有获取到题目信息，重新获取
						}, 500)

					} else {
						if(data.end) {	// 结束
							location.href = "ranking.html";
						} else {
							//获取到了题目信息
							localStorage.setItem("currentQuestion", JSON.stringify(data));
							localStorage.setItem("clickFlag", 1); //接收到题目时，将clickFlag置为1 ，代表这道题还没有选择过
							location.href = "answer.html";
						}

					}

				}).error(function(error) {
					setTimeout(function() {
						getQuestion(param); // 请求失败，重新获取
					}, 500)
				});
			})(param);
		}
		factory.update = function() {
			var appname = "gsQuestion"; //获取当前这个程序的名称(或者说ID传递给服务器识别)
			var updateUrl = "https://rd.chinags.com.cn/AutoUpdate.aspx"; //更新服务器地址
			var devicetype = ""; //设备类型（ios或安卓） 在plusReady内检测
			var localversion = "1.0.0"; //当前版本

			mui.plusReady(function() { //mui.plusReady里的内容也只在电脑端执行
				devicetype = plus.os.name;
				localversion = plus.runtime.version;
				if(devicetype == 'iOS') {
					devicetype = "ios";
				} else {
					devicetype = "android";
				}

				mui.ajax(updateUrl, { //检查更新
					data: {
						c: appname,
						t: devicetype
					},
					dataType: 'json',
					type: 'get',
					timeout: 10000,
					success: function(data, status, xhr) {
						//比较服务器和本地版本，判断是否更新
						var serverversion = data.Version;
						console.log("loc:" + localversion + "-ser:" + serverversion);
						if(localversion < serverversion) {
							var btnArray = ['是', '否'];
							mui.confirm('发现新版本，是否更新？', '更新', btnArray, function(e) {
								if(e.index == 0) {
									if(devicetype != 'ios') {
										plus.runtime.openURL(data.Address); //安卓下载地址
									} else {
										plus.runtime.openURL('itms-services:///?action=download-manifest&url=' + data.Address);
									}
								}
							})
						}

					},
					error: function(xhr, type, errorThrown) {
						console.log(xhr + ":" + errorThrown);
						//alert('比较版本异常');
					}
				});
			})

		}
		return factory;
	});