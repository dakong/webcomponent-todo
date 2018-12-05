import { KEY_CODES, INVALID } from '../../constants/key-codes';
import templateMarkup from './template'
import { TODO } from '../../constants/actions';
const uuidv4 = require('uuid/v4');

export default class TodoItem extends HTMLElement {
    constructor() {
        super();

        const template = document.createElement('template');
        template.innerHTML = templateMarkup;

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(template.content.cloneNode(true));

        // Bind all the functions to use this
        this._onCheckboxClick = this._onCheckboxClick.bind(this);
        this._onCheckboxKeyPress = this._onCheckboxKeyPress.bind(this);
        this._onDelete = this._onDelete.bind(this);
        this._onDeleteKeyPress = this._onDeleteKeyPress.bind(this);
        this._onCreateItem = this._onCreateItem.bind(this);
        this._onEditItem = this._onEditItem.bind(this);
        this._onInputKeyUp = this._onInputKeyUp.bind(this);
        this._createNewLine = this._createNewLine.bind(this);
    }

    static get observedAttributes() {
        return ['checked', 'state'];
    }

    connectedCallback() {
        const checkboxEl = this.shadowRoot.getElementById('checkbox');
        const deleteEl = this.shadowRoot.getElementById('delete-icon');
        const inputEl = this.shadowRoot.querySelector('input');

        this.addEventListener('mouseenter', this._onMouseEnter);
        this.addEventListener('mouseleave', this._onMouseLeave);

        checkboxEl.addEventListener('click', this._onCheckboxClick);
        checkboxEl.addEventListener('keyup', this._onCheckboxKeyPress);

        deleteEl.addEventListener('click', this._onDelete);
        deleteEl.addEventListener('keyup', this._onDeleteKeyPress);

        inputEl.addEventListener('keyup', this._onInputKeyUp);


        if (this.focusInput) {
            inputEl.focus();
        }

        this.setAttribute('uuid', this.uuid);
        this.setAttribute('aria-checked', this.checked);

        inputEl.setAttribute('value', this.value);
    }

    attributeChangedCallback(name, oldVal, newVal) {
        const input = this.shadowRoot.querySelector('input');

        switch(name) {
            case 'checked':
                if (this.checked) {
                    input.setAttribute('disabled', '');
                } else {
                    input.removeAttribute('disabled');
                }
                this.setAttribute('aria-checked', this.checked);
                break;

            case 'state':
                if (newVal === 'new') {
                    input.addEventListener('keydown', this._onCreateItem);
                } else if (oldVal === 'new' && newVal !== 'new') {
                    input.removeEventListener('keydown', this._onCreateItem);
                }
                break;

            case 'focus-input':
                if (newVal) {
                    input.focus();
                }
                break;

            default:
                break;
        }
    }

    _onDelete() {
        this.dispatchEvent(new CustomEvent(TODO.DELETE, {
            detail: {
                uuid: this.uuid
            },
            bubbles: true,
            cancelable: true,
            composed: true,
        }));

        this.remove();
    }

    _onCheckboxClick() {
        this.checked = !this.checked;
        this.dispatchEvent(new CustomEvent(TODO.CHECK, {
            detail: {
                uuid: this.uuid,
                checked: this.checked,
            },
            bubbles: true,
            cancelable: true,
            composed: true,
        }));
    }

    _onCreateItem(e) {
        if (INVALID.indexOf(e.keyCode) !== -1) {
            return;
        }

        if (this.state === 'new') {
            this.state = '';
            this.uuid = uuidv4();
        }

        this.dispatchEvent(new CustomEvent(TODO.ADD, {
            detail: {
                uuid: this.uuid,
                value: this.value
            },
            bubbles: true,
            cancelable: true,
            composed: true,
        }));
    }

    _onEditItem(value) {
        this.dispatchEvent(new CustomEvent(TODO.EDIT, {
            detail: {
                value,
                uuid: this.uuid,
            },
            bubbles: true,
            cancelable: true,
            composed: true,
        }));
    }

    _createNewLine() {
        this.dispatchEvent(new CustomEvent(TODO.NEW_LINE, {
            detail: {
                uuid: this.uuid,
            },
            bubbles: true,
            cancelable: true,
            composed: true,
        }));
    }

    _onDeleteKeyPress(e) {
        if (e.keyCode === KEY_CODES.ENTER)
            this._onDelete();
    }
    _onCheckboxKeyPress(e) {
        if (e.keyCode === KEY_CODES.ENTER)
            this._onCheckboxClick();
    }

    _onInputKeyUp(e) {
        if (e.keyCode === KEY_CODES.ENTER) {
            if (this.state !== 'new') {
                this._createNewLine();
            }
        } else {
            this.value = e.target.value;
            this._onEditItem(this.value);
        }
    }

    _onMouseEnter() {
        this.hover = true;
    }

    _onMouseLeave() {
        this.hover = false;
    }

    get uuid() {
        return this.getAttribute('uuid') || '';
    }

    set uuid(val) {
        this.setAttribute('uuid', val);
    }

    get hover() {
        return this.hasAttribute('hover');
    }

    set hover(val) {
        if (val) {
            this.setAttribute('hover', '');
        } else {
            this.removeAttribute('hover');
        }
    }

    get checked() {
        return this.hasAttribute('checked');
    }

    set checked(val) {
        if (val) {
            this.setAttribute('checked', '');
        } else {
            this.removeAttribute('checked');
        }
    }

    get value() {
        return this.getAttribute('value') || '';
    }

    set value(val) {
        this.setAttribute('value', val);
    }

    get state() {
        return this.getAttribute('state') || '';
    }

    set state(val) {
        this.setAttribute('state', val);
    }

    get focusInput() {
        return this.hasAttribute('focus-input');
    }

    set focusInput(val) {
        if (val) {
            this.setAttribute('focus-input', '');
        } else {
            this.removeAttribute('focus-input');
        }
    }
}

customElements.define('todo-item', TodoItem);