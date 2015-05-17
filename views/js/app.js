var ipc = require('ipc');

ipc.on('ping', function(arg){
  var webView = document.querySelector('webview#gpm-player');
  webView.executeJavaScript("document.querySelector('sj-icon-button[data-id=\"" + arg + "\"]').click()");
});
