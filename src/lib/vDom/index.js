/**
 * Virtual Dom
 *
 * @typedef {Object} VirtualDom
 * @property {string} type - The type of the HTML element
 * @property {Object} attributes - The attributes for the HTML element
 * @property {...(VirtualDom | string)} children - Child elements
 */

export {default as h} from './src/h';
export {default as createElement} from './src/createElement';
export {default as updateElement} from './src/updateElement';