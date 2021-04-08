# next-toggle
> Toggle array element.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```bash
npm install -S @jswork/next-toggle
```

## usage
```js
import '@jswork/next-toggle';

const arr = [1,2,3,4];

nx.toggle(arr, 5);
// [1,2,3,4,5]
nx.toggle(arr, 5);
// [1,2,3,4]
```

## license
Code released under [the MIT license](https://github.com/afeiship/next-toggle/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/next-toggle
[version-url]: https://npmjs.org/package/@jswork/next-toggle

[license-image]: https://img.shields.io/npm/l/@jswork/next-toggle
[license-url]: https://github.com/afeiship/next-toggle/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/next-toggle
[size-url]: https://github.com/afeiship/next-toggle/blob/master/dist/next-toggle.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/next-toggle
[download-url]: https://www.npmjs.com/package/@jswork/next-toggle
