var app = require('app'),
    userDataPath = app.getPath('userData'),
    BrowserWindow = require('browser-window'),
    globalShortcut = require('global-shortcut'),
    fs = require('fs'),
    path = require('path'),
    configPath = path.join(userDataPath, 'config.json'),
    config;

require('crash-reporter').start();

var mainWindow = null;

app.on('mainWindow-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    icon                : 'icons/gpm_icon.png',
    "min-width"         : 800,
    "min-height"        : 600,
    fullscreen          : true,
    resizable           : true,
    "use-content-size"  : true,
    title               : app.getName()
  });

  loadConfig();

  mainWindow.loadUrl('file://' + __dirname + '/views/player.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

var loadConfig = function(){
  fs.exists(configPath, function(exists){
    if(!exists){
      createConfig();
      config = require('./templates/config.json');
    } else {
      config = require(configPath);
    }
    registerShortcuts();
  });
};

var createConfig = function(){
  var template = require('./templates/config.json');
  fs.writeFile(configPath, JSON.stringify(template));
};

var registerShortcuts = function(){
  var register_play = globalShortcut.register(config.keybindings.play_pause, function(){
    mainWindow.webContents.send('ping', 'play-pause');
  });

  var register_rewind = globalShortcut.register(config.keybindings.rewind, function(){
    mainWindow.webContents.send('ping', 'rewind');
  });

  var register_next = globalShortcut.register(config.keybindings.forward, function(){
    mainWindow.webContents.send('ping', 'forward');
  });
};
