﻿var m_PreviewOCX = null;
var m_szHostName = "";
var m_lHttpPort = "80";
var m_lHttp = "http://";
var m_lRtspPort = "554";
var m_szUserPwdValue = "";
var m_iStreamType = 0; //码流类型

var g_szHttpPort = "80";   //当前http方式的端口，不包括https

var g_bIsIE = true; //是否是IE浏览器

m_lHttp = location.protocol + "//";
m_szHostName = location.hostname;

if (isIPv6Add(m_szHostName)) {
	m_szHostName = "[" + m_szHostName + "]";
}
if (location.port != "") {
	m_lHttpPort = location.port;
} else if (m_lHttp == "https://") {
	m_lHttpPort = "443";
}
g_szHttpPort = m_lHttpPort;

var HWP = null;  //插件对象

g_bIsIE  = !(/(msie\s|trident.*rv:)([\w.]+)/.exec( navigator.userAgent.toLowerCase()) == null);

/*************************************************
 Function:        replaceAll
 Description:    替换所有
 Input:            szDir:源字符
 szTar:目标字符
 Output:            无
 return:            无
 *************************************************/
String.prototype.replaceAll = function (szDir, szTar) {
	return this.replace(new RegExp(szDir, "g"), szTar);
}
/*************************************************
 Function:        toHex
 Description:    转换为16进制
 Input:            szStr:源字符
 Output:            无
 return:            无
 *************************************************/
String.prototype.toHex = function () {
	var szRes = "";
	for (var i = 0; i < this.length; i++) {
		szRes += this.charCodeAt(i).toString(16);
	}
	return szRes;
}
/*************************************************
 Function:        chooseLanguage
 Description:    选择语言
 Input:            lan：语言
 Output:            无
 return:            无
 *************************************************/
function chooseLanguage(lan) {
	if (translator.szCurLanguage != lan) {
		ChangeFrameLanguage(lan);
	}
	$('#laCurrentLanguage').html($('#' + lan).html());
	$('#divLanguageChoose').hide();
}
/*************************************************
 Function:        UnloadPage
 Description:    子页面销毁时，修改cookie为当前页
 Input:            src:页面路径
 index:ID序号
 Output:            无
 return:            无
 *************************************************/
function UnloadPage(src, index) {
	$.cookie('page', src + "%" + index);
	if (1 == index) {
		if (window.parent.$(".fishmodechoose").length > 0) {
			window.parent.$("#dvFishModeChoose").remove();
		}
		window.parent.$("#dvChangeSize").hide();
	}
	if (2 == index) {
		if (m_DownWindow && m_DownWindow.open && !m_DownWindow.closed) {
			m_DownWindow.close();
		}
		if (m_PictureDownWindow && m_PictureDownWindow.open && !m_PictureDownWindow.closed) {
			m_PictureDownWindow.close();
		}
		$("#playbackbar").empty();
	}
	if (4 == index) {
		if (g_HelpWindow && g_HelpWindow.open && !g_HelpWindow.closed) {
			g_HelpWindow.close();
		}
	}
	try {
		HWP.Stop(0);
		$("#main_plugin").empty();
	} catch (e) {
	}
}

/*************************************************
 Function:        parseXmlFromFile
 Description:    从xml文件中解析xml
 Input:            无
 Output:            无
 return:            xmlDoc
 *************************************************/
function parseXmlFromFile(fileRoute) {
	return $.ajax({
		url:fileRoute + "?version=" + ((typeof global_config !== "undefined") ? global_config.web_version : window.parent.global_config.web_version),
		dataType:"xml",
		type:"get",
		async:false
	}).responseXML;
}

/*************************************************
 Function:        parseXmlFromStr
 Description:    从xml字符串中解析xml
 Input:            szXml xml字符串
 Output:            无
 return:            xml文档
 *************************************************/
function parseXmlFromStr(szXml) {
	if (null == szXml || '' == szXml) {
		return null;
	}
	if (szXml.indexOf("&amp;") >= 0) {
		szXml.replace(/&amp;/g, "&");
	}
	szXml.replace(/&/g, "&amp;");
	var xmlDoc = new createxmlDoc();
	if (navigator.appName === "Netscape" || navigator.appName === "Opera") {
		var oParser = new DOMParser();
		xmlDoc = oParser.parseFromString(szXml, "text/xml");
	} else {
		xmlDoc.loadXML(szXml);
	}
	return xmlDoc;
}
/*************************************************
 Function:        xmlToStr
 Description:    xml转换字符串
 Input:            Xml xml文档
 Output:            无
 return:            字符串
 *************************************************/
function xmlToStr(Xml) {
	if (Xml == null) {
		return;
	}
	var XmlDocInfo = '';
	try {
		var oSerializer = new XMLSerializer();
		XmlDocInfo = oSerializer.serializeToString(Xml);
	} catch (e) {
		try {
			XmlDocInfo = Xml.xml;
		} catch (e) {
			return "";
		}
	}
	if (XmlDocInfo.indexOf('<?xml') == -1) {
		XmlDocInfo = "<?xml version='1.0' encoding='utf-8'?>" + XmlDocInfo;
	}
	return XmlDocInfo;
}

/*************************************************
 Function:        Base64
 Description:    Base64加密解密
 Input:            无
 Output:            无
 return:            无
 *************************************************/
var Base64 = {

	// private property
	_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

	// public method for encoding
	encode:function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;

		input = Base64._utf8_encode(input);

		while (i < input.length) {

			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;

			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}

			output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

		}

		return output;
	},

	// public method for decoding
	decode:function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;

		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		while (i < input.length) {

			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}

		}

		output = Base64._utf8_decode(output);

		return output;

	},

	// private method for UTF-8 encoding
	_utf8_encode:function (string) {
		string = string.replace(/\r\n/g, "\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	},

	// private method for UTF-8 decoding
	_utf8_decode:function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;

		while (i < utftext.length) {

			c = utftext.charCodeAt(i);

			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			} else if ((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i + 1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = utftext.charCodeAt(i + 1);
				c3 = utftext.charCodeAt(i + 2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}

		}

		return string;
	}
}
/*************************************************
 Function:        checkPlugin
 Description:    检测是否安装插件及向页面插入插件元素
 Input:            iType:表示插入插件的位置，0表示本地配置或远程升级等，1表示字符叠加等，2表示预览节界面
 szInfo:提示信息  该参数无效  modified by chenxiangzhen 2012-02-17
 iWndType:窗口分割模式
 iNeedBorder: 是否需要边框 0-不需要， 1-需要
 Output:            true:插件已安装；false:插件未安装
 return:            无
 *************************************************/
function checkPlugin(iType, szInfo, iWndType, szPlayMode, iNeedBorder) {
	var iDrawBorder = 1; //需要绘制边框
	if (iNeedBorder != "" && typeof iNeedBorder != 'undefined' || iNeedBorder != null) {
		iDrawBorder = iNeedBorder;
	}
	if (!g_bIsIE) {
		if ($("#main_plugin").html() !== "" && $("#PreviewActiveX").length !== 0) {
			var iPlayMode = 0;
			switch (szPlayMode) {
				case "normal":
					//iPlayMode = 0;
					break;
				case "motiondetect":
					iPlayMode = 1;
					break;
				case "tamperdetect":
					iPlayMode = 2;
					break;
				case "privacymask":
					iPlayMode = 3;
					break;
				case "textoverlay":
					iPlayMode = 4;
					break;
				case "osdsetting":
					iPlayMode = 5;
					break;
				case "snapdraw":
					iPlayMode = 6;
					break;
				case "fisheye":
					iPlayMode = 7;
					break;
				case "linedetect":
					iPlayMode = 8;
					break;
				case "fielddetect":
					iPlayMode = 9;
					break;
				default:
					//iPlayMode = 0;
					break;
			}
			HWP.SetPlayModeType(iPlayMode);
			//HWP.ArrangeWindow(parseInt(iWndType));
			return true;
		}

		var bInstalled = false;
		for (var i = 0, len = navigator.mimeTypes.length; i < len; i++) {
			if (navigator.mimeTypes[i].type.toLowerCase() == "application/hwp-webvideo-plugin") {
				bInstalled = true;
				if (iType == '0') {
					$("#main_plugin").html("<embed type='application/hwp-webvideo-plugin' id='PreviewActiveX' width='1' height='1' name='PreviewActiveX' align='center' wndtype='" + iWndType + "' playmode='" + szPlayMode + "' needborder='" + iDrawBorder + "'>");
					setTimeout(function () {
						$("#PreviewActiveX").css('height', '0px');
					}, 10); // 避免插件初始化不完全
				} else if (iType == '1') {
					$("#main_plugin").html("<embed type='application/hwp-webvideo-plugin' id='PreviewActiveX' width='352' height='288' name='PreviewActiveX' align='center' wndtype='" + iWndType + "' playmode='" + szPlayMode + "' needborder='" + iDrawBorder + "'>");
				} else {
					$("#main_plugin").html("<embed type='application/hwp-webvideo-plugin' id='PreviewActiveX' width='100%' height='100%' name='PreviewActiveX' align='center' wndtype='" + iWndType + "' playmode='" + szPlayMode + "' needborder='" + iDrawBorder + "'>");
				}
				$("#PreviewActiveX").css('width', '99.99%');
				break;
			}
		}
		if (!bInstalled) {
			if (navigator.platform == "Win32") {
				szInfo = getNodeValue('laPlugin');
				$("#main_plugin").html("<label name='laPlugin' onclick='window.open(\"../../codebase/WebComponents.exe\",\"_self\")' class='pluginLink' onMouseOver='this.className =\"pluginLinkSel\"' onMouseOut='this.className =\"pluginLink\"'>" + szInfo + "</label>");
			} else if (navigator.platform == "Mac68K" || navigator.platform == "MacPPC" || navigator.platform == "Macintosh") {
				szInfo = getNodeValue('laNotWin32Plugin');
				$("#main_plugin").html("<label name='laNotWin32Plugin' onclick='' class='pluginLink' style='cursor:default; text-decoration:none;'>" + szInfo + "</label>");
			} else {
				szInfo = getNodeValue('laNotWin32Plugin');
				$("#main_plugin").html("<label name='laNotWin32Plugin' onclick='' class='pluginLink' style='cursor:default; text-decoration:none;'>" + szInfo + "</label>");
			}
			return false;
		}
	} else {
		if ($("#main_plugin").html() !== "" && $("#PreviewActiveX").length !== 0 && $("#PreviewActiveX")[0].object !== null) {
			var iPlayMode = 0;
			switch (szPlayMode) {
				case "normal":
					//iPlayMode = 0;
					break;
				case "motiondetect":
					iPlayMode = 1;
					break;
				case "tamperdetect":
					iPlayMode = 2;
					break;
				case "privacymask":
					iPlayMode = 3;
					break;
				case "textoverlay":
					iPlayMode = 4;
					break;
				case "osdsetting":
					iPlayMode = 5;
					break;
				case "snapdraw":
					iPlayMode = 6;
					break;
				case "fisheye":
					iPlayMode = 7;
					break;
				case "linedetect":
					iPlayMode = 8;
					break;
				case "fielddetect":
					iPlayMode = 9;
					break;
				default:
					//iPlayMode = 0;
					break;
			}
			HWP.SetPlayModeType(iPlayMode);
			//HWP.ArrangeWindow(parseInt(iWndType));
			return true;
		}

		$("#main_plugin").html("<object classid='clsid:E7EF736D-B4E6-4A5A-BA94-732D71107808' codebase='' standby='Waiting...' id='PreviewActiveX' width='100%' height='100%' name='ocx' align='center' ><param name='wndtype' value='" + iWndType + "'><param name='playmode' value='" + szPlayMode + "'><param name='needborder' value='" + iDrawBorder + "'></object>");
		var previewOCX = document.getElementById("PreviewActiveX");
		if (previewOCX == null || previewOCX.object == null) {
			if ((navigator.platform == "Win32")) {
				szInfo = getNodeValue('laPlugin');
				$("#main_plugin").html("<label name='laPlugin' onclick='window.open(\"../../codebase/WebComponents.exe\",\"_self\")' class='pluginLink' onMouseOver='this.className =\"pluginLinkSel\"' onMouseOut='this.className =\"pluginLink\"'>" + szInfo + "<label>");
			} else {
				szInfo = getNodeValue('laNotWin32Plugin');
				$("#main_plugin").html("<label name='laNotWin32Plugin' onclick='' class='pluginLink' style='cursor:default; text-decoration:none;'>" + szInfo + "<label>");
			}

			return false;
		}
	}
	return true;
}
/*************************************************
 Function:        CompareFileVersion
 Description:    比较文件版本
 Input:            无
 Output:            无
 return:            false:需要更新 true：不需要更新
 *************************************************/
function CompareFileVersion() {
	var previewOCX = document.getElementById("PreviewActiveX");
	if (previewOCX == null) {
		return false;
	}
	var xmlDoc = parseXmlFromFile("../xml/version.xml");
	var szXml = xmlToStr(xmlDoc);
	var bRes = false;
	try {
		bRes = !previewOCX.HWP_CheckPluginUpdate(szXml);
		return bRes;
	} catch (e) {
		if (m_szBrowser != 'Netscape') {
			if (1 == CompareVersion("WebVideoActiveX.ocx")) {
				return false;		//插件需要更新
			}
		} else {
			if (1 == CompareVersion("npWebVideoPlugin.dll")) {
				return false;		//插件需要更新
			}
		}

		if (1 == CompareVersion("PlayCtrl.dll")) {
			return false;		//插件需要更新
		}

		if (1 == CompareVersion("StreamTransClient.dll")) {
			return false;		//插件需要更新
		}

		if (1 == CompareVersion("NetStream.dll")) {
			return false;		//插件需要更新
		}

		if (1 == CompareVersion("SystemTransform.dll")) {
			return false;		//插件需要更新
		}

		return true;
	}
}
/*************************************************
 Function:        CompareVersion
 Description:    比较文件版本
 Input:            文件名
 Output:            无
 return:            -1 系统中的版本高 0 版本相同 1 设备中的版本高
 *************************************************/
function CompareVersion(szFileName) {
	var xmlDoc = parseXmlFromFile("../xml/version.xml");

	var fvOld = m_PreviewOCX.GetFileVersion(szFileName, "FileVersion");
	var fvNew = xmlDoc.documentElement.getElementsByTagName(szFileName)[0].childNodes[0].nodeValue;

	if (szFileName == "hpr.dll") {
		var sp = ".";
	} else {
		var sp = ",";
	}
	var fvSigleOld = fvOld.split(sp);
	var fvSigleNew = fvNew.split(sp);

	for (var i = 0; i < 4; i++) {
		if (parseInt(fvSigleOld[i]) > parseInt(fvSigleNew[i])) {
			return -1;
		}

		if (parseInt(fvSigleOld[i]) < parseInt(fvSigleNew[i])) {
			return 1;
		}
	}
	return 0;
}
/*************************************************
 Function:        getXMLHttpRequest
 Description:    创建xmlhttprequest对象
 Input:            无
 Output:            无
 return:            无
 *************************************************/
function getXMLHttpRequest() {
	var xmlHttpRequest = null;
	if (window.XMLHttpRequest) {
		xmlHttpRequest = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
	}
	return xmlHttpRequest;
}
/*************************************************
 Function:        createxmlDoc
 Description:    创建xml DOM对象
 Input:            无
 Output:            无
 return:            无
 *************************************************/
function createxmlDoc() {
	var xmlDoc;
	var aVersions = [ "MSXML2.DOMDocument", "MSXML2.DOMDocument.5.0", "MSXML2.DOMDocument.4.0", "MSXML2.DOMDocument.3.0", "Microsoft.XmlDom"];

	for (var i = 0; i < aVersions.length; i++) {
		try {
			xmlDoc = new ActiveXObject(aVersions[i]);
			break;
		} catch (oError) {
			xmlDoc = document.implementation.createDocument("", "", null);
			break;
		}
	}
	xmlDoc.async = "false";
	return xmlDoc;
}
/*************************************************
 Function:        GoAway
 Description:    注销用户
 Input:            无
 Output:            无
 return:            无
 *************************************************/
function GoAway() {
	Warning = confirm(contentframe.window.m_szExit);
	if (Warning) {
		$.cookie('userInfo' + m_lHttpPort, null);
		$.cookie('page', null);
		
		var nowDate = new Date();
		window.location.href = "login.asp?_"+nowDate.getTime();
	}
}
/*************************************************
 Function:        get_previoussibling
 Description:    获取节点的上一个子节点
 Input:            无
 Output:            无
 return:            无
 *************************************************/
function get_previoussibling(n) {
	var x = n.previousSibling;
	while (x.nodeType != 1) {
		x = x.previousSibling;
	}
	return x;
}
/*************************************************
 Function:        browseFilePath
 Description:    浏览系统文件夹路径
 Input:            szId:文本框ID, iSelectMode 打开模式
 Output:            无
 return:            无
 *************************************************/
function browseFilePath(szId, iSelectMode, szFilterType) {
	if (szFilterType === undefined) {
		szFilterType = "";
	}
	if (m_PreviewOCX != null) {
		var szPost = HWP.OpenFileBrowser(iSelectMode, szFilterType);
		if (szPost == "" || szPost == null) {
			return;
		} else {
			if (iSelectMode == 1) {
				if (szPost.length > 100) {
					alert(getNodeValue('tipsTooLong'));
					return;
				}
			} else {
				if (szPost.length > 130) {
					alert(getNodeValue('tipsTooLong'));
					return;
				}
			}

			document.getElementById(szId).value = szPost;
		}
	}
}
/*************************************************
 Function:        CreateCalendar
 Description:    创建日历
 Input:            iType: 0 日志界面日历 1 时间配置界面日历
 Output:            无
 return:            无
 *************************************************/
function CreateCalendar(iType) {
	var szLanguage = '';
	if (parent.translator.szCurLanguage == 'zh') {
		szLanguage = 'zh-cn';
	} else if (parent.translator.szCurLanguage == 'zh_TW') {
		szLanguage = 'zh-tw';
	} else {
		$.each(parent.translator.languages, function (i) {
			if (this.value === parent.translator.szCurLanguage) {
				szLanguage = this.value;
			}
		});
		if (szLanguage === '') {
			szLanguage = 'en';
		}
	}
	if (iType == 0) {
		WdatePicker({startDate:'%y-%M-%d %h:%m:%s', dateFmt:'yyyy-MM-dd HH:mm:ss', alwaysUseStartDate:false, minDate:'1970-01-01 00:00:00', maxDate:'2037-12-31 23:59:59', readOnly:true, lang:szLanguage, isShowClear:false});
	} else if (2 == iType) {
		WdatePicker({dateFmt:'HH:mm:ss', alwaysUseStartDate:false, readOnly:true, lang:szLanguage, isShowClear:false});
	} else {
		WdatePicker({startDate:'%y-%M-%d %h:%m:%s', dateFmt:'yyyy-MM-ddTHH:mm:ss', alwaysUseStartDate:false, minDate:'1970-01-01 00:00:00', maxDate:'2037-12-31 23:59:59', readOnly:true, lang:szLanguage, isShowClear:false});
	}
}

/*************************************************
 Function:        getNodeValue
 Description:    得到节点值
 Input:            tagName:元素名
 Output:            无
 return:            无
 *************************************************/
function getNodeValue(tagName) {
	if (parent != this) { // 父frame包含Translator.js，当前frame包含common.js
		var _translator = parent.translator;
	} else { // 当前节点包含Translator.js和common.js
		var _translator = translator;
	}
	if (_translator.s_lastLanguageXmlDoc !== null) {
		return _translator.translateNodeByLastLxd(tagName);
	}
}

/**********************************
 Function:        DayAdd
 Description:    日期加天数
 Input:            szDay: 要加的日期
 iAdd： 加的天数
 Output:            无
 return:            true 有录像； false 没有录像；
 ***********************************/
function DayAdd(szDay, iAdd) {
	var date = new Date(Date.parse(szDay.replace(/\-/g, '/')));
	var newdate = new Date(date.getTime() + (iAdd * 24 * 60 * 60 * 1000));

	return newdate.Format("yyyy-MM-dd hh:mm:ss");
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) {
	var o = {
		"M+":this.getMonth() + 1, //月份
		"d+":this.getDate(), //日
		"h+":this.getHours(), //小时
		"m+":this.getMinutes(), //分
		"s+":this.getSeconds(), //秒
		"q+":Math.floor((this.getMonth() + 3) / 3), //季度
		"S":this.getMilliseconds()//毫秒
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
}
Date.prototype.utcFormat = function (fmt) {
	var o = {
		"M+":this.getUTCMonth() + 1, //月份
		"d+":this.getUTCDate(), //日
		"h+":this.getUTCHours(), //小时
		"m+":this.getUTCMinutes(), //分
		"s+":this.getUTCSeconds(), //秒
		"q+":Math.floor((this.getUTCMonth() + 3) / 3), //季度
		"S":this.getUTCMilliseconds()//毫秒
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getUTCFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
}
/*************************************************
 Function:       convertToLocalTime
 Description:    将UTC时间转换为设备本地时间
 Input:          szUTCTime: UTC时间字符串
 				 iDiffTime: PC本地时间与设备本地时间差
 Output:         无
 return:         本地时间字符串
 *************************************************/
function convertToLocalTime(szUTCTime, iDiffTime) {
	if (typeof iDiffTime == "undefined") {
		iDiffTime = 0;
	}
	var szFormat = "yyyy-MM-dd hh:mm:ss";
	var _aDate = szUTCTime.split(" ")[0].split("-");
	var _iFullYear = parseInt(_aDate[0], 10);
	var _iMonth = parseInt(_aDate[1], 10) - 1;
	var _iDay = parseInt(_aDate[2], 10);
	
	var _aTimes = szUTCTime.split(" ")[1].split(":");
	var _iHour = parseInt(_aTimes[0], 10);
	var _iMinute = parseInt(_aTimes[1], 10);
	var _iSecond = parseInt(_aTimes[2], 10);
	
	var _dLocalDate = new Date(Date.UTC(_iFullYear, _iMonth, _iDay, _iHour, _iMinute, _iSecond));
	_dLocalDate.setTime(_dLocalDate.getTime() + iDiffTime);
	return _dLocalDate.Format(szFormat);
}
/*************************************************
 Function:       convertToUTCTime
 Description:    将本地时间转换为UTC时间
 Input:          UTC时间字符串
 				 szFormat: 转换格式，默认yyyy-MM-dd hh:mm:ss
 Output:         无
 return:         本地时间字符串
 *************************************************/
function convertToUTCTime(szLocalTime, szFormat) {
	if (typeof szFormat == "undefined") {
		szFormat = "yyyy-MM-dd hh:mm:ss";
	}
	var _dLocalDate = new Date(Date.parse(szLocalTime.replace(/-/g, "/")));
	return _dLocalDate.utcFormat(szFormat);
}
/*************************************************
 Function:        getUPnPInfo
 Description:    获取UPnP信息
 Input:            无
 Output:            无
 return:            端口信息对象
 *************************************************/
function getUPnPInfo() {
	var _bNeedUPnP = false;
	//UPnP目前不支持IPv6
	if (m_szHostName.indexOf("[") == -1) {
		var bEnablePPPoE = false;
		$.ajax({
			type:"GET",
			url:m_lHttp + m_szHostName + ":" + m_lHttpPort + "/ISAPI/System/Network/PPPoE/1/status",
			timeout:15000,
			async:false,
			beforeSend:function (xhr) {
				xhr.setRequestHeader("If-Modified-Since", "0");
				xhr.setRequestHeader("Authorization", "Basic " + m_szUserPwdValue);
			},
			success:function (xmlDoc, textStatus, xhr) {
				bEnablePPPoE = $(xmlDoc).find("enabled").eq(0).text() == "true";
				if($(xmlDoc).find("ipAddress").length > 0) {
					if ($(xmlDoc).find("ipAddress").eq(0).text() != "0.0.0.0") {
						bEnablePPPoE = true;
					} else {
						bEnablePPPoE = false;
					}
				} else if($(xmlDoc).find("ipv6Address").length > 0) {	
					if ($(xmlDoc).find("ipv6Address").eq(0).text() != "::") {
						bEnablePPPoE = true;
					} else {
						bEnablePPPoE = false;
					}
				} else {
					bEnablePPPoE = false;
				}
			}
		});
		if (!bEnablePPPoE) {
			$.ajax({
				type:"GET",
				url:m_lHttp + m_szHostName + ":" + m_lHttpPort + "/ISAPI/System/Network/interfaces",
				async:false,
				beforeSend:function (xhr) {
					xhr.setRequestHeader("If-Modified-Since", "0");
					xhr.setRequestHeader("Authorization", "Basic " + ("YW5vbnltb3VzOn9/f39/fw==" === m_szUserPwdValue ? "" : m_szUserPwdValue));
				},
				success:function (xmlDoc, textStatus, xhr) {
					var szIPArray = [];
					var oNetworkInterface = $(xmlDoc).find("NetworkInterface");
					for (var i = 0; i < oNetworkInterface.length; i++) {
						szIPArray.push(oNetworkInterface.eq(i).find("IPAddress").eq(0).find("ipAddress").eq(0).text());
					}
					if ($.inArray(m_szHostName, szIPArray) == -1) {
						$.ajax({
							type:"GET",
							url:m_lHttp + m_szHostName + ":" + m_lHttpPort + "/ISAPI/System/Network/UPnP/ports/status",
							async:false,
							beforeSend:function (xhr) {
								xhr.setRequestHeader("If-Modified-Since", "0");
								xhr.setRequestHeader("Authorization", "Basic " + ("YW5vbnltb3VzOn9/f39/fw==" === m_szUserPwdValue ? "" : m_szUserPwdValue));
							},
							success:function (xmlDoc, textStatus, xhr) {
								_bNeedUPnP = true;
								var oPortStatusList = $(xmlDoc).find("portStatus");
								for (var i = 0; i < oPortStatusList.length; i++) {
									if (oPortStatusList.eq(i).find("internalPort").eq(0).text() == "rtsp") {
										m_lRtspPort = oPortStatusList.eq(i).find("externalPort").eq(0).text();
										break;
									}
								}
							}
						});
					}
				}
			});
		}
	}
	//获取RTSP和HTTP端口
	$.ajax({
		type: "GET",
		url: m_lHttp + m_szHostName + ":" + m_lHttpPort + "/ISAPI/Security/adminAccesses",
		async: false,
		timeout: 15000,
		beforeSend: function(xhr) {
			xhr.setRequestHeader("If-Modified-Since", "0");
			xhr.setRequestHeader("Authorization", "Basic " + m_szUserPwdValue);
		},
		success: function(xmlDoc, textStatus, xhr) {
			var oPortsArray = $(xmlDoc).find('AdminAccessProtocol');
			for(var i = 0; i < oPortsArray.length; i++) {
				switch (oPortsArray.eq(i).find("protocol").eq(0).text()) {
					case "HTTP":
						if(m_lHttp == "https://") {
							g_szHttpPort = oPortsArray.eq(i).find("portNo").eq(0).text();
						}
						break;
					case "RTSP":
						if(!_bNeedUPnP) {
							m_lRtspPort = oPortsArray.eq(i).find("portNo").eq(0).text();
						}
						break;
					default:
						break;
				}
			}
		}
	});
	HWP = null;
	HWP = new Plugin(1, m_szHostName, g_szHttpPort, m_lRtspPort);
}
/*************************************************
 Function:        UpdateTips
 Description:    更新提示
 Input:            无
 Output:            无
 return:            无
 *************************************************/
function UpdateTips() {
	var bUpdateTips = $.cookie('updateTips');
	var szUpdate = '';
	if (bUpdateTips == 'true') {
		if (navigator.platform == "Win32") {
			szUpdate = getNodeValue('jsUpdatePlugin');
			Warning = confirm(szUpdate);
			if (Warning) {
				window.open("../../codebase/WebComponents.exe", "_self");
			} else {
				$.cookie('updateTips', 'false');
			}
		} else {
			szUpdate = getNodeValue('jsUpdateNotWin32');
			setTimeout(function () {
				alert(szUpdate);
			}, 20);
			$.cookie('updateTips', 'false');
		}
	}
}
/*************************************************
 Function:        isIPv6Add
 Description:    校验是否为有效的IPV6地址
 Input:            strInfo:IPV6地址
 Output:            true:是 false:否
 return:            无
 *************************************************/
function isIPv6Add(strInfo) {
	return /:/.test(strInfo) && strInfo.match(/:/g).length < 8 && /::/.test(strInfo) ? (strInfo.match(/::/g).length == 1 && /^::$|^(::)?([\da-f]{1,4}(:|::))*[\da-f]{1,4}(:|::)?$/i.test(strInfo)) : /^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i.test(strInfo);
}
/*************************************************
 Function:       getDeviceMinusLocalTime
 Description:    获取设备与本地时间差
 Input:          无
 Output:         无
 return:         无
 *************************************************/
function getDeviceMinusLocalTime() {
	var iDeviceMinusLocalTime = 0;
	$.ajax({
		type:"GET",
		url:m_lHttp + m_szHostName + ":" + m_lHttpPort + "/ISAPI/System/time",
		beforeSend:function (xhr) {
			xhr.setRequestHeader("If-Modified-Since", "0");
			xhr.setRequestHeader("Authorization", "Basic " + m_szUserPwdValue);
		},
		async:false,
		success:function (xmlDoc, textStatus, xhr) {
			//设备时间
			var szDeviceTime = $(xmlDoc).find("localTime").eq(0).text().substring(0, 19);
			var arDTms = szDeviceTime.match(/(\d+)-(\d+)-(\d+)(\D+)(\d+):(\d+):(\d+)/);
			if (arDTms.length !== 8) {
				return;
			}
			var dtDeviceDate = new Date(arDTms[1], arDTms[2] - 1, arDTms[3], arDTms[5], arDTms[6], arDTms[7]);
			//设备夏令时
			var szTimeZone = $(xmlDoc).find("timeZone").eq(0).text();
			var iDSTTime = 0;
			var iDSTPos = szTimeZone.indexOf("DST");
			if (iDSTPos != -1) {
				var dtDSTStart = new Date(dtDeviceDate.getTime());
				dtDSTStart.setMinutes(0);
				dtDSTStart.setSeconds(0);
				var dtDSTStop = new Date(dtDeviceDate.getTime());
				dtDSTStop.setMinutes(0);
				dtDSTStop.setSeconds(0);
				var szDSTStartTime = szTimeZone.split(",")[1];
				var szDSTStopTime = szTimeZone.split(",")[2];
				//计算夏令时的开始时间
				var iDSTStartMonth = parseInt(szDSTStartTime.split(".")[0].replace("M", ""), 10);
				dtDSTStart.setMonth(iDSTStartMonth-1);
				var iDSTStartWeek = parseInt(szDSTStartTime.split(".")[1], 10);
				var iDSTStartDay = parseInt(szDSTStartTime.split(".")[2].split("/")[0]);
				var iDSTStartTime  = parseInt(szDSTStartTime.split(".")[2].split("/")[1].split(":")[0], 10);
				dtDSTStart.setHours(iDSTStartTime);
				var iTime = 0;
				var iDate = 0;
				for( var i = 1 ; i <= 31 ; i++ ){
					dtDSTStart.setDate(i);
					//当月没有此天
					if (dtDSTStart.getMonth() !== (iDSTStartMonth-1)) {
						break;
					}
					if (dtDSTStart.getDay() == iDSTStartDay) {
						iTime++;
						iDate = i;
						if (iTime == iDSTStartWeek) {
							break;
						}
					}
				}
				dtDSTStart.setDate(iDate);
				dtDSTStart.setMonth(iDSTStartMonth-1);
				//计算夏令时的结束时间
				var iDSTStopMonth = parseInt(szDSTStopTime.split(".")[0].replace("M", ""), 10);
				dtDSTStop.setMonth(iDSTStopMonth-1);
				var iDSTStopWeek = parseInt(szDSTStopTime.split(".")[1], 10);
				var iDSTStopDay = parseInt(szDSTStopTime.split(".")[2].split("/")[0]);
				var iDSTStopTime  = parseInt(szDSTStopTime.split(".")[2].split("/")[1].split(":")[0], 10);
				dtDSTStop.setHours(iDSTStopTime);
				iTime = 0;
				iDate = 0;
				for( var i = 1 ; i <= 31 ; i++ ){
					dtDSTStop.setDate(i);
					//当月没有此天
					if (dtDSTStop.getMonth() !== (iDSTStopMonth-1)) {
						break;
					}
					if (dtDSTStop.getDay() == iDSTStopDay) {
						iTime++;
						iDate = i;
						if (iTime == iDSTStopWeek) {
							break;
						}
					}
				}
				dtDSTStop.setDate(iDate);
				dtDSTStop.setMonth(iDSTStopMonth-1);

				if (dtDeviceDate.getTime() >= dtDSTStart.getTime() && dtDeviceDate.getTime() <= dtDSTStop.getTime()) {
					var szDSTTime = szTimeZone.substring(iDSTPos + 3, iDSTPos + 11);
					iDSTTime = parseInt(szDSTTime.split(":")[0], 10) * 60 + parseInt(szDSTTime.split(":")[1], 10);
				}
			}
			var arDTZms = szTimeZone.match(/\D+([+-])(\d+):(\d+):(\d+)/);
			if (arDTZms.length == 5) {
				var dtNow = new Date();
				var iLocalOffsetMin = dtNow.getTimezoneOffset();
				var iDeviceOffsetMin = parseInt(arDTZms[2]) * 60 + parseInt(arDTZms[3]); // min
				iDeviceOffsetMin = ((arDTZms[1] === "+") ? iDeviceOffsetMin : -iDeviceOffsetMin);
				iDeviceMinusLocalTime = (iLocalOffsetMin - iDeviceOffsetMin + iDSTTime);
			}
		}
	});
	return iDeviceMinusLocalTime;
}