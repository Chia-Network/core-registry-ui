const net = require('net');
const childProcess = require('child_process');

const port = process.env.PORT ? process.env.PORT - 100 : 3001;

process.env.ELECTRON_START_URL = `http://localhost:${port}`;
const client = new net.Socket();
let startedElectron = false;

const tryConnection = () => {
  client.connect({ port }, () => {
    client.end();
    if (!startedElectron) {
      console.log('starting electron');
      startedElectron = true;
      const { exec } = childProcess;
      exec('npm run electron');
    }
  });
};

tryConnection();

client.on('error', (error) => {
  console.log('error', error);
  setTimeout(tryConnection, 1000);
});
