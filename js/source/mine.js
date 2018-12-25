var mine = new Vue({
	el: '#mine',
	data: {
		mescroll: null,
		wx_userInfo: Object,
		sys_userInfo: Object,
		wallet: Object,
		login: false,
		userCount:1
	},
	mounted: function() {
		
		//localStorage.clear()
		if(!localStorage.getItem("sys_userInfo")) {
			return false
		} else {
			this.login = true
		}

		//this.wx_userInfo = JSON.parse(localStorage.getItem("wx_userInfo"))
		this.sys_userInfo = JSON.parse(localStorage.getItem("sys_userInfo"))
		this.getWallet()
		this.newMeScroll()
		this.getValueAndPower()
	},
	methods: {
			getValueAndPower: function() {
			var _this = this
			axios({
				url: base_url + '/user/getValueAndPower',
				method: 'POST',
				// 请求体重发送的数据
				params: {
					'id': _this.sys_userInfo.id
				},
				timeout: 50000,
				// 设置请求头
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(function(res) {
				if(res.status == "200") {
					console.log(JSON.stringify(res.data))
					_this.userCount = res.data.data.userCount
				}

			})
		},
		checkLogin: function() {
			localStorage.index = false
			if(!localStorage.getItem("sys_userInfo")) {
				var btnArray = ['取消', '立即登录'];
				var tip = "当前账号未登录,请登录"
				//提示去登录
				mui.confirm(tip, '', btnArray, function(e) {
					if(e.index == 1) {
						openWin('login.html')
					} else {

					}
				})

			} else {
				if(!this.wallet.id) {
					var btnArray = ['取消', '立即创建'];
					var tip = "立即创建数字钱包"
					//提示去登录
					mui.confirm(tip, '', btnArray, function(e) {
						if(e.index == 1) {
							openWin('r-4.html')
						} else {

						}
					})
				}
			}
		},
		down: function() {
			this.getWallet()
			this.mescroll.endSuccess();
		},
		newMeScroll: function() {
			this.mescroll = new MeScroll("mine", {
				down: {
					callback: this.down
				},
				warpClass: null
			});
		},
		toWallet: function() {
			if(this.wallet.id) {
				openWin("wallet.html")
			} else {
				this.checkLogin()
			}
		},
		getWallet: function() {
			var _this = this
			axios({
				url: base_url + '/user/getWallet',
				method: 'POST',
				// 请求体重发送的数据
				params: {
					'user.id': _this.sys_userInfo.id
				},
				timeout: 50000,
				// 设置请求头
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(function(res) {
				if(res.status == "200") {
					console.log(JSON.stringify(res.data.data))
					_this.wallet = res.data.data
				}

			})
		},
		openMallOrder: function(i) {
				localStorage.mallStatus = i
				openWin("mallOrder.html")
			}
	

	},
});