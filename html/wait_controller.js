var app = angular.module("wait_module", ["myUtils"]);

app.controller("wait_ctrl", function($scope,$interval , $timeout , myUtils) {
	$scope.amount = 0;

	var flag = 1;
	var oldstartData;
	var layerLoading ;
	var showLoading = true;
	
	localStorage.setItem("currentQuestion","");   //清空问题

	
	var getPlayRoundTimes = 0;
	
	var getPlayRoundTimer;

	var fn_getPlayRound = function() {
		
		if (showLoading) {
			layerLoading = layer.load(2); 
		}
		
		myUtils.httppost("getRound").success(function(data) {
			showLoading = false;
			data = data.result;

			var round = data.round;
			var personinfo = data.personinfo;

			if(round) { //有场次信息
				$scope.noRound = false; 
				$scope.roundName = round.title;
				localStorage.setItem("roundId", JSON.stringify(round.ID));
				localStorage.setItem("roundData", JSON.stringify(round));
				$scope.round_reward = round.reward;
				$scope.round_startdate = round.time;
				startCountdown(round.time);  //倒计时开始时间
//				myUtils.getQuestion(para); //请求题目
			} else {
				$scope.noRound = true;
				$scope.round_reward = "----"
				$scope.round_startdate = "--:--"
				$interval.cancel(_ordertimer);
				
				if(getPlayRoundTimer){
					$timeout.cancel(getPlayRoundTimer);
				}
				
				getPlayRoundTimer = $timeout(function() {
					fn_getPlayRound(); 
				}, 30 * 1000);
			}

			$scope.amount = personinfo.amount;
			$scope.revive = personinfo.revive;
			$scope.historiess = personinfo.history;
		}).error(function() {
			if(getPlayRoundTimes<2){  //自动请求3次，错误后提示
				setTimeout(function() {
					fn_getPlayRound();
				}, 5 * 1000);
				getPlayRoundTimes++;
			}else{
				layer.msg('获取场次信息失败,请下拉刷新或尝试重新登录', {
					time: 3000 
				});
			}
			
			
		}).finally(function () {
			if (layerLoading) {
				layer.close(layerLoading);
			}
			
			if (miniRefresh) { 
				miniRefresh.endDownLoading();
			} 
			 
		}) 
	}


	$scope.caidan = function() {

		if(flag % 2 == 0) {
			if($scope.revive == 0) {
				layer.msg('有没有复活卡，心里没点B数吗?<br />(偷偷告诉你，上上下下左右左右ABAB可获得30张复活卡)', {
					time: 3000 //1秒关闭（如果不配置，默认是3秒）
				});
			}
		}
		flag++;
	}

	mui.plusReady(function() {

		mui.back = function() {
			var btnArray = ['是', '否'];
			mui.confirm('是否退出登录？', '注销', btnArray, function(e) {
				if(e.index == 0) {
					location.href = "sign.html";
				}
			})
		}

	});
	//规则页跳转
	$scope.torule = function() {
		location.href = "rule.html";
		
	}
	//排行榜页跳转
	$scope.toranking = function() {
		location.href = "ranking.html";
	}


	var _ordertimer = null;
	var data = new Date();

	function leftTimer(enddate) {
		var leftTime = (new Date(enddate)) - new Date(); //计算剩余的毫秒数
//		var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
		var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
		var minutes = parseInt(leftTime / 1000 / 60 % 60, 10); //计算剩余的分钟
		var seconds = parseInt(leftTime / 1000 % 60, 10); //计算剩余的秒数
//		days = checkTime(days);
		hours = checkTime(hours);
		minutes = checkTime(minutes);
		seconds = checkTime(seconds);
		if(hours >= 0 || minutes >= 0 || seconds >= 0) {
			$scope.countDown = hours+":"+minutes+":"+seconds;
		}

		if(hours <= 0 && minutes <= 0 && seconds <= 0) {
//			window.clearInterval(_ordertimer);
			$interval.cancel(_ordertimer);
			_ordertimer = null;
			localStorage.setItem("currentQuestion","");  //答题开始，先清空之前缓存的问题
			location.href = "rest.html";
		}
	}

	function checkTime(i) { //将0-9的数字前面加上0，例1变为01
		if(i < 10) {
			i = "0" + i;
		}
		return i;
	}
	

	function startCountdown(v) {
		
		if (_ordertimer) {
			if (oldstartData==v) {
				return;
			}else{
				$interval.cancel(_ordertimer);
				_ordertimer = null;
			}
			//已经在倒计时了
			
		}
		
		oldstartData = v;
		var timeArr = v.split(":");
		
		var date1 = new Date(),
			date2 = new Date();
			
			date2.setHours(timeArr[0]);
			date2.setMinutes(timeArr[1]);
			date2.setSeconds("0")

		if(date2 < date1){
			
			layer.msg('本场游戏已经开始<br />您只能观战，不能答题', {
			  time: 3000 //1秒关闭（如果不配置，默认是3秒）
			}, function(){
			  location.href = "rest.html";
			}); 
			return; //设置的时间小于现在时间退出
		} 
		_ordertimer = $interval(function() {
			leftTimer(date2)
		}, 1000);
	}
	
	
	// 引入任何一个主题后，都会有一个 MiniRefresh 全局变量
	var miniRefresh = new MiniRefresh({
	    container: '#minirefresh',
	    down: {
	    	isAuto : true,
	    	dampRateBegin:0.5,
	    	dampRate:0.1,
	    	isAllowAutoLoading:false,
	        callback: function() {
	            // 下拉事件
				
				fn_getPlayRound();
//	             miniRefresh.endDownLoading();
	        }
	    },
	    up: {
	    	isLock:true, 
	    	isAuto : false,
	        callback: function() {
	            // 上拉事件
				
	            // 注意，由于默认情况是开启满屏自动加载的，所以请求失败时，请务必endUpLoading(true)，防止无限请求
	            miniRefresh.endUpLoading(true);
	        }
	    }
	});
	
});

angular.bootstrap(document, ['wait_module']);