var giainhi = {
    text: 'XXXXXX',
    chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    lists: [],
    lastkey: '',
    click: 1,
    play: 1,
    press: 1,
    ltr: false,
    animation: 3.5,
    result: []
}

function updateUerWin(e) {
    $.ajax({
        url: AppURL.giai_nhi_update + e,
        type: "GET",
        dataType: "json",
        cache: !0,
        complete: function (data) {
        }
    })
}

function victoryStep() {
    $('.chucmung').find('h3').html(giainhi.Fulltext[giainhi.click - 2].split(';')[3]);
    $('.chucmung').find('p.add').html(giainhi.Fulltext[giainhi.click - 2].split(';')[4]);
    $('.chucmung').find('p.text-muted').html(giainhi.Fulltext[giainhi.click - 2].split(';')[5]);
    $('.chucmung').find('p.text-muted-2').html(giainhi.Fulltext[giainhi.click - 2].split(';')[6]);
    $('.quatang').find('img').attr('src', giainhi.imgs);
    $('.chucmung, .quatang').show();

    setTimeout(function () {
        $('body').addClass('phaono')
        $('#congrats').show()
        document.title = "✨🌟 Xin chúc mừng! 🌟✨"
        fancyPopIn();
        updateUerWin(giainhi.Fulltext[giainhi.click - 2].split(';')[0])
        $('#buzzer').get(0).play();
    }, 300);
    setTimeout(function () {
        if (giainhi.click <= giainhi.Fulltext.length) {
            $('#getnumautosop').removeAttr("disabled").html('Quay số');
            // $('#getnumautosop').removeAttr("disabled").html('Người may mắn thứ ' + giainhi.click);
            $('#getnumautosop').show()
        } else {
            $('#ketqua').show()
        }
        $('body').removeClass('phaono')
    }, 2000);
}
function passed() {
    geStopSlot(giainhi.ltr, giainhi.press, giainhi.click, giainhi.text[giainhi.click - 2].split(';')[1].split(''))
}

function getData() {
    $.ajax({
        url: AppURL.giai_nhi,
        type: "GET",
        dataType: "json",
        cache: !0,
        complete: function (data) {
            var tmpData = data.responseJSON.data_giainhi;
            giainhi.text = tmpData.lists;
            giainhi.Fulltext = tmpData.lists;
            giainhi.autotime = tmpData.autotime
            // giainhi.autostop = true
            giainhi.autostop = tmpData.autostop
            giainhi.imgs = tmpData.imgs
            giainhi.passed = tmpData.lists[0].split(';')[2];
            if (giainhi.passed === 'true') {
                giainhi.click++
                $('#getnumautosop').removeAttr("disabled").html('Quay số');
                // $('#getnumautosop').removeAttr("disabled").html('Người may mắn thứ ' + giainhi.click);
                $('.text-kienlong').html('Lần quay ' + (giainhi.click-1) + '/' + tmpData.lists.length + '')
                victoryStep()
                passed()
            } else {
                $('.text-kienlong').html('Lần quay ' + giainhi.click + '/' + tmpData.lists.length + '')
            }
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
    return shuffle(giainhi.chars.split(''))
}
function createList(a) {
    $('#stopnum').css({
        "cursor": "wait",
        "pointer-events": "none"
    }).attr("disabled", "disabled");
    setTimeout(function () {
        $('#stopnum').css({
            "cursor": "pointer",
            "pointer-events": "initial"
        }).removeAttr("disabled");
    }, 2000);
    $('.block').addClass('animated').css({
        "animation-duration": giainhi.animation + "s"
    });
    $(".block").each(function () {
        giainhi.lists = []
        var getnum = sf()
        for (var index = 0; index < getnum.length; index++) {
            giainhi.lists.push("<div class='item'>" + getnum[index] + "</div>")
        }
        $(this).html(giainhi.lists)
    });
    if (a) {
        setTimeout(function () {
            $('#getnumautosop').hide()
        }, ((giainhi.autotime * giainhi.press)));
    }


}

function getRandomKey() {
    $('.text-kienlong').html('Lần quay ' + giainhi.click + '/' + giainhi.Fulltext.length + '')
    var a = giainhi.autostop
    createList(a)
    if (giainhi.text[(giainhi.click - 1)].split(';')[2] === 'true') {
        giainhi.click++
        if (giainhi.click <= giainhi.Fulltext.length) {
            $('#getnumautosop').removeAttr("disabled").html('Quay số');
            // $('#getnumautosop').removeAttr("disabled").html('Người may mắn thứ ' + giainhi.click);
        } else {
            $('#getnumautosop').hide()
        }
        victoryStep()
        passed()
    } else {
        giainhi.click++
        document.title = "Đang tìm người may mắn..."
        $('.stepbystep p').html('Đang quay số...')
        $('.chucmung, .quatang').hide();
        $('#jackpot').get(0).play();
        var k = document.getElementById('getnum');
        var m = document.getElementById('getnumautosop');
        if (a) {
            var timeper = giainhi.autotime / 1000
            var timeleftPer = giainhi.press;
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
            }, giainhi.autotime);

        } else {
            $('#getnum').hide();
            $('#getnumautosop').hide();
            $('.loading').show();
            $('#stopnum').show(0)
        }
    }

}

function countDown() {
    var timeleftKey = giainhi.autotime / 1000;
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
    getlastKey()
    victoryStep()
}

function getlastKey() {
    $('.block.end').removeClass('animated')
    $('#lists .lists .block.end').html("<div class='item'>" + giainhi.lastkey + "</div>")
    $('.stepbystep p').html('Quay số hoàn tất!')
}


function stopKey() {
    $('#pot').get(0).play();

    gold(giainhi.ltr)
    setTimeout(function () {
        $('#pot').get(0).pause();
    }, 1000);
    $('#stopnum').html("Dừng quay")
    if (giainhi.click > giainhi.press) {
        stopKeyEnd()
        $('#stopnum').hide()
        return false
    }
}

function gold(b) {
    giainhi.lists = []
    var result = giainhi.text[giainhi.click - 2].split(';')[1].split('')
    geStopSlot(giainhi.ltr, giainhi.press, giainhi.click, result)
}
function showList() {
    $('#showlist').after("<p class='mb-0 h4'>Kết quả quay số đã được lưu vào cơ sở dữ liệu.</p>")
    $('#showlist').remove()
}

function geStopSlot(a, b, c, result) {
    if (a) {
        for (var u = (b - (c - 1)); u < 6; u++) {
            $('#lists .lists:nth-child(' + (u + 1) + ') .block').html("<div class='item'>" + result[u] + "</div>").removeClass('animated')
        }
    } else {
        for (var u = 0; u < (c - 1) + (6 - b); u++) {
            $('#lists .lists:nth-child(' + (u + 1) + ') .block').html("<div class='item'>" + result[u] + "</div>").removeClass('animated')
        }
    }
}

function doSearch() {
    var tmpData = giainhi.text;
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
    $('#lists, .text-kienlong, .boxnone').hide()
    $('.getloading').show()
    doSearch()
}
