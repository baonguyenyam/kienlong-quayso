var FULL_URL = '/api/'
// var FULL_URL = 'http://preview6455.canhcam.com.vn/api/'
var AppURL = {
	giai_dacbiet: FULL_URL + 'AwardService.aspx?method=data_',
	giai_dacbiet_update: FULL_URL + 'AwardService.aspx?p=',
	giai_khuyenkhich: FULL_URL + 'AwardService.aspx?method=data_',
	giai_khuyenkhich_update: FULL_URL + 'AwardService.aspx?p=',
	giai_nhat: FULL_URL + 'AwardService.aspx?method=data_',
	giai_nhat_update: FULL_URL + 'AwardService.aspx?p=',
	giai_nhi: FULL_URL + 'AwardService.aspx?method=data_',
	giai_nhi_update: FULL_URL + 'AwardService.aspx?p=',
	kiemtra: FULL_URL + "AwardService.aspx?method=",
	main: FULL_URL + "AwardService.aspx?method=Control",
	index: FULL_URL + "AwardService.aspx?method=index",
	results: FULL_URL + "AwardService.aspx?method=data_results"
};
// var AppURL = {
// 	giai_dacbiet: './json/data_giaidacbiet.json',
// 	giai_dacbiet_update: '/?p=',
// 	giai_khuyenkhich: './json/data_giaikhuyenkhich.json',
// 	giai_khuyenkhich_update: '/?p=',
// 	giai_nhat: './json/data_giainhat.json',
// 	giai_nhat_update: '/?p=',
// 	giai_nhi: './json/data_giainhi.json',
// 	giai_nhi_update: '/?p=',
// 	kiemtra: "./json/data_searchresult.json",
// 	main: "./json/control.json",
// 	index: "./json/index.json",
// 	results: "./json/data_results.json"
// };

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function DemoMode() {
    $('body').append('<div class="demomode"><img src="./img/demo.png"></div>')
}
document.onkeyup = function (t) {
	if ((t = t || window.event).altKey && t.ctrlKey && t.shiftKey && 13 == t.which) return $("body"), alert(b64DecodeUnicode("QkFPIE5HVVlFTiAtIDA5Njk2ODk4OTMKRW1haWw6IGJhb25ndXllbnlhbUBnbWFpbC5jb20KV2ViOiBiYW9uZ3V5ZW55YW0uZ2l0aHViLmlv")), !1
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function b64EncodeUnicode(str) {
	return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
		function toSolidBytes(match, p1) {
			return String.fromCharCode('0x' + p1);
		}));
}

function b64DecodeUnicode(str) {
	return decodeURIComponent(atob(str).split('').map(function (c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));
}

jQuery(document).ready(function(){
    jQuery('.table-fixed tbody').addClass('scrollbar-inner').scrollbar();
});


// $(document).ready(function () {
// 	setTimeout(function() {
// 		$('.mainlottery .row div.chucmung').append('<button type="button" class="btn btn-primary" onclick="window.location.href=\'./index.html\'">Về trang chủ</button>')
// 		$('.mainlottery.adbtnnew, .mainbox').append('<div class="text-center mt-2"><button type="button" class="btn btn-primary" onclick="window.location.href=\'./index.html\'">Về trang chủ</button></div>')
// 	}, 1000);
// })
