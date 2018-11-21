var flag_speech = 0;
var flag_push_enable = 0;

function call_slack(text) {
    var url = $('#webhook').val();
    var name = $('#name').val();
    var url_image = $('#image').val();
    var format = new DateFormat("HH:mm");
    var str_time = format.format(new Date());
    var channel = $('#channel').val();
    var msg = '[' + str_time + '] ' + text;
    $.ajax({
	data: 'payload=' + JSON.stringify({
	    text: msg,
	    username: name,
	    icon_url: url_image,
	    channel: channel
	}),
	type: 'POST',
	url: url,
    	dataType: 'json',
    	processData: false,
	success: function() {
            console.log('OK');
        },
        error: function(){
            console.log('NG');
        }
    });
}

function record() {
    
    window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
    var recognition = new webkitSpeechRecognition();
    var str_lang = $('input:radio[name="radio2"]:checked').val();
    recognition.lang = str_lang;
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onsoundstart = function() {
    	$("#status").val("Recording");
    };
    
    recognition.onnomatch = function() {
    	$("#status").val("Retry");
    };
    
    recognition.onerror = function() {
    	$("#status").val("Error");
        if(flag_speech == 0)
            record();
    };
    
    recognition.onsoundend = function() {
    	$("#status").val("Stopped");
        record();
    };

    recognition.onresult = function(event) {
        var results = event.results;
        for (var i = event.resultIndex; i < results.length; i++) {
            if (results[i].isFinal) {
    		var text = results[i][0].transcript;
    		$("#result_text").val(text);
    		call_slack(text);
                record();
            }
            else {
    		var text = results[i][0].transcript;
    		$("#result_text").val(text);
                flag_speech = 1;
            }
        }
    }
    
    $("#result_text").val('START');

    flag_speech = 0;
    recognition.start();
}


$(function () {

    $('#record').on('click', function () {
	record();
    });

    $('#slack-submit').on('click', function () {
	call_slack('Slack Notify');
    });
});
