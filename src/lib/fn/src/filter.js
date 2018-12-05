export const filter = (list, fn) => {
	let idx = 0;
	let len = list.length;
	let rslt = [];

	while (idx < len) {
		if (fn(list[idx], idx)) {
			rslt[rslt.length] = list[idx];
		}
		idx++;
	}

	return rslt;
}