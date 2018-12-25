var mallOrder = new Vue({
	el: '#mallOrder',
	data: {
		list:[],
		status:'',
		photo_src:''
	},
	mounted: function() {
		this.photo_src = photo_src
	this.status = localStorage.mallStatus
	this.getList()
	},
	methods: {
		switchStatus:function(n){
			localStorage.mallStatus = n
			this.status = n
			this.getList()
		},
		getList:function(){
			var _this = this
				axios({
						url: base_url + '/property/getMallOrders',
						method: 'POST',
						// 请求体重发送的数据
						params: {
							'userId':JSON.parse(localStorage.getItem("sys_userInfo")).id,
							'status':localStorage.mallStatus
						},
						timeout: 50000,
						// 设置请求头
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
				}).then(function(res) {
						if(res.status=="200"){
							_this.list = []
							_this.list = res.data.data
							console.log(JSON.stringify(res.data.data))
							
						}
						
							

					})
		},
		pay:function(i){
			mui.toast('模拟付款成功')
			this.switchOrderStatus(i.id,1)
		},
		down:function(i){
			mui.toast('操作成功')
			this.switchOrderStatus(i.id,2)
		},
		switchOrderStatus:function(id,status){
				var _this = this
				axios({
						url: base_url + '/property/switchOrderStatus',
						method: 'POST',
						// 请求体重发送的数据
						params: {
							'id':id,
							'status':status
						},
						timeout: 50000,
						// 设置请求头
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
				}).then(function(res) {
						if(res.status=="200"){
						_this.getList()
						}
						
							

					})
		}
		
	},
});


