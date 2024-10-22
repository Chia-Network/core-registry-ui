const https = require('https');
const tar = require('tar');
const fs = require('fs-extra');
const path = require('path');
const appBuilds = require('./app-builds');

const downloadAndExtract = (key, url, tag) => {
  const finalUrl = url.replace('{{tag}}', tag);
  console.log(`Downloading ${key} from ${finalUrl}`);
  const appPath = path.join(__dirname, 'apps', key);

  // Create the folder if it doesn't exist
  fs.mkdirSync(appPath, { recursive: true });

  const downloadFile = (url, redirections = 5) => {
    return new Promise((resolve, reject) => {
      if (redirections < 1) {
        reject(new Error('Too many redirections'));
      }

      const request = https.get(url, (response) => {
        if (response.statusCode === 200) {
          resolve(response);
        } else if (response.statusCode === 302 || response.statusCode === 301) {
          console.log(`Redirecting to ${response.headers.location}`);
          downloadFile(response.headers.location, redirections - 1)
            .then(resolve)
            .catch(reject);
        } else {
          reject(new Error(`Failed to download file, status code: ${response.statusCode}`));
        }
      });

      request.on('error', reject);
    });
  };

  downloadFile(finalUrl)
    .then((response) => {
      const extraction = tar.x({ cwd: appPath });
      response.pipe(extraction);
      return new Promise((resolve, reject) => {
        extraction.on('finish', resolve);
        extraction.on('error', reject);
      });
    })
    .then(() => {
      const buildPath = path.join(appPath, 'build');
      if (fs.existsSync(buildPath)) {
        return fs
          .copy(buildPath, appPath)
          .then(() => fs.remove(buildPath))
          .then(() => console.log(`Moved files from ${buildPath} to ${appPath}`));
      } else {
        console.log(`No build directory in ${appPath}`);
      }
    })
    .catch((error) => {
      console.error(`Failed to download and extract ${key}: ${error.message}`);
    });
};

for (const key in appBuilds) {
  const { tag, url } = appBuilds[key];
  downloadAndExtract(key, url, tag);
}
