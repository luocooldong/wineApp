
const base_url = "http://47.107.254.247/alcochain2";
const photo_src = "http://47.107.254.247"; 
// const base_url = "http://192.168.1.18:8080/alcochain";
// const photo_src = "http://192.168.1.18:8080"; 
const page_size = 10;

function openWin(html) {
	mui.openWindow({
		url: html,
		id: html,
		createNew: true,
		styles: {
			cachemode:"noCache",
 
		}
	});
}
 var sendPost =  function(url,para){

		return axios({
		 	url: base_url + url,
		 	method: 'POST',
		 	params: para,
		 	timeout: 50000,
		 	headers: {
		 		'Content-Type': 'application/x-www-form-urlencoded'
		 	}
		 }) 

 }
 
