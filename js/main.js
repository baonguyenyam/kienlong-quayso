var datamain = {
    lists: []
};

function getData() {
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
        }
    })
}

getData()


function builfLists(params) {
    for (var index = 0; index < params.length; index++) {
        var element = params[index].split(';');
        var query = element[2]
        if (query == 1) {
            $('.lists').append('<a class="btn btn-primary ml-2 mt-2 mb-1" href="./giaidacbiet.html" target="_blank">' + element[1] +'</a>')
        } else if (query == 2) {
            $('.lists').append('<a class="btn btn-primary ml-2 mt-2 mb-1" href="./giainhat.html" target="_blank">' + element[1] +'</a>')
        } else if (query == 3) {
            $('.lists').append('<a class="btn btn-primary ml-2 mt-2 mb-1" href="./giainhi.html" target="_blank">' + element[1] + '</a>')
        } else if (query == 4) {
            $('.lists').append('<a class="btn btn-primary ml-2 mt-2 mb-1" href="./giaikhuyenkhich.html" target="_blank">' + element[1] + '</a>')
        }
    }
}
