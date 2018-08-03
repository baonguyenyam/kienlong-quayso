var timkiem = {
    lists: []
}, buildListHeader = []

function getData() {
    $.ajax({
        url: AppURL.kiemtra,
        type: "GET",
        dataType: "json",
        cache: !0,
        complete: function (data) {
            var tmpData = data.responseJSON.data_searchresult;
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

function doSearch(a) {
    $.ajax({
        url: AppURL.kiemtra + a,
        type: "GET",
        dataType: "json",
        cache: !0,
        complete: function (data) {
            var tmpData = data.responseJSON.data_searchresult;
			timkiem.columnTitle = tmpData.columnTitle.split(',')
			timkiem.lists = tmpData.lists
			var res = data.responseJSON.data_searchresult;
            if (res.imgs) {
                setTimeout(function () {
                    $('body').css({
                        "background-image": "url(" + res.imgs + ")"
                    })
                }, 200);
            }
			buildHeader()
            buildLists(timkiem.lists)
        }
    })
}

getData()

function getSearch() {
    if ($('#se').val()) {
        $('.wheels, #getnumautosop').hide()
        $('.boxnone').show()
        doSearch($('#se').val())
    } else {
        alert('Vui lòng nhập từ khóa tìm kiếm')
        return false
    }
}

function buildHeader() {
	buildListHeader.push('<th scope="col">STT</th>')
	for (var index = 0; index < (timkiem.columnTitle.length - 2); index++) {
		buildListHeader.push('<th scope="col">' + timkiem.columnTitle[index+2] + '</th>')
	}
}

function goback() {
	window.location = "./kiemtra.html";
}


function buildLists(a) {
    $('.boxnone').hide()
    $('.resultbox').show()
    $('.msdt').html(timkiem.lists.length)
	var buildList = []

    for (var index = 0; index < timkiem.lists.length; index++) {
		var newnoneList = []
		newnoneList.push('<td>' + (index + 1) + '</td>')
		for (var tem = 0; tem < (timkiem.columnTitle.length - 2); tem++) {
			newnoneList.push('<td>' + timkiem.lists[index].split(';')[tem+2] + '</td>')
		}
		var newlist = '<tr>' + newnoneList + '<tr>';
        buildList.push(newlist)
	}
	$('.table-kienlong thead tr').html(buildListHeader)
    $('.table-kienlong tbody').append(buildList)
}
