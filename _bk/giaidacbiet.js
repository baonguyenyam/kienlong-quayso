var giaidacbiet = {
    text: 'XXXXXX',
    chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    lists: [],
    lastkey: ''
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
    return shuffle(giaidacbiet.chars.split(''))
}
function createList(a) {
    $('.block').addClass('animated')
    $(".block").each(function () {
        giaidacbiet.lists = []
        var getnum = sf()
        for (var index = 0; index < getnum.length; index++) {
            giaidacbiet.lists.push("<div class='item'>" + getnum[index] + "</div>")
        }
        $(this).html(giaidacbiet.lists)
    });
    if (a) {
        setTimeout(function () {
            stopKey()
            // $('#congrats').show()
            // fancyPopIn();
            $('#stopnumsecond').show()
            $('#getnumautosop').hide()
        }, 5500);
    }
}

function getRandomKey(a) {
    document.title = "Đang tìm người may mắn..."
    $('.stepbystep p').html('Đang quay số...')
    $('#jackpot').get(0).play();
    var k = document.getElementById('getnum');
    var m = document.getElementById('getnumautosop');
    if (a) {
        createList(a)
        m.innerHTML = 'Đang quay (5)';
        var timeleft = 5;
        var downloadTimer = setInterval(function () {
            m.innerHTML = "Đang quay (" + --timeleft + ")";
            if (timeleft <= 0)
                clearInterval(downloadTimer);
        }, 1000);
        m.setAttribute("disabled", "disabled");
    } else {
        createList(a)
        $('#getnum').hide();
        $('.loading').show();
        $('#stopnum').show();
    }
}

function stopKeyEnd() {
    $('#jackpot').get(0).pause();
    $('.loading').hide()
    $('#stopnumsecond').hide()
    getlastKey()
    $('.chucmung').show();
    $('#showlist').delay(2000).show(300);
    document.title = "✨🌟 Xin chúc mừng! 🌟✨"
    setTimeout(function () {
        $('body').addClass('phaono')
        $('#congrats').show()
        fancyPopIn();
        $('#buzzer').get(0).play();
    }, 300);
    setTimeout(function () {
        $('body').removeClass('phaono')
    }, 2000);
}

function getlastKey() {
    $('.block.end').removeClass('animated')
    $('#lists .lists .block.end').html("<div class='item'>" + giaidacbiet.lastkey + "</div>")
    $('.stepbystep p').html('Quay số hoàn tất!')
}


function stopKey() {
    $('.block:not(.end)').removeClass('animated')
    gold()
    $('#stopnumsecond').show()
    $('#stopnum').hide()

}

function gold() {
    giaidacbiet.lists = []
    var result = giaidacbiet.text.split('')
    for (var index = 0; index < result.length; index++) {
        if ((index + 1) == result.length) {
            giaidacbiet.lastkey = result[index]
        }
        $('#lists .lists:nth-child(' + (index + 1) + ') .block:not(.end)').html("<div class='item'>" + result[index] + "</div>")
    }
}
function showList() {
    $('#showlist').after("<p class='mb-0 h4'>Kết quả quay số đã được lưu vào cơ sở dữ liệu.</p>")
    $('#showlist').remove()
}