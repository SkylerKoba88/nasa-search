/**
 * Copyright 2024 SkylerKoba88
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import "./nasa-image.js";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `nasa-search`
 * 
 * @demo index.html
 * @element nasa-search
 */
export class nasaSearch extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "nasa-search";
  }

  constructor() {
    super();
    this.value = null;
    this.title = '';
    this.loading = false;
    this.items = [];
  }

  // Lit reactive properties
  static get properties() {
    return {
      title: { type: String },
      loading: { type: Boolean, reflect: true },
      items: { type: Array, },
      value: { type: String },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
      }
      :host([loading]) .results {
        opacity: 0.1;
        visibility: hidden;
        height: 1px;
      }
      .results {
        visibility: visible;
        height: 100%;
        opacity: 1;
        transition-delay: .5s;
        transition: .5s all ease-in-out;
      }

      details {
        margin: 16px;
        padding: 16px;
        background-color: blue;
      }
      summary {
        font-size: 24px;
        padding: 8px;
        color: white;
        font-size: 42px;
      }
      input {
        font-size: 20px;
        line-height: 40px;
        width: 100%;
      }
      a::selection {
        opacity: 50%;
      }
      a:link {
        color: var(--ddd-theme-defaut-slateMaxLight);
        text-decoration: none;
      }
      a:visited {
        color: var(--ddd-theme-defaut-slateMaxLight);
        text-decoration: none;
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
      <h2>${this.title}</h2>
      <details open>
        <summary>Search inputs</summary>
        <div>
          <input id="input" placeholder="Search NASA images" @input="${this.inputChanged}" />
        </div>
      </details>
      <div class="results">
        
        ${this.items.map((item, index) => html`
          <a href="${item.links[0].href}" target="_blank">
          <nasa-image
            source="${item.links[0].href}"
            title="${item.data[0].title}"
            label="default alt text"
            owner= "${item.data[0].secondary_creator}"
          ></nasa-image>
          </a>
        `)}
      </div>
    `;
  }
  inputChanged(e) {
    this.value = this.shadowRoot.querySelector('#input').value;
  }
  // life cycle will run when anything defined in `properties` is modified
  updated(changedProperties) {
    // see if value changes from user input and is not empty
    if (changedProperties.has('value') && this.value) {
      this.updateResults(this.value);
    }
    else if (changedProperties.has('value') && !this.value) {
      this.items = [];
    }
    // @debugging purposes only
    if (changedProperties.has('items') && this.items.length > 0) {
      console.log(this.items);
    }
    console.log("message goes here");
  }
  openInNewTab(url) {
    window.open(url, '_blank');
  }

  updateResults(value) {
    this.loading = true;
    fetch(`https://images-api.nasa.gov/search?media_type=image&q=${value}`).then(d => d.ok ? d.json(): {}).then(data => {
      if (data.collection) {
        this.items = [];
        this.items = data.collection.items;
        this.loading = false;
      }  
    });
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(nasaSearch.tag, nasaSearch);