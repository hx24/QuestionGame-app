angular.module("commonServices", [])
	.factory("postHelper", function($http, cookieHelper, $rootScope) {
		var doPost = function(url, parameter) {
			var head = {
				angent: "web",
				token: $rootScope.UserContext && $rootScope.UserContext.token,
				userid: $rootScope.UserContext && $rootScope.UserContext.userid,
				appkey: "3DC1ACF7-94ED-4098-9CEA-453A6DFF42F9"  //在side-menu.html也要修改
				//				appkey: "26e43725-09a5-49ec-bc5d-0f9769a256d5"
			}; 
			var requestData = {
				head: head,
				parameter: parameter
			};
			return $http.post("http://" + $rootScope.WebHost + url, requestData);
		}

		return {
			//传入多端
			multipost: function(method, parameter) {
				var url = "/Services/MultiApi/" + method + "/json";
				return doPost(url, parameter);
			},
			//传入请求的参数，返回请求体
			post: doPost
		};
	})
	.directive("mLoadingbutton", function() {
		return {
			restrict: "E",
			template: "<div class='btn_box'>" +
				"<a data-ng-click='click()' data-ng-hide='isloading' data-ng-bind='text'></a>" +
				"<div class='btn-load icon-load rotate_720deg' data-ng-show='isloading'></div>" +
				"</div>",
			replace: true,
			scope: {
				isloading: "=isloading",
				text: "@text",
				click: "&click"
			},
			link: function($scope, $element, $attrs) {

			}
		};
	}) 
	.directive("mLoading", function() {
		return {
			restrict: "E",
			replace: false,
			scope: {
				show: "=mLoading",
				//				source: "=mNodataSource",
				//				msg: "@mNodataMsg"
			},
			transclude: true, 
			template: '<div class="load_cell" ng-show="show">' +

				'<div class="glyphicon glyphicon-refresh rotate_720deg" style="display: block;text-align: center;font-size: 20px;"></div>' +
				'<div class="load_text" style="text-align: center;">加载中...</div>' +
 
				'</div>',

			link: function($scope, $element, $attrs) {

			}
		}
	})
	

function HttpInterceptor($q, $rootScope) {
	return {
		// 请求发出之前，可以用于添加各种身份验证信息
		request: function(config) {
			//		   if(!$rootScope.UserContext.token) {
			//		   	//$rootScope.$state.go("login");
			//		     console.log("u："+$rootScope.UserContext.token);
			//		   }
			console.log("请求前....");
			return config;
		},
		// 请求发出时出错 
		requestError: function(err) {
			console.log("请求时出错....");
			return $q.reject(err);
		},
		// 成功返回了响应
		response: function(res) {
			console.log("成功...." + res); 
			return res;
		},
		// 返回的响应出错，包括后端返回响应时，设置了非 200 的 http 状态码
		responseError: function(err) {
			console.log("请求返回出错....");
			return $q.reject(err);
		}
	}; 
}
 

var net = "/Addons/GS.MultiPlatform.Html/index.html#/multi/main";
//var net = "";      //控制路由，传到服务器时注释此句
var net2 = "/Addons/GS.MultiPlatform.Html/index.html";
//var net2 = "/";    //控制路由，传到服务器时注释此句
//window.console.log = function(str){}     //关闭控制台 ，传到服务器时打开此句
  