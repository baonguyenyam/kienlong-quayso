var quayso = {
    nhapchuot: 0,
    blockset: 6,
    blockpath: 30,
    degree: 1800,
}
var newbpath = 360 / quayso.blockset,
    newblock = (360 / quayso.blockset) - quayso.blockpath;

function quaySoCuoi() {
    var het = 0
    var gen = soNgauNhien(1, 2)
    if (gen == 1) {
        het = soNgauNhien((newbpath * 5) + (newblock + 1), (newbpath * 6))
    } else {
        het = soNgauNhien(1, newblock)
    }
    return het
}
function soNgauNhien(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateGift(params) {
    $.ajax({
        url: "/luckydrawsave.ashx?q=" + params + "",
        type: "GET",
        dataType: "json",
        cache: !0,
        complete: function (data) {
            // console.log(data);
        }
    })
}

$(document).ready(function () {
    $('#spin').click(function () {
        $.ajax({
            url: "/luckydraw.ashx",
            type: "GET",
            dataType: "json",
            cache: !0,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Error")
            },
            complete: function (data) {
                document.title = "Đang tìm quà may mắn..."
                $('.stepbystep p').html('Đang quay số...')
                $('#jackpot').get(0).play();
                $('#getnum, .chucmung').hide();
                $('.loading').show();
                $(this).css({
                    "cursor": "wait",
                    "pointer-events": "none"
                });;
                quayso.nhapchuot++;
                var lanquay = quayso.degree * quayso.nhapchuot;
                var gioihan;

                var rankey = data.responseJSON.code[Math.floor(Math.random() * data.responseJSON.code.length)]

                if (rankey === "A") {
                    gioihan = soNgauNhien((newblock + 1), newbpath + newblock)
                } else if (rankey === "B") {
                    gioihan = soNgauNhien(newbpath + (newblock + 1), (newbpath * 2) + newblock)
                } else if (rankey === "C") {
                    gioihan = soNgauNhien((newbpath * 2) + (newblock + 1), (newbpath * 3) + newblock)
                } else if (rankey === "D") {
                    gioihan = soNgauNhien((newbpath * 3) + (newblock + 1), (newbpath * 4) + newblock)
                } else if (rankey === "E") {
                    gioihan = soNgauNhien((newbpath * 4) + (newblock + 1), (newbpath * 5) + newblock)
                } else {
                    gioihan = quaySoCuoi()
                }

                gocquay = lanquay + gioihan;
                var hello = gocquay - lanquay
                $('#wheel .sec').each(function () {

                    if (hello > 30 && hello <= 90) {
                        $('#res').html("Bạn không trúng món quà nào cả! <span id='momqua'></span>")
                    } else if (hello > 90 && hello <= 150) {
                        $('#res').html("Bạn đã trúng 01 Áo mưa")
                    } else if (hello > 150 && hello <= 210) {
                        $('#res').html("Bạn đã trúng 01 Túi du lịch")
                    } else if (hello > 210 && hello <= 270) {
                        $('#res').html("Bạn đã trúng 01 Mũ bảo hiểm")
                    } else if (hello > 270 && hello <= 330) {
                        $('#res').html("Bạn đã trúng 01 Bộ hộp thủy tinh")
                    } else {
                        $('#res').html("Bạn đã trúng 01 Bình giữ nhiệt")
                    }

                    var t = $(this);
                    var noY = 0;
                    var c = 0;
                    var n = 1800;
                    var interval = setInterval(function () {
                        c++;
                        if (c === n) {
                            clearInterval(interval);
                            $('.loading').hide()
                            $('#congrats, .chucmung').show();
                            $('#buzzer').get(0).play();
                            $('#jackpot').get(0).pause();
                            $('.stepbystep p').html('Quay số hoàn tất!')
                            document.title = "✨🌟 Xin chúc mừng! 🌟✨"
                            fancyPopIn();
                            setTimeout(function () {
                                $('#spin').css({
                                    "cursor": "initial",
                                    "pointer-events": "initial"
                                });;
                            }, 2000);

                        }
                        var aoY = t.offset().top;
                        if (aoY < 23.89) {
                            $('#spin').addClass('spin');
                            setTimeout(function () {
                                $('#spin').removeClass('spin');
                            }, 100);
                        }
                    }, 0);

                    $('#inner-wheel').css({
                        'transform': 'rotate(' + gocquay + 'deg)'
                    });
                    noY = t.offset().top;
                });
                updateGift(rankey)
            }
        })
    });
});


