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
			console.log(data)

            var tmpData = data.responseJSON.data_results;
            results.giaidacbiet = tmpData.giaidacbiet
            results.giainhat = tmpData.giainhat
            results.giainhi = tmpData.giainhi
            results.giaikhuyenkhich = tmpData.giaikhuyenkhich
            results.bgimg = tmpData.bgimg
            getGiaiThuong()
            if (tmpData.bgimg) {
                setTimeout(function () {
                    $('body').css({
                        "background-image": "url(" + tmpData.bgimg + ")"
                    })
                }, 200);
            }
        }
    })
}

getData()

function putData(e, w) {
	buildListResults.push('<tr><td colspan="5" class="namegiai">Giải đặc biệt ' + e.length + ' giải</td></tr>')
	for (var index = 0; index < e.length; index++) {
		var dat = e[index].split(';')
		var newlist = '<tr>' +
			'<td>' + (index + 1) + '</td>' +
			'<td>' + dat[3] + '</td>' +
			'<td>' + dat[1] + '</td>' +
			'<td>' + dat[5] + '</td>' +
			'<td>' + dat[4] + '</td>' +
			'<tr>';
		buildListResults.push(newlist)
	}
}


function getGiaiThuong() {
    putData(results.giaidacbiet, 'giaidacbiet')
    putData(results.giainhat, 'giainhat')
    putData(results.giainhi, 'giainhi')
	putData(results.giaikhuyenkhich, 'giaikhuyenkhich')
	$('#lists-op table tbody').append(buildListResults)
}

// setInterval(function() {
//     getGiaiThuong()
// }, 3000);
