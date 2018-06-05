

function getData() {
    $.ajax({
        url: AppURL.index,
        type: "GET",
        dataType: "json",
        cache: !0,
        complete: function (data) {
            var tmpData = data.responseJSON.data_index;
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
