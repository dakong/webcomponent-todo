export const isTextNode = node => (typeof node === 'string');

/**
 * Append child node to parent. Will return the node of the child
 * if successful, and null if not.
 *
 * @param {HTMLElement} parent
 * @param {HTMLElement} child
 * @return Node of the child or null
 */
export const appendChild = (parent, child) => {
	return (parent) ? parent.appendChild(child) : null;
};

/**
 *
 * @param {*} prevNode
 * @param {*} nextNode
 */
export const changed = (prevNode, nextNode) => {
    return (isTextNode(prevNode) && prevNode !== nextNode) ||
        typeof prevNode !== typeof nextNode ||
        prevNode.type !== nextNode.type
}

/**
 *
 * @param {*}
 * @param {*} node
 */
export const addElement = ($parent, node) => {
    const $el = isTextNode(node) ?
        document.createTextNode(node) :
        document.createElement(node.type);

    $parent.appendChild($el);
}

/**
 *
 * @param {*}
 * @param {*} node
 * @param {*} idx
 */
export const editElement = ($parent, node, idx) => {
    const $child = $parent.childNodes[idx];
    const $el = (isTextNode(node)) ?
    	document.createTextNode(node) :
        document.createElement(node.type);

    $parent.replaceChild($el, $child);
};

/**
 *
 * @param {*}
 * @param {*} idx
 */
export const deleteElement = ($parent, idx) => {
    const $child = $parent.children[idx];
    $parent.removeChild($child);
};

