$(function () {

    window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
    var recognition = new webkitSpeechRecognition();
    recognition.lang = 'ja';

    // 録音終了時トリガー
    recognition.addEventListener('result', function(event){
	var text = event.results.item(0).item(0).transcript;
	$("#result_text").val(text);
    }, false);

    // 録音開始
    function record()
    {
	recognition.start();
    }

});


$(function () {
    $('.slack-submit').on('click', function () {
	var url = $('#webhook').val();


	$.ajax({
	    data: 'payload=' + JSON.stringify({
		text: 'test',
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
	})
    });
});
