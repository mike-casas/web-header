# Auth0 Web Header

Auth0's website and landings react component header

## Installation

From npm:
```bash
npm install --save auth0-web-header
```

From CDN:
```html
<link rel="stylesheet" href="https://cdn.auth0.com/web-header/1.2.6/web-header.css" />
<script src="https://cdn.auth0.com/web-header/1.2.6/web-header.js"></script>
```

## Usage

### API

Props | Type | Default | Description
------ | ---- | ------- | -----------
className | string | '' | Applied to the header root element.
children | node | null | Can be used to render custom menu items via React components.
menuItems | collection | null | Can be used to render custom menu items via a parsed JSON, see `src/data/menu-items.json`.
theme | string | 'light' | Header theme, another option is 'dark'.
featuredEnable | boolean | true | Enable or disable featured link next to the Auth0 logo.
featuredLink | string | 'https://auth0.com/jobs' | Featured link URI.
featuredText | string | 'We\'re hiring!' | Featured link text.
primaryButtonEnable | boolean | true | Enable or disable primary button.
primaryButtonLink | string | '' | Link of the primary button, if it's different from `''` the primary button will be rendered as an anchor tag with this href.
primaryButtonOnClick | function | () => {} | Callback function for when primary button is clicked.
primaryButtonText | string | 'Login' | Text of the primary button.
secondaryButtonEnable | boolean | true | Secondary button link.
secondaryButtonLink | string | '?contact=true' | Link of the secondary button, if it's different from `''` the primary button will be rendered as an anchor tag with this href.
secondaryButtonOnClick | function | () => {} | Callback function for when secondary button is clicked.with this href and `primaryButtonOnClick` will be ignored.
secondaryButtonText | string | 'Login' | Text of the secondary button.

### Example

Example of usage with lock

`src/components/Header/index.js`
```javascript
import React, { Component } from 'react'
import Auth0WebHeader from 'auth0-web-header'
import Auth0Lock from 'auth0-lock'
import { auth0ClientId, auth0Domain, auth0CallbackUrl } from '../config'

class Header extends Component {
  mainLock = {}

  componentDidMount() {
    this.mainLock = {
      lock: new Auth0Lock(auth0ClientId, auth0Domain),
      options: {
        icon: auth0IconUrl,
        callbackURL: auth0CallbackUrl,
        rememberLastLogin: true,
        integratedWindowsLogin: false,
        dict: {
          signup: {
            footerText: 'By signing up, you agree to our <a href="/terms" target="_new">terms of service</a> and <a href="/privacy" target="_new">privacy policy</a>'
          }
        }
      }
    }
  }

  showLock = () => {
    const { lock, options } = this.mainLock
    lock.show(options)
  }

  render() {
    const { dark, logged } = this.props
    return logged
      ? <Auth0WebHeader theme={dark} primaryButtonText="Open Dashboard" primaryButtonLink="https://manage.auth0.com/" />
      : <Auth0WebHeader theme={dark} primaryButtonOnClick={this.showLock} />
  }
}
```

`src/styles/main.styl`
```stylus
@import '../../node_modules/auth0-web-header/dist/web-header.css'
```

## Development

Run:
```
git clone git@github.com:auth0/web-header.git
cd web-header
npm install
npm start
```
And point your browser at `http://localhost:3001`.


## Release

To release a new version just commit a package.json version change. And changelog entry, git tag, cdn deploy and npm publish will be triggered automatically.
Minor version changes or patches will be deployed automatically to dependent projects (website, blog, learn), Docs needs manual update.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.


## License

Auth0 Web Header is [MIT licensed](./LICENSE.md).
