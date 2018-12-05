export { h, createElement, updateElement } from '../index';

const state = h('ul', { 'class': 'list' },
    h('li', {}, 'item 1'),
    h('li', {}, 'item 2')
);

const nextState = h('ul', { 'class': 'list' },
    h('li', {}, 'item one'),
    h('li', {}, 'item two')
);

const $el = createElement(state);
const $parent = document.createElement('div');

$parent.appendChild($el);
document.body.append($parent);

updateElement($parent, state, nextState);
