var results = {
    animation: 3.5
}
var buildListResults = []
var buildListHeader = []


function getData() {
    $.ajax({
		url: AppURL.results,
		type: "GET",
        dataType: "json",
        cache: !0,
        complete: function (data) {
            var tmpData = data.responseJSON.data_results;
            results.giaidacbiet = tmpData.giaidacbiet
            results.giainhat = tmpData.giainhat
            results.giainhi = tmpData.giainhi
            results.giaikhuyenkhich = tmpData.giaikhuyenkhich
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
	buildListResults.push('<tr><td colspan="5" class="namegiai">'+g+'</td></tr>')
	for (var index = 0; index < e.length; index++) {
		var dat = e[index].split(';')
		var newlist = '<tr>' +
			'<td>' + (index + 1) + '</td>' +
			'<td>' + dat[3] + '</td>' +
			'<td>' + dat[4] + '</td>' +
			'<td>' + dat[5] + '</td>' +
			'<td>' + dat[6] + '</td>' +
			'<tr>';
		buildListResults.push(newlist)
	}
}


function getGiaiThuong() {
    putData(results.giaidacbiet, 'giaidacbiet', results.data_titles.giaidacbiet)
    putData(results.giainhat, 'giainhat', results.data_titles.giainhat)
    putData(results.giainhi, 'giainhi', results.data_titles.giainhi)
	putData(results.giaikhuyenkhich, 'giaikhuyenkhich', results.data_titles.giaikhuyenkhich)
	$('#lists-op table thead tr').html(buildListHeader)
	$('#lists-op table tbody').html(buildListResults)
}

// setInterval(function() {
//     getGiaiThuong()
// }, 3000);
