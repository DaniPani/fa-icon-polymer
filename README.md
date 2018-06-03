# \<fa-icon\>

A Polymer 3 component to wrap Font Awesome 5 in a convenient to use web-component. This component is based on the free fonts provide by [Font Awesome](https://fontawesome.com). It includes the styles solid, regular and brands. It is not based on the standard `PolymerElement` but uses the lighter [lit-element](https://github.com/Polymer/lit-element).

```html
<fa-icon icon-prefix="fas" icon-name="home"></fa-icon><br/>
<fa-icon icon-prefix="fas" icon-name="cog" fixed-width></fa-icon><br/>
<fa-icon icon-prefix="fas" icon-name="cog" size="3x" spin></fa-icon>
<fa-icon icon-prefix="fas" icon-name="magic" size="4x" scale=50 translate-y=6></fa-icon>
<fa-icon icon-prefix="fas" icon-name="pencil-alt" size="4x" mask-prefix="fas" mask-name="comment" scale=50 translate-y=-0.5></fa-icon>
```

## Demo

If you want to take a look at a demo page showing some examples, execute the following instructions on your machine.

```
$ git clone https://github.com/oliverandrich/fa-icon-polymer.git
$ cd fa-icon-polymer
$ npm install
$ polymer serve --open
```

## Todo

- [ ] Write test code.
- [ ] Setup CI.
- [ ] Add support for [layering, text & counters](https://fontawesome.com/how-to-use/svg-with-js#layering)
- [ ] Find a more elegant way to include the Font Awesome CSS.
- [X] Detailed README.md file.
- [ ] Add support for Pro fonts.

## License

This project is licensed under MIT License. See LICENSE file.