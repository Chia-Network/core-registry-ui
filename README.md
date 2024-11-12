# Core Registry UI

User interface for the [Core Registry API](https://github.com/Chia-Network/core-registry-api).
Combines [Core Registry CADT UI](https://github.com/Chia-Network/core-registry-cadt-ui/), [Climate Tokenization Engine UI](https://github.com/Chia-Network/Climate-Tokenization-Engine-UI),
and [Climate Explorer UI](https://github.com/Chia-Network/climate-explorer-ui) into a single interface.

## Installation

The UI application can be hosted as a web application and accessed via the browser, or as a desktop application packaged
with Electron. Currently the application is only packaged for x86 platforms, though building from source is expected to
work on ARM.

### Desktop Applications

The [releases](https://github.com/Chia-Network/core-registry-ui/releases) page provides desktop applications packaged
for Windows, Mac, and Debian-based Linux distributions.

### Web Application

The Core Registry UI can be hosted as a web application, either for internal use, or made available to the public. When
operating as a web application, the user's browser must be able to connect to
the [Core Registry API](https://github.com/Chia-Network/core-registry-api). This means the API must be available on the
public internet if the UI is public. Always set an API key to prevent unauthorized access.

To host the UI on the web, use
the [web-build.tar.gz file from the releases page](https://github.com/Chia-Network/core-registry-ui/releases). One of
the simplest solutions is to uncompress these files into
a [public S3 bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteAccessPermissionsReqd.html). These
files could also be served by any webserver, such as Nginx or Apache.

To have the Core Registry UI web application automatically connect to a Core Registry API host by default, copy the
`config.example.json` file to `config.json` and set `cadtApiHost`, `tokenizationApiHost`, and `explorerApiHost` to be
the CADT API hostname, including http:// and path.

#### Sample Nginx Config

```
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;

    # Path on disk to CADT UI files
    root /var/www/core-registry-ui/build;

    # Domain name where this site will be served from
    server_name core-registry-ui-example-config.com;

    # SSL certificates with full path
    ssl_certificate /path/to/ssl/certificate/fullchain.pem;
    ssl_certificate_key /path/to/ssl/certificate/privkey.pem;

    # Optional, but recommended
    resolver                  1.1.1.1;

    try_files $uri /index.html;
}

```

#### Customize Colors and Icons

The Core Registry UI supports color and icon customization by site administrators. To customize the UI colors, copy the
`theme.json.example` file to `theme.json` in the web root directory. Edit the new `theme.json` file and replace the
default colors with any valid css color definitions.

To customize icons, place SVG files in the web root or web root public folder with the following names:

* RegistryCustom.svg
* TokenizationCustom.svg
* ExplorerCustom.svg
* RegistryCustom.svg
* HeaderBrandingCustom.svg

## Contributing

Upon your first commit, you will automatically be added to the package.json file as a contributor.

## Commiting

This repo uses a commit convention. A typical commit message might read:

```
    fix: correct home screen layout
```

The first part of this is the commit "type". The most common types are "feat" for new features, and "fix" for bugfixes.
Using these commit types helps us correctly manage our version numbers and changelogs. Since our release process
calculates new version numbers from our commits it is very important to get this right.

- `feat` is for introducing a new feature
- `fix` is for bug fixes
- `docs` for documentation only changes
- `style` is for code formatting only
- `refactor` is for changes to code which should not be detectable by users or testers
- `test` is for changes which only touch test files or related tooling
- `build` is for changes which only touch our develop/release tools
- `chore` is for housekeeping tasks such as hydrating from another branch

After the type and scope there should be a colon.

The "subject" of the commit follows. It should be a short indication of the change. The commit convention prefers that
this is written in the present-imperative tense.

### Commit linting

Each time you commit the message will be checked against these standards in a pre-commit hook. Additionally all the
commits in a PR branch will be linted before it can be merged to main.
