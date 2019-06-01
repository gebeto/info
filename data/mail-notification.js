// var SOUND_URL = "https://raw.githubusercontent.com/gebeto/info/master/data/tarzan.mp3";

// function createNotificationSound(soundUrl) {
// 	var audio = document.createElement("audio");
// 	audio.src = soundUrl;
// 	document.body.appendChild(audio);
// 	return {
// 		play: function play() {
// 			audio.play();
// 		},
// 		stop: function stop() {
// 			audio.stop();
// 		},
// 	};
// }

// var notificationSound = createNotificationSound(SOUND_URL);

// rcmail.addEventListener('responsebefore', function handleResponse(resp) {
// 	var response = resp.response;
// 	console.log('BeforeResponse', response);
// });





function newmail_notifier_sound() {
    var a = "https://raw.githubusercontent.com/gebeto/info/master/data/tarzan2.mp3"
      , b = navigator.mimeTypes ? navigator.mimeTypes["audio/mp3"] : {};
    try {
        var c = $("<audio>").attr("src", a);
        c.get(0).play()
    } catch (d) {
        c = $('<embed id="sound" src="' + a + '" hidden=true autostart=true loop=false />'),
        c.appendTo($("body")),
        window.setTimeout("$('#sound').remove()", 5E3)
    }
}