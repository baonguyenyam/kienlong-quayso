var results = {
    animation: 3.5
}
var buildListResults = []


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
            if (results.bgimg) {
                setTimeout(function () {
                    $('body').css({
                        "background-image": "url(" + results.bgimg + ")"
                    })
                }, 200);
            }
            getGiaiThuong()
        }
    })
}

getData()

function putData(e, w, g) {
	buildListResults.push('<tr><td colspan="5" class="namegiai">'+g+' - ' + e.length + ' giải</td></tr>')
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
    putData(results.giaidacbiet, 'giaidacbiet', 'Giải đặc biệt')
    putData(results.giainhat, 'giainhat', 'Giải nhất')
    putData(results.giainhi, 'giainhi', 'Giải nhì')
	putData(results.giaikhuyenkhich, 'giaikhuyenkhich', 'Giải khuyến khích')
	$('#lists-op table tbody').append(buildListResults)
}

// setInterval(function() {
//     getGiaiThuong()
// }, 3000);
