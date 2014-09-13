var xmlHttp;
var timename;
// 创建一个XMLHttpRequest对象
function createXMLHttpRequest() {
	if (window.XMLHttpRequest) {
		xmlHttp = new XMLHttpRequest();// MOZILLA浏览器
	} else if (window.ActiveXObject) {
		try {
			xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");// IE老版本
		} catch (e) {
		}
		try {
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");// IE新版本
		} catch (e) {
		}
		if (!xmlHttp) {
			window.alert("不能创建XMLHttpRequest对象实例！");
			return false;
		}
	}
}
// 这是一个启动AJAX异步通信的方法
function initMessages(message_id) {
	// 创建一个XMLHttpRequest对象
	var str = message_id;
	createXMLHttpRequest();
	// 将状态绑定到一个函数
	xmlHttp.onreadystatechange = processInitMessages;
	// 通过GET方法向指定的URL建立服务器的调用
	var url = "getAllMessageCurrentSession.action?message.id=" + str;
	url=encodeURI(url); 
	url=encodeURI(url); //两次编码
	xmlHttp.open("post", url, true);
	xmlHttp.setRequestHeader("contentType",
			"application/x-www-form-urlencoded; charset=UTF-8");
	// 发送请求
	// xmlHttp.send("=" + ustudentid);//添加变量
	xmlHttp.send(null);
}
// 这是一个用来处理状态改变的函数
function processInitMessages() {
	// 定义一个变量用于存放 从服务器返回的响应结果
	var responseContext;
	if (xmlHttp.readyState == 4) {
		if (xmlHttp.status == 200) {
			responseContext = xmlHttp.responseText;
			$("ChatContent").innerHTML = responseContext;
			showTop();
			startPullMessage();
		}
	}
}
function sendMessages() {
	// 创建一个XMLHttpRequest对象
	// var str = document.getElementById("to_id").value;
	var ms = document.getElementById("ChatValue").value;
	createXMLHttpRequest();
	// 将状态绑定到一个函数
	xmlHttp.onreadystatechange = processSendMessages;
	// 通过GET方法向指定的URL建立服务器的调用
	var url = "sendMessage.action?message.message=" + ms;
	url=encodeURI(url); 
	url=encodeURI(url); //两次编码
	xmlHttp.open("post", url, true);
	xmlHttp.setRequestHeader("contentType",
			"application/x-www-form-urlencoded; charset=UTF-8");
	// 发送请求
	// xmlHttp.send("=" + ustudentid);//添加变量
	xmlHttp.send(null);
}
// 这是一个用来处理状态改变的函数
function processSendMessages() {
	// 定义一个变量用于存放 从服务器返回的响应结果
	var responseContext;
	if (xmlHttp.readyState == 4) {
		if (xmlHttp.status == 200) {
			responseContext = xmlHttp.responseText;
			document.getElementById("ChatValue").value = "";
			$("ChatContent").innerHTML += responseContext;
			showTop();
		}
	}
}
function startPullMessage() {
	timename = setInterval("pullMessage();", 3000);
}
function stopPullMessage() {
	clearInterval(timename);
}
function pullMessage() {
	// 创建一个XMLHttpRequest对象
	createXMLHttpRequest();
	// 将状态绑定到一个函数
	xmlHttp.onreadystatechange = processPullMessage;
	// 通过GET方法向指定的URL建立服务器的调用
	var url = "pullMessage.action";
	url=encodeURI(url); 
	url=encodeURI(url); //两次编码
	xmlHttp.open("post", url, true);
	xmlHttp.setRequestHeader("contentType",
			"application/x-www-form-urlencoded; charset=UTF-8");
	// 发送请求
	xmlHttp.send(null);
}
function processPullMessage() {
	// 定义一个变量用于存放 从服务器返回的响应结果
	var responseContext;
	if (xmlHttp.readyState == 4) {
		if (xmlHttp.status == 200) {
			responseContext = xmlHttp.responseText;
			$("ChatContent").innerHTML += responseContext;
			showTop();
		}
	}
}
