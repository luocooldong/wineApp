var r4 = new Vue({
	el: '#r4',
	data: {
		sys_userInfo: Object,
		msgCode:'',
		imgCode:'',
		aliName:'',
		aliAccount:'',
		trueCode:''
		
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
				var str = value.length>3?'**'+(value.substr(2)):'*'+(value.substr(1))
				return str;
			}
		}
	},
	mounted: function() {
		this.getImgCode()
		this.sys_userInfo = JSON.parse(localStorage.sys_userInfo)
		var _this = this
		mui.plusReady(function(){
			document.getElementById("createId").addEventListener('tap',function(){
				var username = $("#pay-username").val(),			
			useraccount = $("#pay-account").val();
			//imgcode = $("#img-code").val(),
			//phonecode = $("#phone-code").val();
			
			
			//验证支付宝真实姓名
			if(username.length == 0) {  
				mui.toast('姓名不能为空');
				return false;
			}			
			var regname = /^[\u4e00-\u9fa5]{2,4}$/;
			if(!regname.test(username)) {
				mui.toast('请输入真实姓名！');
				return false;
			}
			
			//验证支付宝账号
			if(useraccount.length == 0) {
				mui.toast('支付宝账号不能为空');
				return false;
			}
			if(_this.trueCode.length<=0){
				mui.toast('短信验证码失效');
				return false;
			}
			if(_this.trueCode!=_this.msgCode){
				mui.toast('短信验证码错误');
				return false;
			}



			_this.perfectWallet()
			})
		})
	},
	methods: {
		sendMsg:function(){
			var _this = this
					axios({
							url: base_url + '/user/sendMsg',
							method: 'POST',
							// 请求体重发送的数据
							params: {
								phone:_this.sys_userInfo.phone
							},
							timeout: 50000,
							// 设置请求头
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded'
							}
					}).then(function(res) {
						
							_this.trueCode = res.data.data		
										
			
					})
		},
		getImgCode: function() {
			var date  = new Date().getTime();
			$('#imgCodeController').attr('src', base_url + '/servlet/validateCodeServlet?date='+date);
		},
		perfectWallet:function(){
			plus.nativeUI.showWaiting()
			var _this = this
				axios({
						url: base_url + '/user/perfectWallet',
						method: 'POST',
						// 请求体重发送的数据
						params: {
							'user.id':_this.sys_userInfo.id,
							'aliName':_this.aliName,
							'aliAccount':_this.aliAccount,
							'imgCode':_this.imgCode
						},
						timeout: 50000,
						// 设置请求头
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
				}).then(function(res) { 
					plus.nativeUI.closeWaiting()
					mui.toast(res.data.msg)
						if(res.data.success){
							
								if(localStorage.index=='true'){
								plus.webview.open(plus.webview.getLaunchWebview().getURL())
							}else{
								plus.webview.open('mine.html');
							}
						}
						
							

					})
		}

	},
});