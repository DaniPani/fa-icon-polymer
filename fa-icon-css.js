import { html } from '@polymer/lit-element';
import { unsafeHTML } from 'lit-html/lib/unsafe-html';
import fontawesome from '@fortawesome/fontawesome';

let _style = '<style>' + fontawesome.dom.css() + '</style>';
export const style = html`${unsafeHTML(_style)}`;