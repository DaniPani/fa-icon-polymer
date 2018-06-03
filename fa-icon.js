import { PolymerElement } from '@polymer/polymer/polymer-element.js';

import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import brand from '@fortawesome/fontawesome-free-brands';
import regular from '@fortawesome/fontawesome-free-regular';

fontawesome.library.add(solid, brand, regular);

/**
 * `fa-icon`
 * Font Awesome Icon Element
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class FaIcon extends PolymerElement {

  static get properties() {
    return {
      prefix: {
        type: String,
        value: 'far',
        observer: '_refreshHTML'
      },
      name: {
        type: String,
        value: 'heart',
        observer: '_refreshHTML'
      },
      size: {
        type: String,
        observer: '_refreshHTML'
      },
      fixedWidth: {
        type: Boolean,
        observer: '_refreshHTML'
      },
      border: {
        type: Boolean,
        observer: '_refreshHTML',
      },
      pullLeft: {
        type: Boolean,
        observer: '_refreshHTML',
      },
      pullRight: {
        type: Boolean,
        observer: '_refreshHTML',
      },
      spin: {
        type: Boolean,
        observer: '_refreshHTML',
      },
      pulse: {
        type: Boolean,
        observer: '_refreshHTML',
      },
      scale: {
        type: Number,
        observer: '_refreshHTML',
      },
      rotate: {
        type: Number,
        observer: '_refreshHTML',
      },
      translateX: {
        type: Number,
        observer: '_refreshHTML',
      },
      translateY: {
        type: Number,
        observer: '_refreshHTML',
      },
      flipX: {
        type: Boolean,
        observer: '_refreshHTML',
      },
      flipY: {
        type: Boolean,
        observer: '_refreshHTML',
      },
      maskPrefix: {
        type: String,
        observer: '_refreshHTML'
      },
      maskName: {
        type: String,
        observer: '_refreshHTML'
      },
    };
  }

  _removeFaPrefix(v) {
    return v.replace(/^fa-/, '');
  }


  _computeIconSvgString() {
    // let's add some classes based on properties
    var classes = [];

    if (this.size !== undefined) {
      let size = this._removeFaPrefix(this.size);
      if (['xs', 'sm', 'lg', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x'].includes(size))
        classes.push('fa-' + size);
    }

    if (this.fixedWidth)
      classes.push('fa-fw');

    if (this.border)
      classes.push('fa-border');

    if (this.pullLeft)
      classes.push('fa-pull-left');

    if (this.pullRight)
      classes.push('fa-pull-right');

    if (this.spin)
      classes.push('fa-spin');

    if (this.pulse)
      classes.push('fa-pulse');

    // calculate the transforms
    var transform = {};

    if (this.scale !== undefined)
      transform['size'] = 16 * this.scale / 100;

    if (this.rotate !== undefined)
      transform['rotate'] = this.rotate;

    if (this.translateX !== undefined)
      transform['x'] = this.translateX;

    if (this.translateY !== undefined)
      transform['y'] = this.translateY;

    if (this.flipX)
      transform['flipX'] = true;

    if (this.flipY)
      transform['flipY'] = true;

    // masking
    var mask;

    if (this.maskPrefix !== undefined && this.maskName !== undefined)
      mask = {
        prefix: this.maskPrefix,
        iconName: this._removeFaPrefix(this.maskName)
      };

    return fontawesome.icon({
      prefix: this.prefix,
      iconName: this._removeFaPrefix(this.name),
    }, { classes: classes, transform: transform, mask: mask }).html;
  }

  ready() {
    this._refreshHTML();
  }

  _refreshHTML() {
    this.innerHTML = this._computeIconSvgString();
  }

}

window.customElements.define('fa-icon', FaIcon);
