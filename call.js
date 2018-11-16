$(function () {
    $('.slack-submit').on('click', function () {
	var url = $('#webhook').val();

        var data = {
            channel: '#general',
            username: 'oreno-bot',
            text: 'Hello Slack!'
        };

        $.ajax({
            url: url,
            type: 'post',
            data: data,
	    success: function (data) {
                alert( 'Can I post to Slack? :' + token + data.ok );
            }});

    });
});
