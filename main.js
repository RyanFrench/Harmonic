var app = require('app'),
    BrowserWindow = require('browser-window'),
    globalShortcut = require('global-shortcut');

require('crash-reporter').start();

var mainWindow = null;

app.on('mainWindow-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    icon                : 'images/gpm_icon.png',
    "min-width"         : 800,
    "min-height"        : 600,
    fullscreen          : true,
    resizable           : true,
    "use-content-size"  : true,
    title               : app.getName()
  });

  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  var register_play = globalShortcut.register('ctrl+space', function(){
    mainWindow.webContents.send('ping', 'play-pause');
  });

  var register_rewind = globalShortcut.register('ctrl+left', function(){
    mainWindow.webContents.send('ping', 'rewind');
  });

  var register_next = globalShortcut.register('ctrl+right', function(){
    mainWindow.webContents.send('ping', 'forward');
  });
});
