var flag_speech = 0;
var flag_push_enable = 0;

function call_test(text) {
    console.log('test call');
    var msg = '[msg]' + text;
    var url = $('#webhook').val();
    $.ajax({
	data: 'payload=' + JSON.stringify({
	    // text: text,
	    content: msg,
	    username: 'bot'
	}),
	dataType: 'json',
	processData: false,
	content_type: 'application/json',
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

    recognition.onsoundstart = function() {
	$("#status").val("認識中");
    };
    
    recognition.onnomatch = function() {
	$("#status").val("もう一度試してください");
    };
    
    recognition.onerror = function() {
	$("#status").val("エラー");
        if(flag_speech == 0)
            record();
    };
    
    recognition.onsoundend = function() {
	$("#status").val("停止中");
        record();
    };


    recognition.onresult = function(event) {
        var results = event.results;
        for (var i = event.resultIndex; i < results.length; i++) {
            if (results[i].isFinal) {
		var text = results[i][0].transcript;
		$("#result_text").val(text);
		call_test(text);
                record();
            }
            else {
		var text = results[i][0].transcript;
		$("#result_text").val(text);
                flag_speech = 1;
            }
        }
    }
    
    
    // recognition.addEventListener('result', function(event){
    // 	var results = event.results;
    //     for (var i = event.resultIndex; i < results.length; i++) {
    //         if (results[i].isFinal) {
    //             // document.getElementById('result_text').innerHTML = results[i][0].transcript;
    //         }
    //         else {
    // 		var text = "[途中経過] " + results[i][0].transcript;
    // 		$("#result_text").val(text);

    //             flag_speech = 1;
    //         }
    //     }	
    // }, false);

    // 録音開始
    
    $("#result_text").val('START');

    flag_speech = 0;
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
	call_test('SLACK 通知テストです');
    });
});
