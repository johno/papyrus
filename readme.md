# ⊶ [`papyrus`](https://www.youtube.com/watch?v=FrEdbKwivCI)

__Work in progress__

A minimalist browser built for readability.

## Installation

```bash
git clone https://github.com/johnotander/papyrus.git && cd $_
npm i
npm start
```

## Usage

Papyrus looks for a `.papyrus.js` in your home directory.
It can be used to specify a style object that will be applied to all sites.
You can also use other packages to provide values like a [typescale](https://github.com/johnotander/diatonic).

```javascript
const diatonic = require('diatonic')

{
  baseFontSize: '18px'
  typescale: diatonic(),
  width: '32rem',
}
```

## Related

- [Tabby](https://github.com/maxogden/tabby)
- [Electron](https://github.com/electron/electron)
- [Fluidity](https://github.com/mrmrs/fluidity)
- [Diatonic](https://github.com/johnotander/diatonic)

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Crafted with <3 by John Otander ([@4lpine](https://twitter.com/4lpine)).

***

> This package was initially generated with [yeoman](http://yeoman.io) and the [p generator](https://github.com/johnotander/generator-p.git).
