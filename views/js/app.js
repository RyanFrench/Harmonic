const ipcRendered = require('electron').ipcRenderer;

ipcRendered.on('ping', function(event, message) {
  var webView = document.querySelector('webview#gpm-player');
  webView.executeJavaScript('document.querySelector(\'paper-icon-button[data-id="' + message + '"]\').click()');
});
