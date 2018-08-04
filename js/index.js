

function getData() {
    $('#loading').removeClass('done').removeClass('finished')
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
