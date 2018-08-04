var giainhat = {
	text: 'XXXXXX',
	chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
	lists: [],
	lastkey: '',
	click: 1,
	animation: 3.5
}

function updateUerWin(e) {
	$.ajax({
		url: AppURL.giai_nhat_update + e,
		type: "GET",
		dataType: "json",
		cache: !0,
		complete: function (data) {}
	})
}

function victoryStep() {
	$('.chucmung').find('h3').html(giainhat.Fulltext[3]);
	$('.chucmung').find('h3').html(giainhat.Fulltext[3]);
	var listR = []
	for (var index = 0; index < (giainhat.columnTitle.length - 4); index++) {
		if(giainhat.displayOnResult[index+4] === 'true') {
			listR.push('<p class="text-muted click">' + giainhat.titleOnResult[index+4] + giainhat.Fulltext[index+4] + '</p>')
		}
	}
	$('.chucmung .looptext').html(listR);
	// $('.chucmung').find('p.add').html(giainhat.Fulltext[4]);
	// $('.chucmung').find('p.text-muted').html(giainhat.Fulltext[5]);
	// $('.chucmung').find('p.text-muted-2').html(giainhat.Fulltext[6]);
	$('.quatang').find('img').attr('src', giainhat.imgs);
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
		document.title = "✨🌟 Xin chúc mừng! 🌟✨"
		fancyPopIn();
		updateUerWin(giainhat.Fulltext[0])
		$('#buzzer').get(0).play();
	}, 300);
	setTimeout(function () {
		$('body').removeClass('phaono')
	}, 2000);
}

function passed() {
	geStopSlot(giainhat.ltr, 0, giainhat.click, giainhat.text.split(''))
	$('#getnumautosop').hide()
}

function getData() {
	$('#loading').removeClass('done').removeClass('finished')
	$.ajax({
		url: AppURL.giai_nhat + getParameterByName('ID'),
		type: "GET",
		dataType: "json",
		cache: !0,
		complete: function (data) {
			var tmpData = data.responseJSON.data_giainhat;
			giainhat.text = tmpData.lists[0].split(';')[1];
			giainhat.Fulltext = tmpData.lists[0].split(';');
			giainhat.passed = tmpData.lists[0].split(';')[2];
			giainhat.ltr = tmpData.ltr
			giainhat.autotime = tmpData.autotime
			giainhat.autostop = tmpData.autostop
			giainhat.press = tmpData.press
			giainhat.imgs = tmpData.imgs
			giainhat.columnTitle = tmpData.columnTitle.split(',')
			giainhat.displayOnResult = tmpData.displayOnResult.toLowerCase().split(',')
			giainhat.titleOnResult = tmpData.titleOnResult.toLowerCase().split(',')
			if (giainhat.passed === 'true') {
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


function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue, randomIndex;
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
	return shuffle(giainhat.chars.split(''))
}

function createList(a) {
	$('.block').addClass('animated').css({
		"animation-duration": giainhat.animation + "s"
	});
	$(".block").each(function () {
		giainhat.lists = []
		var getnum = sf()
		for (var index = 0; index < getnum.length; index++) {
			giainhat.lists.push("<div class='item'>" + getnum[index] + "</div>")
		}
		$(this).html(giainhat.lists)
	});
	if (a) {
		setTimeout(function () {
			$('#getnumautosop').hide()
		}, (giainhat.autotime * giainhat.press));
	}


}

function getRandomKey() {
	var a = giainhat.autostop
	document.title = "Đang tìm người may mắn..."
	$('.stepbystep p').html('Đang quay số...')
	$('#jackpot').get(0).play();
	var k = document.getElementById('getnum');
	var m = document.getElementById('getnumautosop');
	if (a) {
		createList(a)
		var timeper = giainhat.autotime / 1000
		var timeleftPer = giainhat.press;
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
		}, giainhat.autotime);

	} else {
		createList(a)
		$('#getnum').hide();
		$('#getnumautosop').hide();
		$('.loading').show();
		$('#stopnum').show();
	}
}

function countDown() {
	var timeleftKey = giainhat.autotime / 1000;
	var m = document.getElementById('getnumautosop');
	m.innerHTML = "Đang quay";
	// m.innerHTML = "Đang quay - (" + timeleftKey + ")";
	var downloadTimerHey = setInterval(function () {
		timeleftKey = timeleftKey - 1;
		if (timeleftKey < 0) {
			clearInterval(downloadTimerHey);
			return;
		}
		document.title = "(" + timeleftKey + ") - Đang tìm người may mắn..."
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
	$('#lists .lists .block.end').html("<div class='item'>" + giainhat.lastkey + "</div>")
	$('.stepbystep p').html('Quay số hoàn tất!')
}


function stopKey() {
	$('#pot').get(0).play();
	giainhat.click++
		gold(giainhat.ltr)
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
	// $('#stopnum').html("Dừng quay lần thứ " + giainhat.click)
	if (giainhat.click > giainhat.press) {
		stopKeyEnd()
		$('#stopnum').hide()
		return false
	}
}

function gold(b) {
	giainhat.lists = []
	var result = giainhat.text.split('')
	geStopSlot(giainhat.ltr, giainhat.press, giainhat.click, result)
}


function geStopSlot(a, b, c, result) {
	if (!a) {
		for (var u = (b - (c - 1)); u < 6; u++) {
			$('#lists .lists:nth-child(' + (u + 1) + ') .block').html("<div class='item'>" + result[u] + "</div>").removeClass('animated')
		}
	} else {
		for (var u = 0; u < (c - 1) + (6 - b); u++) {
			$('#lists .lists:nth-child(' + (u + 1) + ') .block').html("<div class='item'>" + result[u] + "</div>").removeClass('animated')
		}
	}
}
