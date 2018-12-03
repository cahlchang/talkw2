var flag_speech = 0;
var flag_now_recording = false;
var recognition;
var flag_push_enable = 0;
const COOKIE_KEYS = ['webhook', 'name', 'image', 'channel']
const LANG_KEY = 'lang'

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
        }
    });
}

function record() {
    window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
    recognition = new webkitSpeechRecognition();
    var str_lang = $('input:radio[name="radio2"]:checked').val();
    recognition.lang = str_lang;
    recognition.interimResults = true;
    recognition.continuous = true;
    save_input_to_cookie()

    recognition.onsoundstart = function() {
        $("#status").val("Recording");
    };
    
    recognition.onnomatch = function() {
        $("#status").val("Retry");
    };
    
    recognition.onerror = function(event) {
        $("#status").val(event.error);
        if (flag_speech == 0) { record(); }
    };
    
    recognition.onsoundend = function() {
        $("#status").val("Stopped");
        recognition.stop();
        record();
    };

    recognition.onresult = function(event) {
        var results = event.results;
        for (var i = event.resultIndex; i < results.length; i++) {
            if (results[i].isFinal) {
                var text = results[i][0].transcript;
                $("#result_text").val(text);
                call_slack(text);
                recognition.stop();
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

function get_cookies() {
    var result = [];
    var cookies = document.cookie.split(";");
    for(var cookie of cookies) {
        var kv = cookie.trim().split("=");
        result[kv[0]] = decodeURIComponent(kv[1])
    }
    return result;
}

function toggle_recording() {
    if (flag_now_recording) {
        if (recognition) { recognition.stop(); }
        $('#record').val('RECORD START');
        $('#record').removeClass('uk-button-danger').addClass('uk-button-primary');
        flag_now_recording = false;
    }
    else {
        $('#record').val('RECORD STOP');
        $('#record').removeClass('uk-button-primary').addClass('uk-button-danger');
        flag_now_recording = true;
        record();
    }
}

function save_cookies(data) {
    for(var k in data) {
        document.cookie = k + "=" + encodeURIComponent(data[k]) + ";";
    }
}

function restore_input_from_cookie()
{
    var cookies = get_cookies();
    for(var key of COOKIE_KEYS) {
        $("#" + key).val(cookies[key]);
    }
    var lang = cookies[LANG_KEY]
    if (lang) {
        var radio = Object.values($(`.uk-radio[value=${lang}]`))
        if (radio.length >= 0) {
            radio[0].checked = true;
        }
    }
}

function save_input_to_cookie()
{
    var data = {};
    for(var key of COOKIE_KEYS) {
        data[key] = $("#" + key).val();
    }
    var lang_radios = $(".uk-radio:checked");
    if (lang_radios.length >= 0) {
        data[LANG_KEY] = lang_radios[0].value
    }
    save_cookies(data);
}

$(function () {
    $('#record').on('click', function () {
        toggle_recording();
    });
    
    $(document).ready(function() {
        restore_input_from_cookie();
    });

    $('#slack-submit').on('click', function () {
        call_slack('Slack Notify');
    });
});
