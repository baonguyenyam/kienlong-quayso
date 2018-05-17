var results = {
    animation: 3.5
}

function getData() {
    $.ajax({
        url: "http://kienlongbanklucky.canhcam.gb/api/AwardService.aspx?method=data_results",
        type: "GET",
        dataType: "json",
        cache: !0,
        complete: function (data) {
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
    var buildList = []
    for (var index = 0; index < e.length; index++) {
        var dat = e[index].split(';')

        var newlist = '<div class="col-6"><div class="name">' + dat[3] + '</div>' +
            '<div class="mobile">' + dat[1] + '</div>' +
            '<div class="add">' + dat[5] + '</div></div>';
        
        buildList.push(newlist)
    }
    $('#'+w).html(buildList)
}


function getGiaiThuong() {
    putData(results.giaidacbiet, 'giaidacbiet')
    putData(results.giainhat, 'giainhat')
    putData(results.giainhi, 'giainhi')
    putData(results.giaikhuyenkhich, 'giaikhuyenkhich')
}

setInterval(function() {
    getGiaiThuong()
}, 3000);