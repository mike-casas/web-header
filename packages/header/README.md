# Auth0 Web Header

Auth0's website and landings react component header

## Installation

From npm client:
```bash
npm install --save @auth0/web-header react@^15.5.4
```

From yarn client:
```bash
yarn add @auth0/web-header react@^15.5.4
```

From CDN:
```html
<link rel="stylesheet" href="https://cdn.auth0.com/website/web-header/4.0.21/web-header.css" />
<script src="https://cdn.auth0.com/website/web-header/4.0.21/web-header.js"></script>
```

## Usage

### API

#### Props

Props | Type | Default | Description
------ | ---- | ------- | -----------
className | string | '' | Applied to the header root element.
children | node | null | Can be used to render custom menu items via React components.
theme | string | 'light' | Header theme, another option is 'dark'.
featuredEnable | boolean | true | Enable or disable featured link next to the Auth0 logo.
featuredIconColor | string | null | Featured icon color (hex).
featuredLink | string | null | Featured link URL.
featuredTitle | string | null | Featured link title text.
featuredDescription | string | null | Featured link description text.
featuredCTA | string | null | Featured link cta text.
loginButtonEnable | boolean | true | Enable or disable Login button.
loginButtonLink | string | '' | Link of the Login button, if it's different from `''` the Login button will be rendered as an anchor tag with this href.
loginButtonOnClick | function | () => {} | Callback function for when Login button is clicked.
loginButtonText | string | 'Log in' | Text of the Login button.
talkToSalesButtonEnable | boolean | true | Talk to sales button link.
talkToSalesButtonLink | string | '?contact=true' | Link of the Talk to sales button, if it's different from `''` the Talk to sales button will be rendered as an anchor tag with this href.
talkToSalesButtonOnClick | function | () => {} | Callback function for when Talk to sales button is clicked.
talkToSalesButtonText | string | 'Talk to sales' | Text of the Talk to sales button.
signupButtonEnable | boolean | true | Signup button link.
signupButtonLink | string | '' | Link of the Signup button, if it's different from `''` the Signup button will be rendered as an anchor tag with this href.
signupButtonOnClick | function | () => {} | Callback function for when Signup button is clicked.
signupButtonText | string | 'Sign up' | Text of the Signup button.

#### Methods

Get a variant for the featured banner:

```javascript
import { getFeaturedVariant } from 'auth0-web-header'

getFeaturedVariant('https://auth0.com/blog/')
```

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
@import '../../node_modules/auth0-web-header/build/web-header.css'
```

## Development

Run:

```bash
git clone git@github.com:auth0/web-header.git
cd web-header
yarn
yarn run start:dev
```

And point your browser to the playgrounds:

- [Mobile Playground](http://localhost:3000/?mobile)
- [Desktop Playground](http://localhost:3000)

## Release

To release a new version just commit a package.json version change. And changelog entry, git tag, cdn deploy and npm publish will be triggered automatically.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.


## License

Auth0 Web Header is [MIT licensed](./LICENSE.md).
