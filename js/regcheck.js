var xmlHttp;
var flagid = 0;
var flagname = 0;
var flagsn = 0;
// 创建一个xmlhttprequest对象
function createXhr() {
	if (window.XMLHttpRequest) {
		xmlHttp = new XMLHttpRequest();// mozilla浏览器
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

function checkok_student() {
	if (xmlHttp.readyState == 4) {
		if (xmlHttp.status == 200) {
			if (xmlHttp.responseText.indexOf("falseustudentid") >= 0) {
				document.getElementById("ustudentidtag").innerHTML = "学号已经被注册，如有疑问请联系系统管理员";
				document.getElementById("ustudentidtag").className = "FailedMsg";
				document.getElementById("submit").disabled = false;
				flagname = 1;
			} else {
				document.getElementById("ustudentidtag").innerHTML = "学号可以使用，一旦注册将无法修改";
				document.getElementById("ustudentidtag").className = "SucceedMsg";
				document.getElementById("submit").disabled = false;
				flagname = 0;
			}
		}

	}
}
function checkUstudentid_s() {
	createXhr();
	xmlHttp.onreadystatechange = checkok_student;
	var ustudentid = document.getElementById("ustudentid").value;
	xmlHttp.open("post", "check?operation=ustudentid", true);
	xmlHttp.setRequestHeader("Content-Type",
			"application/x-www-form-urlencoded");
	xmlHttp.send("ustudentid=" + ustudentid);
}

function checkUid_s() {
	createXhr();
	xmlHttp.onreadystatechange = checkok_id;
	var uid = document.getElementById("uid").value;
	xmlHttp.open("post", "check?operation=uid", true);
	xmlHttp.setRequestHeader("Content-Type",
			"application/x-www-form-urlencoded");
	xmlHttp.send("uid=" + uid);
}
function checkok_id() {
	if (xmlHttp.readyState == 4) {
		if (xmlHttp.status == 200) {
			if (xmlHttp.responseText.indexOf("trueuid") >= 0) {
				document.getElementById("uidtag").innerHTML = "该邮箱可以使用";
				document.getElementById("uidtag").className = "SucceedMsg";
				document.getElementById("submit").disabled = false;
				flagid = 0;
			} else {
				document.getElementById("uidtag").innerHTML = "该邮箱已经被注册";
				document.getElementById("uidtag").className = "FailedMsg";
				document.getElementById("submit").disabled = true;
				flagid = 1;
			}
		}
	}
}

function checkok_sn() {
	if (xmlHttp.readyState == 4) {
		if (xmlHttp.status == 200) {
			if (xmlHttp.responseText.indexOf("truesn") >= 0) {
				flagsn = 0;
				document.getElementById("sntag").innerHTML = "验证码正确";
				document.getElementById("sntag").className = "SucceedMsg";
			} else {
				document.getElementById("sntag").innerHTML = "验证码错误,点击图片切换图片";
				document.getElementById("sntag").className = "FailedMsg";

				flagsn = 1;
			}
		}
	}
}
function checksn_s() {
	createXhr();
	xmlHttp.onreadystatechange = checkok_sn;
	var pstCfmCode = document.getElementById("pstCfmCode").value;
	xmlHttp.open("post", "check?operation=checksn", true);
	xmlHttp.setRequestHeader("Content-Type",
			"application/x-www-form-urlencoded");
	xmlHttp.send("pstCfmCode=" + pstCfmCode);
}

function checkok_name() {
	if (xmlHttp.readyState == 4) {
		if (xmlHttp.status == 200) {
			if (xmlHttp.responseText.indexOf("falseusername") >= 0) {
				document.getElementById("unametag").innerHTML = "该用户名不可用";
				document.getElementById("unametag").className = "FailedMsg";
				document.getElementById("submit").disabled = true;
				flagname = 1;
			} else if (flagid == 0
					&& xmlHttp.responseText.indexOf("trueusername") >= 0) {
				document.getElementById("unametag").innerHTML = "用户名可以使用";
				document.getElementById("unametag").className = "SucceedMsg";
				document.getElementById("submit").disabled = false;
				flagname = 0;
			}
		}

	}
}
function checkUname_s() {
	createXhr();
	xmlHttp.onreadystatechange = checkok_name;
	var username = document.getElementById("username").value;
	xmlHttp.open("post", "check?operation=username", true);
	xmlHttp.setRequestHeader("Content-Type",
			"application/x-www-form-urlencoded");
	xmlHttp.send("username=" + username);
}

function checkUpassword() {
	document.getElementById("passtag").innerHTML = "由字母数字组成，长度为4～16。 密码不能与账号名相同。";
	document.getElementById("passtag").className = "SelectMsg";
}
function checkuaddr() {
	document.getElementById("addrtag").innerHTML = "地址不可为空";
	document.getElementById("addrtag").className = "SelectMsg";
}
function checkuaddr1() {
	if (document.getElementById("uaddr").value != "") {
		document.getElementById("addrtag").innerHTML = "填写正确";
		document.getElementById("addrtag").className = "SucceedMsg";
		return true;
	}
	document.getElementById("addrtag").innerHTML = "地址不可为空";
	document.getElementById("addrtag").className = "FailedMsg";
	return false;
}
function checkustudentid() {
	document.getElementById("ustudentidtag").innerHTML = "由数字组成，长度为15。";
	document.getElementById("ustudentidtag").className = "SelectMsg";
}
function checkustudentid1() {
	if (document.getElementById("ustudentid").value == '') {
		document.getElementById("ustudentidtag").innerHTML = "由数字组成，长度为11。";
		document.getElementById("ustudentidtag").className = "DefaultMsg";
		return false;
	} else {
		if (document.getElementById("ustudentid").value.length != 15) {
			document.getElementById("ustudentidtag").innerHTML = "学号长度为15位";
			document.getElementById("ustudentidtag").className = "FailedMsg";
			return false;
		}

		for ( var i = 0; i < document.getElementById("ustudentid").value.length; i++) {
			if ((document.getElementById("ustudentid").value.substr(i, 1) < '0' || document
					.getElementById("ustudentid").value.substr(i, 1) > '9')) {
				document.getElementById("ustudentidtag").innerHTML = "学号由数字组成！";
				document.getElementById("ustudentidtag").className = "FailedMsg";
				return false;
			}
		}
		document.getElementById("ustudentidtag").innerHTML = "正在验证学号可用性！";
		document.getElementById("ustudentidtag").className = "SucceedMsg";
		checkUstudentid_s();
		return true;
	}
}
function checkuphone() {
	document.getElementById("uphonetag").innerHTML = "由数字组成，长度为11。";
	document.getElementById("uphonetag").className = "SelectMsg";
}
function checkuphone1() {
	if (document.getElementById("uphone").value == '') {
		document.getElementById("uphonetag").innerHTML = "由数字组成，长度为11。";
		document.getElementById("uphonetag").className = "DefaultMsg";
		return false;
	} else {
		if (document.getElementById("uphone").value.length != 11) {
			document.getElementById("uphonetag").innerHTML = "电话号码长度为11位！";
			document.getElementById("uphonetag").className = "FailedMsg";
			return false;
		}

		for ( var i = 0; i < document.getElementById("uphone").value.length; i++) {
			if ((document.getElementById("uphone").value.substr(i, 1) < '0' || document
					.getElementById("uphone").value.substr(i, 1) > '9')) {
				document.getElementById("uphonetag").innerHTML = "电话号码由数字组成！";
				document.getElementById("uphonetag").className = "FailedMsg";
				return false;
			}
		}
		document.getElementById("uphonetag").innerHTML = "填写正确！";
		document.getElementById("uphonetag").className = "SucceedMsg";
		return true;
	}
}
function checkUpassword1() {
	if (document.getElementById("upassword").value == '') {
		document.getElementById("passtag").innerHTML = "由字母数字组成，长度为4～16。 密码不能与账号名相同。";
		document.getElementById("passtag").className = "DefaultMsg";
		return false;
	} else {
		if (document.getElementById("upassword").value.length < 4
				|| document.getElementById("upassword").value.length > 16) {
			document.getElementById("passtag").innerHTML = "密码长度为4～16！";
			document.getElementById("passtag").className = "FailedMsg";
			return false;
		}

		for ( var i = 0; i < document.getElementById("upassword").value.length; i++) {
			if (!((document.getElementById("upassword").value.substr(i, 1) >= '0' && document
					.getElementById("upassword").value.substr(i, 1) <= '9')
					|| (document.getElementById("upassword").value.substr(i, 1) >= 'A' && document
							.getElementById("upassword").value.substr(i, 1) <= 'Z') || (document
					.getElementById("upassword").value.substr(i, 1) >= 'a' && document
					.getElementById("upassword").value.substr(i, 1) <= 'z'))) {
				document.getElementById("passtag").innerHTML = "密码由字母数字组成！";
				document.getElementById("passtag").className = "FailedMsg";
				return false;
			}
		}
		document.getElementById("passtag").innerHTML = "填写正确！";
		document.getElementById("passtag").className = "SucceedMsg";
		return true;
	}
}
function checkReUpassword1() {
	if (document.getElementById("reupassword").value != document
			.getElementById("upassword").value) {
		document.getElementById("repasstag").innerHTML = "两次密码不同，请重新输入";
		document.getElementById("reupassword").innerHTML = "";
		document.getElementById("repasstag").className = "FailedMsg";
		return false;
	} else {
		document.getElementById("repasstag").innerHTML = "填写正确";
		document.getElementById("repasstag").className = "SucceedMsg";
	}
	return true;

}
function checkuemail() {
	document.getElementById("uemailtag").innerHTML = "邮箱是您取回密码的重要途径，请正确填写.";
	document.getElementById("uemailtag").className = "SelectMsg";
}
function checkuemail1() {
	if (document.getElementById("uemail").value == '') {
		document.getElementById("uemailtag").innerHTML = "邮箱是您取回密码的重要途径，请正确填写。";
		document.getElementById("uemailtag").className = "DefaultMsg";
		return false;
	} else {
		for ( var i = 0; i < document.getElementById("uemail").value.length; i++) {
			if (!((document.getElementById("uemail").value.substr(i, 1) >= '0' && document
					.getElementById("uemail").value.substr(i, 1) <= '9')
					|| (document.getElementById("uemail").value.substr(i, 1) >= 'A' && document
							.getElementById("uemail").value.substr(i, 1) <= 'Z')
					|| (document.getElementById("uemail").value.substr(i, 1) >= 'a' && document
							.getElementById("uemail").value.substr(i, 1) <= 'z')
					|| document.getElementById("uemail").value.substr(i, 1) == '_'
					|| document.getElementById("uemail").value.substr(i, 1) == '.'
					|| document.getElementById("uemail").value.substr(i, 1) == '-' || document
					.getElementById("uemail").value.substr(i, 1) == "@")) {
				document.getElementById("uemailtag").innerHTML = "邮箱格式不合格！";
				document.getElementById("uemailtag").className = "FailedMsg";
				return false;
			}
		}

		if (document.getElementById("uemail").value.indexOf("@") < 0
				|| document.getElementById("uemail").value.indexOf(".") < 0) {
			document.getElementById("uemailtag").innerHTML = "邮箱格式不合格！";
			document.getElementById("uemailtag").className = "FailedMsg";
			return false;
		}
		document.getElementById("uemailtag").innerHTML = "正在检测";
		document.getElementById("uemailtag").className = "SelectMsg";
		// checkuemail_s();
		return true;
	}
}
function checkuid() {
	document.getElementById("uidtag").innerHTML = "邮箱是您取回密码的重要途径，请正确填写.";
	document.getElementById("uidtag").className = "SelectMsg";
}
function checkuid1() {
	if (document.getElementById("username1").value == '') {
		document.getElementById("uidtag").innerHTML = "邮箱是您取回密码的重要途径，请正确填写。";
		document.getElementById("uidtag").className = "DefaultMsg";
		return false;
	} else {
		for ( var i = 0; i < document.getElementById("username1").value.length; i++) {
			if (!((document.getElementById("username1").value.substr(i, 1) >= '0' && document
					.getElementById("username1").value.substr(i, 1) <= '9')
					|| (document.getElementById("username1").value.substr(i, 1) >= 'A' && document
							.getElementById("username1").value.substr(i, 1) <= 'Z')
					|| (document.getElementById("username1").value.substr(i, 1) >= 'a' && document
							.getElementById("username1").value.substr(i, 1) <= 'z')
					|| document.getElementById("username1").value.substr(i, 1) == '_'
					|| document.getElementById("username1").value.substr(i, 1) == '.'
					|| document.getElementById("username1").value.substr(i, 1) == '-' || document
					.getElementById("username1").value.substr(i, 1) == "@")) {
				document.getElementById("uidtag").innerHTML = "邮箱格式不合格！";
				document.getElementById("uidtag").className = "FailedMsg";
				return false;
			}
		}

		if (document.getElementById("username1").value.indexOf("@") < 0
				|| document.getElementById("username1").value.indexOf(".") < 0) {
			document.getElementById("uidtag").innerHTML = "邮箱格式不合格！";
			document.getElementById("uidtag").className = "FailedMsg";
			return false;
		}
		document.getElementById("uidtag").innerHTML = "正在检测fffff";
		document.getElementById("uidtag").className = "SelectMsg";
		checkUid_s();
		return true;
	}
}
function checkumajor() {
	document.getElementById("unametag").innerHTML = "(长度为2-15个字符)。";
	document.getElementById("unametag").className = "SelectMsg";
}
function checkumajor1() {
	re = /^[0-9a-zA-Z\u4e00-\u9fff]*$/;
	if (document.getElementById("umajor").value != '') {
		if (re.test(document.getElementById("umajor").value) == false
				|| document.getElementById("umajor").value.length > 15
				|| document.getElementById("umajor").value.length < 2) {
			document.getElementById("umajortag").innerHTML = "长度为2-15个字符";
			document.getElementById("umajortag").className = "FailedMsg";
			return false;
		}
		if (document.getElementById("umajor").value.indexOf("客服") >= 0
				|| document.getElementById("umajor").value.indexOf("管理员") >= 0
				|| document.getElementById("umajor").value.substr(0, 2)
						.toLowerCase() == "gm"
				|| document.getElementById("umajor").value.indexOf("版主") >= 0
				|| document.getElementById("umajor").value.indexOf("斑竹") >= 0
				|| document.getElementById("umajor").value.indexOf("兑奖") >= 0
				|| document.getElementById("umajor").value.indexOf("admin") >= 0
				|| document.getElementById("umajor").value.indexOf("中奖") >= 0
				|| document.getElementById("umajor").value.indexOf("代练") >= 0) {
			document.getElementById("umajortag").innerHTML = "很抱歉，'"
					+ document.getElementById("umajor").value + "'请填写正确的专业名称";
			document.getElementById("umajortag").className = "FailedMsg";
			return false;
		}
	} else {
		document.getElementById("umajortag").innerHTML = "专业名称长度为2-15个字符";
		document.getElementById("umajortag").className = "FailedMsg";
		return false;
	}
	document.getElementById("umajortag").innerHTML = "填写正确";
	document.getElementById("umajortag").className = "SelectMsg";
	return true;
}
function checkuname() {
	document.getElementById("unametag").innerHTML = "长度为2-15个字符";
	document.getElementById("unametag").className = "SelectMsg";
}
function checkuname1() {
	re = /^[0-9a-zA-Z\u4e00-\u9fff]*$/;
	if (document.getElementById("username").value != '') {
		if (re.test(document.getElementById("username").value) == false
				|| document.getElementById("username").value.length > 15
				|| document.getElementById("username").value.length < 2) {
			document.getElementById("unametag").innerHTML = "长度为2-15个字符";
			document.getElementById("unametag").className = "FailedMsg";
			return false;
		}
		if (document.getElementById("username").value.indexOf("客服") >= 0
				|| document.getElementById("username").value.indexOf("管理员") >= 0
				|| document.getElementById("username").value.substr(0, 2)
						.toLowerCase() == "gm"
				|| document.getElementById("username").value.indexOf("版主") >= 0
				|| document.getElementById("username").value.indexOf("斑竹") >= 0
				|| document.getElementById("username").value.indexOf("兑奖") >= 0
				|| document.getElementById("username").value.indexOf("admin") >= 0
				|| document.getElementById("username").value.indexOf("中奖") >= 0
				|| document.getElementById("username").value.indexOf("代练") >= 0) {
			document.getElementById("unametag").innerHTML = "很抱歉，'"
					+ document.getElementById("uname").value + "'已被占用!";
			document.getElementById("unametag").className = "FailedMsg";
			return false;
		}
	} else {
		document.getElementById("unametag").innerHTML = "账号不可为空，长度为2-15个字符";
		document.getElementById("unametag").className = "FailedMsg";
		return false;
	}
	document.getElementById("unametag").innerHTML = "正在检测";
	document.getElementById("unametag").className = "SelectMsg";
	checkUname_s();
	return true;
}
function checkReupassowrd() {
	document.getElementById("repasstag").innerHTML = "两次输入密码必须一样";
	document.getElementById("repasstag").className = "SelectMsg";
}
function checkubrithday1() {
	if (document.getElementById("ubrithday").value == '') {
		document.getElementById("ubrithdaytag").innerHTML = "生日不可大于当前时间";
		document.getElementById("ubrithdaytag").className = "FailedMsg";
		return false;
	} else {
		document.getElementById("ubrithdaytag").innerHTML = "填写正确！";
		document.getElementById("ubrithdaytag").className = "SucceedMsg";
		return true;
	}
}
function checkage() {
	document.getElementById("ubrithdaytag").innerHTML = "生日不可大于当前时间";
	document.getElementById("ubrithdaytag").className = "SelectMsg";
}
function validate_reg() {
	if (document.regform.agreement.checked == false) {
		alert("请选择“您已经仔细阅读了《嘟嘟外卖用户许可协议》”的选项后，方可继续下面的步骤！");
		return false;
	}
	if (flagid == 0 && flagname == 0 && flagsn == 0 && checkReUpassword1()
			&& checkuname1() && checkuid1() && checkustudentid1()
			&& checkuemail1() && checkumajor1()) {
		document.regform.submit();
	} else {
		alert("请确保你填写的信息都正确！");
		return false;
	}
}
function validate_modify() {

	var uname = document.getElementById("uname").value;
	var uphone = document.getElementById("uphone").value;

	if (re.test(uname) == false) {
		alert("用户名错误");
		document.getElementById("uname").focus();
		return false;
	}
	if (uname == '') {
		alert("用户名不能为空");
		document.getElementById("uname").focus();
		return false;
	}
	if (uname.indexOf("客服") >= 0 || uname.indexOf("管理员") >= 0
			|| uname.substr(0, 2).toLowerCase() == "gm"
			|| uname.indexOf("版主") >= 0 || uname.indexOf("斑竹") >= 0
			|| uname.indexOf("兑奖") >= 0 || uname.indexOf("admin") >= 0
			|| uname.indexOf("中奖") >= 0 || uname.indexOf("代练") >= 0) {
		alert("很抱歉，'" + uname + "'已被占用!");
		document.getElementById("uname").focus();
		return false;
	}

	if (uphone == "") {
		alert("请输入电话号码");
		document.getElementById("uphone").focus();
		return false;
	}
	document.modify.submit();
}
function validate_modifypassword() {

	var perpassword = document.getElementById("perpassword").value;
	var upassword = document.getElementById("upassword").value;
	var reupassword = document.getElementById("reupassword").value;

	if (perpassword == "" || upassword == "" || reupassword == "") {
		alert("请正确输入");
		return false;
	}
	document.modifypassword.submit();
}
// 换验证码图片
function fnChangeSn() {
	var sn = document.getElementById("imgSn");
	sn.src = "sn.jpg";
}

var academic = Array(32);
academic["政治与公共管理学院"] = [ "公共事业管理", "思想政治教育（师范）", "行政管理", "政治学与行政学", "哲学" ];
academic["经济管理学院"] = [ "旅游管理", "农业经济管理类", "经济学类", "工商管理类" ];
academic["法学院"] = [ "法学类" ];
academic["文化与社会发展学院"] = [ "公共管理类", "社会工作专业" ];
academic["教育学院 师范学院"] = [ "教育学类（师范）", "教育学（晏阳初实验班" ];
academic["心理学院"] = [ "心理学专业（师范）", "心理学专业", "应用心理学专业" ];
academic["体育学院"] = [ "体育教育（师范）", "运动训练" ];
academic["文学院"] = [ "汉语言文学(师范)", "对外汉语", "戏剧影视文学", "汉语言文学（非师范）" ];
academic["外国语学院"] = [ "英语（非师范）", "英语（师范）", "日语专业" ];
academic["新闻传媒学院"] = [ "广播电视编导", "播音与主持艺术", "新闻学" ];
academic["音乐学院"] = [ "音乐表演", "舞蹈学", "音乐学（师范）" ];
academic["美术学院"] = [ "艺术设计", "绘画", "雕塑", "美术学(师范)" ];
academic["历史文化学院 民族学院"] = [ "民族学", "历史学", "历史学（师范）" ];
academic["数学与统计学院"] = [ "数学与应用数学(师范)", "统计学" ];
academic["物理科学与技术学院 电子信息工程学院"] = [ "电气信息类", "物理学" ];
academic["化学化工学院"] = [ "材料化学专业", "应用化学专业", "化学专业（师范）", "化学工程与工艺专业" ];
academic["生命科学学院"] = [ "生物科学", "生物科学(师范)" ];
academic["生物技术学院"] = [ "蚕学", "生物技术" ];
academic["地理科学学院"] = [ "地理科学类", "地理科学（师范）" ];
academic["材料科学与工程学院"] = [ "材料物理", "金属材料工程" ];
academic["资源环境学院"] = [ "环境生态类" ];
academic["计算机与信息科学学院 软件学院"] = [ "信息管理系", "软件工程", "教育技术学", "教育技术学（师范）",
		"计算机科学与技术(师范)" ];
academic["工程技术学院"] = [ "土建类", "电子科学与技术", "机械类" ];
academic["纺织服装学院"] = [ "服装艺术设计方向", "纺织工程（本科）", "轻化工程" ];
academic["食品科学学院"] = [ "食品质量与安全", "包装工程", "茶学", "食品科学与工程" ];
academic["园艺园林学院"] = [ "城市规划专业", "园艺", "园林" ];
academic["农学与生物科技学院"] = [ "农学", "生物技术", "农村区域发展" ];
academic["植物保护学院"] = [ "植物保护", "制药工程", "生物安全" ];
academic["动物科技学院"] = [ "草业科学", "水产养殖学", "动物科学", "动物医学" ];
academic["药学院 中医药学院"] = [ "药学类" ];
academic["西南大学（荣昌校区）"] = [ "信息管理系", "商贸系", "动物医学系", "动物科学系水产系" ];
academic["西南大学应用技术学院"] = [ "旅游管理（旅行社与景区管理方向）", "艺术设计（视觉传达方向）", "新闻学（广告策划方向）",
		"计算机科学与技术（计算机应用方向）", "电子商务（网络开发建设与维护方向）" ];
function initpros() {
	var institute = document.getElementById("hiddeninstitute");
	var major = document.getElementById("hiddenmajor");
	var grade = document.getElementById("hiddengrade");

	var pros = document.getElementById("institute");

	pros.length = 0;
	var i = 0;
	for ( var pro in academic) {
		pros.add(new Option(pro, pro));
		i++;
		if (i == 32) {
			break;
		}
	}
	var city = document.getElementById("major");
	var pro = pros.value;
	city.length = 0;
	var m = academic[pro].length;
	var i = 0;
	for ( var n in academic[pro]) {
		city.add(new Option(academic[pro][n], academic[pro][n]));
		i++;
		if (i >= m)
			break;
	}
	var date = new Date();
	var year = date.getFullYear();
	var level = document.getElementById("grade");
	var anthority = document.getElementById("authority");
	anthority.add(new Option("普通用户（学生）", 2));
	anthority.add(new Option("教师（需审核）", 13));
	level.add(new Option(year, year));
	year--;
	level.add(new Option(year, year));
	year--;
	level.add(new Option(year, year));
	year--;
	level.add(new Option(year, year));
	year--;
	level.add(new Option(year, year));
	if (institute != null) {
		var ops = pros.options;
		for ( var i = 0; i < ops.length; i++) {
			var tempValue = ops[i].value;
			if (tempValue == institute.value) {
				ops[i].selected = true;
			}
		}
		changepro();
		var ops1 = city.options;
		for ( var i = 0; i < ops1.length; i++) {
			var tempValue1 = ops1[i].value;
			if (tempValue1 == major.value) {
				ops1[i].selected = true;
			}
		}
		var ops2 = level.options;
		for ( var i = 0; i < ops2.length; i++) {
			var tempValue2 = ops2[i].value;
			if (tempValue2 == grade.value) {
				ops2[i].selected = true;
			}
		}
	}

}
function changepro() {
	var city = document.getElementById("major");
	var pros = document.getElementById("institute");
	city.length = 0;
	for ( var pro in academic) {
		if (pros.value == pro) {
			var m = academic[pro].length;
			var i = 0;
			for ( var n in academic[pro]) {
				city.add(new Option(academic[pro][n], academic[pro][n]));
				i++;
				if (i >= m)
					break;
			}
		}
	}
}