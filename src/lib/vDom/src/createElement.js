import { appendChild, isTextNode } from './internals';
import { curry1 } from '../../fn';

/**
 * Create an HTML tree from the Virtual dom
 * @param {VirtualDom} node
 * @returns {HTMLElement}
 */
export const createElement = node => {
    if (isTextNode(node)) {
        return document.createTextNode(node);
    }
    const $el = document.createElement(node.type);

    node.children
        .map(createElement)
        .forEach(curry1($el, appendChild));

    return $el;
};