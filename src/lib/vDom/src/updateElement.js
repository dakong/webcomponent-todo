export { addElement, deleteElement, editElement, changed } from './internals';
export { map, zip } from '../../fn';

/**
 * Recursively updates the HTMLElement based on the new state. Will compare
 * the previous and next state and make the according updates to the HTMLElement.
 *
 * @param {HTMLElement} - Parent Node
 * @param {VirtualDom} prev - Previous state
 * @param {VirtualDom} next - Next state
 * @param {number} idx - Index of the current child
 */
export const updateElement = ($parent, prev, next, idx = 0) => {
    if (!prev && next) {
        addElement($parent, next);
    } else if (!next && prev) {
        deleteElement($parent, idx);
    } else if (changed(prev, next)) {
        editElement($parent, next, idx);
    } else if (prev.type && next.type) {
        // Recurse on children
        map(zip(prev.children, next.children), (item, i) => {
            const prevChild = item[0];
            const nextChild = item[1];
            updateElement($parent.childNodes[idx], prevChild, nextChild, i);
        });
    }
};