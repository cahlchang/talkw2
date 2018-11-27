# TalkW2

TalkW2 is a tool to record your conversation on slack.

## Description

This tool will record the conversation in your slack. From Your browser SpeechRecognition API, this tool will be pushed to your workspace using slack's webhook.

## Demo

https://cahlchang.github.io/talkw2/index.html

You can check the demo on this page.

## Requirement

This tool is currently only tested on Chrome.This is because Web Speech API compliant browsers are limited.

see.
https://developer.mozilla.org/ja/docs/Web/API/Web_Speech_API

## Usage

Please refrain from getting incoming webhook from slack.Then expand this page on the server protected by the TLS certificate. After that, you can memorize your conversation by connecting the microphone and giving permission from the browser.
You can use the demo of the above GitHub pages.

## Security RISK?

This tool works with simple JavaScript. There is a possibility that the browser collects information, but the tool does not do anything. Please check the source code if you are worried.


However, I do not know about the tip of the API. From that point onward, it will be implemented for each browser.

## LICENCE
MIT License
