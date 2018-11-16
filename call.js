$(function () {
    $('.slack-submit').on('click', function () {
	var url = $('#webhook').val();

        var data = {
            channel: '#bot_test',
            username: 'oreno-bot',
            text: 'Hello Slack!'
        };

        $.ajax({
            url: url,
            type: 'post',
            data: data});

    });
});
