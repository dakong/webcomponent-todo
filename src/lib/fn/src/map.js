export const map = (list, fn) => {
	let idx = 0;
	let len = list.length;
	let rslt = [];

	while (idx < len) {
		rslt[idx] = fn(list[idx], idx);
		idx++;
	}

	return rslt;
}