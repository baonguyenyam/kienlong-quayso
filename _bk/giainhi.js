var giainhi = {
    text: 'ABC123',
    chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    lists: [],
    play: 1
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
    return shuffle(giainhi.chars.split(''))
}
function createList(a) {
    $('.block').addClass('animated')
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
            stopKey()
            $('#congrats').show()
            fancyPopIn();
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




function stopKey() {
    $('#jackpot').get(0).pause();

    $('.block').removeClass('animated')
    gold()
    $('#getnumautosop').hide()
    $('.loading').hide()
    $('#stopnum').hide()
    if (giainhi.play == 2) {
        $('.chucmung1').show();
        $('#ketqua').delay(2000).show(300);
        $('.stepbystep p').html('Quay số hoàn tất!')
        
    } else {
        $('.stepbystep p').html('Nhấp tiếp tục để tìm người may mắn kế tiếp.')
        $('.chucmung').show();
        $('#getnext').delay(2000).show(300);
    }
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

function gold() {
    giainhi.lists = []
    var result = giainhi.text.split('')
    for (var index = 0; index < result.length; index++) {
        $('#lists .lists:nth-child(' + (index + 1) + ') .block').html("<div class='item'>" + result[index] + "</div>")
    }
}
function getNext(a) {
    giainhi.play = 2
    $('#getnumautosop').show();
    $('.chucmung').hide();
    $('.loading').html("Đang tìm người may mắn thứ 2...").attr;
    $('.loading').attr("data-text", "Đang tìm người may mắn thứ 2...")
    $('#getnext').hide();
    if (giainhi.play == 2 && a) {
        $('#jackpot2').get(0).play();
    }
    getRandomKey(a)
}
function ketqua() {
    $('#showlist').show(300);
    $('.chucmung').show();
    $('#lists').hide();
    $('#ketqua').hide();
}
function showList() {
    $('#showlist').after("<p class='mb-0 h4'>Kết quả quay số đã được lưu vào cơ sở dữ liệu.</p>")
    $('#showlist').remove()
}
