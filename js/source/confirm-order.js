var confirmOrder = new Vue({
	el: '#confirmOrder',
	data: {
		count:localStorage.orderCount,
		good:Object,
		sys_userInfo:Object,
		address:[],
		photo_src:''
	},
	mounted: function() {
		this.photo_src = photo_src
		this.sys_userInfo = JSON.parse(localStorage.getItem("sys_userInfo"))
	 	this.good = JSON.parse(localStorage.mallGood)
	 	console.log(JSON.stringify(this.sys_userInfo))
	 	this.getAddress()
	},
	methods: {
		editAdd:function(){
			localStorage.address = JSON.stringify(this.address[0])
			openWin('add-address.html')
		},
		getAddress:function(){
			var _this = this
				axios({
						url: base_url + '/property/getAddressByUser',
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
							_this.address = res.data.data
						}
						
							

					})
			
		},
		addAddress:function(){
			localStorage.address = ''
			openWin('add-address.html')
		},
		submitOrder:function(){
			if(this.address.length<=0){
				mui.toast('请选择收货地址')
			}else{
				var _this = this
				axios({
						url: base_url + '/property/addOrderMall',
						method: 'POST',
						// 请求体重发送的数据
						params: {
							'goodId.id':_this.good.id,
							status:0,
							count:_this.count,
							'addId.id':_this.address[0].id,
							'userId.id':_this.sys_userInfo.id
						},
						timeout: 50000,
						// 设置请求头
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
				}).then(function(res) {
						if(res.status=="200"){
							mui.toast("下单成功")
							openWin('mall.html')
						}else{
							mui.toast("下单失败")
						}
						
							

					})
			}
		}
	},
});