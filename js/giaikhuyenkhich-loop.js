var giaikhuyenkhich = {
    text: 'XXXXXX',
    chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    lists: [],
    lastkey: '',
    click: 1,
    play: 1,
    press: 1,
    ltr: false,
    newlists: [],
    animation: 4,
    result: []
}

function updateUerWin(e) {
    var updateLists = []
    for (var index = 0; index < e.length; index++) {
        var item = e[index].split(';')[0]
        updateLists.push(item)
    }
    var endList = updateLists.toString()
    if (updateLists.length > 0) {
        $.ajax({
            url: AppURL.giai_khuyenkhich_update + endList,
            type: "GET",
            dataType: "json",
            cache: !0,
            complete: function (data) {
            }
        })
    }
}

function getData() {
    $.ajax({
        url: AppURL.giai_khuyenkhich,
        type: "GET",
        dataType: "json",
        cache: !0,
        complete: function (data) {
            var tmpData = data.responseJSON.data_giaikhuyenkhich;
            giaikhuyenkhich.text = tmpData.lists;
            giaikhuyenkhich.autotime = tmpData.autotime
            giaikhuyenkhich.step = tmpData.step
            giaikhuyenkhich.autostop = tmpData.autostop
            giaikhuyenkhich.lists = tmpData.lists
            giaikhuyenkhich.imgs = tmpData.imgs
            updateUerWin(giaikhuyenkhich.lists)
            getPerLoop(giaikhuyenkhich.lists, giaikhuyenkhich.step)
            if (tmpData.bgimg) {
                setTimeout(function () {
                    $('body').css({
                        "background-image": "url(" + tmpData.bgimg + ")"
                    })
                }, 200);
            }
            if (tmpData.demo) {
                DemoMode()
            }
        }
    })
}

getData()


function getPerLoop(a, b) {
    var perList = Math.floor(parseInt(a.length) / parseInt(b)) // Kết quả chia hết
    var perListCan = a.length - (perList * b) // Số dư
    if (a.length % b == 0) {
        for (var index = 0; index < b; index++) {
            giaikhuyenkhich.newlists[index] = a.slice((index * perList), perList + (index * perList))
        }
    }
    else {
        for (var index = 0; index < b; index++) {
            if (index < perListCan) {
                for (var u = 0; u < perListCan; u++) {
                    giaikhuyenkhich.newlists[u] = a.slice((u * perList) + u, perList + (u * perList) + (u + 1))
                }
            } else {
                giaikhuyenkhich.newlists[index] = a.slice((index * perList) + 1, perList + (index * perList) + 1)
            }
        }
    }
    $('.text-kienlong-per').html('Lần quay ' + giaikhuyenkhich.click + '/' + b + '')

}


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function sf() {
    return shuffle(giaikhuyenkhich.chars.split(''))
}
var interval;

function getRandomKey() {
    $('.timthay').show()
    var a = giaikhuyenkhich.autostop
    getTotalWin(a)
    $('#wheels .boxnone').removeClass('showlist').addClass('animated').css({
        "animation-duration": ((giaikhuyenkhich.newlists[giaikhuyenkhich.click - 1].length * giaikhuyenkhich.animation) / 100) + "s"
    })

    $('.text-kienlong-per').html('Lần quay ' + giaikhuyenkhich.click + '/' + giaikhuyenkhich.step + '')
    document.title = "Đang tìm người may mắn..."
    $('.stepbystep p').html('Đang quay số...')
    $('#jackpot').get(0).play();
    var k = document.getElementById('getnum');
    var m = document.getElementById('getnumautosop');
    forList(giaikhuyenkhich.newlists[giaikhuyenkhich.click - 1])
    if (a) {
        var timeper = giaikhuyenkhich.autotime / 1000
        var timeleftPer = giaikhuyenkhich.press;
        countDown()
        m.setAttribute("disabled", "disabled");
        var downloadTimerPer = setInterval(function () {
            stopKey()
            --timeleftPer
            if (timeleftPer <= 0) {
                clearInterval(downloadTimerPer);
            } else {
                countDown()
            }
        }, giaikhuyenkhich.autotime);

    } else {
        $('#getnum').hide();
        $('#getnumautosop').hide();
        $('.loading').show();
        $('#stopnum').show();
    }
}

function getKey(a) {
    $('#wheels .boxnone').html()
    forList(giaikhuyenkhich.newlists[giaikhuyenkhich.click - 1])
}

function countDown() {
    var timeleftKey = giaikhuyenkhich.autotime / 1000;
    var m = document.getElementById('getnumautosop');
    m.innerHTML = "Đang quay - (" + timeleftKey + ")";
    var downloadTimerHey = setInterval(function () {
        timeleftKey = timeleftKey - 1;
        if (timeleftKey < 0) {
            clearInterval(downloadTimerHey);
            return;
        }
        document.title = "(" + timeleftKey + ") - Đang tìm người may mắn..."
        m.innerHTML = "Đang quay - (" + timeleftKey + ")";
    }, 1000);
}


function stopKeyEnd() {

    $('#jackpot').get(0).pause();
    $('.loading').hide()
    $(".boxnone").animate({ scrollTop: 0 }, 0);
    setTimeout(function () {
        $('body').addClass('phaono')
        $('#congrats').show()
        document.title = "✨🌟 Xin chúc mừng! 🌟✨"
        fancyPopIn();
        $('#buzzer').get(0).play();
    }, 300);
    setTimeout(function () {
        if ((giaikhuyenkhich.click - 1) < giaikhuyenkhich.step) {
            $('#getnumautosop').removeAttr("disabled").html('Quay số');

            // $('#getnumautosop').removeAttr("disabled").html('Đợt quay thứ ' + giaikhuyenkhich.click);
            $('#getnumautosop').show()
        } else {
            $('#ketqua').show()
            updateUerWin(giaikhuyenkhich.lists)
            $('.timthay').html('Tìm thấy tổng cộng ' + giaikhuyenkhich.text.length + ' người may mắn')
        }
        $('body').removeClass('phaono')
    }, 2000);
}


function stopKey() {
    // $('.timthay').hide()
    $('#pot').get(0).play();
    $('#wheels .boxnone').removeClass('animated')
    $('.wheels').addClass('showlist')
    $('#wheels .boxnone').addClass('showlist')
    giaikhuyenkhich.click++
    setTimeout(function () {
        $('#pot').get(0).pause();
    }, 1000);

    if ((giaikhuyenkhich.click - 1) <= giaikhuyenkhich.step) {
        stopKeyEnd()
        $('#stopnum').hide()
        return false
    }
}

function showList() {
    $('#showlist').after("<p class='mb-0 h4'>Kết quả quay số đã được lưu vào cơ sở dữ liệu.</p>")
    $('#showlist').remove()
}

function getTotalWin(a) {
    $('#stopnum').css({
        "cursor": "wait",
        "pointer-events": "none",
        "opacity": ".5"
    });

    $('#stopnum').html("Đang quay...")
    $('.counter').each(function () {
        var $this = $(this),
            countTo = giaikhuyenkhich.newlists[giaikhuyenkhich.click - 1].length;
        $({ countNum: 0 }).animate({
            countNum: countTo
        },
            {
                duration: giaikhuyenkhich.autotime,
                easing: 'linear',
                step: function () {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function () {
                    $this.text(this.countNum);
                    $('#stopnum').css({
                        "cursor": "pointer",
                        "pointer-events": "initial",
                        "opacity": "1"
                    });;
                    $('#stopnum').html("Dừng quay")
                }
            });
    });
    if (a) {
        setTimeout(function () {
            $('#getnumautosop').hide()
        }, ((giaikhuyenkhich.autotime * giaikhuyenkhich.press)));
    }
}

function forList(a) {
    $('.boxnonehome').remove()
    var lists = []
    var reli = a
    for (var index = 0; index < reli.length; index++) {
        var item = reli[index].split(';')
        lists.push('<div class="wheel"><div class="item"><h2><span>' + (index + 1) + '.</span>' + item[3] + '</h2><p>' + item[4] + '</p><p>' + item[5] + '</p><p>' + item[6] + '</p></div></div>')

    }
    return $('#wheels .boxnone').html(lists)
}

function doSearch() {
    var tmpData = giaikhuyenkhich.text;
    var buildList = []
    for (var index = 0; index < tmpData.length; index++) {
        var newlist = '<tr>' +
            '<td>' + (index + 1) + '</td>' +
            '<td>' + tmpData[index].split(';')[3] + '</td>' +
            '<td>' + tmpData[index].split(';')[4] + '</td>' +
            '<td>' + tmpData[index].split(';')[5] + '</td>' +
            '<td>' + tmpData[index].split(';')[6] + '</td>' +
            '<tr>';
        buildList.push(newlist)
    }
    $('.table-kienlong tbody').append(buildList)
    $('.resultbox').show()
    $('.getloading').hide()
}


function ketqua() {
    $('.wheels, .text-kienlong, .boxnone').hide()
    $('.getloading').show()
    doSearch()
}
