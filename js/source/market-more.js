var marketMore = new Vue({
	el: '#marketMore',
	data: {
	  mescroll: null,
	 list0:[],
	 list1:[]
	},
	filters:{
		dateTime:function(value){
			return value.substring(2,10)
		}
	},
	mounted: function() {
	  	this.newMeScroll()
	  	this.getMarket()
	},
	methods: {
		newMeScroll: function() {
			this.mescroll = new MeScroll("marketMore", {
				down: {
					callback: this.down
				},
				warpClass: null
			});
		},
			getMarket:function(){
			var _this = this
			axios({
				url: base_url + '/alco/marketList',
				method: 'POST',
				// 请求体重发送的数据
				params: {

				},
				timeout: 50000,
				// 设置请求头
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(function(res) {
				if(res.status == "200") {
                 _this.list0 =res.data.data0
                  _this.list1 =res.data.data1
				}
			})
		}
		
	},
});