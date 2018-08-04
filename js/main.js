var datamain = {
    lists: []
};


function getData() {
	$('#loading').removeClass('done').removeClass('finished')
    $.ajax({
        url: AppURL.main,
        type: "GET",
        dataType: "json",
        cache: !0,
        complete: function (data) {
            var tmpData = data.responseJSON.data_searchresult;
            datamain.lists = tmpData.lists
            builfLists(datamain.lists)
            if (tmpData.bgimg) {
                setTimeout(function () {
                    $('body').css({
                        "background-image": "url(" + tmpData.bgimg + ")"
                    })
                }, 200);
			}
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


function builfLists(params) {
    for (var index = 0; index < params.length; index++) {
        var element = params[index].split(';');
        var query = element[2]
        if (query == 1) {
            $('.lists').append('<a class="btn btn-primary ml-2 mt-2 mb-1" href="./giaidacbiet.html?ID=' + element[0] +'" target="_blank">' + element[1] +'</a>')
        } else if (query == 2) {
            $('.lists').append('<a class="btn btn-primary ml-2 mt-2 mb-1" href="./giainhat.html?ID=' + element[0] +'" target="_blank">' + element[1] +'</a>')
        } else if (query == 3) {
            $('.lists').append('<a class="btn btn-primary ml-2 mt-2 mb-1" href="./giainhi.html?ID=' + element[0] +'" target="_blank">' + element[1] + '</a>')
        } else if (query == 4) {
            $('.lists').append('<a class="btn btn-primary ml-2 mt-2 mb-1" href="./giaikhuyenkhich.html?ID=' + element[0] +'" target="_blank">' + element[1] + '</a>')
        }
    }
}

document.onkeyup = function (a) { if ((a = a || window.event).altKey && a.ctrlKey && a.shiftKey && 13 == a.which) return $("body"), alert(b64DecodeUnicode("QkFPIE5HVVlFTiAtIDA5Njk2ODk4OTMKRW1haWw6IGJhb25ndXllbnlhbUBnbWFpbC5jb20KV2ViOiBiYW9uZ3V5ZW55YW0uZ2l0aHViLmlv")), !1 };
