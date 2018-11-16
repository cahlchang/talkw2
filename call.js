$(function () {

    
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
