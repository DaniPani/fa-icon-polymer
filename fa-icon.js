import { LitElement, html } from '@polymer/lit-element';
import { unsafeHTML } from 'lit-html/lib/unsafe-html';

import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import brand from '@fortawesome/fontawesome-free-brands';
import regular from '@fortawesome/fontawesome-free-regular';

import { style } from './fa-icon-css.js';

fontawesome.library.add(solid, brand, regular);

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
      'mask-group': String,
      'mask-name': String,
    };
  }

  _removeFaPrefix(v) {
    return v.replace(/^fa-/, '');
  }

  _computeIconSvgString(props) {
    var icon = {};
    var classes = [];
    var transform = {};
    var mask = {};

    for (var key in props) {
      var value = props[key];

      switch (key) {
      case 'icon-prefix':
        icon['prefix'] = value;
        break;
      case 'icon-name':
        icon['iconName'] = this._removeFaPrefix(value);
        break;
      case 'size':
        var size = this._removeFaPrefix(value);
        if (['xs', 'sm', 'lg', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x'].includes(size))
          classes.push('fa-' + size);
        break;
      case 'fixed-width':
        classes.push('fa-fw');
        break;
      case 'pull-left':
      case 'pull-right':
        this.classList.add('fa-' + key);
        classes.push('fa-' + key);
        break;
      case 'border':
      case 'spin':
      case 'pulse':
        classes.push('fa-' + key);
        break;
      case 'scale':
        transform['size'] = 16 * this.scale / 100;
        break;
      case 'rotate':
        transform['rotate'] = value;
        break;
      case 'translate-x':
      case 'translate-y':
        transform[key.replace(/^translate-/, '')] = value;
        break;
      case 'flip-x':
        transform['flipX'] = value;
        break;
      case 'flip-y':
        transform['flipY'] = value;
        break;
      case 'mask-prefix':
        mask['prefix'] = value;
        break;
      case 'mask-name':
        mask['iconName'] = this._removeFaPrefix(value);
        break;

      }
    }

    return fontawesome.icon(icon, { classes: classes, transform: transform, mask: mask }).html;
  }

  _render(props) {
    return html`
    <style>
      :host {
        display: inline-block;
      }
    
      svg {
        color: var(--icon-color, black);
        background-color: var(--icon-background-color, white);
      }
    </style>
    ${style} ${unsafeHTML(this._computeIconSvgString(props))}`;
  }
}

window.customElements.define('fa-icon', FaIcon);
