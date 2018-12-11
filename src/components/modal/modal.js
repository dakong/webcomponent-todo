const markupTemplate = `
  <style>
    .modal {
      border: 1px #C0CCDA solid;
      width: 30rem;
      height: 15rem;
    }
  </style>
  <div class="modal">
    <div class="modal-row">
      <input type="text" />
    </div>
    <div class="modal-row">
      <textarea></textarea>
    </div>
  </div>
`;
export default class Modal extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement('template');
    template.innerHTML = markupTemplate;

    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {

  }

  /*
   Attributes
   Title
   Body
   Editable
  */

  set body(val) {
    this.setAttribute('body', val);
  }

  get body() {
    this.getAttribute('body');
  }

  set title(val) {
    this.setAtttribute('title', val);
  }

  get title() {
    this.getAttribute('title');
  }
}

customElements.define('todo-modal', Modal);