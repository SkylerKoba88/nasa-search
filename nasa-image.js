import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

export class NasaImage extends DDDSuper(I18NMixin(LitElement)) {

  constructor() {
    super();
    this.title = '';
    this.source = '';
    this.label ='';
    this.owner = '';
  }

  static get properties() {
    return {
        source: { type: String },
        title: { type: String },
        label: { type: String},
        owner: { type: String}
    };
  }

  static get styles() {
    return [css`
    :host {
        display: inline-flex;
        height: 270px;
        max-width: 240px;
        width: 240px;
        margin: 8px;
        font-family: var(--ddd-font-primary);
        background-color: var(--ddd-theme-default-nittanyNavy);
        font-weight: bold;
    }
  

    .image div {
    max-width: 240px;
    font-size: 12px;
    background-color: var(--ddd-theme-default-nittanyNavy);
    padding: 4px;
    }
    .image:hover {
      opacity: 50%;
    }

    .image img {
    display: block;
    width: 240px;
    height: 200px;
    margin: auto;
    }
    `];
  }

  render() {
    return html`
    <div class="image">
        <img src="${this.source}" alt="${this.label}"/>
        <div>${this.title}</div>
        <div>${this.owner}</div>
    </div>
    `;
  }
  static get tag() {
    return "nasa-image";
  }
}
customElements.define(NasaImage.tag, NasaImage);