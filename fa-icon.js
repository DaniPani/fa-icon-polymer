import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `fa-icon`
 * Font Awesome Icon Element
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class FaIcon extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'fa-icon',
      },
    };
  }
}

window.customElements.define('fa-icon', FaIcon);
