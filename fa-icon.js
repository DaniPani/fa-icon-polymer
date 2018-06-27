import {
  LitElement,
  html
} from '@polymer/lit-element';

import fontawesome from '@fortawesome/fontawesome';
/**
 * `fa-icon`
 * Font Awesome Icon Element
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class FaIcon extends LitElement {

  static get properties() {
    return {
      'icon-prefix': String,
      'icon-name': String,
      size: String,
      'fixed-width': Boolean,
      border: Boolean,
      'pull-left': Boolean,
      'pull-right': Boolean,
      spin: Boolean,
      pulse: Boolean,
      scale: Number,
      rotate: Number,
      'translate-x': Number,
      'translate-y': Number,
      'flip-x': Boolean,
      'flip-y': Boolean,
      'mask-prefix': String,
      'mask-name': String,
    };
  }

  async _lazyLoading(prefix, name) {
    name = `${name.substr(0,1).toUpperCase()}${name.substr(1, name.length)}`.replace(/-./, a => a[1].toUpperCase())
    let styles = []
    switch (prefix) {
      case 'fas':
        let solid = await import('@fortawesome/fontawesome-free-solid')
        styles.push(solid[`fa${name}`])
        break;
      case 'fab':
        let brands = await import('@fortawesome/fontawesome-free-brands')
        styles.push(brands[`fa${name}`])
        break;
      case 'far':
      let regular = await import ('@fortawesome/fontawesome-free-regular')
        styles.push(regular[`fa${name}`])
        break;
    }
    fontawesome.library.add(...styles);

  }

  _removeFaPrefix(v) {
    return v.replace(/^fa-/, '');
  }

  _computeProps(props) {
    return Object.entries(props).map(([property, value]) => [property.replace(/-/g, '_'), value]).reduce((a, [property, value]) => {
      a[property] = value
      return Object.assign(a)
    }, {})
  }

  async _computeIconSvgString({
    icon_prefix = 'fas',
    icon_name,
    size = '1x',
    fixed_width = false,
    border = false,
    pull_left = false,
    pull_right = false,
    spin = false,
    pulse = false,
    scale = 100,
    rotate = 0,
    translate_x = 0,
    translate_y = 0,
    flip_x = false,
    flip_y = false,
    mask_prefix,
    mask_name = ''
  }) {

    await this._lazyLoading(icon_prefix, this._removeFaPrefix(icon_name))

    if (mask_prefix) {
      await this._lazyLoading(mask_prefix, this._removeFaPrefix(mask_name))
    }

    let icon = {
      'prefix': icon_prefix,
      'iconName': this._removeFaPrefix(icon_name)
    };

    let classes = [
      [fixed_width, 'fa-fw'],
      [pull_left, 'fa-pull-left'],
      [pull_right, 'fa-pull-right'],
      [border, 'fa-border'],
      [spin, 'fa-spin'],
      [pulse, 'fa-pulse'],
      [
        ['xs', 'sm', 'lg', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x'].includes(this._removeFaPrefix(size)), `fa-${this._removeFaPrefix(size)}`
      ]
    ].reduce((a, [condition, _class]) => {
      if (condition) {
        return [...a, _class]
      }
      return a
    }, [])

    let transform = {
      'size': 16 * scale / 100,
      rotate,
      'x': translate_x,
      'y': translate_y,
      'flipX':flip_x,
      'flipY':flip_y
    };

    let mask = {
      'prefix': mask_prefix,
      'iconName': this._removeFaPrefix(mask_name)
    };

    return html(fontawesome.icon(icon, {
      classes,
      transform,
      mask
    }).html);
  }

  _render(props) {
    return html `
    <style>
      :host {
        display: inline-block;
      }
    
      svg {
        color: var(--icon-color, black);
        background-color: var(--icon-background-color, white);
      }
    </style>
    <style>${fontawesome.dom.css()}</style>
    ${this._computeIconSvgString(this._computeProps(props))}`
  }
}

window.customElements.define('fa-icon', FaIcon);