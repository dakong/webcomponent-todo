const markupTemplate = `
  <style>
    :host {
      display: none;
      position: absolute;
      left:  50%;
      margin-left: -5px;
      top: 50%;
      margin-bottom: -5px;
    }

    :host([loading]) {
      display: inline-block;
    }

    .loader {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: solid 5px #E5E9F2;
      border-top: solid 5px #009EEB;
      animation-name: spin;
      animation-duration: 2s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  </style>
  <div class="loader"></div>
`;
export default class Loader extends HTMLElement {
    constructor() {
        super();

        const template = document.createElement('template');
        template.innerHTML = markupTemplate;

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {

    }

    set loading(val) {
      if (val) {
        this.setAttribute('loading', '');
      } else {
        this.removeAttribute('loading');
      }
    }

    get loading() {
      return this.hasAttribute('loading');
    }
}

customElements.define('todo-loader', Loader);