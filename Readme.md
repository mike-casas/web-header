
# auth0-header

  Auth0's website and landings header

## Installation

~~~html
<link href="https://cdn.auth0.com/styleguide/latest/index.css" rel="stylesheet" />
<link href="https://cdn.auth0.com/web-header/latest/standalone.css" rel="stylesheet"/>
<script type="text/javascript" src="//cdn.auth0.com/web-header/latest/standalone.min.js"></script>
~~~

## API

```
// TODO


```

## Development

### Demo run

Run:

```
npm install
grunt dev
```

And point your browser at `http://localhost:9999`.

### Release

Make sure you have [bump](https://github.com/ianstormtaylor/bump) and [git-extras](https://github.com/tj/git-extras)
Follow the next steps:

``` bash
  # Once finished your changes and commit them, run:
  bump {patch,minor,major,VERSION}

  # Then create the changelog for the release, using
  # the retrieved version by last command:
  git changelog --tag <version>

  # Then, just run:
  git add . && git release <version>

  # Done!
```

## License

  The MIT License (MIT)

  Copyright (c) {year} <copyright holders>

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
