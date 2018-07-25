
var round = {			// wait页面的请求，场次和个人信息
	"result": {
		"round": {
			"roundName": "",	// 场次名称
			"roundId": "",
			"totalmoney": "",	 // 奖金总额
			"startdate": ""		// 开始时间   格式   22:00
		},
		"personinfo": {
			"amount": 0,		// 瓜分奖金总额
			"revive": 0,		// 复活卡数量
			"history": [{
				"roundName": "场次名称",
				"answercount": 10,	 // 共答对几道题
				"coin": 1000	// 瓜分奖金
			}]
		}
	}
}

var getQuestion-req = {
	"roundId": "123456",
	"index": 0   // 要请求的题目的索引
}

var getQuestion-res = {
	"result": {
		"end": false,   // 是否已结束
		"questionindex": '当前题目索引',
		"roundId": "",		//	场次id
		"questionid": "",	//  改为了ID
		"startsecond": 10, 	// 每道题的答题时间
		"isanswer": true, 	// 是否可以答题   
		"answers": [],
	}
}


var getAnswer-req = {
	"roundId": "123",
	"questionId": "",
//	"answersecond": 5,  // 貌似没用
	"answer": 1,	// 选择的答案 0,1,2,3   4未未作答
}

var getAnswer-res = {
	"result": {
		"success": "OK",	// 回答正确
	}
}


var getResult-req = {
	"roundId": "",
	"questionId": ""
}
var getResult-res = {
	"error":{		// 未出结果，否则未null或undefined
		
	},
	"result": {
		"correct": 1, 	// 正确答案
		"answerCount": [32,10,13,6],	// 各选项选择的人数
		
	}
}



