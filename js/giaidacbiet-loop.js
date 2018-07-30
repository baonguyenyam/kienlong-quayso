var giaidacbiet = {
    text: 'XXXXXX',
    chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    lists: [],
    lastkey: '',
    click: 1,
    animation: 3.5
}


function updateUerWin(e) {
    $.ajax({
        url: AppURL.giai_dacbiet_update + e,
        type: "GET",
        dataType: "json",
        cache: !0,
        complete: function (data) {
        }
    })
}

function victoryStep() {
	$('.chucmung').find('h3').html(giaidacbiet.Fulltext[3]);
	var listR = []
	for (var index = 0; index < (giaidacbiet.columnTitle.length - 4); index++) {
		if(giaidacbiet.displayOnResult[index+4] === 'true') {
			listR.push('<p class="text-muted click">' + giaidacbiet.titleOnResult[index+4] + giaidacbiet.Fulltext[index+4] + '</p>')
		}
	}
	$('.chucmung .looptext').html(listR);

    $('.quatang').find('img').attr('src', giaidacbiet.imgs);
	$('.chucmung, .quatang').show();
	$('.click').kAnimation({
		ClassName: 'animated fadeIn',
		Delay: 1000,
		Forever: false,
		DelayForever: 100
	});

    setTimeout(function () {
        $('body').addClass('phaono')
        $('#congrats').show()
        document.title = "✨🌟 Xin chúc mừng! 🌟✨";
        fancyPopIn();
        updateUerWin(giaidacbiet.Fulltext[0])
        $('#buzzer').get(0).play();

    }, 300);
    setTimeout(function () {
        $('body').removeClass('phaono')
    }, 2000);
}
function passed() {
    geStopSlot(giaidacbiet.ltr, 0, giaidacbiet.click, giaidacbiet.text.split(''))
    $('#getnumautosop').hide()
}

function getData() {
    $.ajax({
        url: AppURL.giai_dacbiet + getParameterByName('ID'),
        type: "GET",
        dataType: "json",
        cache: !0,
        complete: function (data) {
            var tmpData = data.responseJSON.data_giaidacbiet;
            giaidacbiet.text = tmpData.lists[0].split(';')[1];
            giaidacbiet.passed = tmpData.lists[0].split(';')[2];
            giaidacbiet.Fulltext = tmpData.lists[0].split(';');
            giaidacbiet.ltr = tmpData.ltr
            giaidacbiet.autotime = tmpData.autotime
            giaidacbiet.imgs = tmpData.imgs
            giaidacbiet.autostop = tmpData.autostop
			giaidacbiet.press = tmpData.press
			giaidacbiet.columnTitle = tmpData.columnTitle.split(',')
			giaidacbiet.displayOnResult = tmpData.displayOnResult.toLowerCase().split(',')
			giaidacbiet.titleOnResult = tmpData.titleOnResult.toLowerCase().split(',')
            if (giaidacbiet.passed === 'true') {
                victoryStep()
                passed()
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
    return shuffle(giaidacbiet.chars.split(''))
}
function createList(a) {
    $('.block').addClass('animated').css({
        "animation-duration": giaidacbiet.animation+"s"
    });
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
            $('#getnumautosop').hide()
        }, (giaidacbiet.autotime * giaidacbiet.press));
    }
}

function getRandomKey() {
    var a = giaidacbiet.autostop
    document.title = "Đang tìm người may mắn..."
    $('.stepbystep p').html('Đang quay số...')
    $('#jackpot').get(0).play();
    var k = document.getElementById('getnum');
    var m = document.getElementById('getnumautosop');
    if (a) {
        createList(a)
        var timeper = giaidacbiet.autotime / 1000
        var timeleftPer = giaidacbiet.press;
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
        }, giaidacbiet.autotime);

    } else {
        createList(a)
        $('#getnum').hide();
        $('#getnumautosop').hide();
        $('.loading').show();
        $('#stopnum').show();
    }
}

function countDown() {
    var timeleftKey = giaidacbiet.autotime / 1000;
    var m = document.getElementById('getnumautosop');
    m.innerHTML = "Đang quay";
    // m.innerHTML = "Đang quay - (" + timeleftKey + ")";
    var downloadTimerHey = setInterval(function () {
        timeleftKey = timeleftKey - 1;
        if (timeleftKey < 0) {
            clearInterval(downloadTimerHey);
            return;
        }
        document.title = "(" + timeleftKey+ ") - Đang tìm người may mắn..."
        m.innerHTML = "Đang quay";
        // m.innerHTML = "Đang quay - (" + timeleftKey + ")";
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
    $('#lists .lists .block.end').html("<div class='item'>" + giaidacbiet.lastkey + "</div>")
    $('.stepbystep p').html('Quay số hoàn tất!')
}


function stopKey() {
    $('#pot').get(0).play();
    giaidacbiet.click++
    gold(giaidacbiet.ltr)
    $('#stopnum').css({
        "cursor": "wait",
        "pointer-events": "none"
    }).attr("disabled", "disabled");
    setTimeout(function () {
        $('#stopnum').css({
            "cursor": "pointer",
            "pointer-events": "initial"
        }).removeAttr("disabled");
        $('#pot').get(0).pause();
    }, 1000);
    $('#stopnum').html("Dừng quay")
    // $('#stopnum').html("Dừng quay lần thứ " + giaidacbiet.click)
    if (giaidacbiet.click > giaidacbiet.press) {
        stopKeyEnd()
        $('#stopnum').hide()
        return false
    }
}

function gold(b) {
    giaidacbiet.lists = []
    var result = giaidacbiet.text.split('')
    geStopSlot(giaidacbiet.ltr, giaidacbiet.press, giaidacbiet.click, result)
}

function geStopSlot(a, b, c, result) {
    if (!a) {
        for (var u = (b - (c-1)); u < 6; u++) {
            $('#lists .lists:nth-child(' + (u + 1) + ') .block').html("<div class='item'>" + result[u] + "</div>").removeClass('animated')
        }
    } else {
        for (var u = 0; u < (c-1)+(6-b); u++) {
            $('#lists .lists:nth-child(' + (u + 1) + ') .block').html("<div class='item'>" + result[u] + "</div>").removeClass('animated')
        }
    }
}
