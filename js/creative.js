// (function ($, interval, slides) {
//     var i = 0;
//     var handle = setInterval(function () {
//         $('#index').css("background-image", "url('" + slides[i] + "')");
//         i++;
//         if (i >= slides.length) {
//             i = 0;
//         }
//     }, interval);
// })(jQuery, 3000, [
//     "img/welcome.jpg",
//     "img/bg.jpg",
//     "img/unsplash1.jpg",
//     "img/unsplash2.jpg",
//     "img/unsplash3.jpg",
// ]);


function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
    
function DemoMode() {
    $('body').append('<div class="demomode"><img src="./img/demo.png"></div>')
}