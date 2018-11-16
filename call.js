function call_test(text) {
    console.log('test call');
    var url = $('#webhook').val();
    $.ajax({
	data: 'payload=' + JSON.stringify({
	    text: text,
	    username: 'bot'
	}),
	dataType: 'json',
	processData: false,
	type: 'POST',
	url: url,
	success: function() {
            console.log('成功');
        },
        error: function(){
            console.log('失敗');
        }
    });
}

function record() {
    console.log('speech on');
    window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
    var recognition = new webkitSpeechRecognition();
    recognition.lang = 'ja';
    recognition.interimResults = true;
    recognition.continuous = true;
    
    recognition.addEventListener('result', function(event){
	console.log('event end');
	
	var text = event.results.item(0).item(0).transcript;
	$("#result_text").val(text);
	call_test(text);
	
    }, false);

    // 録音開始
    console.log('on record');
    recognition.start();
    console.log('recording');
}

$(function () {
    $('.record').on('click', function () {
	record();
    });
});

$(function () {
    $('.slack-submit').on('click', function () {
	call_test('test_b');
    });
});
