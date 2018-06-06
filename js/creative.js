// var FULL_URL = 'http://kienlongbanklucky.canhcam.gb/api/'
// var AppURL = {
// 	giai_dacbiet: FULL_URL + 'AwardService.aspx?method=data_giaidacbiet',
// 	giai_dacbiet_update: FULL_URL + 'AwardService.aspx?p=',
// 	giai_khuyenkhich: FULL_URL + 'AwardService.aspx?method=data_giaikhuyenkhich',
// 	giai_khuyenkhich_update: FULL_URL + 'AwardService.aspx?p=',
// 	giai_nhat: FULL_URL + 'AwardService.aspx?method=data_giainhat',
// 	giai_nhat_update: FULL_URL + 'AwardService.aspx?p=',
// 	giai_nhi: FULL_URL + 'AwardService.aspx?method=data_giainhi',
// 	giai_nhi_update: FULL_URL + 'AwardService.aspx?p=',
// 	kiemtra: FULL_URL + "AwardService.aspx?method=",
// 	main: FULL_URL + "AwardService.aspx?method=Control",
// 	index: "./json/index.json",
// 	results: FULL_URL + "AwardService.aspx?method=data_results"
// };
var AppURL = {
	giai_dacbiet: './json/data_giaidacbiet.json',
	giai_dacbiet_update: '/?p=',
	giai_khuyenkhich: './json/data_giaikhuyenkhich.json',
	giai_khuyenkhich_update: '/?p=',
	giai_nhat: './json/data_giainhat.json',
	giai_nhat_update: '/?p=',
	giai_nhi: './json/data_giainhi.json',
	giai_nhi_update: '/?p=',
	kiemtra: "./json/.json",
	main: "./json/control.json",
	index: "./json/index.json",
	results: "./json/data_results.json"
};

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
