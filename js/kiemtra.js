var timkiem = {
    lists: []
};

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
            timkiem.lists = tmpData.lists
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

function buildLists(a) {
    $('.boxnone').hide()
    $('.resultbox').show()
    $('.msdt').html(timkiem.lists.length)
    var buildList = []
    for (var index = 0; index < timkiem.lists.length; index++) {
        var newlist = '<tr>' +
            '<td>' + (index+1) +'</td>' +
            '<td>' + timkiem.lists[index].split(';')[2] +'</td>' +
            '<td>' + timkiem.lists[index].split(';')[1] +'</td>' +
            '<td>' + timkiem.lists[index].split(';')[4] +'</td>' +
            '<td>' + timkiem.lists[index].split(';')[3] +'</td>' +
        '<tr>';
        buildList.push(newlist)
    }
    $('.table-kienlong tbody').append(buildList)
}
