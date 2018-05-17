var siteSetting = {
    bgimg: "./img/bg-giainhat.jpg",
    iconimg: "./img/giaithuong-vang.png",
    btnquayso: "./img/btnquayso.png",
    btnImage: "true",
    width: "1600",
    height: "900",
    boxBorder: "#fff842",
    boxBg: "#17d0f4",
    boxNumBg: "#055c6d",
    boxNumColor: "#FFFFFF",
    boxX: "33.3333",
    boxY: "36",
    btnQuaySoX: "43.2",
    btnQuaySoY: "56",
    ketquaX: "40",
    ketquaY: "70",
    anhX: "70",
    anhY: "55",
    lineHeight: "24",
    fontSize: "18",
    textAlign: "center",
    textChucMung: "#ff0000",
    textTen: "#0a05ff",
    textMSDT: "#055c6d",
    textDonVi: "#242424",
    tblBorder: "#f0d234",
    tblHeadBg: "#055c6d",
    tblHeadCo: "#FFFFFF",
    tblBgOdd: "#dfdfdf",
    tblCoOdd: "#000000",
    tblBgEven: "#ff0000",
    tblCoEven: "#FFFFFF",
    khuyenkhichX: "15",
    khuyenkhichY: "35",
    khuyenkhichWidth: "70",
    khuyenkhichColumns: "3",
    khuyenkhichChucMung: "#ffffff",
    khuyenkhichMS: "#0eff6e",
    khuyenkhichDonVi: "#ede400"
},
    getW = $('#tempboard').width(),
    setH = (siteSetting.height * getW) / siteSetting.width,
    PerCent = (getW * 100) / siteSetting.width,
    igw = $('#board .hinhanh').width(),
    igh = $('#board .hinhanh').height(),
    imgNewW = ((igw * PerCent) / 100),
    imgNewH = ((igh * PerCent) / 100),
    currentScreen = ''

    // var abc = 
$('.btnquayso img').width(($('.btnquayso img').width() * PerCent) / 100)

function callValue(el) {
    $('#loading').removeClass('done').removeClass('finished')
    currentScreen = el 
    toggleCurrentScreen(el)
    $.ajax({
        url: "/data_settings_" + el + ".json",
        type: "GET",
        dataType: "json",
        cache: !0,
        complete: function (data) {
            siteSetting = data.responseJSON.siteSetting
            siteSettingFun(siteSetting, siteSetting.height, siteSetting.width, imgNewH, imgNewW)
            setH = (siteSetting.height * getW) / siteSetting.width;
            PerCent = (getW * 100) / siteSetting.width;
            loadData(siteSetting)
            $('.cppicker').colorpicker();
            // SET DATA
            $('#menu input, #menu select').each(function () {
                $(this).on('keyup keypress change', function (e) {
                    console.log()
                    var i = $(this).val()
                    var v = $(this).attr("data-change")
                    var u = $(this).attr("id")
                    if ($('[data-set-' + u + ']') && $('[data-set-' + u + ']').length) {
                        if (u === 'boxX' || u === 'boxY' || u === 'btnQuaySoX' || u === 'btnQuaySoY' || u === 'ketquaX' || u === 'ketquaY' || u === 'anhX' || u === 'anhY' || u === 'khuyenkhichX' || u === 'khuyenkhichY' || u === 'khuyenkhichWidth') {
                            $('[data-set-' + u + ']').css(v, i + '%')
                        } else if (u === 'fontSize' || u === 'lineHeight') {
                            $('[data-set-' + u + ']').css(v, i + 'px')
                        } else if (u === 'khuyenkhichColumns') {
                            $('[data-set-' + u + ']').attr(v, i)
                        } else {
                            $('[data-set-' + u + ']').css(v, i)
                        }
                        siteSetting[u] = i
                    }
                });
            });
            $('#set-0 a').trigger('click')
            setTimeout(function() {
                $('#loading').addClass('done')
            }, 200);
            setTimeout(function() {
                $('#loading').removeClass('done').addClass('finished')
            }, 1000);
        }
    })
}

function siteSettingFun(data, h, w, ih, iw) {
    reSet()
    setTimeout(function () {
        var _setH = (h * getW) / w
        var _setimgH = (ih * imgNewW) / iw
        $('#board').css({
            "background-image": "url(" + data.bgimg + ")",
            "background-size": "cover",
            "background-position": "center center",
            "height": _setH + 'px'
        })
        $('#board .boxquayso').css({
            "border-color": data.boxBorder,
            "width": getW / 3,
            "background": data.boxBg,
            "top": data.boxY + '%',
            "left": data.boxX + '%',
        })
        $('#board .boxquayso .text').css({
            "background": data.boxNumBg,
            "color": data.boxNumColor
        })
        $('#board .btnquayso').css({
            "top": data.btnQuaySoY + '%',
            "left": data.btnQuaySoX + '%'
        })
        $('#board .ketqua').css({
            "top": data.ketquaY + '%',
            "left": data.ketquaX + '%',
            "font-size": data.fontSize + 'px',
            "line-height": data.lineHeight + 'px',
            "text-align": data.textAlign
        })
        $('#board .khuyenkhich').css({
            "width": data.khuyenkhichWidth + '%',
            "top": data.khuyenkhichY + '%',
            "left": data.khuyenkhichX + '%',
            "border-color": data.boxBorder,
            "background": data.boxBg,
        }).attr('columns', data.khuyenkhichColumns)
        $('#board .khuyenkhich .text').css({
            "background": data.boxNumBg
        })
        $('#board .khuyenkhich .name').css({
            "color": data.khuyenkhichChucMung
        })
        $('#board .khuyenkhich .msdt').css({
            "color": data.khuyenkhichMS
        })
        $('#board .khuyenkhich .donvi').css({
            "color": data.khuyenkhichDonVi
        })

        $('#board .ketqua .chucmung').css({
            "color": data.textChucMung
        })
        $('#board .ketqua .ten').css({
            "color": data.textTen
        })
        $('#board .ketqua .msdt').css({
            "color": data.textMSDT
        })
        $('#board .ketqua .donvi').css({
            "color": data.textDonVi
        })
        $('#board .hinhanh').css({
            "height": _setimgH + 'px',
            "top": data.anhY + '%',
            "left": data.anhX + '%',
        })
        $('#board .tableres').css({
            "top": data.boxY + '%',
        })
        $('#board .tableres [data-set-tblHeadBg]').css({
            "background": data.tblHeadBg,
            "border-color": data.tblBorder
        })
        $('#board .tableres [data-set-tblHeadCo]').css({
            "color": data.tblHeadCo,
            "border-color": data.tblBorder
        })
        $('#board .tableres [data-set-tblBgOdd]').css({
            "background": data.tblBgOdd,
            "border-color": data.tblBorder
        })
        $('#board .tableres [data-set-tblCoOdd]').css({
            "color": data.tblCoOdd,
            "border-color": data.tblBorder
        })
        $('#board .tableres [data-set-tblBgEven]').css({
            "background": data.tblBgEven,
            "border-color": data.tblBorder
        })
        $('#board .tableres [data-set-tblCoEven]').css({
            "color": data.tblCoEven,
            "border-color": data.tblBorder
        })
        if (data.btnImage === 'true') {
            $('.btnquayso').addClass('active')
        }
        $('.btnquayso img').attr('src', data.btnquayso)
        $('.hinhanh img').attr('src', data.iconimg)
    }, 200);
}

function sizeChange(a, b) {
    reSet()
    setTimeout(function () {
        var newW = ((a * PerCent) / 100)
        var newH = ((b * PerCent) / 100)
        var newSetH = (newH * getW) / newW
        $('#board').css({
            "height": newSetH + 'px',
            "width": getW + 'px'
        })
    })
}

function loadData(params) {
    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            $('#' + key).val(params[key])
            if (key === 'btnImage' && params[key] === 'true') {
                $('#' + key).prop('checked', true)
            }
        }
    }
}

function reSet() {
    $('#board').css({
        "height": 'initial',
        "width": 'initial'
    })
    $('#board .hinhanh').css({
        "height": imgNewH,
        "width": imgNewW
    })
}

function toggleCurrentScreen(el) {
    $('.boxquayso, .btnquayso, .ketqua, .hinhanh, .khuyenkhich, .tableres').addClass('d-none')
    if (el === 'giaidacbiet' || el === 'giainhat' || el === 'giainhi') {
        $('#set-4, #set-5').show()
        $('#set-7').hide()
        $('.boxquayso, .btnquayso, .ketqua, .hinhanh').removeClass('d-none')
        $('#getSet-2 .no-gutters .col').show().parent().removeClass('mt-1')
        $('#getSet-2 .form-group:last-child').show()
    } else if (el === 'giaikhuyenkhich') {
        $('#set-7').show()
        $('#set-4, #set-5').hide()
        $('.khuyenkhich, .btnquayso').removeClass('d-none')
        $('#getSet-2 .no-gutters .col').hide().parent().addClass('mt-1')
        $('#getSet-2 .form-group:last-child').hide()
    }
}

function toggleScreen(e) {
    $('.boxquayso, .btnquayso, .ketqua, .hinhanh, .khuyenkhich, .tableres').addClass('d-none')
    if (e.attr('id') === 'set-6') {
        $('.tableres').removeClass('d-none')
    } else {
        toggleCurrentScreen(currentScreen)
    }
    $('.activebox, .activebox-lagre, .activebox-board').each(function () {
        $(this).removeClass('activebox activebox-lagre activebox-board')
    })
    $('#accordion .card-header').each(function () {
        $(this).removeClass('active')
    })
    e.addClass('active')
    if (e.attr('data-activebox') && e.attr('data-activebox').length) {
        setTimeout(function () {
            $(e.attr('data-activebox')).addClass(e.attr('data-activebox-class'))
        }, 500);
    }

}

function saveDataToServer() {
    alert(JSON.stringify(siteSetting))
    console.log(siteSetting)
}

$(document).ready(function () {
    callValue('giaidacbiet')
})

// Menu Settings
$(document).ready(function () {
    $('#width, #height').on('focusout blur change', function (e) {
        var changeW = $('#width').val()
        var changeH = $('#height').val()
        sizeChange(changeW, changeH)
    });
    $('#pageChange').on('change', function (e) {
        callValue(e.target.value)
    });
    $('#btnImage').on('change', function (e) {
        console.log(e.target.value)
        if(e.target.value === 'true') {
            $(this).prop('checked', false)
            $(this).val('false')
            $('.btnquayso').removeClass('active')
        } else {
            $(this).prop('checked', true)
            $(this).val('true')
            $('.btnquayso').addClass('active')
        }
    });
    $('#khuyenkhichColumns').TouchSpin({
        min: 1,
        max: 6,
        step: 1
    });
    $('#width, #height').TouchSpin({
        min: 0,
        max: 1000000,
        step: 1,
        postfix: 'px'
    });
    $('#fontSize, #lineHeight').TouchSpin({
        min: 12,
        max: 200,
        step: 1,
        postfix: 'px'
    });
    $('#boxX, #boxY, #btnQuaySoX, #btnQuaySoY, #ketquaX, #ketquaY, #anhX, #anhY, #khuyenkhichX, #khuyenkhichY, #khuyenkhichWidth').TouchSpin({
        min: 0,
        max: 1000000,
        step: 0.1,
        decimals: 5,
        postfix: '%'
    });
    $('#accordion .card-header').each(function () {
        $(this).on('click', function () {
            toggleScreen($(this))
        })
    })
})

// $(window).resize(function () {
//     var _changeW = $('#width').val()
//     var _changeH = $('#height').val()
//     siteSettingFun(siteSetting, _changeH, _changeW, igh, igw)
// })
