$(function () {
    $('.slack-submit').on('click', function () {
	var url = $('#webhook').val();

        // var data = {
        //     channel: '#bot_test',
        //     username: 'bot',
        //     text: 'Hello Slack!'
        // };


	$.ajax({
	    data: 'payload=' + JSON.stringify({
		"text": 'test'
	    }),
	    dataType: 'json',
	    processData: false,
	    type: 'POST',
	    url: url
	})
	    .done(function (reply) {
		console.log("POST to Slack succeeded")
	    })
	    .fail(function (xhr, status, errorThrown) {
		console.log("Error in POST to Slack: " + errorThrown.toString())
	    })
	
    });
});
