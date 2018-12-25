var wallet = new Vue({
	el: '#wallet',
	data: {
		wx_userInfo:Object,
		sys_userInfo:Object,
		made_power:'',
		wallet:Object,
		alco_value:''
		
	},
	mounted: function() {
		//this.wx_userInfo = JSON.parse(localStorage.getItem("wx_userInfo"))
		this.sys_userInfo = JSON.parse(localStorage.getItem("sys_userInfo"))
		this.getValueAndPower()
		this.getWallet()
		this.drawLine()
	},
	methods: {
		alcoValueHistory:function(){
			openWin('wine-history.html')
		},
		getValueAndPower:function(){
				var _this = this
				axios({
						url: base_url + '/user/getValueAndPower',
						method: 'POST',
						// 请求体重发送的数据
						params: {
							'id':_this.sys_userInfo.id
						},
						timeout: 50000,
						// 设置请求头
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
				}).then(function(res) {
						if(res.status=="200"){
							_this.made_power = res.data.data.madePower
							_this.alco_value = res.data.data.alcoValue
						} 
						
							

					})
		},	getWallet:function(){
			var _this = this
				axios({
						url: base_url + '/user/getWallet',
						method: 'POST',
						// 请求体重发送的数据
						params: {
							'user.id':_this.sys_userInfo.id
						},
						timeout: 50000,
						// 设置请求头
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
				}).then(function(res) {
						if(res.status=="200"){
							_this.wallet = res.data.data
						}
						
							

					})
		},
				drawLine:function(){
			  var myChart = echarts.init(document.getElementById('lineChart'));
        // 指定图表的配置项和数据
        var option = {
    color: "#ffa128",
    tooltip: {
        trigger: 'none',
        axisPointer: {
            type: 'cross'
        }
    },
    grid: {
        top: 10,
        bottom: 50
    },
    xAxis: [
        {
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            axisLine: {
                onZero: false,
 
            },
            axisPointer: {
                label: {
                    formatter: function (params) {
                        return  params.value
                            + (params.seriesData.length ? ', ' + params.seriesData[0].data : '');
                    }
                }
            },
            data: ["2016-1", "2016-2", "2016-3", "2016-4", "2016-5", "2016-6", "2016-7", "2016-8", "2016-9", "2016-10", "2016-11", "2016-12"]
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name:'2015 降水量',
            type:'line',
            xAxisIndex: 0,
            smooth: true,
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        }
    ]
};


        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
		}
		
	},
});