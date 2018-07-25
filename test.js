
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
		"roundId": "",		// 
		"questionid": "",	//
		"startsecond": 10, 	// 每道题的答题时间
		"questionindex": 0,	//	?
		"isanswer": true, 	// 是否可以答题   
		"question": {
			"option1": "aaa",
			"option2": "bbb",
			"option3": "ccc"
		},
		""
	}
}




