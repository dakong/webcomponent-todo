 /**
  * Creates a virtual dom representation of an HTML element.
  *
  * @param {string} type
  * @param {Object} attr
  * @param {...(VirtualDom | string)} children
  *
  * @returns {VirtualDom}
  */
export const h = (type, attr, ...children) => {
    return { type, attr, children };
};