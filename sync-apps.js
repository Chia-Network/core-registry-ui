const https = require('https');
const tar = require('tar');
const fs = require('fs-extra');
const path = require('path');
const appBuilds = require('./app-builds.json');

const downloadAndExtract = async (key, url, tag) => {
  const finalUrl = url.replace('{{tag}}', tag);
  console.log(`Downloading ${key} from ${finalUrl}`);
  const appPath = path.join(__dirname, 'public/apps', key);

  // Create the folder if it doesn't exist
  fs.mkdirSync(appPath, { recursive: true });

  const downloadFile = (url, redirections = 5) => {
    return new Promise((resolve, reject) => {
      if (redirections < 1) {
        reject(new Error('Too many redirections'));
      }

      https.get(url, (response) => {
        if (response.statusCode === 200) {
          resolve(response);
        } else if (response.statusCode === 302 || response.statusCode === 301) {
          console.log(`Redirecting to ${response.headers.location}`);
          downloadFile(response.headers.location, redirections - 1).then(resolve);
        } else {
          reject(`Failed to download file, status code: ${response.statusCode}`);
        }
      });
    });
  };

  await downloadFile(finalUrl)
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
        throw new Error(`No build directory in ${key} build path`);
      }
    })
    .catch((error) => {
      throw new Error(`Failed to download and extract ${key}: ${error}`);
    });
};

const deleteAppsDir = async () => {
  const appsDirPath = path.join(__dirname, 'public/apps');
  await fs.remove(appsDirPath);
};

const main = async () => {
  await deleteAppsDir();

  try {
    for (const key in appBuilds) {
      const { tag, url } = appBuilds[key];
      await downloadAndExtract(key, url, tag);
    }
  } catch (error) {
    console.error(`Error getting child apps: ${error}`);
    await deleteAppsDir();
  }
};

main();
