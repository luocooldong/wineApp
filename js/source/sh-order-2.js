var order1 = new Vue({
	el: '#order1',
	data: {
		sys_userInfo: Object,
		list: []
	},
	filters: {
		phoneFilter: function(value) {
			if(value) {
				var hide = value.replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3");
				return hide;
			}
		},
		nameFilter: function(value) {
			if(value) {
				var str = value.length > 3 ? '**' + (value.substr(2)) : '*' + (value.substr(1))
				return str;
			}
		}
	},
	watch: {　　　　　

	},
	mounted: function() {
		this.sys_userInfo = JSON.parse(localStorage.getItem("sys_userInfo"))
		this.getList()
	},
	methods: {
		getList: function() {
			var _this = this
			axios({
				url: base_url + '/user/myMarketOrderBought',
				method: 'POST',
				// 请求体重发送的数据
				params: {
					'boughterId': _this.sys_userInfo.id,
					'status': 3
				},
				timeout: 50000,
				// 设置请求头
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(function(res) {
				if(res.status == "200") {
					console.log(_this.list.length)
					_this.list = res.data.data
				}

			})
		}
	},
});