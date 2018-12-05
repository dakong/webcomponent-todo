import markupTemplate from './template';
import { findChildEl, findEl } from '../../utils/dom';

export default class TodoList extends HTMLElement {
    constructor() {
        super();

        const template = document.createElement('template');
        template.innerHTML = markupTemplate;

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(template.content.cloneNode(true));

        if (this.headerText)
            shadowRoot.getElementById('header-text').innerHTML = this.headerText;

        this._onCollapseToggle = this._onCollapseToggle.bind(this);
        this._setListCount = this._setListCount.bind(this);
    }

    connectedCallback() {
        const header = this.shadowRoot.getElementById('header');
        const slotItem = this.shadowRoot.querySelector('slot[name=item]');
        const newTodoItem = this.shadowRoot.querySelector('todo-item[state=new]');
        const list = this.shadowRoot.getElementById('list');

        if (!this.hideHeader) {
            this._setListCount();
            slotItem.addEventListener('slotchange', e => {
                this._setListCount();
            });
        }
        header.addEventListener('click', this._onCollapseToggle);
    }

    _setListCount() {
        const count = this.querySelectorAll('[slot=item]').length;
        const countEl = this.shadowRoot.getElementById('count');

        if (!count && !this.hidden) {
            this.hidden = true;
        } else if (count && this.hidden) {
            this.hidden = false;
        }

        countEl.innerHTML = count;
    }

    _onCollapseToggle(e) {
        this.collapsed = !this.collapsed;
    }

    get collapsed() {
        return this.hasAttribute('collapsed');
    }

    set collapsed(val) {
        if (val) {
            this.setAttribute('collapsed', '');
        } else {
            this.removeAttribute('collapsed');
        }
    }

    get hideHeader() {
        return this.hasAttribute('hide-header');
    }

    set hideHeader(val) {
        if (val) {
            this.setAttribute('hide-header', '');
        } else {
            this.removeAttribute('hide-header');
        }
    }

    get headerText() {
        return this.getAttribute('header-text') || '';
    }

    set headerText(val) {
        this.setAttribute('header-text', val);
    }

    get hidden() {
        return this.hasAttribute('hidden');
    }

    set hidden(val) {
        if (val) {
            this.setAttribute('hidden', '');
        } else {
            this.removeAttribute('hidden');
        }
    }
}

customElements.define('todo-list', TodoList);