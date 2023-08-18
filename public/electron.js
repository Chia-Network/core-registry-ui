// Module to control the application lifecycle and the native browser window.
const {
  app,
  BrowserWindow,
  protocol,
  Menu,
  MenuItem,
  shell,
} = require('electron');
//const openAboutWindow = require('about-window').default;
const path = require('path');
const url = require('url');

// Create the native browser window.
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // Set the path of an additional "preload" script that can be used to
    // communicate between the node-land and the browser-land.
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // In production, set the initial browser path to the local bundle generated
  // by the Create React App build process.
  // In development, set it to localhost to allow live/hot-reloading.
  const appURL = url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true,
      });
  mainWindow.loadURL(appURL);

  mainWindow.webContents.on('did-fail-load', () => {
    mainWindow.loadURL(appURL);
  });

  // Automatically open Chrome's DevTools in development mode.
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }

  let defaultMenu = Menu.getApplicationMenu();
  let newMenu = new Menu();
  defaultMenu.items.forEach(mainMenuItem => {
    newMenu.append(mainMenuItem);
  });

  /*
  newMenu.append(
    new MenuItem({
      label: 'About',
      submenu: [
        {
          label: 'About',
          click() {
            openAboutWindow({
              icon_path: path.join(__dirname, '/android-chrome-512x512.png'),
              copyright: '© Chia Network 2022',
            });
          },
        },
      ],
    }),
  );*/

  Menu.setApplicationMenu(newMenu);

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

// Setup a local proxy to adjust the paths of requested files when loading
// them from the local production bundle (e.g.: local fonts, etc...).
function setupLocalFilesNormalizerProxy() {
  protocol.registerHttpProtocol(
    'file',
    (request, callback) => {
      const url = request.url.substr(8);
      callback({ path: path.normalize(`${__dirname}/${url}`) });
    },
    error => {
      if (error) console.error('Failed to register protocol');
    },
  );
}

// This method will be called when Electron has finished its initialization and
// is ready to create the browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  setupLocalFilesNormalizerProxy();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS.
// There, it's common for applications and their menu bar to stay active until
// the user quits  explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// If your app has no need to navigate or only needs to navigate to known pages,
// it is a good idea to limit navigation outright to that known scope,
// disallowing any other kinds of navigation.
// const allowedNavigationDestinations = 'https://my-app.com';
// app.on('web-contents-created', (event, contents) => {
//   contents.on('will-navigate', (event, navigationURL) => {
//     const parsedURL = new URL(navigationURL);
//     if (!allowedNavigationDestinations.includes(parsedURL.origin)) {
//       event.preventDefault();
//     }
//   });
// });

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
