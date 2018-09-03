# personal-name

Parse and format personal names (fistname, lastname, titles, …)

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]
[![Downloads][download-badge]][npm-url]

## Install

```sh
# Using npm
npm install personal-name

# Using yarn
yarn add personal-name
```

## Usage

```js
import { format } from 'personal-name';

format({ firstName: 'tim', lastName: 'berners-lee' });
// ⇒ 'Tim Berners-Lee'
```

## License

MIT © [Gowento](https://www.gowento.com)

[npm-url]: https://npmjs.org/package/personal-name
[npm-image]: https://img.shields.io/npm/v/personal-name.svg?style=flat-square
[travis-url]: https://travis-ci.org/gowento/personal-name
[travis-image]: https://img.shields.io/travis/gowento/personal-name.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/gowento/personal-name
[coveralls-image]: https://img.shields.io/coveralls/gowento/personal-name.svg?style=flat-square
[depstat-url]: https://david-dm.org/gowento/personal-name
[depstat-image]: https://david-dm.org/gowento/personal-name.svg?style=flat-square
[download-badge]: http://img.shields.io/npm/dm/personal-name.svg?style=flat-square
