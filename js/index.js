var dappAddress = "n1jHvgLfXQ4fm24F8jurXAvjmN3gSTwhzG4";
$(function() {
		var NebPay = require("nebpay"); 
		var nebpay = new NebPay();
	$("#all").click(function() {
		
		var to = dappAddress;
		var value = "0";
		var callFunction = "PlayerList";
		var callArgs = "[]";
		nebpay.simulateCall(to, value, callFunction, callArgs, {
			listener: function(resp) {
				//console.log(JSON.stringify(resp.result));
				if(resp.result == ""){
					$("#searchresult").html('<div class="panel-body" >无记录</div>');
					return;
				}
				var res = JSON.parse(resp.result);
				if(res.length == 0){
					$("#searchresult").html('<div class="panel-body">无记录</div>');
					return;
				}

				var tempStr = "";

				for (var i = 0; i < res.length; i++) {
					if (i % 2 == 0) {
						tempStr += '<div class="panel-body"> ';
					} else {
						tempStr += '<div class="panel-footer">';
					}

					//					
					tempStr += '<p>';
					tempStr += res[i].Data;
					tempStr += '</p>';
					tempStr += '<p>';
					tempStr += '<small><cite>' + '玩家ID:' + res[i].author + '</cite></small>';
					tempStr += '<br>';
					tempStr += '<small><cite>' + '完成时间戳:' + res[i].createdDate + '</cite></small>';
					tempStr += '</p> </div> ';
				}
				console.log(tempStr);
				$("#searchresult").html(tempStr);
			}
		});

	});
	$("#all").click();

	$("#create").click(function() {
		
		var tempStr = '';
		function changeLink(){
			document.getElementById('content').innerHTML=$("#sco").val();
		}
		tempStr += '<div class="panel-body"> ';
		tempStr += '<form role="form">';
		tempStr += '<div class="form-group">';
		tempStr += '<p>你的游戏成绩</p>';
		tempStr += '<textarea class="form-control" rows="10" id="content"></textarea>';
		tempStr += '<button type="button" class="btn btn-primary" id="savebutton" onclick="save();">上传</button>';		
		tempStr += '</div>';
		tempStr += '</form>';
		tempStr += '</div> ';
		console.log(tempStr);

		$("#searchresult").html(tempStr);
	});

});

function save(){
	var NebPay = require("nebpay"); //https://github.com/nebulasio/nebPay
	var nebpay = new NebPay();
		var content = $("#content").val();
		if (content == "") {
			alert("请输入成绩。");
			return;
		}
		content= content.replace(/\n/g,"<br>"); 
		name= name.replace(/\n/g,"<br>"); 
		var to = dappAddress;
		var value = "0";
		var callFunction = "SaveData";
		var callArgs = "[\"" + "\u003cbr\u003e成绩:" + content + "\"]";
		nebpay.call(to, value, callFunction, callArgs, {
			listener: function Push(resp) {
				console.log("response of push: " + JSON.stringify(resp))
				var respString = JSON.stringify(resp);
				if(respString.search("rejected by user") !== -1){
					alert("关闭交易,取消分数上传")
				}else if(respString.search("txhash") !== -1){
					alert("上传Hash: " + resp.txhash+"请等待交易确认")
				}
			}
		});
	
};

