const app = require('electron').app;
const userDataPath = app.getPath('userData');
const BrowserWindow = require('electron').BrowserWindow;
const globalShortcut = require('electron').globalShortcut;
var fs = require('fs');
var path = require('path');
var configPath = path.join(userDataPath, 'config.json');
var config;

var mainWindow = null;

app.on('mainWindow-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('will-quit', function() {
  globalShortcut.unregisterAll();
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    icon: 'icons/gpm_icon.png',
    'min-width': 800,
    'min-height': 600,
    fullscreen: true,
    resizable: true,
    'use-content-size': true,
    title: app.getName(),
  });

  if (process.env.NODE_ENV === 'debug')
    mainWindow.toggleDevTools();

  loadConfig();

  mainWindow.loadURL('file://' + __dirname + '/views/player.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

var loadConfig = function() {
  fs.exists(configPath, function(exists) {
    if (process.env.NODE_ENV === 'debug' || !exists) {
      createConfig();
      config = require('./templates/config.json');
    } else {
      config = require(configPath);
    }

    registerShortcuts();
  });
};

var createConfig = function() {
  var template = require('./templates/config.json');
  fs.writeFile(configPath, JSON.stringify(template));
};

var registerShortcuts = function() {
  globalShortcut.register(config.keybindings.PLAY_PAUSE, function() {
    mainWindow.webContents.send('ping', 'play-pause');
  });

  globalShortcut.register(config.keybindings.REWIND, function() {
    mainWindow.webContents.send('ping', 'rewind');
  });

  globalShortcut.register(config.keybindings.FORWARD, function() {
    mainWindow.webContents.send('ping', 'forward');
  });
};
