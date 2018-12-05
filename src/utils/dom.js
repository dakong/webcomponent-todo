const _filterEl = (elements, callback) => {
    let result = [];
    for (let i = 0; i < elements.length; i++) {
        if (callback(elements[i]))
            result.push(elements[i]);
    }
    return result;
}
export const findEl = (list, attr, value) => _filterEl(list, element => element.getAttribute(attr) === value)[0];

export const findChildEl = (parent, attr, value) => findEl(parent.children, attr, value);