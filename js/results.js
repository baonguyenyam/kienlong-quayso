var results = {
    animation: 3.5
}
var buildListResults = []
var buildListHeader = []


function getData() {
	$('#loading').removeClass('done').removeClass('finished')
	$.ajax({
		url: AppURL.results,
		type: "GET",
        dataType: "json",
        cache: !0,
        complete: function (data) {
			var tmpData = data.responseJSON.data_results;
			tmpData.giaidacbiet_1 ? results.giaidacbiet_1 = tmpData.giaidacbiet_1 : null;
			tmpData.giaidacbiet_2 ? results.giaidacbiet_2 = tmpData.giaidacbiet_2 : null;
			tmpData.giaidacbiet_3 ? results.giaidacbiet_3 = tmpData.giaidacbiet_3 : null;
			tmpData.giaidacbiet_4 ? results.giaidacbiet_4 = tmpData.giaidacbiet_4 : null;
			tmpData.giainhat_1 ? results.giainhat_1 = tmpData.giainhat_1 : null;
			tmpData.giainhat_2 ? results.giainhat_2 = tmpData.giainhat_2 : null;
			tmpData.giainhat_3 ? results.giainhat_3 = tmpData.giainhat_3 : null;
			tmpData.giainhat_4 ? results.giainhat_4 = tmpData.giainhat_4 : null;
			tmpData.giainhi_1 ? results.giainhi_1 = tmpData.giainhi_1 : null;
			tmpData.giainhi_2 ? results.giainhi_2 = tmpData.giainhi_2 : null;
			tmpData.giainhi_3 ? results.giainhi_3 = tmpData.giainhi_3 : null;
			tmpData.giainhi_4 ? results.giainhi_4 = tmpData.giainhi_4 : null;
			tmpData.giaikhuyenkhich_1 ? results.giaikhuyenkhich_1 = tmpData.giaikhuyenkhich_1 : null;
			tmpData.giaikhuyenkhich_2 ? results.giaikhuyenkhich_2 = tmpData.giaikhuyenkhich_2 : null;
			tmpData.giaikhuyenkhich_3 ? results.giaikhuyenkhich_3 = tmpData.giaikhuyenkhich_3 : null;
			tmpData.giaikhuyenkhich_4 ? results.giaikhuyenkhich_4 = tmpData.giaikhuyenkhich_4 : null;
            // results.giaidacbiet = tmpData.giaidacbiet
            // results.giainhi = tmpData.giainhat
            // results.giainhi = tmpData.giainhi
            // results.giaikhuyenkhich = tmpData.giaikhuyenkhich
			results.bgimg = data.responseJSON.bgimg
			results.data_titles = data.responseJSON.data_titles
			results.columnTitle = data.responseJSON.columnTitle.split(',')
            if (results.bgimg) {
                setTimeout(function () {
                    $('body').css({
                        "background-image": "url(" + results.bgimg + ")"
                    })
                }, 200);
			}
			buildHeader()
			getGiaiThuong()
			setTimeout(function() {
                $('#loading').addClass('done')
            }, 200);
            setTimeout(function() {
                $('#loading').removeClass('done').addClass('finished')
            }, 1000);
        }
    })
}

getData()

function buildHeader() {
	buildListHeader.push('<th scope="col">STT</th>')
	for (var index = 0; index < (results.columnTitle.length - 3); index++) {
		buildListHeader.push('<th scope="col">' + results.columnTitle[index+3] + '</th>')
	}
}

function putData(e, w, g) {
	buildListResults.push('<tr><td colspan="'+(results.columnTitle.length - 2)+'" class="namegiai">'+g+'</td></tr>')
	for (var index = 0; index < e.length; index++) {
		var dat = e[index].split(';')
		var newnoneList = []
		newnoneList.push('<td>' + (index + 1) + '</td>')
		for (var tem = 0; tem < (results.columnTitle.length - 3); tem++) {
			newnoneList.push('<td>' + dat[tem+3] + '</td>')
		}
		var newlist = '<tr>' + newnoneList + '<tr>';
		buildListResults.push(newlist)
	}
}


function getGiaiThuong() {
	if (results.giaidacbiet_1 && results.giaidacbiet_1.length>0) {
		putData(results.giaidacbiet_1, 'giaidacbiet_1', results.data_titles.giaidacbiet_1)
	}
	if (results.giaidacbiet_2 && results.giaidacbiet_2.length>0) {
		putData(results.giaidacbiet_2, 'giaidacbiet_2', results.data_titles.giaidacbiet_2)
	}
	if (results.giaidacbiet_3 && results.giaidacbiet_3.length>0) {
		putData(results.giaidacbiet_3, 'giaidacbiet_3', results.data_titles.giaidacbiet_3)
	}
	if (results.giaidacbiet_4 && results.giaidacbiet_4.length>0) {
		putData(results.giaidacbiet_4, 'giaidacbiet_4', results.data_titles.giaidacbiet_4)
	}
	if (results.giainhat_1 && results.giainhat_1.length>0) {
		putData(results.giainhat_1, 'giainhat_1', results.data_titles.giainhat_1)
	}
	if (results.giainhat_2 && results.giainhat_2.length>0) {
		putData(results.giainhat_2, 'giainhat_2', results.data_titles.giainhat_2)
	}
	if (results.giainhat_3 && results.giainhat_3.length>0) {
		putData(results.giainhat_3, 'giainhat_3', results.data_titles.giainhat_3)
	}
	if (results.giainhat_4 && results.giainhat_4.length>0) {
		putData(results.giainhat_4, 'giainhat_4', results.data_titles.giainhat_4)
	}
	if (results.giainhi_1 && results.giainhi_1.length>0) {
		putData(results.giainhi_1, 'giainhi_1', results.data_titles.giainhi_1)
	}
	if (results.giainhi_2 && results.giainhi_2.length>0) {
		putData(results.giainhi_2, 'giainhi_2', results.data_titles.giainhi_2)
	}
	if (results.giainhi_3 && results.giainhi_3.length>0) {
		putData(results.giainhi_3, 'giainhi_3', results.data_titles.giainhi_3)
	}
	if (results.giainhi_4 && results.giainhi_4.length>0) {
		putData(results.giainhi_4, 'giainhi_4', results.data_titles.giainhi_4)
	}
	if (results.giaikhuyenkhich_1 && results.giaikhuyenkhich_1.length>0) {
		putData(results.giaikhuyenkhich_1, 'giaikhuyenkhich_!', results.data_titles.giaikhuyenkhich_1)
	}
	if (results.giaikhuyenkhich_2 && results.giaikhuyenkhich_2.length>0) {
		putData(results.giaikhuyenkhich_2, 'giaikhuyenkhich_2', results.data_titles.giaikhuyenkhich_2)
	}
	if (results.giaikhuyenkhich_3 && results.giaikhuyenkhich_3.length>0) {
		putData(results.giaikhuyenkhich_3, 'giaikhuyenkhich_3', results.data_titles.giaikhuyenkhich_3)
	}
	if (results.giaikhuyenkhich_4 && results.giaikhuyenkhich_4.length>0) {
		putData(results.giaikhuyenkhich_4, 'giaikhuyenkhich_4', results.data_titles.giaikhuyenkhich_4)
	}
	$('#lists-op table thead tr').html(buildListHeader)
	$('#lists-op table tbody').html(buildListResults)
}

// setInterval(function() {
//     getGiaiThuong()
// }, 3000);
