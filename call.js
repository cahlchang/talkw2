$(function () {
    $('.slack-submit').on('click', function () {
	var url = 'https://slack.com/api/chat.postMessage';
	var token = $('#webhook').val();
        var data = {
            token: token,
            channel: '#general',
            username: 'oreno-bot',
            text: 'Hello Slack!'
        };

        $.ajax({
            type: 'GET',
            url: url,
            data: data,
            success: function (data) {
                alert( 'Can I post to Slack? :' + data.ok );
            }
        });
    });
});
